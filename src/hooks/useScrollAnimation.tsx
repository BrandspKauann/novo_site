import { useEffect, useRef, useState } from "react";

export interface UseScrollAnimationOptions {
  /**
   * Fraction of viewport height where the “focus” band starts (0–1).
   */
  focusZoneTop?: number;
  /**
   * Fraction of viewport height where the focus band ends (0–1).
   */
  focusZoneBottom?: number;
  triggerOnce?: boolean;
}

/**
 * Scroll-linked visibility: a block is visible only while it meaningfully overlaps
 * the focus band in the viewport. This is more stable than center-only checks when
 * scrolling in both directions (up/down).
 */
export const useScrollAnimation = (options: UseScrollAnimationOptions = {}) => {
  const {
    focusZoneTop = 0.2,
    focusZoneBottom = 0.78,
    triggerOnce = false,
  } = options;

  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const top = Math.min(focusZoneTop, focusZoneBottom);
    const bottom = Math.max(focusZoneTop, focusZoneBottom);

    let frameId = 0;

    const updateVisibility = () => {
      frameId = 0;

      const el = elementRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      if (vh <= 0) return;

      const overlapsViewport = rect.bottom > 0 && rect.top < vh;
      if (!overlapsViewport) {
        setIsVisible((prev) => (triggerOnce && prev ? true : false));
        return;
      }

      const bandTop = vh * top;
      const bandBottom = vh * bottom;
      const overlapWithBand = Math.min(rect.bottom, bandBottom) - Math.max(rect.top, bandTop);
      const minRequiredOverlap = Math.max(32, Math.min(rect.height * 0.2, 120));
      const intersectsFocusBand = overlapWithBand >= minRequiredOverlap;

      setIsVisible((prev) => {
        if (triggerOnce && prev) return true;
        return intersectsFocusBand;
      });
    };

    const requestUpdate = () => {
      if (frameId) return;
      frameId = window.requestAnimationFrame(updateVisibility);
    };

    updateVisibility();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      if (frameId) window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, [focusZoneTop, focusZoneBottom, triggerOnce]);

  return { elementRef, isVisible };
};

export default useScrollAnimation;
