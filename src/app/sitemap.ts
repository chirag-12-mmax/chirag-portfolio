import { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';
import { projects } from '@/data/projects';
import { services } from '@/lib/data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL;
  const lastModified = new Date();

  return [
    { url: baseUrl, lastModified, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/services`, lastModified, changeFrequency: 'monthly', priority: 0.9 },
    ...services.map((s) => ({
      url: `${baseUrl}/services/${s.slug}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    })),
    { url: `${baseUrl}/projects`, lastModified, changeFrequency: 'monthly', priority: 0.9 },
    ...projects.map((p) => ({
      url: `${baseUrl}/projects/${p.id}`,
      lastModified,
      changeFrequency: p.status === 'in-development' ? ('weekly' as const) : ('monthly' as const),
      priority: p.status === 'in-development' ? 0.85 : 0.75,
    })),
    { url: `${baseUrl}/resume.html`, lastModified, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/cv.html`, lastModified, changeFrequency: 'monthly', priority: 0.5 },
  ];
}
