# Improvement plan: competing for Ananthagiri Hills camping searches

Prepared 24 Oct 2026. Internal document (the `docs/` folder is never built).

## 1. Current repository (before this round)

| Part | What it is |
|---|---|
| Framework | Astro 7 static site, TypeScript strict, content collections with Zod |
| Routes | `/` home, `/packages/<slug>/` x4, `/cancellation-policy/`, `/404.html`, `/robots.txt`, sitemap |
| Content | `src/content/packages/*.md` (one per campsite, all facts in frontmatter; overview in body) |
| Data | `src/data/site.json` (name, WhatsApp, phone), `src/data/photos.ts` (4 credited stock/area photos) |
| Components | Header, Footer, PackageCard, CompareTable, BookingBox (WhatsApp), Faq (+FAQPage JSON-LD), Photo (credit caption), Rich (turns "Contact us on WhatsApp to confirm." into links) |
| Indexing guard | `PUBLIC_ALLOW_INDEXING=true` only in the production job; otherwise `noindex` + `robots.txt` disallow |
| Hosting | GitHub Pages preview (`preview.yml`, subfolder `/ananthagirihills-camping/`); Hostinger FTPS job ready but skipped until secrets exist (`deploy.yml`) |
| Checks | `astro check` and build only; no SEO or link checker in the repo |

## 2. Competitor audit (feature level, 24 Oct 2026)

Pages checked: each homepage and one package page of ananthagirihillscamping.com, myadventurezone.com and
infiniteadventureclub.com. Nothing was copied; this lists features only.

| Feature | ananthagirihillscamping | myadventurezone | infiniteadventureclub | Us (before) |
|---|---|---|---|---|
| Real campsite photo galleries | Yes (~20 images) | Yes (~39 images, all with alt) | Yes (~49 images) | No: 4 stock/area photos |
| Package-page sections | Highlights, inclusions, itinerary, meals, cost, extra charges, carry, T&C, location, reviews | Overview, inclusions, itinerary, food menu, extra charges, booking & cancellation, T&C, carry, nearby, FAQ, reviews | About, highlights, itinerary, food menu, cost, extra charges, carry, refund, guidelines | Most of these, plus a comparison table |
| Side-by-side comparison | No | No | No | Yes (our strongest differentiator) |
| Booking | Cart / "Book now" | WooCommerce cart + date | Enquiry / call | WhatsApp enquiry box |
| Reviews | Review form | Reviews + AggregateRating schema | Google mention | None (correct until genuine reviews exist) |
| Blog / guides | No | 6 guides (birthday, under-₹1,500, couples, one-day trip, best time, camping near Hyderabad) | Some | None |
| Structured data | Organization, Breadcrumb | Product, Offer, FAQPage, Place/Geo, Breadcrumb | Organization, Breadcrumb | FAQPage, Breadcrumb |
| Open Graph image | No | Yes | Yes | No |
| Clear policies | Weak | Refund + T&C pages | Refund section | Full policy page (strong) |
| Quality problems | Typos in H1 ("Ananthaigir"), injected spam heading on a package page | Unverified claims ("safe gated campsite") | Mixed unrelated tours on the homepage, H1 is the brand name | Text duplicates HCC's site |

**Where we can win:** honest comparison of four campsites, exact inclusions/exclusions, clear policy, every
unconfirmed detail flagged instead of invented, fast pages. **Where we lose today:** no real photos, no guides, no
reviews, no OG image, thin structured data, weak mobile navigation.

## 3. Prioritised plan

### P0: implemented in this round
1. **Photo slots per campsite.** Real photos dropped into `src/assets/campsites/<package>/` appear automatically in
   that package's gallery. Until then, stock/area photos stay, with a visible "Illustrative photo, not this campsite" label.
2. **Package pages complete and indexable** (when production indexing is on): campsite name under the H1, unique
   titles/descriptions, meals section, location section, Product/Offer + BreadcrumbList + FAQPage JSON-LD.
3. **Comparison table**: price + unit, advance, availability, accommodation, washroom, check-in/out, meals,
   activities, key exclusions; desktop table with sticky labels, stacked cards on mobile.
4. **Booking journey**: "Send enquiry on WhatsApp" with package, date (or "flexible") and guests; explicit
   "this is an enquiry, not a confirmed booking" text; call option; no fake availability or payment.
5. **Mobile**: navigation visible on phones, skip link, focus styles, sticky bottom enquiry bar on package pages
   that hides when the booking form is on screen and never covers content.
6. **SEO foundations**: Open Graph/Twitter tags with a generated 1200x630 image, Organization (TravelAgency) and
   WebSite JSON-LD, canonical URLs from `SITE_URL`, production-only sitemap, repo checks for SEO and links.
7. **Destination guide** `/ananthagiri-hills-guide/`: where it is, how to reach (road, train, bus), best time,
   nearby places, what to carry, which campsite to choose. One substantial page, not several thin ones.
8. **"Which campsite suits you?"** chooser on the home page.

