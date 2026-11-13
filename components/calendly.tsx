"use client";

import React from "react";
import Script from "next/script";
import { track } from "@vercel/analytics";
import { CALENDLY_URL } from "@/lib/product-data";

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

export const CALENDLY_ORIGIN = "https://calendly.com";

/** Colors only apply on paid Calendly plans; harmless otherwise. */
export const CALENDLY_THEME_PARAMS = new URLSearchParams({
  hide_gdpr_banner: "1",
  background_color: "171717",
  text_color: "fafafa",
  primary_color: "ff8a3d",
}).toString();

/**
 * Loads the Calendly widget assets. Render once per page that opens the popup.
 */
export function CalendlyAssets() {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://assets.calendly.com/assets/external/widget.css"
      />
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
      />
    </>
  );
}

/**
 * Opens the themed Calendly popup, falling back to a new tab when the widget
 * script has not loaded. `note` answers the event's first custom question (a1),
 * which Calendly includes in the invite.
 */
export function openCalendlyPopup({
  name = "",
  email = "",
  note = "",
}: { name?: string; email?: string; note?: string } = {}) {
  const trimmedName = name.trim();
  const trimmedEmail = email.trim();
  const prepNote = note.trim();

  // Calendly's widget re-encodes the URL, so spaces must be %20 rather than
  // URLSearchParams' "+".
  const prefillParams = Object.entries({
    name: trimmedName,
    email: trimmedEmail,
    a1: prepNote,
  })
    .filter(([, value]) => value)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join("&");

  if (typeof window !== "undefined" && window.Calendly) {
    window.Calendly.initPopupWidget({
      url: `${CALENDLY_URL}?${CALENDLY_THEME_PARAMS}${
        prefillParams ? `&${prefillParams}` : ""
      }`,
      prefill: {
        ...(trimmedName && { name: trimmedName }),
        ...(trimmedEmail && { email: trimmedEmail }),
        ...(prepNote && { customAnswers: { a1: prepNote } }),
      },
    });
    return;
  }

  window.open(
    `${CALENDLY_URL}${prefillParams ? `?${prefillParams}` : ""}`,
    "_blank",
    "noopener,noreferrer",
  );
}

/**
 * A button that opens the Calendly popup and optionally reports the click to
 * Vercel Analytics, so entry points can be compared against each other.
 */
export function CalendlyButton({
  className,
  children,
  note,
  eventName,
  eventProps,
}: {
  className?: string;
  children: React.ReactNode;
  note?: string;
  eventName?: string;
  eventProps?: Record<string, string>;
}) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        if (eventName) track(eventName, eventProps);
        openCalendlyPopup({ note });
      }}
    >
      {children}
    </button>
  );
}
