"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { HiArrowUpRight, HiGlobeAlt, HiXMark } from "react-icons/hi2";
import type { ProjectData } from "@/lib/data";
import { acronymTooltip } from "@/lib/acronyms";

const FOCUSABLE =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

function useIsSmallScreen() {
  const [small, setSmall] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setSmall(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return small;
}

export default function ProjectPanel({
  project,
  onClose,
}: {
  project: ProjectData | null;
  onClose: () => void;
}) {
  const small = useIsSmallScreen();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const isOpen = project !== null;

  useEffect(() => {
    if (!isOpen) return;
    const opener = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;
      const focusable = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = previousOverflow;
      opener?.focus?.();
    };
  }, [isOpen, onClose]);

  const hidden = small ? { y: "100%" } : { x: "100%" };
  const shown = small ? { y: 0 } : { x: 0 };

  return (
    <AnimatePresence>
      {project ? (
        <motion.div key="project-panel" className="fixed inset-0 z-[1000]">
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-panel-title"
            initial={hidden}
            animate={shown}
            exit={hidden}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
            className="absolute flex flex-col overflow-y-auto border-swiss-border bg-swiss-card shadow-2xl inset-x-0 bottom-0 max-h-[88vh] rounded-t-2xl border-t md:inset-y-0 md:left-auto md:right-0 md:max-h-none md:w-[min(36rem,100%)] md:rounded-none md:border-l md:border-t-0"
          >
            <div className="relative aspect-[16/9] w-full shrink-0 overflow-hidden">
              <Image
                src={project.imageUrl}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, 576px"
                className={`object-cover ${project.imagePosition ?? "object-[center_40%]"}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-swiss-card via-swiss-card/30 to-transparent" />
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close project details"
                className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-swiss-border bg-swiss-bg/80 text-swiss-text backdrop-blur transition-colors hover:border-swiss-accent hover:text-swiss-accent"
              >
                <HiXMark className="h-5 w-5" aria-hidden />
              </button>
            </div>

            <div className="flex flex-col gap-6 px-6 pb-8 pt-2 sm:px-8">
              <div>
                <span
                  className={`inline-block px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-full border ${
                    project.role === "creator"
                      ? "border-swiss-accent/40 bg-swiss-accent/10 text-swiss-accent"
                      : "border-swiss-border bg-swiss-text/5 text-swiss-text-secondary"
                  }`}
                >
                  {project.role === "creator" ? "Creator" : "Collaborator"}
                </span>
                <h2
                  id="project-panel-title"
                  className="swiss-heading mt-3 text-2xl sm:text-3xl"
                >
                  {project.title}
                </h2>
                <p className="swiss-body mt-3 text-sm text-swiss-text-secondary">
                  {project.description}
                </p>
              </div>

              {project.caseStudy ? (
                <dl className="flex flex-col gap-5">
                  <CaseStudyBlock label="The problem" text={project.caseStudy.problem} />
                  <CaseStudyBlock label="The approach" text={project.caseStudy.approach} />
                  {project.caseStudy.outcome ? (
                    <CaseStudyBlock label="The outcome" text={project.caseStudy.outcome} />
                  ) : null}
                </dl>
              ) : null}

              <div className="flex flex-wrap gap-2">
                {project.industries.map((industry) => (
                  <span
                    key={industry}
                    title={acronymTooltip(industry)}
                    className="px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide rounded-full border border-swiss-border/70 text-swiss-text-secondary"
                  >
                    {industry}
                  </span>
                ))}
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    title={acronymTooltip(tag)}
                    className="px-3 py-1 text-xs font-medium bg-swiss-text/5 rounded-full text-swiss-text-secondary"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {project.liveLink || project.link ? (
                <div className="flex flex-wrap gap-3">
                  {project.liveLink ? (
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-swiss-text px-5 py-2.5 text-sm font-medium text-swiss-bg transition-colors hover:bg-swiss-accent"
                    >
                      <HiGlobeAlt className="h-4 w-4" aria-hidden />
                      Visit live site
                    </a>
                  ) : null}
                  {project.link ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-swiss-border px-5 py-2.5 text-sm font-medium text-swiss-text transition-colors hover:border-swiss-accent hover:text-swiss-accent"
                    >
                      <HiArrowUpRight className="h-4 w-4" aria-hidden />
                      {linkLabel(project.link)}
                    </a>
                  ) : null}
                </div>
              ) : null}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function CaseStudyBlock({ label, text }: { label: string; text: string }) {
  return (
    <div>
      <dt className="swiss-label text-swiss-accent">{label}</dt>
      <dd className="swiss-body mt-1.5 text-sm text-swiss-text">{text}</dd>
    </div>
  );
}

function linkLabel(url: string) {
  try {
    const host = new URL(url).hostname.replace(/^www\./, "");
    if (host === "github.com") return "View on GitHub";
    if (host === "linkedin.com") return "View on LinkedIn";
    return `Open on ${host}`;
  } catch {
    return "Open project";
  }
}
