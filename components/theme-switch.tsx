"use client";

import React from "react";
import { BsMoon, BsSun } from "react-icons/bs";
import { useTheme } from "@/context/theme-content";

export default function ThemeSwitch() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      className="fixed bottom-6 right-6 z-[998] w-11 h-11 flex items-center justify-center rounded-full bg-swiss-card border border-swiss-border text-swiss-text-secondary hover:border-swiss-accent hover:text-swiss-accent transition-all duration-300 hover:scale-110"
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      {theme === "light" ? <BsSun className="w-5 h-5" /> : <BsMoon className="w-5 h-5" />}
    </button>
  );
}
