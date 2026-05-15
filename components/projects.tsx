"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { projectsData } from "@/lib/data";
import { useSectionInView } from "@/lib/hooks";
import Image from "next/image";
import { motion } from "framer-motion";
import { HiArrowUpRight } from "react-icons/hi2";

export default function Projects() {
  const { ref } = useSectionInView("Projects", 0.2);

  return (
    <section ref={ref} id="projects" className="scroll-mt-28 mb-28 sm:mb-40">
      <div className="max-w-6xl mx-auto px-4">
        <SectionHeading>Projects</SectionHeading>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[280px]">
          {projectsData.map((project, index) => (
            <BentoCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

type ProjectType = (typeof projectsData)[number];

function BentoCard({ project, index }: { project: ProjectType; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      viewport={{ once: true }}
      className="group relative overflow-hidden rounded-2xl bg-swiss-card border border-swiss-border hover:border-swiss-accent transition-all duration-300"
    >
      {/* Background Image or Gradient */}
      {project.imageUrl ? (
        <div className="absolute inset-0">
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            className="object-cover object-top opacity-50 dark:opacity-30 group-hover:opacity-60 dark:group-hover:opacity-40 group-hover:scale-105 transition-all duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-swiss-card via-swiss-card/60 to-transparent dark:via-swiss-card/80" />
        </div>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-swiss-accent/10 via-transparent to-swiss-bg-secondary" />
      )}

      {/* Content */}
      <div className="relative h-full p-6 flex flex-col justify-end">

        {/* External Link */}
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-swiss-text/5 flex items-center justify-center hover:bg-swiss-accent hover:text-white transition-all duration-300 group-hover:scale-110"
          >
            <HiArrowUpRight className="w-4 h-4" />
          </a>
        )}

        {/* Title */}
        <h3 className="swiss-heading text-xl md:text-2xl mb-2 group-hover:text-swiss-accent transition-colors">
          {project.title}
        </h3>

        {/* Description */}
        <p className="swiss-body text-swiss-text-secondary text-sm mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag, tagIndex) => (
            <span
              key={tagIndex}
              className="px-3 py-1 text-xs font-medium bg-swiss-text/5 rounded-full text-swiss-text-secondary"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Hover Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-swiss-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </motion.div>
  );
}
