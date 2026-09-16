import "./globals.css";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import LayoutClient from "@/components/layout-client";

const SITE_URL = "https://drl.bio";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Diamond Ray Louden | Personal Portfolio",
    template: "%s | Diamond Ray Louden",
  },
  description:
    "Personal portfolio of Diamond Ray Louden — applied AI, React, Next.js, and systems that ship. Chicago-based multidisciplinary builder.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "Diamond Ray Louden | Personal Portfolio",
    description:
      "Applied AI, React, Next.js, and systems that ship. Personal portfolio of Diamond Ray Louden.",
    siteName: "drl.bio",
  },
  twitter: {
    card: "summary",
    title: "Diamond Ray Louden | Personal Portfolio",
    description:
      "Applied AI, React, Next.js, and systems that ship. Personal portfolio of Diamond Ray Louden.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark !scroll-smooth" suppressHydrationWarning>
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} font-sans text-swiss-text relative pt-28 sm:pt-36`}
      >
        <LayoutClient>{children}</LayoutClient>
        <Analytics />
      </body>
    </html>
  );
}
