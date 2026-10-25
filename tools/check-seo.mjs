// SEO check for the built site (run after `npm run build` with the same env):
// titles/descriptions present and unique, one H1, no skipped heading levels, absolute canonical on the site origin,
// Open Graph tags, robots meta matching the build mode, valid JSON-LD, FAQPage text visible on the page,
// images with alt text, and (production builds) a sitemap listing exactly the indexable pages.
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import { PRODUCTION_HOST } from '../site.config.mjs';

const dist = path.resolve('dist');
const production = process.env.PUBLIC_ALLOW_INDEXING === 'true';
const site = new URL(process.env.SITE_URL || `https://${process.env.PRODUCTION_HOST || PRODUCTION_HOST}`);
const pages = [];
const walk = (dir) =>
  readdirSync(dir).forEach((f) => {
    const p = path.join(dir, f);
    if (statSync(p).isDirectory()) walk(p);
    else if (p.endsWith('.html')) pages.push(p);
  });
walk(dist);

const problems = [];
const fail = (page, msg) => problems.push(`${page}: ${msg}`);
const decode = (s) => s.replace(/&amp;/g, '&').replace(/&#39;|&#x27;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const text = (html) => decode(html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, ' ').replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ');
const titles = new Map();
const descriptions = new Map();
const indexable = [];

for (const file of pages) {
  const page = path.relative(dist, file).replace(/\\/g, '/');
  const html = readFileSync(file, 'utf8');
  const is404 = page === '404.html';
  const title = decode(html.match(/<title>([^<]*)<\/title>/)?.[1] ?? '');
  const description = decode(html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? '');
  const robots = html.match(/<meta name="robots" content="([^"]*)"/)?.[1] ?? '';
  const canonical = html.match(/<link rel="canonical" href="([^"]*)"/)?.[1] ?? '';

  if (!title) fail(page, 'missing <title>');
  else if (title.length > 70) fail(page, `title is ${title.length} characters (keep under 70): "${title}"`);
  if (!description) fail(page, 'missing meta description');
  else if (!is404 && (description.length < 70 || description.length > 170)) fail(page, `description is ${description.length} characters (aim for 70–170)`);
  if (!is404) {
    titles.set(title, [...(titles.get(title) ?? []), page]);
    descriptions.set(description, [...(descriptions.get(description) ?? []), page]);
  }

  const h1s = html.match(/<h1[\s>]/g)?.length ?? 0;
  if (h1s !== 1) fail(page, `${h1s} <h1> elements (expected 1)`);
  let last = 0;
  for (const [, level] of html.matchAll(/<h([1-6])[\s>]/g)) {
    if (Number(level) > last + 1 && last !== 0) fail(page, `heading jumps from h${last} to h${level}`);
    last = Number(level);
  }

  if (!robots) fail(page, 'missing robots meta');
  const wantsIndex = production && !is404;
  if (wantsIndex && !robots.startsWith('index')) fail(page, `robots is "${robots}" in a production build`);
  if (!production && !robots.startsWith('noindex')) fail(page, `robots is "${robots}" outside production`);
  if (robots.startsWith('index')) indexable.push(canonical);

  if (!canonical) fail(page, 'missing canonical');
  else {
    const c = new URL(canonical);
    if (c.origin !== site.origin) fail(page, `canonical ${canonical} is not on ${site.origin}`);
    if (!is404 && !c.pathname.endsWith('/')) fail(page, `canonical ${canonical} has no trailing slash`);
  }

  for (const prop of ['og:title', 'og:description', 'og:url', 'og:image']) {
    const v = html.match(new RegExp(`<meta property="${prop}" content="([^"]*)"`))?.[1];
    if (!v) fail(page, `missing ${prop}`);
    else if (prop === 'og:image' && !/^https?:\/\//.test(v)) fail(page, 'og:image is not an absolute URL');
  }

  const visible = text(html);
  for (const [, json] of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    let data;
    try {
      data = JSON.parse(json);
    } catch {
      fail(page, 'invalid JSON-LD');
      continue;
    }
    if (/AggregateRating|"Review"/.test(json)) fail(page, 'rating/review schema present: allowed only with genuine reviews');
    if (data['@type'] === 'FAQPage') {
      for (const q of data.mainEntity) if (!visible.includes(q.name)) fail(page, `FAQ schema question not visible: "${q.name}"`);
    }
  }

  for (const [img] of html.matchAll(/<img\s[^>]*>/g)) if (!/\salt="/.test(img)) fail(page, `image without alt: ${img.slice(0, 80)}`);
}

for (const [value, list] of titles) if (list.length > 1) problems.push(`duplicate title "${value}" on ${list.join(', ')}`);
for (const [, list] of descriptions) if (list.length > 1) problems.push(`duplicate description on ${list.join(', ')}`);

// Sitemap: production lists exactly the indexable canonical URLs; other builds list none.
const sitemapFile = path.join(dist, 'sitemap-0.xml');
const listed = existsSync(sitemapFile) ? [...readFileSync(sitemapFile, 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]) : [];
const missing = indexable.filter((u) => !listed.includes(u));
const extra = listed.filter((u) => !indexable.includes(u));
if (missing.length) problems.push(`sitemap is missing: ${missing.join(', ')}`);
if (extra.length) problems.push(`sitemap lists non-indexable URLs: ${extra.join(', ')}`);

const robotsTxt = readFileSync(path.join(dist, 'robots.txt'), 'utf8');
if (production !== /Allow: \//.test(robotsTxt)) problems.push('robots.txt does not match the build mode');

problems.forEach((p) => console.error(`✗ ${p}`));
console.log(
  `check:seo ${pages.length} pages (${production ? 'production' : 'non-production'} build), ${indexable.length} indexable, sitemap ${listed.length} URLs, ${problems.length} problems`,
);
process.exit(problems.length ? 1 : 0);
