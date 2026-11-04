/**
 * Single source of truth for site-wide URLs and contact links.
 * When you move to your own domain (e.g. https://chiragshyani.com),
 * change SITE_URL here — metadata, sitemap, robots, JSON-LD and
 * project/service pages all read from it.
 */
export const SITE_URL = 'https://chirag-shyani-portfolio.web.app';
export const SITE_NAME = 'Chirag Shyani';

export const PHONE_DISPLAY = '+91 8141526123';
export const PHONE_E164 = '+918141526123';
export const EMAIL = 'chirag.shyani17@gmail.com';

const WHATSAPP_NUMBER = '918141526123';

/** WhatsApp click-to-chat link with an optional pre-filled message. */
export function whatsappUrl(message = "Hi Chirag, I'd like to discuss a project.") {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/** "Book a call" — opens WhatsApp with a call request (swap for a Calendly link when you have one). */
export const BOOK_CALL_URL = whatsappUrl(
  "Hi Chirag, I'd like to book a call to discuss my project. When are you available?",
);
