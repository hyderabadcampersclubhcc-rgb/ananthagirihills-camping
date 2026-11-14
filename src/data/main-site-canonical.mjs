// Owner decision, 14 Nov 2026: the main site (hyderabadcampersclubhcc.in) is the one that should rank
// for Ananthagiri Hills camping. These camping-site pages stay live for visitors but point their
// canonical at the matching main-site page, so the two sites don't compete in Google.
// Pages not listed here (the legal pages, 404) keep a canonical on this site.
const MAIN = 'https://hyderabadcampersclubhcc.in';
export const MAIN_SITE_CANONICAL = {
  '/': `${MAIN}/camping-near-hyderabad/ananthagiri-hills/`,
  '/ananthagiri-hills-guide/': `${MAIN}/destinations/ananthagiri/`,
  '/packages/budget-camping-pool-music/': `${MAIN}/trips/ananthagiri-camping-from-hyderabad/`,
  '/packages/adventure-camping/': `${MAIN}/trips/ananthagiri-harivillu-camping-from-hyderabad/`,
  '/packages/lakeside-camping-sarpanpally/': `${MAIN}/trips/ananthagiri-sarpanpally-lake-camping-from-hyderabad/`,
  '/packages/premium-camping/': `${MAIN}/trips/ananthagiri-trance-veechika-camping-from-hyderabad/`,
};
export const MAIN_SITE_ORIGIN = MAIN;
