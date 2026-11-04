import type { IconType } from 'react-icons';
import {
  FaGithub,
  FaWhatsapp,
  FaLinkedinIn,
  FaPhone,
  FaCalendarCheck,
  FaFileLines,
} from 'react-icons/fa6';
import { HiOutlineMail } from 'react-icons/hi';
import { personal } from '@/lib/data';
import { BOOK_CALL_URL, PHONE_E164, whatsappUrl } from '@/lib/site';

export interface ContactDockItem {
  id: string;
  letter: string;
  label: string;
  icon: IconType;
  url: string;
  ariaLabel: string;
}

/**
 * Centralized configuration for the 7-tile morphing contact dock.
 * Real URLs are linked from the existing portfolio data (`@/lib/data`).
 * Destinations that do not currently have a profile URL configured are kept
 * safely empty ("") per strict project instructions, avoiding any fake URLs.
 */
export const contactDockItems: ContactDockItem[] = [
  {
    id: 'github',
    letter: 'C',
    label: 'GitHub',
    icon: FaGithub,
    url: personal.github,
    ariaLabel: 'Open GitHub profile',
  },
  {
    id: 'whatsapp',
    letter: 'O',
    label: 'WhatsApp',
    icon: FaWhatsapp,
    url: whatsappUrl(),
    ariaLabel: 'Chat with Chirag on WhatsApp',
  },
  {
    id: 'linkedin',
    letter: 'N',
    label: 'LinkedIn',
    icon: FaLinkedinIn,
    url: personal.linkedin,
    ariaLabel: 'Open LinkedIn profile',
  },
  {
    id: 'phone',
    letter: 'T',
    label: 'Call',
    icon: FaPhone,
    url: `tel:${PHONE_E164}`,
    ariaLabel: 'Call Chirag',
  },
  {
    id: 'book-call',
    letter: 'A',
    label: 'Book Call',
    icon: FaCalendarCheck,
    url: BOOK_CALL_URL,
    ariaLabel: 'Book a call with Chirag',
  },
  {
    id: 'email',
    letter: 'C',
    label: 'Email',
    icon: HiOutlineMail,
    url: `mailto:${personal.email}`,
    ariaLabel: 'Send email to Chirag',
  },
  {
    id: 'resume',
    letter: 'T',
    label: 'Resume',
    icon: FaFileLines,
    url: personal.resumeUrl,
    ariaLabel: 'Open resume',
  },
];
