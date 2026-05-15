"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";

export default function Contact() {
  const { ref } = useSectionInView("Contact");

  return (
    <motion.section
      id="contact"
      ref={ref}
      className="mb-20 sm:mb-28 max-w-xl mx-auto px-4 scroll-mt-28"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <SectionHeading>Contact</SectionHeading>

      <p className="text-center text-swiss-text-secondary mb-8 swiss-body">
        Reach out directly at{" "}
        <a
          className="text-swiss-accent hover:underline font-medium"
          href="mailto:diamondlouden@gmail.com"
        >
          diamondlouden@gmail.com
        </a>
        .
      </p>
    </motion.section>
  );
}
