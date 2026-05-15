"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { experiencesData } from "@/lib/data";
import { useSectionInView } from "@/lib/hooks";
import { motion } from "framer-motion";
import { HiAcademicCap, HiBriefcase } from "react-icons/hi2";

export default function Experience() {
  const { ref } = useSectionInView("Experience");

  return (
    <section id="experience" ref={ref} className="scroll-mt-28 mb-28 sm:mb-40">
      <div className="max-w-6xl mx-auto px-4">
        <SectionHeading>Experience</SectionHeading>

        {/* Horizontal Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute top-[2.25rem] left-0 right-0 h-px bg-swiss-border hidden md:block" />

          {/* Timeline items */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-4">
            {experiencesData.map((item, index) => (
              <TimelineItem key={index} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

type ExperienceType = (typeof experiencesData)[number];

function TimelineItem({
  item,
  index,
}: {
  item: ExperienceType;
  index: number;
}) {
  const isEducation = item.type === "education";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="relative"
    >
      {/* Timeline node */}
      <div className="hidden md:flex justify-center mb-4">
        <div className="w-10 h-10 rounded-full bg-swiss-card border-2 border-swiss-border flex items-center justify-center z-10 group-hover:border-swiss-accent transition-colors">
          {isEducation ? (
            <HiAcademicCap className="w-4 h-4 text-swiss-accent" />
          ) : (
            <HiBriefcase className="w-4 h-4 text-swiss-accent" />
          )}
        </div>
      </div>

      {/* Content Card */}
      <div className="group p-5 rounded-xl bg-swiss-card border border-swiss-border hover:border-swiss-accent transition-all duration-300 h-full">
        {/* Mobile icon */}
        <div className="flex md:hidden items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-full bg-swiss-accent/10 flex items-center justify-center">
            {isEducation ? (
              <HiAcademicCap className="w-4 h-4 text-swiss-accent" />
            ) : (
              <HiBriefcase className="w-4 h-4 text-swiss-accent" />
            )}
          </div>
          <span className="swiss-label text-swiss-accent">{item.date}</span>
        </div>

        {/* Date - Desktop */}
        <span className="hidden md:block swiss-label text-swiss-accent mb-2">
          {item.date}
        </span>

        {/* Title */}
        <h3 className="swiss-heading text-base mb-1 group-hover:text-swiss-accent transition-colors">
          {item.title}
        </h3>

        {/* Company */}
        <p className="text-sm text-swiss-text-secondary font-medium mb-2">
          {item.company}
        </p>

        {/* Description */}
        <p className="text-xs text-swiss-text-secondary leading-relaxed">
          {item.description}
        </p>
      </div>
    </motion.div>
  );
}
