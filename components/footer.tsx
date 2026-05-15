"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HiShieldCheck, HiXMark } from "react-icons/hi2";

export default function Footer() {
  const year = new Date().getFullYear();
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleClick = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open]);

  return (
    <footer className="border-t border-swiss-border px-4 py-10">
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-6 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
        <p className="swiss-label order-1 text-center text-swiss-text-secondary sm:order-none sm:flex-1 sm:text-left">
          &copy; {year} Diamond Ray Louden
        </p>

        <div
          ref={wrapperRef}
          className="relative order-2 sm:order-none sm:flex sm:shrink-0 sm:justify-center"
        >
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            aria-expanded={open}
            aria-haspopup="dialog"
            aria-controls="privacy-statement"
            className="group inline-flex items-center gap-1.5 rounded-full border border-swiss-border bg-swiss-card px-3.5 py-1.5 text-xs font-medium text-swiss-text-secondary transition-colors hover:border-swiss-accent hover:text-swiss-accent"
          >
            <HiShieldCheck
              className="h-3.5 w-3.5 opacity-80 group-hover:opacity-100"
              aria-hidden
            />
            Privacy Statement
          </button>

          <AnimatePresence>
            {open && (
              <motion.div
                key="privacy-popover"
                id="privacy-statement"
                role="dialog"
                aria-modal="true"
                aria-label="Privacy statement"
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                transition={{
                  duration: 0.18,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="absolute bottom-full left-1/2 z-50 mb-3 w-[min(92vw,22rem)] origin-bottom -translate-x-1/2"
              >
                <div className="relative rounded-xl border border-swiss-border bg-swiss-card p-5 text-left shadow-xl">
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    aria-label="Close privacy statement"
                    className="absolute right-2.5 top-2.5 flex h-7 w-7 items-center justify-center rounded-full text-swiss-text-secondary transition-colors hover:bg-swiss-text/5 hover:text-swiss-accent"
                  >
                    <HiXMark className="h-4 w-4" aria-hidden />
                  </button>

                  <div className="mb-3 flex items-center gap-2">
                    <HiShieldCheck
                      className="h-4 w-4 text-swiss-accent"
                      aria-hidden
                    />
                    <h2 className="swiss-label text-swiss-text">
                      Privacy &amp; honesty
                    </h2>
                  </div>

                  <div className="space-y-3 text-xs leading-relaxed text-swiss-text-secondary">
                    <p>
                      I&rsquo;m a real person—this isn&rsquo;t a trap or a
                      scraper impersonating someone. I&rsquo;m not here to take
                      your ideas, passwords, or personal data, and I
                      don&rsquo;t sell or rent visitor information.
                    </p>
                    <p>
                      This portfolio is mostly static. There&rsquo;s no account
                      system, no contact form that POSTs to my server, and no
                      sketchy embeds. The contact block is a plain{" "}
                      <code className="rounded bg-swiss-text/5 px-1 py-0.5 text-[0.7rem] text-swiss-text">
                        mailto:
                      </code>{" "}
                      link—nothing on this site captures what you type there.
                    </p>
                    <p>
                      If the site is hosted on Vercel, I may use their
                      privacy-focused Web Analytics for aggregate page views
                      only—think “how many people showed up,” not
                      fingerprinting or ad targeting.
                    </p>
                    <p>
                      Standard server logs exist like everywhere else on the
                      web; I don&rsquo;t use them to track individuals or build
                      profiles on you.
                    </p>
                    <p className="border-t border-swiss-border/60 pt-1">
                      Questions?{" "}
                      <a
                        href="mailto:diamondlouden@gmail.com"
                        className="font-medium text-swiss-accent hover:underline"
                      >
                        diamondlouden@gmail.com
                      </a>
                    </p>
                  </div>

                  <p className="mt-4 text-[10px] uppercase tracking-wider text-swiss-text-secondary/70">
                    &mdash; Diamond, {year}
                  </p>

                  <div
                    aria-hidden
                    className="absolute -bottom-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-b border-r border-swiss-border bg-swiss-card"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <p className="order-3 text-center text-xs text-swiss-text-secondary sm:order-none sm:flex-1 sm:text-right">
          Built with Next.js, TypeScript, Tailwind &amp; Framer Motion
        </p>
      </div>
    </footer>
  );
}
