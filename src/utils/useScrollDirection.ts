import * as React from "react";

export type ScrollDirection = "none" | "up" | "down";

type Options = {
  /** Ignore tiny scrolls (prevents jitter) */
  delta: number;
  /** Nav height threshold before hiding on scroll down */
  navHeight: number;
  /** If true, the hook does nothing (e.g., when menu is open) */
  disabled?: boolean;
  /** Don’t run on widths <= this (treat as mobile). Default: 900 */
  mobileCutoff?: number;
};

export function useScrollDirection({
  delta,
  navHeight,
  disabled = false,
  mobileCutoff = 900,
}: Options) {
  const [dir, setDir] = React.useState<ScrollDirection>("none");
  const lastTopRef = React.useRef(0);

  React.useEffect(() => {
    const onScroll = () => {
      if (disabled) return;
      if (window.innerWidth <= mobileCutoff) return;

      const fromTop = window.scrollY;

      // Ignore tiny changes & when nothing changed enough
      if (Math.abs(lastTopRef.current - fromTop) <= delta) return;

      if (fromTop < delta) {
        setDir("none");
      } else if (fromTop > lastTopRef.current && fromTop > navHeight) {
        if (dir !== "down") setDir("down");
      } else if (fromTop + window.innerHeight < document.body.scrollHeight) {
        if (dir !== "up") setDir("up");
      }

      lastTopRef.current = fromTop;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [delta, navHeight, mobileCutoff, disabled, dir]);

  return { scrollDirection: dir, lastTopRef };
}
