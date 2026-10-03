import type { CSSProperties, ElementType, ReactNode } from "react";

/**
 * Scroll-reveal marker. Server component: it only sets data-reveal and a delay; MotionRoot adds `.is-in`.
 * Content is hidden only while <html class="js"> is set (removed again after 2.5 s if motion never starts),
 * and never under prefers-reduced-motion.
 */
export default function Reveal({ as: Tag = "div", delay = 0, variant = "", className, style, children, ...rest }: {
  as?: ElementType; delay?: number; variant?: "" | "fade"; className?: string; style?: CSSProperties; children?: ReactNode;
} & Record<string, unknown>) {
  const d = Math.min(Math.max(delay, 0), 600);
  const merged = d ? ({ "--d": `${d}ms`, ...style } as CSSProperties) : style;
  return <Tag data-reveal={variant} className={className} style={merged} {...rest}>{children}</Tag>;
}
