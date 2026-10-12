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
