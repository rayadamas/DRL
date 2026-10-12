"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { BsArrowRight, BsGithub, BsLinkedin } from "react-icons/bs";
import { useActiveSectionContext } from "@/context/active-section-context";
import { useSectionInView } from "@/lib/hooks";

export default function Intro() {
  const { ref } = useSectionInView("Home", 0.5);
  const { setActiveSection, setTimeOfLastClick } = useActiveSectionContext();

  return (
    <section
      ref={ref}
      id="home"
      className="mb-28 max-w-4xl mx-auto px-4 sm:mb-40 scroll-mt-28"
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
            <span className="absolute bottom-1 right-1 w-6 h-6 bg-green-500 rounded-full border-4 border-swiss-bg" />
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
          <AvailabilityLine />
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
            className="w-11 h-11 flex items-center justify-center rounded-full bg-swiss-card border border-swiss-border text-swiss-text-secondary hover:border-swiss-accent hover:text-swiss-accent transition-all duration-300 hover:scale-110"
            href="https://www.linkedin.com/in/diamond-ray/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <BsLinkedin className="w-5 h-5" />
          </a>
          <a
            className="w-11 h-11 flex items-center justify-center rounded-full bg-swiss-card border border-swiss-border text-swiss-text-secondary hover:border-swiss-accent hover:text-swiss-accent transition-all duration-300 hover:scale-110"
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

function AvailabilityLine() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setTime(chicagoTime.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <p className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 font-mono text-xs sm:text-sm uppercase tracking-[0.12em] text-swiss-text-secondary">
      <span className="flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-green-500" aria-hidden />
        Available for work
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
