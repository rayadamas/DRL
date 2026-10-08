"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { useSectionInView } from "@/lib/hooks";
import { raciData } from "@/lib/product-data";
import { motion } from "framer-motion";

const COLS = [
  { key: "r" as const, label: "Responsible" },
  { key: "a" as const, label: "Accountable" },
  { key: "c" as const, label: "Consulted" },
  { key: "i" as const, label: "Informed" },
];

export default function Raci() {
  const { ref } = useSectionInView("Engage", 0.3);

  return (
    <section
      id="engage"
      ref={ref}
      className="mb-28 max-w-6xl mx-auto px-4 scroll-mt-28 sm:mb-40"
    >
      <SectionHeading>How I engage</SectionHeading>
      <p className="text-center text-swiss-text-secondary swiss-body text-sm mb-8 max-w-2xl mx-auto">
        Bring me in where discovery, identity risk, applied AI, or GTM
        automation needs an owner — not a spectator.
      </p>

      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto rounded-xl border border-swiss-border bg-swiss-card">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-swiss-border bg-swiss-text/[0.03]">
              <th className="px-4 py-3 swiss-label text-swiss-text-secondary font-medium">
                Domain
              </th>
              {COLS.map((col) => (
                <th
                  key={col.key}
                  className="px-4 py-3 swiss-label text-swiss-accent font-medium"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {raciData.map((row) => (
              <tr
                key={row.domain}
                className="border-b border-swiss-border/60 last:border-0"
              >
                <td className="px-4 py-4 font-medium text-swiss-text align-top w-[18%]">
                  {row.domain}
                </td>
                {COLS.map((col) => (
                  <td
                    key={col.key}
                    className="px-4 py-4 text-swiss-text-secondary leading-relaxed align-top"
                  >
                    {row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile stacked cards */}
      <ul className="md:hidden space-y-4">
        {raciData.map((row, index) => (
          <motion.li
            key={row.domain}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: index * 0.05 }}
            className="rounded-xl border border-swiss-border bg-swiss-card p-5"
          >
            <h3 className="swiss-heading text-base mb-4">{row.domain}</h3>
            <dl className="space-y-3">
              {COLS.map((col) => (
                <div key={col.key}>
                  <dt className="swiss-label text-swiss-accent mb-1">
                    {col.label}
                  </dt>
                  <dd className="text-sm text-swiss-text-secondary leading-relaxed">
                    {row[col.key]}
                  </dd>
                </div>
              ))}
            </dl>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
