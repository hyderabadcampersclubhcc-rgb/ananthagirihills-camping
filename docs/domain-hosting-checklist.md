# Domain and hosting checklist: camping.hyderabadcampersclub.com

Prepared 24 Oct 2026. Nothing here has been done to DNS or production; the GitHub Pages preview stays `noindex`.

**Owner** = needs your input or account access. **Claude** = can be done in the repo without your input
(code only, no deploy). **Together** = Claude prepares, you approve or click.

## 0. Blocking finding: the domain is not registered

Checked 24 Oct 2026 (read-only): `hyderabadcampersclub.com` returns **NXDOMAIN** in DNS, and the .com registry (RDAP)
returns **404 (not registered)**. HCC's live domain is `hyderabadcampersclubhcc.in` (Hostinger, 145.79.213.106).

| # | Item | Who |
|---|---|---|
| 0.1 | Choose: register `hyderabadcampersclub.com`, or use `camping.hyderabadcampersclubhcc.in` (already owned) | Owner |
| 0.2 | If registering: buy it in your own account (Hostinger or another registrar), enable auto-renew and registrar lock | Owner |

## 1. DNS

| # | Item | Who |
|---|---|---|
| 1.1 | In Hostinger: create subdomain `camping.<domain>` pointing to its own folder (e.g. `public_html/camping/`), separate from HCC's files | Owner |
| 1.2 | DNS record for `camping`: A record to the Hostinger server IP (or the CNAME Hostinger gives). TTL 300 during launch | Owner |
| 1.3 | Staging subdomain (e.g. `staging-camping.<domain>`) with its own folder, if you want a staging copy before production | Owner |
| 1.4 | Google Search Console domain verification: add the TXT record Google gives you | Owner |
| 1.5 | Verify propagation with `nslookup camping.<domain>` before deploying | Claude |

## 2. Hosting and HTTPS

| # | Item | Who |
|---|---|---|
| 2.1 | New FTP account restricted to the camping folder (not HCC's FTP account) | Owner |
| 2.2 | GitHub secrets `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD`; variables `PRODUCTION_HOST=camping.<domain>`, `PRODUCTION_DIR`, optional `STAGING_URL`, `STAGING_DIR` | Owner |
| 2.3 | GitHub environment `production` restricted to the `main` branch, with you as required reviewer | Owner |
| 2.4 | SSL certificate for `camping.<domain>` (Hostinger free SSL) and for the staging subdomain | Owner |
| 2.5 | HTTP → HTTPS redirect and HSTS: already generated in `.htaccess` | Done |
| 2.6 | Security headers, caching, compression, blocked private files: already generated | Done |
| 2.7 | After first deploy: confirm `https://` loads, `http://` redirects with 301, certificate is valid | Claude |

## 3. Canonical URLs, sitemap, robots.txt

| # | Item | Who |
|---|---|---|
| 3.1 | Canonical, Open Graph and structured-data URLs come from `PRODUCTION_HOST`; no code edit needed | Done |
| 3.2 | Production build: `index, follow`; `robots.txt` allows crawling and links `sitemap-index.xml`; sitemap lists exactly the 7 indexable pages. Checked by `npm run check:seo` in the production job | Done |
| 3.3 | Run a production-mode build with the real domain and show you the canonical tags, `robots.txt` and sitemap before deploying | Claude |
| 3.4 | GitHub Pages preview stays `noindex` (only production sets `PUBLIC_ALLOW_INDEXING=true`) | Done |
| 3.5 | Decide the preview's future after launch: keep (noindex) or switch off | Owner |
| 3.6 | Submit `https://camping.<domain>/sitemap-index.xml` in Search Console; inspect the home page and 4 package URLs | Together |

## 4. Redirects and duplicate content

| # | Item | Who |
|---|---|---|
| 4.1 | `http://` → `https://`: generated | Done |
| 4.2 | `www.camping.<domain>`: not needed unless you create that record (the rule exists if you do) | Done |
| 4.3 | Trailing slash consistency: Astro builds `/page/index.html`; check `/packages/x` → `/packages/x/` after deploy | Claude |
| 4.4 | **HCC's own camping pages** (`hyderabadcampersclubhcc.in/camping-near-hyderabad/` and 4 trip pages) have the same text. Choose: (a) rewrite this site's text, (b) 301 HCC's camping pages to this site, or (c) canonical one to the other | Owner |
| 4.5 | Implement the chosen option (redirect table in `hostinger.mjs`, or rewritten copy) | Claude (after 4.4) |

## 5. Analytics (GA4) and Search Console

| # | Item | Who |
|---|---|---|
| 5.1 | Privacy policy page describing analytics, ads cookies and WhatsApp enquiries (draft) | Claude |
| 5.2 | Approve the privacy policy wording and business details in it | Owner |
| 5.3 | GA4 property and Measurement ID (`G-…`) | Owner |
| 5.4 | Cookie consent banner with Google Consent Mode v2 (analytics and ads denied until accepted) | Claude |
| 5.5 | GA4 events: `generate_lead` on "Send enquiry on WhatsApp", `whatsapp_click`, `phone_click`, `view_item` on package pages. Loaded only on production and only after consent | Claude |
| 5.6 | Search Console property and link to GA4 | Owner |

## 6. Google Ads conversion tracking

| # | Item | Who |
|---|---|---|
| 6.1 | Google Ads account, conversion actions and their IDs/labels (`AW-…/…`) | Owner |
| 6.2 | Conversions to track: (1) enquiry form sent to WhatsApp, (2) WhatsApp button clicks, (3) phone clicks. These are **enquiries, not bookings**; set conversion values accordingly | Together |
| 6.3 | Add the Ads tag through the same consent banner; fire conversions on the events in 5.5 | Claude |
| 6.4 | Optional later: import confirmed bookings as offline conversions (needs a record of which enquiries booked) | Owner |
| 6.5 | Test with Google Tag Assistant on staging before production | Together |

## 7. Launch day (after your approval)

1. Business facts confirmed and real photos added (see `improvement-plan.md` sections 4 and 5).
2. Privacy policy live; tracking IDs added.
3. Production-mode build reviewed (3.3).
4. Manual production deploy: Actions → Build & deploy → Run workflow → `production`. **Only with your explicit go-ahead.**
5. Post-deploy checks: HTTPS, 404 status, canonical tags, `robots.txt`, sitemap, structured data in Google's Rich Results Test, mobile layout.
6. Search Console: submit sitemap, request indexing of home and package pages.
7. Set `PRODUCTION_LIVE=true` only if you want nightly automatic production rebuilds.
