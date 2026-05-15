"use client";

import React from "react";
import { motion } from "framer-motion";
import SectionHeading from "./section-heading";
import { useSectionInView } from "@/lib/hooks";

export default function About() {
  const { ref } = useSectionInView("About");

  return (
    <motion.section
      ref={ref}
      className="mb-28 max-w-3xl mx-auto px-4 scroll-mt-28 sm:mb-40"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      id="about"
    >
      <SectionHeading>About</SectionHeading>

      <div className="space-y-6 swiss-body text-swiss-text-secondary leading-relaxed text-center">
        <p>
          With a strong background in{" "}
          <span className="text-swiss-text font-medium">
            business analysis, AI-driven strategy, and blockchain technology
          </span>
          , I thrive at the intersection of innovation and efficiency across{" "}
          <span className="text-swiss-text font-medium">
            retail, healthcare, CPG, and tech
          </span>
          .
        </p>

        <p>
          My core stack includes{" "}
          <span className="text-swiss-text font-medium">
            React, Next.js, JavaScript/TypeScript, and Solidity
          </span>
          . I am also familiar with Python and SQL, and I am currently developing
          an{" "}
          <span className="text-swiss-text font-medium">agentic blockchain</span>
          .
        </p>

        <p>
          Outside of work I analyze crypto markets, create music as a certified
          Audio Engineer &amp; DJ, and am learning{" "}
          <span className="text-swiss-text font-medium">
            how to be a better storyteller
          </span>
          .
        </p>
      </div>
    </motion.section>
  );
}
