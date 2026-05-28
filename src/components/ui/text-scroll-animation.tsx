"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

type ScrollRevealHeadingProps = {
  /** Plain text part (rendered in white) */
  text: string;
  /** Highlighted/gradient text part */
  highlightText: string;
  /** Gradient CSS for the highlight, e.g. "from-purple-400 to-pink-500" */
  gradient?: string;
  /** Optional subtitle beneath the heading */
  subtitle?: string;
  /** Extra className for the container */
  className?: string;
  /** Text alignment */
  align?: "left" | "center";
};

/**
 * A single animated character that converges from a spread position
 * with 3D perspective rotation as the user scrolls into view.
 */
const AnimatedChar = ({
  char,
  index,
  centerIndex,
  scrollYProgress,
  isHighlight,
  gradient,
}: {
  char: string;
  index: number;
  centerIndex: number;
  scrollYProgress: any;
  isHighlight: boolean;
  gradient: string;
}) => {
  const isSpace = char === " ";
  const distanceFromCenter = index - centerIndex;

  const x = useTransform(scrollYProgress, [0, 0.45], [distanceFromCenter * 30, 0], { clamp: true });
  const rotateX = useTransform(scrollYProgress, [0, 0.45], [distanceFromCenter * 25, 0], { clamp: true });
  const opacity = useTransform(scrollYProgress, [0, 0.35], [0, 1], { clamp: true });

  return (
    <motion.span
      className={
        isSpace
          ? "inline-block w-3 md:w-4"
          : isHighlight
          ? `inline-block text-transparent bg-clip-text bg-gradient-to-r ${gradient}`
          : "inline-block text-white"
      }
      style={{ x, rotateX, opacity }}
    >
      {isSpace ? "\u00A0" : char}
    </motion.span>
  );
};

/**
 * ScrollRevealHeading — A section heading where each character
 * converges from spread positions as you scroll into view.
 * 
 * Usage:
 * ```tsx
 * <ScrollRevealHeading
 *   text="About"
 *   highlightText="Me"
 *   gradient="from-teal-400 to-blue-500"
 *   subtitle="Learn more about my journey."
 * />
 * ```
 */
export function ScrollRevealHeading({
  text,
  highlightText,
  gradient = "from-purple-400 to-pink-500",
  subtitle,
  className = "",
  align = "left",
}: ScrollRevealHeadingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Build the full string: "text highlightText"
  const fullText = `${text} ${highlightText}`;
  const chars = fullText.split("");
  const centerIndex = Math.floor(chars.length / 2);

  // Determine which chars belong to the highlight portion
  const highlightStartIndex = text.length + 1; // +1 for the space

  const alignClass = align === "center" ? "text-center" : "text-left";

  return (
    <div ref={containerRef} className={`${className}`}>
      <h2
        className={`text-4xl sm:text-5xl md:text-7xl font-bold tracking-tighter ${alignClass}`}
        style={{ perspective: "600px" }}
      >
        {chars.map((char, index) => (
          <AnimatedChar
            key={index}
            char={char}
            index={index}
            centerIndex={centerIndex}
            scrollYProgress={scrollYProgress}
            isHighlight={index >= highlightStartIndex}
            gradient={gradient}
          />
        ))}
      </h2>
      {subtitle && (
        <motion.p
          className={`text-neutral-400 mt-4 text-lg ${alignClass}`}
          style={{
            opacity: useTransform(scrollYProgress, [0, 0.35], [0, 1], { clamp: true }),
          }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}

export default ScrollRevealHeading;
