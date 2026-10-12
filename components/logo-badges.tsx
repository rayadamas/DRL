"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { HiArrowUpRight } from "react-icons/hi2";
import { EXPERIENCE_LOGOS } from "@/lib/experience-logos";

type Badge = {
  src: string;
  name: string;
  title: string;
  date: string;
  highlight: string;
  link?: { href: string; label: string };
};

const BADGES: readonly Badge[] = [
  {
    src: EXPERIENCE_LOGOS.accenture,
    name: "Accenture",
    title: "Business Analyst",
    date: "Jan 2022 - Jan 2025",
    highlight:
      "Future-state retail and e-commerce work, including a Mondelez dashboard that saved about 8 hours a week.",
  },
  {
    src: EXPERIENCE_LOGOS.aws,
    name: "Amazon · Project Neo",
    title: "NLP (Natural Language Processing) Training Contributor",
    date: "Mar 2023 - Jul 2024",
    highlight:
      "1,100+ prompt pairs for an enterprise large language model (LLM).",
  },
  {
    src: EXPERIENCE_LOGOS.udacity,
    name: "Udacity",
    title: "AWS AI Practitioner",
    date: "Mar 2026",
    highlight:
      "Hands-on Amazon Web Services (AWS) artificial intelligence (AI) fluency.",
  },
  {
    src: EXPERIENCE_LOGOS.walgreens,
    name: "Walgreens · via Accenture",
    title: "Customer Preference Management (CPM)",
    date: "Sep 2022 - Jan 2023",
    highlight: "Consent data on a regulated pharmacy program.",
  },
  {
    src: EXPERIENCE_LOGOS.diverse,
    name: "Diverse ICT",
    title: "Sales Engineer",
    date: "Jan 2026 - Present",
    highlight: "Turns identity and access risk into scoped, sellable work.",
  },
  {
    src: EXPERIENCE_LOGOS.vino,
    name: "Vino Louden Music",
    title: "Independent Client Manager",
    date: "Jan 2025 - Present",
    highlight: "Content, one link hub, and booking pipeline.",
    link: { href: "https://vinolouden.com/", label: "vinolouden.com" },
  },
  {
    src: EXPERIENCE_LOGOS.quincy,
    name: "Quincy Labs",
    title: "Co-Founder · Applied AI & Web3 Innovation",
    date: "May 2018 - Present",
    highlight: "Agent products and go-to-market (GTM).",
    link: { href: "https://www.quincylabs.org/", label: "quincylabs.org" },
  },
  {
    src: EXPERIENCE_LOGOS.firstbase,
    name: "Firstbase",
    title: "Business Development Specialist",
    date: "Feb 2026 - May 2026",
    highlight:
      "Qualified IT (information technology) conversations around device lifecycle and single sign-on (SSO).",
  },
  {
    src: EXPERIENCE_LOGOS["sv-academy"],
    name: "SV Academy",
    title: "Sales Development Fellowship",
    date: "Dec 2025 - May 2026",
    highlight: "250+ hour selective bootcamp.",
  },
  {
    src: EXPERIENCE_LOGOS.rework,
    name: "re:WORK Training",
    title: "Business Development Representative",
    date: "Jan 2025 - Nov 2025",
    highlight: "Discovery calls from about 10 to 15 a month.",
  },
  {
    src: EXPERIENCE_LOGOS.gridplus,
    name: "GridPlus",
    title: "Phonon Developer",
    date: "Aug 2022 - Nov 2022",
    highlight: "Hardware-secured peer asset transfer.",
  },
  {
    src: EXPERIENCE_LOGOS.luna,
    name: "Luna Medical",
    title: "Billing Agent",
    date: "Sep 2019 - Mar 2020",
    highlight: "Billing accuracy end to end.",
  },
  {
    src: EXPERIENCE_LOGOS.saks,
    name: "Saks OFF 5TH",
    title: "Operations Lead",
    date: "Mar 2016 - Jan 2019",
    highlight:
      "Freight, replenishment, and online fulfillment that lifted local ranking.",
  },
  {
    src: EXPERIENCE_LOGOS["trunk-club"],
    name: "Nordstrom Trunk Club",
    title: "Operations Specialist",
    date: "Feb 2015 - Mar 2016",
    highlight:
      "Digital-first fulfillment and key performance indicators (KPIs) for repeat sales.",
  },
];

const OPEN_DELAY_MS = 120;
const CLOSE_DELAY_MS = 160;
const VIEWPORT_MARGIN = 12;

