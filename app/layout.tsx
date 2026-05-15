import "./globals.css";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import LayoutClient from "@/components/layout-client";

export const metadata = {
  title: "Diamond Ray Louden | Personal Portfolio",
  description:
    "Diamond Ray Louden is a professional with 11 years of experience across retail, healthcare, and tech industries.",
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
      </body>
    </html>
  );
}
