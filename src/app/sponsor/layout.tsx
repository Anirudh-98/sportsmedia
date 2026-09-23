import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sponsor Portal',
  robots: { index: false, follow: false },
};

export default function SponsorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
