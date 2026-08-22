"use client";

import { useEffect, useState } from "react";

/**
 * Tracks which of the given section ids is currently most in view,
 * using an IntersectionObserver rather than scroll-position math.
 */
export function useActiveSection(ids: string[], initial: string = ids[0]) {
  const [active, setActive] = useState(initial);

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids.join(",")]);

  return active;
}
