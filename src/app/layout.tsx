import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Chirag Shyani — Senior Flutter & AI Engineer',
  description:
    'Mobile, AI, SaaS and cross-platform application engineer building scalable digital products across Flutter, Android, iOS, Web and cloud technologies. 5+ years · 30+ projects · 100K+ downloads.',
  keywords:
    'Chirag Shyani, Flutter Developer, Senior Flutter Developer, AI Engineer, Flutter Technical Lead, Mobile Engineer, Flutter India, BLoC, Clean Architecture, Firebase, Cross-Platform',
  authors: [{ name: 'Chirag Shyani' }],
  openGraph: {
    title: 'Chirag Shyani — Senior Flutter & AI Engineer',
    description: '5+ years · 30+ projects · 100K+ downloads · Technical Lead',
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chirag Shyani — Senior Flutter & AI Engineer',
    description: '5+ years building scalable mobile & AI products.',
  },
  robots: { index: true, follow: true },
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
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
