"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function Showreel() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    video.play().catch(() => {});
  }, []);

  return (
    <motion.figure
      className="mb-16 sm:mb-20 w-full max-w-3xl mx-auto px-4"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="overflow-hidden rounded-xl border border-swiss-border bg-swiss-card shadow-lg aspect-video">
        <video
          ref={videoRef}
          src="/LoudenDia_Showreel_16x9.mp4"
          muted
          loop
          playsInline
          controls
          preload="metadata"
          aria-label="Diamond Ray Louden showreel"
          className="h-full w-full object-cover"
        />
      </div>
      <figcaption className="mt-3 text-center text-xs sm:text-sm text-swiss-text-secondary">
        (Showreel v1. Designed and edited by me. More cuts to come.)
      </figcaption>
    </motion.figure>
  );
}