export default function LogoBadges() {
  const [openName, setOpenName] = useState<string | null>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastPointerRef = useRef<string>("mouse");

  const clearTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = null;
  };

  const scheduleOpen = (name: string) => {
    clearTimer();
    timerRef.current = setTimeout(() => setOpenName(name), OPEN_DELAY_MS);
  };

  const scheduleClose = () => {
    clearTimer();
    timerRef.current = setTimeout(() => setOpenName(null), CLOSE_DELAY_MS);
  };

  useEffect(() => clearTimer, []);

  useEffect(() => {
    if (!openName) return;
    const handlePointer = (event: PointerEvent) => {
      if (listRef.current && !listRef.current.contains(event.target as Node)) {
        setOpenName(null);
      }
    };
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenName(null);
    };
    document.addEventListener("pointerdown", handlePointer);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("pointerdown", handlePointer);
      document.removeEventListener("keydown", handleKey);
    };
  }, [openName]);

  return (
    <motion.div
      className="relative z-20 mb-16 sm:mb-20 max-w-3xl mx-auto px-4"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <ul
        ref={listRef}
        className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3"
      >
        {BADGES.map((badge) => {
          const isOpen = openName === badge.name;
          return (
            <li
              key={badge.name}
              className="relative"
              onPointerEnter={(e) => {
                if (e.pointerType === "mouse") scheduleOpen(badge.name);
              }}
              onPointerLeave={(e) => {
                if (e.pointerType === "mouse") scheduleClose();
              }}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                  setOpenName((current) =>
                    current === badge.name ? null : current,
                  );
                }
              }}
            >
              <button
                type="button"
                aria-label={`${badge.name}: ${badge.title}`}
                aria-expanded={isOpen}
                onPointerDown={(e) => {
                  lastPointerRef.current = e.pointerType;
                }}
                onClick={(e) => {
                  clearTimer();
                  if (e.detail !== 0 && lastPointerRef.current === "mouse") {
                    setOpenName(badge.name);
                  } else {
                    setOpenName(isOpen ? null : badge.name);
                  }
                }}
                onFocus={(e) => {
                  if (e.currentTarget.matches(":focus-visible")) {
                    setOpenName(badge.name);
                  }
                }}
                className={`group flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full border bg-white p-1.5 shadow-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-swiss-accent ${
                  isOpen ? "border-swiss-accent" : "border-swiss-border/60"
                }`}
              >
                <Image
                  src={badge.src}
                  alt=""
                  width={36}
                  height={36}
                  className={`h-7 w-7 object-contain transition-all duration-300 ${
                    isOpen
                      ? "opacity-100 grayscale-0"
                      : "opacity-[0.72] grayscale-[35%] group-hover:opacity-100 group-hover:grayscale-0"
                  }`}
                  aria-hidden
                />
              </button>

              <AnimatePresence>
                {isOpen ? <BadgeCard key="card" badge={badge} /> : null}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </motion.div>
  );
}

function BadgeCard({ badge }: { badge: Badge }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shift, setShift] = useState(0);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const overflowLeft = VIEWPORT_MARGIN - rect.left;
    const viewportWidth = document.documentElement.clientWidth;
    const overflowRight = rect.right - (viewportWidth - VIEWPORT_MARGIN);
    if (overflowLeft > 0) setShift(overflowLeft);
    else if (overflowRight > 0) setShift(-overflowRight);
  }, []);

  return (
    <div
      className="absolute left-1/2 top-full z-30 pt-2"
      style={{ transform: `translateX(calc(-50% + ${shift}px))` }}
    >
      <motion.div
        ref={ref}
        role="dialog"
        aria-label={`${badge.name} highlight`}
        initial={{ opacity: 0, y: 6, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 6, scale: 0.97 }}
        transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
        className="w-[min(16rem,calc(100vw-1.5rem))] overflow-hidden rounded-xl border border-swiss-border bg-swiss-card text-left shadow-xl"
      >
        <div className="flex items-start gap-3 p-4 pb-3 border-b border-swiss-border/60">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-swiss-border/50 bg-white p-1 shadow-sm">
            <Image
              src={badge.src}
              alt=""
              width={28}
              height={28}
              className="h-6 w-6 object-contain"
              aria-hidden
            />
          </span>
          <div className="min-w-0 flex-1">
            <p className="swiss-label text-[10px] text-swiss-accent">
              {badge.date}
            </p>
            <p className="swiss-heading text-sm mt-1 leading-snug">
              {badge.title}
            </p>
            <p className="text-xs text-swiss-text-secondary font-medium mt-0.5">
              {badge.name}
            </p>
          </div>
        </div>
        <div className="px-4 py-3">
          <p className="text-xs text-swiss-text-secondary leading-relaxed">
            {badge.highlight}
          </p>
          {badge.link ? (
            <a
              href={badge.link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2.5 inline-flex items-center gap-1 text-xs font-medium text-swiss-accent hover:underline"
            >
              {badge.link.label}
              <HiArrowUpRight className="h-3 w-3" aria-hidden />
            </a>
          ) : null}
        </div>
      </motion.div>
    </div>
  );
}