### P1: needs your input or content
1. Real campsite photos (shot list in section 5).
2. Google Business Profile link, then a reviews section with genuine reviews only (component is ready, hidden while empty).
3. Google Maps pin for each campsite (directions buttons appear automatically when a link is added).
4. Brand name and production domain, then canonical/sitemap switch (section 6).
5. About and Contact page with real business details (address, hours, GST number if any).
6. Original wording for package pages (they currently repeat HCC's text; must change or be resolved before both sites are indexed).
7. Privacy policy and terms, then analytics (GA4/Search Console) with consent.

### P2: after launch
1. Content hub articles (section 7), one at a time, only with real facts.
2. Food menu per campsite once confirmed (only the budget camp's menu is known).
3. Availability calendar only if you can keep it accurate (otherwise keep "check on WhatsApp").
4. Online advance payment (Razorpay Payment Links) if wanted.
5. Lighthouse/CrUX monitoring after go-live.

## 4. Facts requiring your confirmation

Nothing below was changed on the site; each is shown as published on HCC staging or flagged "Contact us on WhatsApp to confirm."

| # | Campsite | Fact | Why it needs confirmation |
|---|---|---|---|
| 1 | All | Prices shown as "From ₹1,600 / ₹2,000 / ₹2,000 / ₹2,999 per person" | Is it a fixed price, or a starting price (weekday/weekend, veg/non-veg, tent type)? "From" implies variation. |
| 2 | All | GST included or extra | Not stated anywhere. |
| 3 | All | Children's price and age policy | Unconfirmed. |
| 4 | All | Minimum/maximum group size | Unconfirmed. |
| 5 | All | Safety arrangements (first aid, lifeguard at pool, night staff, lighting) | Unconfirmed; competitors claim "safe" without evidence. We should state only what is true. |
| 6 | Harivillu, Sarpanpally, Trance Veechika | Check-in time | Unconfirmed. |
| 7 | Harivillu, Sarpanpally, Trance Veechika | Balance payment deadline | Unconfirmed. |
| 8 | Budget | Runs which days? ("Call to check availability" but DJ is Saturday only) | Is the budget camp open on other nights? |
| 9 | Trance Veechika | Rain dance | Unconfirmed. |
| 10 | Sarpanpally | Optional paid activities and their charges | Unconfirmed. |
| 11 | Sarpanpally | Distance "80 to 90 km" vs 80 km for the others | Exact location/route. |
| 12 | Harivillu | "Does not permit unmarried couples" (resort rule) | Still current? Matters for couple searches. |
| 13 | Harivillu / Trance Veechika | Names "Premium Adventure Camping" and "Premium Camping" | Two "Premium" names confuse comparison; consider names that include the campsite (decision 4). |
| 14 | Trance Veechika | "The most comfortable way to camp at Ananthagiri" | A comparative claim; keep only if you are comfortable standing behind it. |
| 15 | All three resort camps | Details originally from a third-party listing (owner-approved working reference) | Reconfirm with each campsite. |
| 16 | All | Exact campsite locations (Google Maps pins) | Needed for directions and Place data. |
| 17 | Policy | Does "full refund" on organiser cancellation include the advance? How are refunds rounded? | Open since 21 Oct. |
| 18 | All | Food menus for the three resort camps | Only the budget menu is known. |

## 5. Photo shot list (per campsite)

Use landscape, at least 1600 px wide, JPG or WebP, taken at the actual campsite, no faces without consent.
Name files by what they show (e.g. `tents-at-dusk.jpg`); the file name becomes the caption.

1. **Hero:** the tent area at dusk with lights or bonfire (the cover photo).
2. **Tent outside:** a row of tents as guests see them.
3. **Tent inside:** bedding, pillows, how many people fit.
4. **Washrooms:** clean, honest shot (one of the most asked questions).
5. **Dining/meals:** the buffet or live kitchen and a plate of the actual food.
6. **Main feature:** budget → pool at evening and DJ area; Harivillu → rope course; Sarpanpally → tents on the lake bank and the farm/petting zoo; Trance Veechika → pool and the sunrise-trek trail.
7. **Bonfire/campfire** at night.
8. **Games area:** box cricket, volleyball, indoor games.
9. **Entrance/signboard and parking:** helps guests find the place.
10. **View/surroundings:** forest, lake or hills from the campsite.

Minimum to replace stock photos: items 1, 2, 3, 4 and 6 for each campsite (20 photos).

## 6. Production domain readiness

Already in place: `SITE_URL` and `PRODUCTION_HOST` drive canonical URLs, sitemap and `.htaccess`; production is
the only build with `index` and a populated sitemap. When you confirm the domain:
1. Set GitHub variables `PRODUCTION_HOST` (and `STAGING_URL`); nothing in the code needs a domain edit.
2. Hostinger: FTP secrets, staging subdomain, SSL.
3. Manual production deploy, then check canonical tags, `robots.txt`, `sitemap-index.xml`, 404 status, redirects.
4. Search Console: verify the domain property (DNS TXT), submit `sitemap-index.xml`, inspect the home and four package URLs.
5. Decide what happens to the GitHub Pages preview (keep as noindex preview, or switch it off).

Note: the GitHub Pages preview is deliberately `noindex`, so it will not appear in Google. `robots.txt` on a GitHub
Pages project subfolder is not read by crawlers (only the host root is), so the `noindex` meta tag is the real guard there.

## 7. Content hub plan (original articles, one search intent each)

| Page | Intent | Status / requirement |
|---|---|---|
| Home `/` | camping near Hyderabad, Ananthagiri Hills camping packages and prices | Exists |
| `/packages/<slug>/` x4 | each campsite by name and type (pool, adventure, lakeside, premium) | Exists |
| `/ananthagiri-hills-guide/` | how to reach Ananthagiri Hills, best time to visit, nearby places, packing | Added this round |
| Lakeside camping near Hyderabad | lakeside intent | Covered by the Sarpanpally package page; a separate page would be a doorway. Revisit only if more lakeside sites are added. |
| Night camping near Hyderabad | "what a night at camp is like" | Covered by the home "How a camping night works" section; an article needs real photos and a night-by-night account. P2. |
| Couple and family camping | which campsite suits couples/families, rules (Harivillu couples rule), privacy, tents | P2 article; needs confirmation of fact 12 and children's policy (fact 3). |
| Day outings and corporate outings | day visits, office groups | Not offered in the current data. Do not publish until you actually offer them with prices. |
| Camping FAQs and packing | FAQ, what to carry | Home FAQ + guide packing section; no separate page needed yet. |
