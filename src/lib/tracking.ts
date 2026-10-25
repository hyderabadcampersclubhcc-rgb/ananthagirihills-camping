import { privacyPolicy } from '@/data/privacy';

/**
 * Google Analytics 4 and Google Ads, configured only through environment variables (GitHub variables):
 *   PUBLIC_GA4_ID                 G-XXXXXXX
 *   PUBLIC_ADS_ID                 AW-XXXXXXXXX
 *   PUBLIC_ADS_LEAD_LABEL         conversion label: enquiry sent to WhatsApp (primary)
 *   PUBLIC_ADS_WHATSAPP_LABEL     conversion label: WhatsApp button click (optional)
 *   PUBLIC_ADS_CALL_LABEL         conversion label: phone link click (optional)
 *
 * Tracking is OFF unless at least one ID is set AND either
 *   - this is a production build (PUBLIC_ALLOW_INDEXING=true) and the privacy policy is approved, or
 *   - PUBLIC_ENABLE_TRACKING=true (for testing on staging or locally).
 * Even when on, nothing loads from Google until the visitor accepts in the consent banner.
 */
const env = import.meta.env;
const clean = (v: string | undefined) => (v ?? '').trim();

export const trackingConfig = {
  ga4: clean(env.PUBLIC_GA4_ID),
  ads: clean(env.PUBLIC_ADS_ID),
  labels: {
    lead: clean(env.PUBLIC_ADS_LEAD_LABEL),
    whatsapp: clean(env.PUBLIC_ADS_WHATSAPP_LABEL),
    call: clean(env.PUBLIC_ADS_CALL_LABEL),
  },
};

const hasIds = Boolean(trackingConfig.ga4 || trackingConfig.ads);
const production = env.PUBLIC_ALLOW_INDEXING === 'true';
const forced = env.PUBLIC_ENABLE_TRACKING === 'true';

export const trackingEnabled = hasIds && ((production && privacyPolicy.approved) || forced);
