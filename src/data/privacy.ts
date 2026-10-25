/**
 * Privacy policy status. While `approved` is false the policy page shows a draft notice, is `noindex`, and
 * production tracking stays off even if tracking IDs are set (see src/lib/tracking.ts).
 * Set `approved: true` and `lastUpdated` only after the owner approves the wording.
 */
export const privacyPolicy = {
  approved: false,
  lastUpdated: '25 October 2026',
};
