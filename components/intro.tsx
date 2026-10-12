"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { BsArrowRight, BsGithub, BsLinkedin } from "react-icons/bs";
import { useActiveSectionContext } from "@/context/active-section-context";
import { usePresence, useSectionInView } from "@/lib/hooks";

export default function Intro() {
  const { ref } = useSectionInView("Home", 0.5);
  const active = usePresence();
  const { setActiveSection, setTimeOfLastClick } = useActiveSectionContext();

  return (
    <section
      ref={ref}
      id="home"
      className="mb-14 max-w-4xl mx-auto px-4 sm:mb-16 scroll-mt-28"
    >
      <div className="flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative mb-8"
        >
          <div className="relative">
            <Image
              src="/IMG_2543.JPG"
              alt="Diamond Ray Louden"
              width={120}
              height={120}
              quality={95}
              priority
              className="h-28 w-28 rounded-full object-cover border-4 border-swiss-card shadow-lg"
            />
            <PresenceDot
              active={active}
              size="lg"
              className="absolute bottom-1 right-1"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mb-6"
        >
          <h1 className="swiss-heading text-4xl sm:text-5xl md:text-6xl mb-4">
            Diamond Ray Louden
          </h1>
          <RoleLabel />
          <AvailabilityLine active={active} />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="swiss-body text-lg sm:text-xl text-swiss-text-secondary max-w-2xl mb-10 leading-relaxed"
        >
          I turn ideas into systems that work.{" "}
          <span className="text-swiss-text font-medium">11+ years</span> of
          experience across retail, healthcare, and tech with strengths in{" "}
          <span className="text-swiss-text font-medium">React</span>,{" "}
          <span className="text-swiss-text font-medium">Next.js</span>, and{" "}
          <span className="text-swiss-text font-medium">AI</span> (artificial
          intelligence).
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex items-center justify-center"
        >
          <Link
            href="#contact"
            className="group flex items-center gap-2 px-7 py-3.5 bg-swiss-text text-swiss-bg rounded-full font-medium hover:bg-swiss-accent transition-all duration-300 hover:scale-105"
            onClick={() => {
              setActiveSection("Contact");
              setTimeOfLastClick(Date.now());
            }}
          >
            Contact Me
            <BsArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex items-center gap-3 mt-6"
        >
          <a
            className="w-11 h-11 flex items-center justify-center rounded-full bg-swiss-card border border-[#0A66C2]/60 text-white shadow-[0_0_14px_rgba(10,102,194,0.45)] hover:bg-[#0A66C2] hover:border-[#0A66C2] hover:shadow-[0_0_26px_rgba(10,102,194,0.85)] transition-all duration-300 hover:scale-110"
            href="https://www.linkedin.com/in/diamond-ray/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <BsLinkedin className="w-5 h-5" />
          </a>
          <a
            className="w-11 h-11 flex items-center justify-center rounded-full bg-swiss-card border border-white/30 text-white shadow-[0_0_14px_rgba(255,255,255,0.18)] hover:bg-[#181717] hover:border-white/70 hover:shadow-[0_0_26px_rgba(255,255,255,0.45)] transition-all duration-300 hover:scale-110"
            href="https://github.com/rayadamas"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <BsGithub className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

const chicagoTime = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/Chicago",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hourCycle: "h23",
});

const IDLE_LABEL_INTERVAL_MS = 2500;

function PresenceDot({
  active,
  size,
  className = "relative",
}: {
  active: boolean;
  size: "lg" | "sm";
  /** Must include a positioning utility; the z badge is placed against it. */
  className?: string;
}) {
  const isLarge = size === "lg";
  return (
    <span className={`inline-flex ${className}`} aria-hidden>
      <span
        className={`block rounded-full transition-colors duration-500 ${
          active ? "bg-green-500" : "bg-yellow-400"
        } ${isLarge ? "h-6 w-6 border-4 border-swiss-bg" : "h-2 w-2"}`}
      />
      <span
        className={`absolute font-black leading-none text-yellow-400 transition-all duration-500 ${
          active ? "scale-75 opacity-0" : "scale-100 opacity-100"
        } ${
          isLarge
            ? "-right-2 -top-3 text-[13px]"
            : "-right-[7px] -top-[9px] text-[9px] normal-case"
        }`}
      >
        z
      </span>
    </span>
  );
}

function AvailabilityLine({ active }: { active: boolean }) {
  const [time, setTime] = useState<string | null>(null);
  const [showIdle, setShowIdle] = useState(false);

  useEffect(() => {
    const tick = () => setTime(chicagoTime.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (active) {
      setShowIdle(false);
      return;
    }
    const id = setInterval(
      () => setShowIdle((prev) => !prev),
      IDLE_LABEL_INTERVAL_MS,
    );
    return () => clearInterval(id);
  }, [active]);

  const labelClass =
    "[grid-area:1/1] transition-all duration-500 motion-reduce:translate-y-0";

  return (
    <p className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 font-mono text-xs sm:text-sm uppercase tracking-[0.12em] text-swiss-text-secondary">
      <span className="flex items-center gap-3.5">
        <PresenceDot active={active} size="sm" />
        <span className="grid justify-items-start">
          <span
            className={`${labelClass} ${
              active ? "text-swiss-text" : "text-swiss-text-secondary"
            } ${
              showIdle ? "-translate-y-1 opacity-0" : "translate-y-0 opacity-100"
            }`}
          >
            Available for work
          </span>
          <span
            aria-hidden
            className={`${labelClass} text-yellow-400 ${
              showIdle ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"
            }`}
          >
            Idle
          </span>
        </span>
      </span>
      <span className="h-3 w-px bg-swiss-border" aria-hidden />
      <span>
        Chicago{" "}
        <span className="tabular-nums text-swiss-text">
          {time ?? "--:--:--"}
        </span>
      </span>
    </p>
  );
}

function RoleLabel() {
  return (
    <div className="flex items-center justify-center gap-3">
      <span className="h-px w-8 bg-swiss-accent" />
      <span className="text-sm sm:text-base font-medium uppercase tracking-[0.12em] text-swiss-accent">
        Multidisciplinary Builder
      </span>
      <span className="h-px w-8 bg-swiss-accent" />
    </div>
  );
}
