import { useActiveSectionContext } from "@/context/active-section-context";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { SectionName } from "./types";

export function useSectionInView(sectionName: SectionName, threshold = 0.75) {
  const { ref, inView } = useInView({
    threshold,
  });
  const { setActiveSection, timeOfLastClick } = useActiveSectionContext();

  useEffect(() => {
    if (inView && Date.now() - timeOfLastClick > 1000) {
      setActiveSection(sectionName);
    }
  }, [inView, setActiveSection, timeOfLastClick, sectionName]);

  return { ref };
}

const PRESENCE_EVENTS = [
  "pointermove",
  "pointerdown",
  "keydown",
  "scroll",
  "wheel",
  "touchstart",
] as const;

/** True while the visitor has interacted within the last `idleMs`. Starts idle. */
export function usePresence(idleMs = 30_000) {
  const [active, setActive] = useState(false);
  const activeRef = useRef(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;

    const goIdle = () => {
      activeRef.current = false;
      setActive(false);
    };

    const handleActivity = () => {
      if (!activeRef.current) {
        activeRef.current = true;
        setActive(true);
      }
      clearTimeout(timer);
      timer = setTimeout(goIdle, idleMs);
    };

    PRESENCE_EVENTS.forEach((type) =>
      window.addEventListener(type, handleActivity, { passive: true }),
    );
    return () => {
      clearTimeout(timer);
      PRESENCE_EVENTS.forEach((type) =>
        window.removeEventListener(type, handleActivity),
      );
    };
  }, [idleMs]);

  return active;
}

function scrollProgress() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  return max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
}

/**
 * Page "night" from 0 (top, dusk) to 1 (bottom, night), eased toward the
 * scroll position. Returned as a ref so per-frame readers never re-render.
 */
export function useScrollNight() {
  const night = useRef(0);

  useEffect(() => {
    let target = scrollProgress();
    night.current = target;
    let frame = 0;

    const step = () => {
      const delta = target - night.current;
      if (Math.abs(delta) < 0.0005) {
        night.current = target;
        frame = 0;
        return;
      }
      night.current += delta * 0.08;
      frame = requestAnimationFrame(step);
    };

    const handleScroll = () => {
      target = scrollProgress();
      if (!frame) frame = requestAnimationFrame(step);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return night;
}

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return reduced;
}
