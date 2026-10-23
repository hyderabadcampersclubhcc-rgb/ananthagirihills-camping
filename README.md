# Camping website (Ananthagiri Hills near Hyderabad)

Static Astro site, built and deployed by GitHub Actions to Hostinger over FTPS.
Separate from the HCC website: no HCC code, secrets or FTP account are shared.

## Local

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # output in dist/
```

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
| Variable | `STAGING_URL` | `https://staging.<DOMAIN>` |
| Variable | `STAGING_DIR` | `staging/` |
| Variable | `PRODUCTION_HOST` | `<DOMAIN>` (no `https://`, no `www`) |
| Variable | `PRODUCTION_DIR` | `./` |
| Variable | `FTP_PROTOCOL` | optional, default `ftps` |
| Variable | `PRODUCTION_LIVE` | **only at go-live** |

Also create two environments (Settings → Environments): `staging` and `production`, and restrict
`production` to the `main` branch.

## Indexing safety

Every page is `noindex` and `robots.txt` blocks everything unless the build sets
`PUBLIC_ALLOW_INDEXING=true`, which only the production job does.
