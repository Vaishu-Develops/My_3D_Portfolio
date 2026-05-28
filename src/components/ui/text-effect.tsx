"use client";

import type { TargetAndTransition } from "framer-motion";
import { motion } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const initialProps: TargetAndTransition = {
  pathLength: 0,
  opacity: 0,
  scale: 0.7,
  rotateY: -15,
};

const animateProps: TargetAndTransition = {
  pathLength: 1,
  opacity: 1,
  scale: 1,
  rotateY: 0,
};

type Props = React.ComponentProps<typeof motion.svg> & {
  speed?: number;
  onAnimationComplete?: () => void;
};

export function VaishnaviTextEffect({
  className,
  speed = 1,
  onAnimationComplete,
  ...props
}: Props) {
  const calc = (x: number) => x * speed;

  return (
    <motion.svg
      className={cn("h-24 sm:h-32 mb-4", className)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1100 250"
      fill="none"
      stroke="url(#gradient)"
      strokeWidth="16"
      initial={{ opacity: 1, scale: 0.8, rotateX: 8 }}
      animate={{ opacity: 1, scale: 1, rotateX: 0 }}
      exit={{ opacity: 0, scale: 0.6, rotateX: -8 }}
      transition={{ 
        duration: 0.7,
        type: "spring",
        stiffness: 140,
        damping: 18
      }}
      {...props}
    >
      <defs>
        <linearGradient id="gradient" x1="0" y1="0" x2="1100" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#c084fc" /> {/* purple-400 */}
          <stop offset="100%" stopColor="#818cf8" /> {/* indigo-400 */}
        </linearGradient>
      </defs>
      
      <title>VAISHNAVI S</title>

      {/* V */}
      <motion.g transform="translate(20, 0)">
        <motion.path
          d="M0 60L40 190L80 60"
          style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
          initial={initialProps}
          animate={animateProps}
          transition={{
            pathLength: { duration: calc(1.5), delay: calc(0.1), ease: "easeOut", repeat: Infinity, repeatDelay: calc(3), repeatType: "loop" },
            opacity: { duration: 0.1, delay: calc(0.1), repeat: Infinity, repeatDelay: calc(3 + 1.4), repeatType: "loop" }
          }}
        />
      </motion.g>

      {/* A */}
      <motion.g transform="translate(130, 0)">
        <motion.path
          d="M40 60L0 190M40 60L80 190M20 140L60 140"
          style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
          initial={initialProps}
          animate={animateProps}
          transition={{
            pathLength: { duration: calc(1.5), delay: calc(0.6), ease: "easeOut", repeat: Infinity, repeatDelay: calc(3), repeatType: "loop" },
            opacity: { duration: 0.1, delay: calc(0.6), repeat: Infinity, repeatDelay: calc(3 + 1.4), repeatType: "loop" }
          }}
        />
      </motion.g>

      {/* I */}
      <motion.g transform="translate(250, 0)">
        <motion.path
          d="M0 60L0.1 190"
          style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
          initial={initialProps}
          animate={animateProps}
          transition={{
            pathLength: { duration: calc(1.5), delay: calc(1.1), ease: "easeOut", repeat: Infinity, repeatDelay: calc(3), repeatType: "loop" },
            opacity: { duration: 0.1, delay: calc(1.1), repeat: Infinity, repeatDelay: calc(3 + 1.4), repeatType: "loop" }
          }}
        />
      </motion.g>

      {/* S */}
      <motion.g transform="translate(300, 0)">
        <motion.path
          d="M70 60L10 60L10 120L70 120L70 190L10 190"
          style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
          initial={initialProps}
          animate={animateProps}
          transition={{
            pathLength: { duration: calc(1.5), delay: calc(1.6), ease: "easeOut", repeat: Infinity, repeatDelay: calc(3), repeatType: "loop" },
            opacity: { duration: 0.1, delay: calc(1.6), repeat: Infinity, repeatDelay: calc(3 + 1.4), repeatType: "loop" }
          }}
        />
      </motion.g>

      {/* H */}
      <motion.g transform="translate(420, 0)">
        <motion.path
          d="M0 60L0 190M60 60L60 190M0 125L60 125"
          style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
          initial={initialProps}
          animate={animateProps}
          transition={{
            pathLength: { duration: calc(1.5), delay: calc(2.1), ease: "easeOut", repeat: Infinity, repeatDelay: calc(3), repeatType: "loop" },
            opacity: { duration: 0.1, delay: calc(2.1), repeat: Infinity, repeatDelay: calc(3 + 1.4), repeatType: "loop" }
          }}
        />
      </motion.g>

      {/* N */}
      <motion.g transform="translate(530, 0)">
        <motion.path
          d="M0 190L0 60L60 190L60 60"
          style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
          initial={initialProps}
          animate={animateProps}
          transition={{
            pathLength: { duration: calc(1.5), delay: calc(2.6), ease: "easeOut", repeat: Infinity, repeatDelay: calc(3), repeatType: "loop" },
            opacity: { duration: 0.1, delay: calc(2.6), repeat: Infinity, repeatDelay: calc(3 + 1.4), repeatType: "loop" }
          }}
        />
      </motion.g>

      {/* A */}
      <motion.g transform="translate(640, 0)">
        <motion.path
          d="M40 60L0 190M40 60L80 190M20 140L60 140"
          style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
          initial={initialProps}
          animate={animateProps}
          transition={{
            pathLength: { duration: calc(1.5), delay: calc(3.1), ease: "easeOut", repeat: Infinity, repeatDelay: calc(3), repeatType: "loop" },
            opacity: { duration: 0.1, delay: calc(3.1), repeat: Infinity, repeatDelay: calc(3 + 1.4), repeatType: "loop" }
          }}
        />
      </motion.g>

      {/* V */}
      <motion.g transform="translate(760, 0)">
        <motion.path
          d="M0 60L40 190L80 60"
          style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
          initial={initialProps}
          animate={animateProps}
          transition={{
            pathLength: { duration: calc(1.5), delay: calc(3.6), ease: "easeOut", repeat: Infinity, repeatDelay: calc(3), repeatType: "loop" },
            opacity: { duration: 0.1, delay: calc(3.6), repeat: Infinity, repeatDelay: calc(3 + 1.4), repeatType: "loop" }
          }}
        />
      </motion.g>

      {/* I */}
      <motion.g transform="translate(880, 0)">
        <motion.path
          d="M0 60L0.1 190"
          style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
          initial={initialProps}
          animate={animateProps}
          transition={{
            pathLength: { duration: calc(1.5), delay: calc(4.1), ease: "easeOut", repeat: Infinity, repeatDelay: calc(3), repeatType: "loop" },
            opacity: { duration: 0.1, delay: calc(4.1), repeat: Infinity, repeatDelay: calc(3 + 1.4), repeatType: "loop" }
          }}
        />
      </motion.g>
      
      {/* S */}
      <motion.g transform="translate(980, 0)">
        <motion.path
          d="M70 60L10 60L10 120L70 120L70 190L10 190"
          style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
          initial={initialProps}
          animate={animateProps}
          transition={{
            pathLength: { duration: calc(1.5), delay: calc(4.6), ease: "easeOut", repeat: Infinity, repeatDelay: calc(3), repeatType: "loop" },
            opacity: { duration: 0.1, delay: calc(4.6), repeat: Infinity, repeatDelay: calc(3 + 1.4), repeatType: "loop" }
          }}
        />
      </motion.g>

      {/* Tech accent elements underneath */}
      <motion.g className="stroke-purple-500 opacity-60">
        <motion.path
          d="M20 220L1050 220"
          strokeWidth="4"
          style={{ strokeLinecap: "square" }}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.6 }}
          transition={{
            pathLength: { duration: calc(2.0), ease: "easeOut", delay: calc(5.1), repeat: Infinity, repeatDelay: calc(3), repeatType: "loop" },
            opacity: { duration: 0.1, delay: calc(5.1), repeat: Infinity, repeatDelay: calc(3 + 1.4), repeatType: "loop" }
          }}
          onAnimationComplete={onAnimationComplete}
        />
      </motion.g>
    </motion.svg>
  );
}
