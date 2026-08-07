"use client";

import * as React from "react";

/**
 * Tracks which section id is currently most visible, for a nav active-state indicator.
 * Optional/stretch — safe to ignore the return value if unused.
 */
export function useActiveSection(sectionIds: string[]): string | null {
  const [activeId, setActiveId] = React.useState<string | null>(null);

  React.useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    // Fires when a section overlaps a thin band centered on the viewport, rather
    // than requiring 50% of the section's *own* area to be visible — sections
    // taller than the viewport (e.g. Projects) could never satisfy the latter.
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveId(visible.target.id);
      },
      { threshold: 0, rootMargin: "-45% 0px -45% 0px" },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sectionIds]);

  return activeId;
}
