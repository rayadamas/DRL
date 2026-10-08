"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import SectionHeading from "./section-heading";
import { experiencesData } from "@/lib/data";
import {
  experienceLogoSrc,
  resolveExperienceLogo,
} from "@/lib/experience-logos";
import { useSectionInView } from "@/lib/hooks";
import { motion } from "framer-motion";
import Image from "next/image";
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

  const arrowBtn =
    "hidden sm:flex absolute top-1/2 -translate-y-1/2 z-10 h-12 w-12 items-center justify-center rounded-full bg-swiss-accent text-white border-2 border-swiss-accent shadow-lg hover:bg-swiss-accent-hover hover:scale-105 transition-all disabled:opacity-35 disabled:pointer-events-none disabled:hover:scale-100";

  return (
    <section id="experience" ref={ref} className="scroll-mt-28 mb-28 sm:mb-40">
      <div className="max-w-6xl mx-auto px-4">
        <SectionHeading>Experience & Education</SectionHeading>

        <motion.div
          className="relative sm:px-14"
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
            className={`${arrowBtn} left-0 -translate-x-1 sm:-translate-x-2`}
          >
            <HiChevronLeft className="w-6 h-6" aria-hidden />
          </button>

          <button
            type="button"
            aria-label="Scroll experience carousel forward"
            onClick={() => scrollByCards(1)}
            disabled={!canNext}
            className={`${arrowBtn} right-0 translate-x-1 sm:translate-x-2`}
          >
            <HiChevronRight className="w-6 h-6" aria-hidden />
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
          <p className="hidden sm:block text-center mt-3 text-[11px] text-swiss-text-secondary/80">
            Use the arrows to browse roles
          </p>
        </motion.div>
      </div>
    </section>
  );
}

type ExperienceType = (typeof experiencesData)[number];

function CarouselCard({ item }: { item: ExperienceType }) {
  const isEducation = item.type === "education";
  const logoKey = item.logo ?? resolveExperienceLogo(item.company);
  const logoSrc = logoKey ? experienceLogoSrc(logoKey) : null;

  return (
    <article
      data-carousel-card
      className="flex-none w-[min(100%,20rem)] sm:w-[min(100%,22rem)] snap-center"
    >
      <div className="group flex flex-col rounded-xl bg-swiss-card border border-swiss-border hover:border-swiss-accent transition-all duration-300 h-full overflow-hidden shadow-sm hover:shadow-md">
        <div className="flex items-start gap-3 p-5 pb-3 border-b border-swiss-border/60">
          {logoSrc ? (
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-swiss-border/50 bg-white p-1.5 shadow-sm dark:border-swiss-border/40">
              <Image
                src={logoSrc}
                alt=""
                width={32}
                height={32}
                className="h-7 w-7 object-contain opacity-[0.72] grayscale-[35%] transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0"
                aria-hidden
              />
            </span>
          ) : (
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-swiss-accent/12 text-lg leading-none border border-swiss-accent/25">
              {isEducation ? (
                <span
                  role="img"
                  aria-label="Education"
                  className="text-[1.25rem]"
                >
                  🎓
                </span>
              ) : (
                <HiBriefcase
                  className="w-5 h-5 text-swiss-accent"
                  aria-hidden
                />
              )}
            </span>
          )}
          <div className="min-w-0 flex-1">
            <p className="swiss-label text-swiss-accent truncate">{item.date}</p>
            <h3 className="swiss-heading text-sm sm:text-base mt-1.5 leading-snug group-hover:text-swiss-accent transition-colors">
              {item.title}
            </h3>
            <p className="text-xs sm:text-sm text-swiss-text-secondary font-medium mt-0.5 line-clamp-2">
              {item.companyUrl ? (
                <a
                  href={item.companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-swiss-border underline-offset-2 hover:decoration-swiss-accent hover:text-swiss-accent transition-colors"
                >
                  {item.company}
                </a>
              ) : (
                item.company
              )}
            </p>
          </div>
        </div>

        <div className="px-5 py-4 flex-1 flex flex-col gap-3">
          <p className="text-xs text-swiss-text-secondary leading-relaxed">
            {item.description}
          </p>
          {item.industries && item.industries.length > 0 ? (
            <div className="flex flex-wrap gap-1.5 mt-auto">
              {item.industries.map((industry) => (
                <span
                  key={industry}
                  className="px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide rounded-full border border-swiss-border/80 text-swiss-text-secondary"
                >
                  {industry}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </article>
  );
}
