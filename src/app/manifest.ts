import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Chirag Shyani — Tech Lead & Senior Full-Stack Developer',
    short_name: 'Chirag Shyani',
    description:
      'Portfolio of Chirag Shyani, Tech Lead & Senior Full-Stack Developer with 8+ years of experience building web, mobile, desktop, AI and business software.',
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
