import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Chirag Shyani — Senior Flutter Developer & Technical Lead',
    short_name: 'Chirag Shyani',
    description:
      'Portfolio of Chirag Shyani, Senior Flutter Developer & Technical Lead with 5+ years of experience building mobile, web, and enterprise solutions.',
    start_url: '/',
    display: 'standalone',
    background_color: '#050507',
    theme_color: '#E31E24',
    icons: [
      {
        src: '/profile.jpg',
        sizes: '192x192',
        type: 'image/jpeg',
      },
      {
        src: '/user_portrait.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
