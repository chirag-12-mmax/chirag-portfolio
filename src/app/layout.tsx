import type { Metadata, Viewport } from 'next';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';
import { SITE_URL } from '@/lib/site';

export const viewport: Viewport = {
  themeColor: '#050507',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

const SITE_TITLE = 'Chirag Shyani — Tech Lead & Senior Full-Stack Developer | Web, Mobile, AI';
const SITE_DESCRIPTION =
  'Hire Chirag Shyani — Tech Lead & Senior Full-Stack Developer with 8+ years of experience. I build Next.js, Vue.js, Node.js & Python web apps, native Android & iOS apps, desktop software, AI automation, AI image generation, Shopify apps, CRM and payroll systems. 30+ projects delivered, 100K+ app downloads.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: '%s | Chirag Shyani',
  },
  description: SITE_DESCRIPTION,
  applicationName: 'Chirag Shyani Portfolio',
  category: 'technology',
  keywords: [
    'Chirag Shyani',
    'Chirag Shiyani',
    'Tech Lead',
    'Senior Full-Stack Developer',
    'Hire Full-Stack Developer India',
    'Freelance Developer India',
    'Freelance Developer Surat',
    'Software Developer Gujarat',
    'Next.js Developer',
    'React Developer',
    'Vue.js Developer',
    'Node.js Developer',
    'Python Developer',
    'Android App Developer',
    'iOS App Developer',
    'Native Mobile App Development',
    'Flutter Developer',
    'Desktop Application Developer',
    'AI Automation Software Development',
    'AI Image Generation Software',
    'Shopify App Developer',
    'CRM Software Development',
    'Payroll Management System Development',
    'E-commerce Website and App Development',
    'Custom Software Development',
    'Project Mentor',
  ],
  authors: [{ name: 'Chirag Shyani', url: SITE_URL }],
  creator: 'Chirag Shyani',
  publisher: 'Chirag Shyani',
  alternates: {
    canonical: '/',
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    title: SITE_TITLE,
    description:
      '8+ years · Tech Lead & Senior Full-Stack Developer · Web, Android & iOS, desktop, AI automation, AI image generation, Shopify apps, CRM & payroll systems. Taking new client projects.',
    url: SITE_URL,
    siteName: 'Chirag Shyani Portfolio',
    locale: 'en_US',
    type: 'profile',
    firstName: 'Chirag',
    lastName: 'Shyani',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description:
      '8+ years building web, mobile, desktop and AI software for businesses. Tech Lead & project mentor — taking new client projects.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/profile.jpg',
  },
};

const SERVICE_NAMES = [
  'Website & Web App Development (Next.js, React, Vue.js)',
  'Backend Development (Node.js, Python)',
  'Android & iOS App Development (Native & Flutter)',
  'Desktop Application Development',
  'AI Automation Software',
  'AI Image Generation Software',
  'Shopify App Development',
  'CRM Development',
  'Payroll Management System Development',
  'Tech Lead & Project Mentoring',
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/#person`,
      name: 'Chirag Shyani',
      alternateName: 'Chirag Shiyani',
      givenName: 'Chirag',
      familyName: 'Shyani',
      jobTitle: 'Tech Lead & Senior Full-Stack Developer',
      description:
        'Tech Lead, project mentor and senior full-stack developer with 8+ years of experience building web, mobile, desktop, AI and business software.',
      url: SITE_URL,
      image: `${SITE_URL}/profile.jpg`,
      telephone: '+91 8141526123',
      email: 'chirag.shyani17@gmail.com',
      sameAs: [
        'https://linkedin.com/in/chirag-shiyani-717063245',
        'https://github.com/chirag-12-mmax',
      ],
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Surat',
        addressRegion: 'Gujarat',
        addressCountry: 'IN',
      },
      knowsAbout: [
        'Next.js',
        'React',
        'Vue.js',
        'Node.js',
        'Python',
        'TypeScript',
        'Android Native Development',
        'iOS Native Development',
        'Flutter',
        'Desktop Application Development',
        'AI Automation',
        'AI Image Generation',
        'Large Language Models',
        'Shopify App Development',
        'CRM Software',
        'Payroll Management Systems',
        'Software Architecture',
        'Technical Leadership',
        'Search Engine Optimization',
      ],
      worksFor: {
        '@type': 'Organization',
        name: 'Cirkle Studio Pvt. Ltd.',
      },
    },
    {
      '@type': 'ProfessionalService',
      '@id': `${SITE_URL}/#service`,
      name: 'Chirag Shyani — Software Development Services',
      url: SITE_URL,
      image: `${SITE_URL}/profile.jpg`,
      description: SITE_DESCRIPTION,
      email: 'chirag.shyani17@gmail.com',
      telephone: '+91 8141526123',
      founder: { '@id': `${SITE_URL}/#person` },
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Surat',
        addressRegion: 'Gujarat',
        addressCountry: 'IN',
      },
      areaServed: 'Worldwide',
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Software Development Services',
        itemListElement: SERVICE_NAMES.map((name) => ({
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name },
        })),
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'Chirag Shyani — Tech Lead & Full-Stack Developer Portfolio',
      description:
        'Portfolio of Chirag Shyani: web, mobile, desktop, AI, Shopify, CRM and payroll projects, case studies and services.',
      publisher: {
        '@id': `${SITE_URL}/#person`,
      },
      inLanguage: 'en-US',
    },
    {
      '@type': 'ProfilePage',
      '@id': `${SITE_URL}/#profilepage`,
      url: SITE_URL,
      name: 'Chirag Shyani Profile',
      mainEntity: {
        '@id': `${SITE_URL}/#person`,
      },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500&family=JetBrains+Mono:wght@400;500;600&family=Anton&family=Caveat:wght@600&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning>
        {children}
        <Analytics />
      </body>
    </html>
  );
}

