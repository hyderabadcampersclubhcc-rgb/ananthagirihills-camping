# Domain and hosting checklist: camping.hyderabadcampersclubhcc.in

Domain confirmed by the owner on 25 Oct 2026 (replaces `camping.hyderabadcampersclub.com`, which is not a registered
domain). Nothing here has been done to DNS or production; the GitHub Pages preview stays `noindex`.

**Owner** = needs your input or account access. **Claude** = done or doable in the repo without your input
(code only, no deploy). **Together** = Claude prepares, you approve or click.

## 0. Current state (read-only checks, 25 Oct 2026)

| Host | DNS | Notes |
|---|---|---|
| `camping.hyderabadcampersclubhcc.in` | No record yet (NXDOMAIN); no wildcard | Expected until the subdomain is created |
| `hyderabadcampersclubhcc.in`, `www.` | 145.79.213.106 | Live WordPress site, indexed |
| `staging.hyderabadcampersclubhcc.in` | 88.222.243.191 | New HCC site (staging) on Hostinger |
| Nameservers | `ns1/ns2.dns-parking.com` (Hostinger) | DNS is managed in Hostinger hPanel |

The main domain and staging are on **different servers**. The camping subdomain must point to the hosting account
that will hold its files.

## 1. DNS

| # | Item | Who |
|---|---|---|
| 1.1 | In Hostinger hPanel, in the hosting plan that will hold the camping files, create subdomain `camping` (Hostinger normally adds the DNS record itself because it manages the nameservers) | Owner |
| 1.2 | Check the A record for `camping` points to that plan's server IP; TTL 300 during launch | Owner |
| 1.3 | Optional staging copy: subdomain `staging-camping` with its own folder | Owner |
| 1.4 | Search Console: if HCC already has a **Domain property** for `hyderabadcampersclubhcc.in`, the camping subdomain is covered automatically. Otherwise add a URL-prefix property for `https://camping.hyderabadcampersclubhcc.in/` (or the domain property via a DNS TXT record) | Owner |
| 1.5 | Confirm propagation (`nslookup camping.hyderabadcampersclubhcc.in`) before any deploy | Claude |

## 2. Hosting and HTTPS

| # | Item | Who |
|---|---|---|
| 2.1 | **Folder that HCC's site can never overwrite.** HCC's production deploy targets `public_html` (`PRODUCTION_DIR ./`). Prefer a subdomain folder outside HCC's deploy target; if Hostinger only allows `public_html/camping`, whoever runs HCC's go-live must keep that folder (HCC's FTP sync only removes files it uploaded itself, but a manual "clean the old WordPress site" step would delete it) | Owner |
| 2.2 | New FTP account restricted to the camping folder (not HCC's FTP account) | Owner |
| 2.3 | GitHub secrets `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD`; variable `PRODUCTION_DIR` (the FTP path of the camping folder, usually `./` for a folder-restricted FTP account); optional `STAGING_URL`, `STAGING_DIR` | Owner |
| 2.4 | GitHub environment `production` restricted to `main`, with you as required reviewer | Owner |
| 2.5 | SSL certificate for `camping.hyderabadcampersclubhcc.in` (Hostinger free SSL) | Owner |
| 2.6 | HTTP → HTTPS 301 and HSTS, security headers, caching, compression, blocked private files: generated in `.htaccess` | Done |
| 2.7 | After deploy: HTTPS valid, `http://` → `https://` 301, and no rules from a parent `public_html/.htaccess` interfere (our `.htaccess` turns on its own rewrite rules, which by default replace the parent's) | Claude |

## 3. Canonical URLs, sitemap, robots.txt

| # | Item | Who |
|---|---|---|
| 3.1 | Production host set in `site.config.mjs` and as the workflow default; canonical, Open Graph and structured-data URLs follow it | Done |
| 3.2 | Production-mode build with the real domain reviewed: 7 canonical URLs on `https://camping.hyderabadcampersclubhcc.in/`, `robots.txt` allows crawling and links the sitemap, sitemap lists exactly the 7 indexable pages, checks pass (25 Oct 2026) | Done |
| 3.3 | GitHub Pages preview stays `noindex` with an empty sitemap (only the production job sets `PUBLIC_ALLOW_INDEXING=true`) | Done |
| 3.4 | Decide the preview's future after launch: keep (noindex) or switch off | Owner |
| 3.5 | Submit `https://camping.hyderabadcampersclubhcc.in/sitemap-index.xml` in Search Console; inspect home and 4 package URLs | Together |

## 4. Redirects and duplicate content with HCC

| # | Item | Who |
|---|---|---|
| 4.1 | `http://` → `https://` | Done |
| 4.2 | `www.camping.` redirect exists in `.htaccess`; only needed if you create that DNS record | Done |
| 4.3 | Trailing-slash check after deploy (`/packages/x` → `/packages/x/`) | Claude |
| 4.4 | **Decide:** the camping pages on HCC (the WordPress site today; `/camping-near-hyderabad/` and 4 camp pages on the new HCC site) overlap this site. Options: (a) rewrite this site's text so both can rank, (b) 301 HCC's camping pages to this subdomain, (c) canonical one to the other. Same domain family makes (b) the cleanest if this site becomes the camping home | Owner |
| 4.5 | Implement the chosen option (redirect table, rewritten copy, or canonical change) | Claude (after 4.4) |

## 5. Analytics (GA4)

| # | Item | Who |
|---|---|---|
| 5.1 | Privacy policy page covering analytics, ads cookies and WhatsApp enquiries (draft) | Claude |
| 5.2 | Approve the privacy policy wording and the business details in it | Owner |
| 5.3 | GA4 property and Measurement ID (`G-…`); can be HCC's existing property with a separate data stream | Owner |
| 5.4 | Cookie consent banner with Google Consent Mode v2 (analytics and ads denied until accepted) | Claude |
| 5.5 | GA4 events: `generate_lead` (enquiry sent to WhatsApp), `whatsapp_click`, `phone_click`, `view_item` (package pages). Production only, after consent | Claude |
| 5.6 | Link Search Console to GA4 | Owner |

## 6. Google Ads conversion tracking

| # | Item | Who |
|---|---|---|
| 6.1 | Google Ads account, conversion actions and their IDs/labels (`AW-…/…`) | Owner |
| 6.2 | Conversions: enquiry sent to WhatsApp (primary), WhatsApp clicks and phone clicks (secondary). These are **enquiries, not bookings**; set values accordingly | Together |
| 6.3 | Ads tag behind the same consent banner, firing on the 5.5 events | Claude |
| 6.4 | Optional later: import confirmed bookings as offline conversions | Owner |
| 6.5 | Test with Google Tag Assistant before production | Together |

## 7. Launch day (after your approval)

1. Business facts confirmed and real photos added (`improvement-plan.md` sections 4 and 5).
2. Privacy policy live; tracking IDs added.
3. DNS resolves, SSL active, folder and FTP account ready.
4. Manual production deploy: Actions → Build & deploy → Run workflow → `production`. **Only with your explicit go-ahead.**
5. Post-deploy checks: HTTPS, 404 status, canonical tags, `robots.txt`, sitemap, Rich Results Test, mobile layout.
6. Search Console: submit sitemap, request indexing of home and package pages.
7. Set `PRODUCTION_LIVE=true` only if you want nightly automatic production rebuilds.
