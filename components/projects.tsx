"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import SectionHeading from "./section-heading";
import ProjectPanel from "./project-panel";
import { projectsData, type ProjectData } from "@/lib/data";
import { useSectionInView } from "@/lib/hooks";
import { acronymTooltip } from "@/lib/acronyms";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { HiArrowUpRight, HiGlobeAlt } from "react-icons/hi2";
import { track } from "@vercel/analytics";

const INITIAL_VISIBLE = 6;
const HASH_PREFIX = "#project-";

type Filter =
  | { kind: "all" }
  | { kind: "role"; value: ProjectData["role"] }
  | { kind: "industry"; value: string };

function projectKey(project: ProjectData) {
  return project.id ?? project.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

function matches(project: ProjectData, filter: Filter) {
  if (filter.kind === "role") return project.role === filter.value;
  if (filter.kind === "industry") return project.industries.includes(filter.value);
  return true;
}

function sameFilter(a: Filter, b: Filter) {
  return a.kind === b.kind && ("value" in a ? a.value : "") === ("value" in b ? b.value : "");
}

const INDUSTRIES = (() => {
  const counts = new Map<string, number>();
  projectsData.forEach((project) =>
    project.industries.forEach((industry) =>
      counts.set(industry, (counts.get(industry) ?? 0) + 1),
    ),
  );
  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([industry]) => industry);
})();

const FILTERS: { label: string; filter: Filter }[] = [
  { label: "All", filter: { kind: "all" } },
  { label: "Creator", filter: { kind: "role", value: "creator" } },
  { label: "Collaborator", filter: { kind: "role", value: "collaborator" } },
  ...INDUSTRIES.map((industry) => ({
    label: industry,
    filter: { kind: "industry", value: industry } as Filter,
  })),
];

