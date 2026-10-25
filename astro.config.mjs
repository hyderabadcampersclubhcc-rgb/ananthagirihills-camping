// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import hostinger from './integrations/hostinger.mjs';
import { PRODUCTION_HOST } from './site.config.mjs';

// `||` (not `??`) because GitHub Actions passes unset variables as empty strings.
const productionHost = process.env.PRODUCTION_HOST || PRODUCTION_HOST;
const site = process.env.SITE_URL || `https://${productionHost}`;

export default defineConfig({
  site,
  // Set only for the GitHub Pages preview, which serves the site from /<repo>/.
  base: process.env.BASE_PATH || '/',
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'auto' },
  prefetch: { defaultStrategy: 'hover' },
  integrations: [
    mdx(),
    sitemap({ filter: (page) => !/\/(admin|api|thank-you|preview)(\/|$)/.test(page) }),
    hostinger({ productionHost }),
  ],
  fonts: [
    {
      provider: fontProviders.local(),
      name: 'Inter',
      cssVariable: '--font-body',
      fallbacks: ['ui-sans-serif', 'system-ui', 'sans-serif'],
      options: {
        variants: [{ src: ['./src/assets/fonts/inter-latin-wght-normal.woff2'], weight: '100 900', style: 'normal', display: 'swap' }],
      },
    },
  ],
});
