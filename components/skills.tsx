"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { skillsData } from "@/lib/data";
import { useSectionInView } from "@/lib/hooks";
import { motion } from "framer-motion";

const fadeInAnimationVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.03 * index,
      duration: 0.4,
    },
  }),
};

export default function Skills() {
  const { ref } = useSectionInView("Skills");

  return (
    <section
      id="skills"
      ref={ref}
      className="mb-28 max-w-4xl mx-auto px-4 scroll-mt-28 sm:mb-40"
    >
      <SectionHeading>Skills</SectionHeading>
      <ul className="flex flex-wrap justify-center gap-3">
        {skillsData.map((skill, index) => (
          <motion.li
            className="px-4 py-2.5 bg-swiss-card border border-swiss-border rounded-lg text-sm font-medium hover:border-swiss-accent hover:text-swiss-accent transition-all duration-300"
            key={index}
            variants={fadeInAnimationVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            custom={index}
          >
            {skill}
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
