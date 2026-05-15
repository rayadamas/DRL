"use client";

import React, { useCallback, useMemo, useState } from "react";
import SectionHeading from "./section-heading";
import { projectsData } from "@/lib/data";
import { useSectionInView } from "@/lib/hooks";
import Image from "next/image";
import { motion } from "framer-motion";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

const CARD_ROTATE_DEG = 33;

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
          <div className="flex items-center justify-center gap-3 sm:gap-6 mb-10 w-full max-w-xl mx-auto">
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

          <div
            className="relative mx-auto w-full max-w-[min(100%,420px)]"
            style={{
              perspective: "1100px",
              minHeight: "min(500px,calc(100vh - 11rem))",
            }}
          >
            <div className="relative h-[430px] w-full pt-6">
              {stackOrder.map((projectIndex, pilePosition) => {
                const project = projectsData[projectIndex];
                const isTop = pilePosition === 0;
                const depth = pilePosition;
                const alternatingTilt =
                  depth % 2 === 0 ? -CARD_ROTATE_DEG : CARD_ROTATE_DEG;

                return (
                  <motion.article
                    key={project.title}
                    initial={false}
                    animate={{
                      x: depth * 14,
                      y: depth * -20,
                      rotate: alternatingTilt,
                      scale: 1 - depth * 0.038,
                      zIndex: n - depth,
                      opacity: Math.max(0.55, 1 - depth * 0.1),
                      filter: depth > 0 ? "brightness(0.9)" : "brightness(1)",
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
                      maxWidth: "400px",
                      height: "348px",
                      transformOrigin: "center center",
                      pointerEvents: isTop ? "auto" : "none",
                      transformStyle: "preserve-3d",
                    }}
                    className={`rounded-2xl border-2 shadow-2xl overflow-hidden bg-swiss-card border-swiss-border ${
                      isTop ? "ring-1 ring-swiss-accent/25" : ""
                    }`}
                  >
                    <div className="absolute inset-0 pointer-events-none">
                      <Image
                        src={project.imageUrl}
                        alt={isTop ? project.title : ""}
                        fill
                        className="object-cover object-top opacity-[0.42] dark:opacity-[0.28]"
                        sizes="(max-width: 768px) 100vw, 400px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-swiss-card via-swiss-card/92 to-swiss-card/75 dark:via-swiss-card/95 dark:to-swiss-card/85" />
                    </div>

                    <div className="relative flex h-full flex-col p-6 pb-7 justify-between">
                      <div>
                        <h3 className="swiss-heading text-xl sm:text-2xl mb-2 text-swiss-text">
                          {project.title}
                        </h3>
                        <p className="swiss-body text-swiss-text-secondary text-sm leading-relaxed line-clamp-3">
                          {project.description}
                        </p>

                        {isTop ? (
                          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm">
                            <a
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-medium text-swiss-accent hover:underline underline-offset-4"
                            >
                              GitHub
                            </a>
                            {project.liveLink ? (
                              <a
                                href={project.liveLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-medium text-swiss-accent hover:underline underline-offset-4"
                              >
                                {project.title === "Clausura"
                                  ? "About (live)"
                                  : "Live demo"}
                              </a>
                            ) : null}
                          </div>
                        ) : null}
                      </div>

                      <div className="flex flex-wrap gap-2 mt-6">
                        {project.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-2.5 py-1 text-[10px] sm:text-xs font-medium bg-swiss-text/8 rounded-full text-swiss-text-secondary border border-swiss-border/60"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>

          <p className="mt-6 text-center text-xs text-swiss-text-secondary max-w-sm">
            Each card kicks{" "}
            <span className="text-swiss-text font-medium">
              ±{CARD_ROTATE_DEG}°
            </span>{" "}
            from vertical—alternating directions down the pile.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
