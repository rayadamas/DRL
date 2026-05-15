"use client";

import React, { useCallback, useMemo, useState } from "react";
import SectionHeading from "./section-heading";
import { projectsData } from "@/lib/data";
import { useSectionInView } from "@/lib/hooks";
import Image from "next/image";
import { motion } from "framer-motion";
import { HiArrowUpRight, HiChevronLeft, HiChevronRight } from "react-icons/hi2";

/** Wide landscape tile — matches “about 2×” prior card width within max-w-6xl */
const CARD_W_PX = 1024;
const CARD_H_PX = 380;

export default function Projects() {
  const { ref } = useSectionInView("Projects", 0.2);
  const n = projectsData.length;
  const [activeIndex, setActiveIndex] = useState(0);

  const goPrev = useCallback(() => {
    setActiveIndex((i) => (i - 1 + n) % n);
  }, [n]);

  const goNext = useCallback(() => {
    setActiveIndex((i) => (i + 1) % n);
  }, [n]);

  const stackOrder = useMemo(() => {
    const order: number[] = [];
    for (let d = 0; d < n; d++) {
      order.push((activeIndex + d) % n);
    }
    return order;
  }, [activeIndex, n]);

  return (
    <section ref={ref} id="projects" className="scroll-mt-28 mb-28 sm:mb-40">
      <div className="max-w-6xl mx-auto px-4">
        <SectionHeading>Projects</SectionHeading>

        <motion.div
          className="relative flex flex-col items-center"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          role="region"
          aria-label="Project cards"
          aria-roledescription="carousel"
        >
          <div className="flex items-center justify-center gap-3 sm:gap-6 mb-10 w-full max-w-2xl mx-auto">
            <button
              type="button"
              aria-label="Previous project"
              onClick={goPrev}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-swiss-card border border-swiss-border text-swiss-text shadow-sm hover:border-swiss-accent hover:text-swiss-accent transition-colors"
            >
              <HiChevronLeft className="w-6 h-6" aria-hidden />
            </button>

            <p className="text-center flex-1 min-w-0 text-xs sm:text-sm text-swiss-text-secondary font-sans tabular-nums">
              {activeIndex + 1} / {n}
            </p>

            <button
              type="button"
              aria-label="Next project"
              onClick={goNext}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-swiss-card border border-swiss-border text-swiss-text shadow-sm hover:border-swiss-accent hover:text-swiss-accent transition-colors"
            >
              <HiChevronRight className="w-6 h-6" aria-hidden />
            </button>
          </div>

          <div className="relative mx-auto w-full max-w-[min(100%,956px)] min-h-[min(540px,calc(100vh-10rem))]">
            <div
              className="relative mx-auto pt-6"
              style={{ height: CARD_H_PX + 52 }}
            >
              {stackOrder.map((projectIndex, pilePosition) => {
                const project = projectsData[projectIndex];
                const isTop = pilePosition === 0;
                const depth = pilePosition;

                return (
                  <motion.article
                    key={project.title}
                    initial={false}
                    animate={{
                      x: depth * 18,
                      y: depth * -16,
                      rotate: 0,
                      scale: 1 - depth * 0.032,
                      zIndex: n - depth,
                      opacity: Math.max(0.5, 1 - depth * 0.09),
                      filter: depth > 0 ? "brightness(0.92)" : "brightness(1)",
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 34,
                      mass: 0.85,
                    }}
                    style={{
                      position: "absolute",
                      left: 0,
                      right: 0,
                      top: 0,
                      margin: "0 auto",
                      width: "100%",
                      maxWidth: `${CARD_W_PX}px`,
                      height: `${CARD_H_PX}px`,
                      transformOrigin: "center center",
                      pointerEvents: isTop ? "auto" : "none",
                    }}
                    className={`rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/10 ${
                      isTop ? "ring-2 ring-swiss-accent/40" : "ring-white/5"
                    }`}
                  >
                    {/* Screenshot + dim overlay (portfolio tile convention) */}
                    <div className="absolute inset-0 bg-neutral-950">
                      <Image
                        src={project.imageUrl}
                        alt={isTop ? `${project.title} screenshot` : ""}
                        fill
                        className="object-cover object-top"
                        sizes="(max-width: 768px) 100vw, 920px"
                        priority={isTop}
                      />
                      <div
                        className="absolute inset-0 bg-neutral-950/55"
                        aria-hidden
                      />
                      <div
                        className="absolute inset-0 bg-gradient-to-t from-black via-black/75 to-black/35"
                        aria-hidden
                      />
                    </div>

                    {/* Content */}
                    <div className="relative z-[1] flex h-full flex-col p-7 sm:p-8 pb-7 justify-between text-white">
                      {isTop ? (
                        <div className="flex justify-end gap-2 shrink-0">
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-colors"
                            aria-label={`${project.title} — GitHub repository`}
                          >
                            <HiArrowUpRight
                              className="w-[1.15rem] h-[1.15rem]"
                              aria-hidden
                            />
                          </a>
                          {project.liveLink ? (
                            <a
                              href={project.liveLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex h-10 min-w-10 px-3 items-center justify-center rounded-xl bg-white/10 border border-white/20 text-xs font-semibold uppercase tracking-wide text-white hover:bg-swiss-accent hover:border-swiss-accent transition-colors"
                              aria-label={`${project.title} — live site`}
                            >
                              Live
                            </a>
                          ) : null}
                        </div>
                      ) : (
                        <div className="shrink-0 h-10" aria-hidden />
                      )}

                      <div className="flex-1 flex flex-col justify-end min-h-0">
                        <h3 className="font-bold tracking-tight text-2xl sm:text-3xl md:text-[1.75rem] leading-tight mb-3 drop-shadow-sm [text-shadow:0_1px_12px_rgba(0,0,0,0.45)]">
                          {project.title}
                        </h3>
                        <p className="text-sm sm:text-base text-white/90 leading-relaxed line-clamp-4 mb-6 max-w-[42rem] drop-shadow-sm [text-shadow:0_1px_8px_rgba(0,0,0,0.35)]">
                          {project.description}
                        </p>

                        <div className="flex flex-wrap gap-x-2 gap-y-2 items-center pt-4 border-t border-white/15">
                          {project.tags.map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-white/90 px-2.5 py-1 rounded-md border border-white/20 bg-black/25"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
