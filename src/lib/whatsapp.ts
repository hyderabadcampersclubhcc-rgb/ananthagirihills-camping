import site from '@/data/site.json';

/** Every unconfirmed fact on the site uses this exact wording and becomes a WhatsApp link. */
export const CONFIRM = 'Contact us on WhatsApp to confirm.';

/** wa.me link with a prefilled message. */
export function whatsappLink(message: string): string {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}
