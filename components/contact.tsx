"use client";

import React, { useEffect, useState } from "react";
import Script from "next/script";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import { track } from "@vercel/analytics";
import { useSectionInView } from "@/lib/hooks";
import { CALENDLY_URL, contactTopics } from "@/lib/product-data";
import { BsArrowRight, BsCheckCircleFill } from "react-icons/bs";

type CalendlyPrefill = {
  name?: string;
  email?: string;
  customAnswers?: Record<string, string>;
};

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget(options: { url: string; prefill?: CalendlyPrefill }): void;
    };
  }
}

const CALENDLY_ORIGIN = "https://calendly.com";

/** Colors only apply on paid Calendly plans; harmless otherwise. */
const CALENDLY_THEME_PARAMS = new URLSearchParams({
  hide_gdpr_banner: "1",
  background_color: "171717",
  text_color: "fafafa",
  primary_color: "ff4d42",
}).toString();

export default function Contact() {
  const { ref } = useSectionInView("Contact");
  const [topic, setTopic] = useState<string>(contactTopics[0]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [booked, setBooked] = useState(false);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== CALENDLY_ORIGIN) return;
      if (event.data?.event === "calendly.event_scheduled") {
        setBooked(true);
        track("calendly_booked", { topic });
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [topic]);

  function openCalendly(e: React.FormEvent) {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();
    // a1 answers the event's first custom question, which Calendly includes in the invite.
    const prepNote = trimmedMessage
      ? `Topic: ${topic}\n\n${trimmedMessage}`
      : `Topic: ${topic}`;

    // Calendly's widget re-encodes the URL, so spaces must be %20 rather than URLSearchParams' "+".
    const prefillParams = Object.entries({ name: trimmedName, email: trimmedEmail, a1: prepNote })
      .filter(([, value]) => value)
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join("&");

    if (window.Calendly) {
      window.Calendly.initPopupWidget({
        url: `${CALENDLY_URL}?${CALENDLY_THEME_PARAMS}&${prefillParams}`,
        prefill: {
          ...(trimmedName && { name: trimmedName }),
          ...(trimmedEmail && { email: trimmedEmail }),
          customAnswers: { a1: prepNote },
        },
      });
      return;
    }

    window.open(
      `${CALENDLY_URL}?${prefillParams}`,
      "_blank",
      "noopener,noreferrer",
    );
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
      <link
        rel="stylesheet"
        href="https://assets.calendly.com/assets/external/widget.css"
      />
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
      />

      <SectionHeading>Contact</SectionHeading>

      <p className="text-center text-swiss-text-secondary mb-8 swiss-body text-sm">
        Pick a topic and book 30 minutes - or email{" "}
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

        <div>
          <label htmlFor="contact-message" className="swiss-label text-swiss-text-secondary block mb-1.5">
            What&apos;s on your mind? <span className="normal-case tracking-normal opacity-70">(optional)</span>
          </label>
          <textarea
            id="contact-message"
            rows={3}
            maxLength={500}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={`${fieldClass} resize-y`}
            placeholder="A sentence or two on what you'd like to talk through"
          />
        </div>

        {booked ? (
          <div
            role="status"
            className="flex flex-col items-center gap-2 rounded-xl border border-swiss-border bg-swiss-card px-5 py-4 text-center"
          >
            <p className="flex items-center gap-2 font-medium text-swiss-text">
              <BsCheckCircleFill className="text-green-500" aria-hidden />
              You&apos;re booked. A calendar invite is on its way.
            </p>
            <button
              type="submit"
              className="text-sm text-swiss-accent hover:underline"
            >
              Book another time
            </button>
          </div>
        ) : (
          <button
            type="submit"
            className="group w-full sm:w-auto mx-auto flex items-center justify-center gap-2 px-7 py-3.5 bg-swiss-text text-swiss-bg rounded-full font-medium hover:bg-swiss-accent transition-all duration-300 hover:scale-[1.02]"
          >
            Book 30 minutes
            <BsArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
        )}
        <p className="text-center text-xs text-swiss-text-secondary">
          Your topic and note are shared with me in the calendar invite.
        </p>
      </form>
    </motion.section>
  );
}
