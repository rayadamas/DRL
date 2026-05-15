"use client";

import dynamic from "next/dynamic";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ThemeSwitch from "@/components/theme-switch";
import { Toaster } from "react-hot-toast";
import ActiveSectionContextProvider from "@/context/active-section-context";
import ThemeContextProvider from "@/context/theme-content";

const GradientBackground = dynamic(
  () => import("@/components/gradient-background"),
  { ssr: false }
);

export default function LayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeContextProvider>
      <GradientBackground />

      <ActiveSectionContextProvider>
        <Header />
        {children}
        <Footer />
        <ThemeSwitch />
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "var(--color-card)",
              color: "var(--color-text)",
              border: "1px solid var(--color-border)",
            },
          }}
        />
      </ActiveSectionContextProvider>
    </ThemeContextProvider>
  );
}
