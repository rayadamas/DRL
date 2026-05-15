"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import SectionHeading from "./section-heading";
import { experiencesData } from "@/lib/data";
import { useSectionInView } from "@/lib/hooks";
import { motion } from "framer-motion";
import { HiBriefcase, HiChevronLeft, HiChevronRight } from "react-icons/hi2";

export default function Experience() {
  const { ref } = useSectionInView("Experience");
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const refreshScrollHints = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    const max = Math.max(0, scrollWidth - clientWidth);
    setCanPrev(scrollLeft > 8);
    setCanNext(scrollLeft < max - 8);
  }, []);

  useEffect(() => {
    refreshScrollHints();
    const el = scrollerRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => refreshScrollHints());
    ro.observe(el);
    return () => ro.disconnect();
  }, [refreshScrollHints]);

  const scrollByCards = useCallback((dir: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-carousel-card]");
    const gapParsed = Number.parseFloat(getComputedStyle(el).columnGap || "0");
    const gap =
      Number.isFinite(gapParsed) && gapParsed > 0 ? gapParsed : 16;
    const step =
      card && card.offsetWidth ? card.offsetWidth + gap : el.clientWidth * 0.85;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  }, []);

  return (
    <section id="experience" ref={ref} className="scroll-mt-28 mb-28 sm:mb-40">
      <div className="max-w-6xl mx-auto px-4">
        <SectionHeading>Experience & Education</SectionHeading>

        <motion.div
          className="relative sm:px-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <button
            type="button"
            aria-label="Scroll experience carousel backward"
            onClick={() => scrollByCards(-1)}
            disabled={!canPrev}
            className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 -translate-x-1 sm:-translate-x-4 w-10 h-10 items-center justify-center rounded-full bg-swiss-card border border-swiss-border text-swiss-text shadow-sm hover:border-swiss-accent hover:text-swiss-accent transition-colors disabled:opacity-30 disabled:pointer-events-none"
          >
            <HiChevronLeft className="w-5 h-5" aria-hidden />
          </button>

          <button
            type="button"
            aria-label="Scroll experience carousel forward"
            onClick={() => scrollByCards(1)}
            disabled={!canNext}
            className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 translate-x-1 sm:translate-x-4 w-10 h-10 items-center justify-center rounded-full bg-swiss-card border border-swiss-border text-swiss-text shadow-sm hover:border-swiss-accent hover:text-swiss-accent transition-colors disabled:opacity-30 disabled:pointer-events-none"
          >
            <HiChevronRight className="w-5 h-5" aria-hidden />
          </button>

          <div
            ref={scrollerRef}
            onScroll={refreshScrollHints}
            className="flex gap-4 overflow-x-auto pb-3 snap-x snap-mandatory scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pt-2"
          >
            {experiencesData.map((item, index) => (
              <CarouselCard key={`${item.title}-${index}`} item={item} />
            ))}
          </div>

          <p className="text-center mt-2 text-[11px] text-swiss-text-secondary/90 sm:hidden">
            Swipe horizontally to see more
          </p>
        </motion.div>
      </div>
    </section>
  );
}

type ExperienceType = (typeof experiencesData)[number];

function CarouselCard({ item }: { item: ExperienceType }) {
  const isEducation = item.type === "education";

  return (
    <article
      data-carousel-card
      className="flex-none w-[min(100%,20rem)] sm:w-[min(100%,22rem)] snap-center"
    >
      <div className="group flex flex-col rounded-xl bg-swiss-card border border-swiss-border hover:border-swiss-accent transition-all duration-300 h-full overflow-hidden shadow-sm hover:shadow-md">
        <div className="flex items-start gap-3 p-5 pb-3 border-b border-swiss-border/60">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-swiss-accent/12 text-lg leading-none border border-swiss-accent/25">
            {isEducation ? (
              <span role="img" aria-label="Education" className="text-[1.25rem]">
                🎓
              </span>
            ) : (
              <HiBriefcase className="w-5 h-5 text-swiss-accent" aria-hidden />
            )}
          </span>
          <div className="min-w-0 flex-1">
            <p className="swiss-label text-swiss-accent truncate">{item.date}</p>
            <h3 className="swiss-heading text-sm sm:text-base mt-1.5 leading-snug group-hover:text-swiss-accent transition-colors">
              {item.title}
            </h3>
            <p className="text-xs sm:text-sm text-swiss-text-secondary font-medium mt-0.5 line-clamp-2">
              {item.company}
            </p>
          </div>
        </div>

        <div className="px-5 py-4 flex-1">
          <p className="text-xs text-swiss-text-secondary leading-relaxed">
            {item.description}
          </p>
        </div>
      </div>
    </article>
  );
}
