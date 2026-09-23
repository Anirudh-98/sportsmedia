import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteShell } from "@/components/layout/SiteShell";
import { AuthProvider } from "@/context/AuthContext";
import { SITE_URL } from "@/lib/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const title = "SPORTSMEDIA.WORLD | Sports Media Blue Zone - Grassroots Sports Portal";
const description =
  "The Digital Gateway to Sports Talent. School, College & Grassroots Sports ecosystem to Identify, Nurture, Promote, and Empower student athletes, PET masters, and coaches.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: title,
    template: "%s | SportsMedia.World",
  },
  description,
  keywords: [
    "Sports Media Blue Zone",
    "SportsMedia.World",
    "School Sports India",
    "Grassroots Sports",
    "College Athletics",
    "PET Masters",
    "Sports Scholarships",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "SportsMedia.World",
    title,
    description,
    images: [{ url: "/bluezonelogo.webp" }],
  },
  twitter: {
    card: "summary",
    title,
    description,
    images: ["/bluezonelogo.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/bluezonelogo.webp", type: "image/webp" },
      { url: "/icon.webp", type: "image/webp" },
    ],
    shortcut: "/bluezonelogo.webp",
    apple: "/bluezonelogo.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
    >
      <head>
        <link rel="icon" href="/bluezonelogo.webp" type="image/webp" />
        <link rel="shortcut icon" href="/bluezonelogo.webp" type="image/webp" />
        <link rel="apple-touch-icon" href="/bluezonelogo.webp" />
      </head>
      <body className="min-h-full flex flex-col bg-[#f8fafc] text-slate-900">
        <AuthProvider>
          <SiteShell>{children}</SiteShell>
        </AuthProvider>
      </body>
    </html>
  );
}
