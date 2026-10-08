"use client";

import React, { useState } from "react";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";
import { CALENDLY_URL, contactTopics } from "@/lib/product-data";
import { BsArrowRight } from "react-icons/bs";

export default function Contact() {
  const { ref } = useSectionInView("Contact");
  const [topic, setTopic] = useState<string>(contactTopics[0]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  function openCalendly(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (name.trim()) params.set("name", name.trim());
    if (email.trim()) params.set("email", email.trim());
    // Prefill first custom question / notes when Calendly is configured for it
    params.set("a1", topic);
    const qs = params.toString();
    window.open(`${CALENDLY_URL}${qs ? `?${qs}` : ""}`, "_blank", "noopener,noreferrer");
  }

  const fieldClass =
    "w-full rounded-lg border border-swiss-border bg-swiss-card px-4 py-2.5 text-sm text-swiss-text placeholder:text-swiss-text-secondary/60 focus:outline-none focus:border-swiss-accent transition-colors";

  return (
    <motion.section
      id="contact"
      ref={ref}
      className="mb-20 sm:mb-28 max-w-xl mx-auto px-4 scroll-mt-28"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <SectionHeading>Contact</SectionHeading>

      <p className="text-center text-swiss-text-secondary mb-8 swiss-body text-sm">
        Pick a topic and book 30 minutes — or email{" "}
        <a
          className="text-swiss-accent hover:underline font-medium"
          href="mailto:diamondlouden@gmail.com"
        >
          diamondlouden@gmail.com
        </a>
        .
      </p>

      <form onSubmit={openCalendly} className="space-y-4">
        <div>
          <label htmlFor="contact-topic" className="swiss-label text-swiss-text-secondary block mb-1.5">
            Topic
          </label>
          <select
            id="contact-topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className={fieldClass}
          >
            {contactTopics.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="contact-name" className="swiss-label text-swiss-text-secondary block mb-1.5">
            Name <span className="normal-case tracking-normal opacity-70">(optional)</span>
          </label>
          <input
            id="contact-name"
            type="text"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={fieldClass}
            placeholder="Your name"
          />
        </div>

        <div>
          <label htmlFor="contact-email" className="swiss-label text-swiss-text-secondary block mb-1.5">
            Email <span className="normal-case tracking-normal opacity-70">(optional)</span>
          </label>
          <input
            id="contact-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={fieldClass}
            placeholder="you@company.com"
          />
        </div>

        <button
          type="submit"
          className="group w-full sm:w-auto mx-auto flex items-center justify-center gap-2 px-7 py-3.5 bg-swiss-text text-swiss-bg rounded-full font-medium hover:bg-swiss-accent transition-all duration-300 hover:scale-[1.02]"
        >
          Book 30 minutes
          <BsArrowRight className="group-hover:translate-x-1 transition-transform" />
        </button>
      </form>
    </motion.section>
  );
}
