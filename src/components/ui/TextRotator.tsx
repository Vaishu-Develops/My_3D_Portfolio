"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const TextRotator = ({
  words,
  className,
}: {
  words: string[];
  className?: string;
}) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 5000); // Slower interval for readability
    return () => clearInterval(interval);
  }, [words]);

  return (
    <div className={cn("overflow-hidden h-20 md:h-24 w-full relative", className)}>
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          exit={{ opacity: 0, filter: "blur(10px)", y: -20 }}
          transition={{ 
            duration: 0.8, 
            ease: [0.16, 1, 0.3, 1], // Custom cubic-bezier for premium feel
          }}
          className="absolute inset-0 flex items-center"
        >
          <p className="text-xl md:text-2xl text-purple-200/80 font-light leading-relaxed tracking-tight italic">
            &ldquo;{words[index]}&rdquo;
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
