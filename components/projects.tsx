"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { projectsData } from "@/lib/data";
import { useSectionInView } from "@/lib/hooks";
import Image from "next/image";
import { motion } from "framer-motion";
import { HiArrowUpRight, HiGlobeAlt } from "react-icons/hi2";

export default function Projects() {
  const { ref } = useSectionInView("Projects", 0.2);

  return (
    <section ref={ref} id="projects" className="scroll-mt-28 mb-28 sm:mb-40">
      <div className="max-w-6xl mx-auto px-4">
        <SectionHeading>Projects</SectionHeading>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 auto-rows-[minmax(280px,auto)]">
          {projectsData.map((project, index) => (
            <BentoCard key={project.id ?? project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

type ProjectType = (typeof projectsData)[number];

function isGithubHostname(url: string): boolean {
  try {
    const host = new URL(url).hostname.replace(/^www\./, "");
    return host === "github.com";
  } catch {
    return false;
  }
}

function BentoCard({
  project,
  index,
}: {
  project: ProjectType;
  index: number;
}) {
  const hasActions = !!(project.liveLink ?? project.link);
  const githubPrimary =
    !!project.link && isGithubHostname(project.link);
  const externalPrimary = !!project.link && !githubPrimary;

  const gridSpan =
    project.spanClass ?? "sm:col-span-1 lg:col-span-4";
  const imagePosition = project.imagePosition ?? "object-[center_40%]";
  const isFeatured = !!project.spanClass;

  return (
    <div className={`min-w-0 h-full min-h-[280px] ${gridSpan}`}>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.45, delay: index * 0.08 }}
        viewport={{ once: true }}
        className="group relative h-full min-h-0 overflow-hidden rounded-2xl bg-swiss-card border border-swiss-border hover:border-swiss-accent transition-all duration-300"
      >
        <div className="absolute inset-0">
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            className={`object-cover ${imagePosition} opacity-50 dark:opacity-30 group-hover:opacity-60 dark:group-hover:opacity-40 group-hover:scale-105 transition-all duration-500`}
            sizes={
              isFeatured
                ? "(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 800px"
                : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
            }
          />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-2/5 bg-gradient-to-b from-swiss-card from-10% via-swiss-card/70 to-transparent dark:from-swiss-card dark:via-swiss-card/75" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-swiss-card via-swiss-card/60 to-transparent dark:via-swiss-card/80" />
        </div>

        <div className="relative z-[1] flex h-full min-h-0 flex-col justify-end p-6">
          {hasActions ? (
            <div className="absolute top-4 right-4 z-[2] flex items-center gap-2">
              {project.liveLink ? (
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-swiss-text/5 flex items-center justify-center hover:bg-swiss-accent hover:text-white transition-all duration-300 text-swiss-text-secondary group-hover:scale-105 border border-swiss-border/50"
                  aria-label={
                    project.title === "Clausura"
                      ? "Clausura about (live)"
                      : `${project.title} live demo`
                  }
                >
                  <HiGlobeAlt className="w-4 h-4" aria-hidden />
                </a>
              ) : null}
              {githubPrimary && project.link ? (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-swiss-text/5 flex items-center justify-center hover:bg-swiss-accent hover:text-white transition-all duration-300 group-hover:scale-110 border border-swiss-border/50"
                  aria-label={`${project.title} on GitHub`}
                >
                  <HiArrowUpRight className="w-4 h-4" aria-hidden />
                </a>
              ) : null}
              {externalPrimary && project.link ? (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-swiss-text/5 flex items-center justify-center hover:bg-swiss-accent hover:text-white transition-all duration-300 group-hover:scale-110 border border-swiss-border/50"
                  aria-label={`Open project: ${project.title}`}
                >
                  <HiGlobeAlt className="w-4 h-4" aria-hidden />
                </a>
              ) : null}
            </div>
          ) : null}

          <h3 className="swiss-heading text-xl md:text-2xl mb-2 group-hover:text-swiss-accent transition-colors">
            {project.title}
          </h3>

          <p className="swiss-body text-swiss-text-secondary text-sm mb-4">
            {project.description}
          </p>

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

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-swiss-accent/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </motion.div>
    </div>
  );
}
