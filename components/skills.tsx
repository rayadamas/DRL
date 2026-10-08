"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { skillsByCompetency } from "@/lib/product-data";
import { useSectionInView } from "@/lib/hooks";
import { motion } from "framer-motion";

export default function Skills() {
  const { ref } = useSectionInView("Skills");

  return (
    <section
      id="skills"
      ref={ref}
      className="mb-28 max-w-4xl mx-auto px-4 scroll-mt-28 sm:mb-40"
    >
      <SectionHeading>Skills</SectionHeading>
      <div className="space-y-8">
        {skillsByCompetency.map((group, groupIndex) => (
          <motion.div
            key={group.category}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: groupIndex * 0.04 }}
          >
            <h3 className="swiss-label text-swiss-accent mb-3 text-center sm:text-left">
              {group.category}
            </h3>
            <ul className="flex flex-wrap justify-center sm:justify-start gap-2.5">
              {group.skills.map((skill) => (
                <li
                  key={skill}
                  className="px-3.5 py-2 bg-swiss-card border border-swiss-border rounded-lg text-sm font-medium hover:border-swiss-accent hover:text-swiss-accent transition-all duration-300"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
