import type { IconType } from 'react-icons';
import {
  FaGithub,
  FaXTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaFacebookF,
  FaDiscord,
} from 'react-icons/fa6';
import { HiOutlineMail } from 'react-icons/hi';
import { personal } from '@/lib/data';

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
    id: 'twitter',
    letter: 'O',
    label: 'X',
    icon: FaXTwitter,
    url: '', // Real URL not currently in portfolio; update here when available
    ariaLabel: 'Open X profile',
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
    id: 'instagram',
    letter: 'T',
    label: 'Instagram',
    icon: FaInstagram,
    url: '', // Real URL not currently in portfolio; update here when available
    ariaLabel: 'Open Instagram profile',
  },
  {
    id: 'facebook',
    letter: 'A',
    label: 'Facebook',
    icon: FaFacebookF,
    url: '', // Real URL not currently in portfolio; update here when available
    ariaLabel: 'Open Facebook profile',
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
    id: 'discord',
    letter: 'T',
    label: 'Discord',
    icon: FaDiscord,
    url: '', // Real URL not currently in portfolio; update here when available
    ariaLabel: 'Connect on Discord',
  },
];
