// Internal link check for the built site: every internal href/src must resolve to a file in dist/,
// and every #fragment must match an id on the target page. Respects BASE_PATH (GitHub Pages subfolder).
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';

const dist = path.resolve('dist');
const base = (process.env.BASE_PATH || '/').replace(/\/?$/, '/');
const pages = [];
const walk = (dir) =>
  readdirSync(dir).forEach((f) => {
    const p = path.join(dir, f);
    if (statSync(p).isDirectory()) walk(p);
    else if (p.endsWith('.html')) pages.push(p);
  });
walk(dist);

const ids = new Map();
const idsOf = (file) => {
  if (!ids.has(file)) ids.set(file, new Set([...readFileSync(file, 'utf8').matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])));
  return ids.get(file);
};
const fileFor = (urlPath) => {
  const rel = decodeURI(urlPath.slice(base.length));
  return path.join(dist, rel === '' || rel.endsWith('/') ? path.join(rel, 'index.html') : rel);
};

let checked = 0;
const problems = [];
for (const page of pages) {
  const html = readFileSync(page, 'utf8');
  const self = '/' + path.relative(dist, page).replace(/\\/g, '/').replace(/index\.html$/, '');
  for (const [, raw] of html.matchAll(/\s(?:href|src)="([^"]+)"/g)) {
    if (/^(https?:|mailto:|tel:|data:|\/\/)/.test(raw)) continue;
    checked++;
    const [target, fragment] = raw.split('#');
    const urlPath = target === '' ? base + self.slice(1) : target.split('?')[0];
    if (!urlPath.startsWith(base)) {
      problems.push(`${path.relative(dist, page)}: ${raw} is outside the base path ${base}`);
      continue;
    }
    const file = fileFor(urlPath);
    if (!existsSync(file)) problems.push(`${path.relative(dist, page)}: ${raw} -> missing ${path.relative(dist, file)}`);
    else if (fragment && file.endsWith('.html') && !idsOf(file).has(fragment)) problems.push(`${path.relative(dist, page)}: ${raw} -> no element with id "${fragment}"`);
  }
}

problems.forEach((p) => console.error(`✗ ${p}`));
console.log(`check:links ${pages.length} pages, ${checked} internal links/assets, ${problems.length} problems`);
process.exit(problems.length ? 1 : 0);
