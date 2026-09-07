import type { Metadata, Viewport } from 'next';
import './globals.css';

export const viewport: Viewport = {
  themeColor: '#050507',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://chirag-shyani-portfolio.web.app'),
  title: {
    default: 'Chirag Shyani — Senior Flutter Developer & Technical Lead',
    template: '%s | Chirag Shyani',
  },
  description:
    'Chirag Shyani is a Senior Flutter Developer & Technical Lead with 5+ years of experience building scalable enterprise mobile apps, cross-platform architecture, AI integrations, and production systems. 30+ projects delivered, 100K+ downloads.',
  keywords: [
    'Chirag Shyani',
    'Chirag Shiyani',
    'Flutter Developer',
    'Senior Flutter Developer',
    'Flutter Technical Lead',
    'Senior Mobile Engineer',
    'Flutter Developer India',
    'Flutter Developer Surat',
    'Flutter Developer Gujarat',
    'Clean Architecture',
    'BLoC Pattern',
    'Cross-Platform App Development',
    'iOS Developer',
    'Android Developer',
    'Firebase',
    'REST APIs',
    'AI Integration',
    'CI/CD Fastlane',
  ],
  authors: [{ name: 'Chirag Shyani', url: 'https://chirag-shyani-portfolio.web.app' }],
  creator: 'Chirag Shyani',
  publisher: 'Chirag Shyani',
  alternates: {
    canonical: 'https://chirag-shyani-portfolio.web.app',
  },
  openGraph: {
    title: 'Chirag Shyani — Senior Flutter Developer & Technical Lead',
    description:
      '5+ years experience · 30+ production projects · 100K+ downloads · Senior Flutter Developer & Technical Lead.',
    url: 'https://chirag-shyani-portfolio.web.app',
    siteName: 'Chirag Shyani Portfolio',
    images: [
      {
        url: '/profile.jpg',
        width: 800,
        height: 800,
        alt: 'Chirag Shyani — Senior Flutter Developer',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chirag Shyani — Senior Flutter Developer & Technical Lead',
    description:
      '5+ years building scalable mobile apps and enterprise Flutter solutions. 30+ projects delivered.',
    images: ['/profile.jpg'],
    creator: '@chirag_shyani',
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

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': 'https://chirag-shyani-portfolio.web.app/#person',
      name: 'Chirag Shyani',
      givenName: 'Chirag',
      familyName: 'Shyani',
      jobTitle: 'Senior Flutter Developer & Technical Lead',
      description:
        'Senior Flutter Developer with 5+ years of experience building high-performance cross-platform applications across Android, iOS, Web, and Desktop.',
      url: 'https://chirag-shyani-portfolio.web.app',
      image: 'https://chirag-shyani-portfolio.web.app/profile.jpg',
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
        addressCountry: 'India',
      },
      knowsAbout: [
        'Flutter',
        'Dart',
        'Mobile Application Architecture',
        'Clean Architecture',
        'BLoC Pattern',
        'Riverpod',
        'Provider',
        'Android App Development',
        'iOS App Development',
        'Cross-Platform Development',
        'Firebase',
        'REST APIs',
        'AI Integration',
        'CI/CD Automation',
        'Fastlane',
      ],
      worksFor: {
        '@type': 'Organization',
        name: 'Cirkle Studio Pvt. Ltd.',
      },
    },
    {
      '@type': 'WebSite',
      '@id': 'https://chirag-shyani-portfolio.web.app/#website',
      url: 'https://chirag-shyani-portfolio.web.app',
      name: 'Chirag Shyani — Senior Flutter Developer Portfolio',
      description:
        'Official portfolio of Chirag Shyani showcasing 30+ Flutter projects, technical leadership, architecture, and case studies.',
      publisher: {
        '@id': 'https://chirag-shyani-portfolio.web.app/#person',
      },
      inLanguage: 'en-US',
    },
    {
      '@type': 'ProfilePage',
      '@id': 'https://chirag-shyani-portfolio.web.app/#profilepage',
      url: 'https://chirag-shyani-portfolio.web.app',
      name: 'Chirag Shyani Profile',
      mainEntity: {
        '@id': 'https://chirag-shyani-portfolio.web.app/#person',
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
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}

