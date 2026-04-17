import { ElementType, ReactNode } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface AnimatedSectionProps {
  children: ReactNode;
  animationType?: "fade" | "slide-up" | "slide-left" | "slide-right" | "scale" | "default";
  delay?: number;
  className?: string;
  as?: ElementType;
  id?: string;
  /** Top of focus band as fraction of viewport height (default 0.2) */
  focusZoneTop?: number;
  /** Bottom of focus band as fraction of viewport height (default 0.78) */
  focusZoneBottom?: number;
}

const AnimatedSection = ({
  children,
  animationType = "slide-up",
  delay = 0,
  className = "",
  as: Component = "div",
  id,
  focusZoneTop = 0.2,
  focusZoneBottom = 0.78,
}: AnimatedSectionProps) => {
  const { elementRef, isVisible } = useScrollAnimation({
    focusZoneTop,
    focusZoneBottom,
    triggerOnce: false,
  });

  const getAnimationClass = () => {
    if (animationType === "default") return "scroll-animate";
    return `scroll-animate-${animationType}`;
  };

  const getDelayClass = () => {
    if (delay <= 0) return "";
    const delayMs = Math.min(Math.round(delay / 50) * 50, 300);
    return `delay-${delayMs}`;
  };

  const delayStyle =
    delay > 0 && delay <= 300 ? { transitionDelay: `${delay * 0.6}ms` } : {};

  return (
    <Component
      ref={elementRef as never}
      id={id}
      className={`${getAnimationClass()} ${getDelayClass()} ${isVisible ? "visible" : ""} ${className}`}
      style={delayStyle}
    >
      {children}
    </Component>
  );
};

export default AnimatedSection;
