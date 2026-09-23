export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://sportsmedia.world').replace(/\/$/, '');

export const PUBLIC_ROUTES = [
  '',
  '/about',
  '/athletes',
  '/clubs',
  '/contact',
  '/events',
  '/gallery',
  '/initiatives',
  '/jobs',
  '/journalism',
  '/livestream',
  '/news',
  '/scholarship',
  '/sports',
  '/youtube',
] as const;

// Authenticated app surfaces: never indexed, never crawled.
export const PRIVATE_ROUTE_PREFIXES = ['/login', '/admin', '/coach', '/school', '/sponsor', '/student'] as const;
