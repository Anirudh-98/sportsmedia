import type { MetadataRoute } from 'next';
import { SITE_URL, PRIVATE_ROUTE_PREFIXES } from '@/lib/seo';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [...PRIVATE_ROUTE_PREFIXES],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
