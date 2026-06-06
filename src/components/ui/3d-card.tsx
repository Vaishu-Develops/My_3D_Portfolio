"use client";

import React, { createContext, useState, useContext, useRef, useEffect } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const MouseEnterContext = createContext<
  [boolean, React.Dispatch<React.SetStateAction<boolean>>] | undefined
>(undefined);

export const CardContainer = ({
  children,
  className,
  containerClassName,
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMouseEntered, setIsMouseEntered] = useState(false);
  const hasOrientationData = useRef(false);

  useEffect(() => {
    // Check if touch device
    const isTouch = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);
    const isReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!isTouch || isReducedMotion) return;

    // Force 3D layered depth active on touch devices
    setIsMouseEntered(true);

    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.beta === null || e.gamma === null) return;
      hasOrientationData.current = true;
      
      // Standard mobile viewing angle is ~45deg pitch
      const tiltX = Math.min(Math.max((e.beta - 45) * 0.4, -12), 12);
      const tiltY = Math.min(Math.max(e.gamma * 0.4, -12), 12);
      
      if (containerRef.current) {
        containerRef.current.style.transform = `rotateY(${tiltY}deg) rotateX(${-tiltX}deg)`;
      }
    };

    window.addEventListener('deviceorientation', handleOrientation);

    // Fallback float animation loop
    let floatFrame: number;
    let angle = 0;
    const animateFloat = () => {
      if (hasOrientationData.current) return;
      angle += 0.02;
      const rotateY = Math.sin(angle) * 5;
      const rotateX = Math.cos(angle * 1.5) * 3;
      
      if (containerRef.current) {
        containerRef.current.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
      }
      floatFrame = requestAnimationFrame(animateFloat);
    };

    // Delay start of float to let page stabilize
    const timeoutId = setTimeout(() => {
      if (!hasOrientationData.current) {
        animateFloat();
      }
    }, 1000);

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
      clearTimeout(timeoutId);
      if (floatFrame) cancelAnimationFrame(floatFrame);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, top, width, height } =
      containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 25;
    const y = (e.clientY - top - height / 2) / 25;
    containerRef.current.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`;
  };

  const handleMouseEnter = () => {
    setIsMouseEntered(true);
    if (!containerRef.current) return;
  };

  const handleMouseLeave = () => {
    if (!containerRef.current) return;
    setIsMouseEntered(false);
    containerRef.current.style.transform = `rotateY(0deg) rotateX(0deg)`;
  };

  return (
    <MouseEnterContext.Provider value={[isMouseEntered, setIsMouseEntered]}>
      <div
        className={cn(
          "flex items-center justify-center relative p-2",
          containerClassName
        )}
        style={{
          perspective: "1000px",
        }}
      >
        <div
          ref={containerRef}
          onMouseEnter={handleMouseEnter}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className={cn(
            "flex items-center justify-center transition-all duration-200 ease-linear",
            className
          )}
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {children}
        </div>
      </div>
    </MouseEnterContext.Provider>
  );
};

export const CardBody = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "h-96 w-96 [transform-style:preserve-3d]  [&>*]:[transform-style:preserve-3d]",
        className
      )}
    >
      {children}
    </div>
  );
};

export const CardItem = ({
  as: Tag = "div",
  children,
  className,
  translateX = 0,
  translateY = 0,
  translateZ = 0,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
  ...rest
}: {
  as?: any;
  children: React.ReactNode;
  className?: string;
  translateX?: number | string;
  translateY?: number | string;
  translateZ?: number | string;
  rotateX?: number | string;
  rotateY?: number | string;
  rotateZ?: number | string;
  [key: string]: any;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isMouseEntered] = useMouseEnter();

  useEffect(() => {
    handleAnimations();
  }, [isMouseEntered]);

  const handleAnimations = () => {
    if (!ref.current) return;
    if (isMouseEntered) {
      ref.current.style.transform = `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`;
    } else {
      ref.current.style.transform = `translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)`;
    }
  };

  return (
    <Tag
      ref={ref}
      className={cn("w-fit transition duration-200 ease-linear", className)}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export const useMouseEnter = () => {
  const context = useContext(MouseEnterContext);
  if (context === undefined) {
    throw new Error("useMouseEnter must be used within a MouseEnterProvider");
  }
  return context;
};
