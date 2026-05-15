import React from "react";

export default function Footer() {
  return (
    <footer className="py-10 px-4 border-t border-swiss-border">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="swiss-label text-swiss-text-secondary">
          &copy; {new Date().getFullYear()} Diamond Ray Louden
        </p>
        <p className="text-xs text-swiss-text-secondary text-center sm:text-right">
          Built with Next.js, TypeScript, Tailwind & Framer Motion
        </p>
      </div>
    </footer>
  );
}
