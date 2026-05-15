"use client";
import React from "react";
import { motion } from "framer-motion";
import { links } from "@/lib/data";
import Link from "next/link";
import clsx from "clsx";
import { useActiveSectionContext } from "@/context/active-section-context";

export default function Header() {
  const { activeSection, setActiveSection, setTimeOfLastClick } =
    useActiveSectionContext();

  return (
    <header className="z-[999] fixed top-0 left-0 right-0 flex justify-center pt-4 sm:pt-6 px-2">
      <motion.nav
        className="px-1.5 sm:px-3 py-1.5 sm:py-2 bg-swiss-bg/70 backdrop-blur-md border border-swiss-border/50 rounded-full max-w-full overflow-x-auto"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <ul className="flex items-center gap-0 sm:gap-0.5 text-[0.7rem] sm:text-[0.85rem] font-medium text-swiss-text-secondary">
          {links.map((link, index) => (
            <motion.li
              key={link.hash}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
            >
              <Link
                className={clsx(
                  "relative px-2 sm:px-3 py-1 sm:py-1.5 rounded-full block transition-all duration-200 whitespace-nowrap",
                  {
                    "text-swiss-text": activeSection === link.name,
                    "hover:text-swiss-text": activeSection !== link.name,
                  }
                )}
                href={link.hash}
                onClick={() => {
                  setActiveSection(link.name);
                  setTimeOfLastClick(Date.now());
                }}
              >
                {link.name === activeSection && (
                  <motion.span
                    className="absolute inset-0 bg-swiss-accent/25 rounded-full -z-10"
                    layoutId="activeSection"
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 30,
                    }}
                  />
                )}
                {link.name}
              </Link>
            </motion.li>
          ))}
        </ul>
      </motion.nav>
    </header>
  );
}
