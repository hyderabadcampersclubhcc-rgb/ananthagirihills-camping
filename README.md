# Camping website (Ananthagiri Hills near Hyderabad)

Static Astro site, built and deployed by GitHub Actions to Hostinger over FTPS.
Separate from the HCC website: no HCC code, secrets or FTP account are shared.

## Local

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # output in dist/
```

## Checks

```bash
npm run check       # types and templates
npm run build
npm run check:all   # SEO (titles, descriptions, H1, canonical, OG, JSON-LD, robots, sitemap) + internal links
```

Run `check:all` with the same `SITE_URL` / `BASE_PATH` / `PUBLIC_ALLOW_INDEXING` as the build. Both workflows run it.

## Content

- Packages: `src/content/packages/*.md` (all prices, timings and inclusions live here).
- Real campsite photos: drop them into `src/assets/campsites/<package>/` (see the README there).
- Genuine reviews: `src/data/reviews.json` (the section stays hidden while it is empty).
- Plan, competitor audit and facts to confirm: `docs/improvement-plan.md`.

## Previews

The GitHub Pages preview (`.github/workflows/preview.yml`) publishes `main` to
`https://<owner>.github.io/<repo>/`. It is always `noindex`, so it never appears in Google.

## Deploy (GitHub Actions, `.github/workflows/deploy.yml`)

| Trigger | Deploys to |
|---|---|
| Push to `main` | Staging |
| Nightly 00:05 IST | Staging (and production once `PRODUCTION_LIVE=true`) |
| Actions → Build & deploy → Run workflow | Staging or production (manual choice) |

Set these in GitHub → Settings → Secrets and variables → Actions:

| Kind | Name | Example |
|---|---|---|
| Secret | `FTP_SERVER` | FTP host from Hostinger |
| Secret | `FTP_USERNAME` | FTP user for this site |
| Secret | `FTP_PASSWORD` | FTP password |
| Variable | `STAGING_URL` | optional, e.g. `https://staging-camping.hyderabadcampersclubhcc.in` |
| Variable | `STAGING_DIR` | `staging/` |
| Variable | `PRODUCTION_HOST` | optional override; defaults to `camping.hyderabadcampersclubhcc.in` (`site.config.mjs`) |
| Variable | `PRODUCTION_DIR` | `./` |
| Variable | `FTP_PROTOCOL` | optional, default `ftps` |
| Variable | `PRODUCTION_LIVE` | **only at go-live** |
| Variable | `GA4_ID` | `G-…` (optional; tracking stays off without it) |
| Variable | `ADS_ID` | `AW-…` (optional) |
| Variable | `ADS_LEAD_LABEL`, `ADS_WHATSAPP_LABEL`, `ADS_CALL_LABEL` | Google Ads conversion labels (optional) |
| Variable | `STAGING_TRACKING` | `true` only while testing tags on staging |

Tracking (GA4 + Google Ads) loads only when an ID is set **and** the privacy policy is approved
(`src/data/privacy.ts`), and even then only after the visitor accepts the cookie banner. The GitHub Pages
preview never has tracking.

Also create two environments (Settings → Environments): `staging` and `production`, and restrict
`production` to the `main` branch.

## Indexing safety

Every page is `noindex` and `robots.txt` blocks everything unless the build sets
`PUBLIC_ALLOW_INDEXING=true`, which only the production job does.
