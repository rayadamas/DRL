"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { useSectionInView } from "@/lib/hooks";
import {
  industryValueData,
  industryValueTotal,
} from "@/lib/product-data";
import { motion } from "framer-motion";

export default function PortfolioValue() {
  const { ref } = useSectionInView("Portfolio", 0.3);

  return (
    <section
      id="portfolio"
      ref={ref}
      className="mb-28 max-w-5xl mx-auto px-4 scroll-mt-28 sm:mb-40"
    >
      <SectionHeading>Portfolio influenced</SectionHeading>
      <p className="text-center text-swiss-text-secondary swiss-body text-sm mb-8 max-w-xl mx-auto">
        Modeled lifetime value influenced by industry — how engagement spans
        sectors over time, not a claim of cash booked.
      </p>

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {industryValueData.map((row, index) => (
          <motion.li
            key={row.industry}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="rounded-xl border border-swiss-border bg-swiss-card p-5 hover:border-swiss-accent transition-colors"
          >
            <p className="swiss-heading text-base leading-snug mb-3">
              {row.industry}
            </p>
            <div className="flex items-end justify-between gap-3">
              <span className="swiss-label text-swiss-text-secondary">
                {row.years}
              </span>
              <span className="text-xl font-semibold text-swiss-accent tracking-tight">
                {row.value}
              </span>
            </div>
          </motion.li>
        ))}
      </ul>

      <p className="mt-8 text-center text-sm text-swiss-text-secondary">
        Total modeled portfolio value influenced across industries{" "}
        <span className="text-swiss-text font-semibold">{industryValueTotal}</span>
      </p>
    </section>
  );
}