export default function Projects() {
  const { ref } = useSectionInView("Projects", 0.2);
  const [filter, setFilter] = useState<Filter>({ kind: "all" });
  const [showAll, setShowAll] = useState(false);
  const [openKey, setOpenKey] = useState<string | null>(null);

  const filtered = useMemo(
    () => projectsData.filter((project) => matches(project, filter)),
    [filter],
  );
  const collapsed = filter.kind === "all" && !showAll;
  const visible = collapsed ? filtered.slice(0, INITIAL_VISIBLE) : filtered;
  const openProject =
    projectsData.find((project) => projectKey(project) === openKey) ?? null;

  useEffect(() => {
    const syncFromHash = () => {
      const hash = window.location.hash;
      if (!hash.startsWith(HASH_PREFIX)) {
        setOpenKey(null);
        return;
      }
      const key = hash.slice(HASH_PREFIX.length);
      if (projectsData.some((project) => projectKey(project) === key)) {
        setOpenKey(key);
        document.getElementById("projects")?.scrollIntoView({ behavior: "instant" });
      }
    };
    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, []);

  const openPanel = useCallback((project: ProjectData) => {
    const key = projectKey(project);
    setOpenKey(key);
    window.history.replaceState(null, "", `${HASH_PREFIX}${key}`);
    track("project_opened", { id: key });
  }, []);

  const closePanel = useCallback(() => {
    setOpenKey(null);
    window.history.replaceState(null, "", "#projects");
  }, []);

  return (
    <section ref={ref} id="projects" className="scroll-mt-28 mb-24 sm:mb-32 w-full">
      <div className="max-w-6xl mx-auto px-4">
        <SectionHeading index={3}>Projects</SectionHeading>

        <div
          className="mb-8 flex flex-wrap justify-center gap-2"
          role="group"
          aria-label="Filter projects"
        >
          {FILTERS.map(({ label, filter: option }) => {
            const active = sameFilter(option, filter);
            return (
              <button
                key={label}
                type="button"
                aria-pressed={active}
                title={acronymTooltip(label)}
                onClick={() => setFilter(option)}
                className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
                  active
                    ? "border-swiss-accent bg-swiss-accent/15 text-swiss-text"
                    : "border-swiss-border bg-swiss-card text-swiss-text-secondary hover:border-swiss-accent/60 hover:text-swiss-text"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 auto-rows-[minmax(280px,auto)] grid-flow-row-dense"
        >
          <AnimatePresence mode="popLayout">
            {visible.map((project, index) => (
              <BentoCard
                key={projectKey(project)}
                project={project}
                index={index}
                onOpen={openPanel}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {filter.kind === "all" && filtered.length > INITIAL_VISIBLE ? (
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAll((prev) => !prev)}
              aria-expanded={showAll}
              className="rounded-full border border-swiss-border bg-swiss-card px-6 py-2.5 text-sm font-medium text-swiss-text transition-colors hover:border-swiss-accent hover:text-swiss-accent"
            >
              {showAll ? "Show fewer" : `Show all ${filtered.length} projects`}
            </button>
          </div>
        ) : null}
      </div>

      <ProjectPanel project={openProject} onClose={closePanel} />
    </section>
  );
}

function isGithubHostname(url: string): boolean {
  try {
    const host = new URL(url).hostname.replace(/^www\./, "");
    return host === "github.com";
  } catch {
    return false;
  }
}

const BentoCard = React.forwardRef<
  HTMLDivElement,
  {
    project: ProjectData;
    index: number;
    onOpen: (project: ProjectData) => void;
  }
>(function BentoCard({ project, index, onOpen }, ref) {
  const hasActions = !!(project.liveLink ?? project.link);
  const githubPrimary =
    !!project.link && isGithubHostname(project.link);
  const externalPrimary = !!project.link && !githubPrimary;

  const gridSpan =
    project.spanClass ?? "sm:col-span-1 lg:col-span-4";
  const imagePosition = project.imagePosition ?? "object-[center_40%]";
  const isFeatured = !!project.spanClass;

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.35, delay: Math.min(index, 6) * 0.04 }}
      className={`min-w-0 h-full min-h-[280px] ${gridSpan}`}
    >
      <div className="group relative h-full min-h-0 overflow-hidden rounded-2xl bg-swiss-card border border-swiss-border hover:border-swiss-accent transition-all duration-300">
        <div className="absolute inset-0">
          <Image
            src={project.imageUrl}
            alt=""
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

        <button
          type="button"
          onClick={() => onOpen(project)}
          aria-label={`Open details: ${project.title}`}
          className="absolute inset-0 z-[2] rounded-2xl focus-visible:outline-offset-[-2px]"
        />

        <div className="pointer-events-none relative z-[1] flex h-full min-h-0 flex-col justify-end p-6">
          {hasActions ? (
            <div className="pointer-events-auto absolute top-4 right-4 z-[3] flex items-center gap-2">
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

          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span
              className={`px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-full border ${
                project.role === "creator"
                  ? "border-swiss-accent/40 bg-swiss-accent/10 text-swiss-accent"
                  : "border-swiss-border bg-swiss-text/5 text-swiss-text-secondary"
              }`}
            >
              {project.role === "creator" ? "Creator" : "Collaborator"}
            </span>
          </div>

          <h3 className="swiss-heading text-xl md:text-2xl mb-2 group-hover:text-swiss-accent transition-colors">
            {project.title}
          </h3>

          <p className="swiss-body text-swiss-text-secondary text-sm mb-4">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.industries.map((industry) => (
              <span
                key={industry}
                className="px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide rounded-full border border-swiss-border/70 text-swiss-text-secondary"
              >
                {industry}
              </span>
            ))}
            {project.tags.map((tag, tagIndex) => (
              <span
                key={tagIndex}
                className="px-3 py-1 text-xs font-medium bg-swiss-text/5 rounded-full text-swiss-text-secondary"
              >
                {tag}
              </span>
            ))}
          </div>

          <span className="mt-4 text-xs font-medium text-swiss-text-secondary transition-colors group-hover:text-swiss-accent">
            View details &rarr;
          </span>
        </div>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-swiss-accent/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>
    </motion.div>
  );
});
