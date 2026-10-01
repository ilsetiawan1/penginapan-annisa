"use client";

import { useEffect, useRef, useState } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "fade";
}

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (ref.current) observer.unobserve(ref.current);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const getTransitionStyle = () => {
    if (isVisible) {
      return "opacity-100 translate-y-0 scale-100";
    }
    if (direction === "up") {
      return "opacity-0 translate-y-10 scale-[0.985]";
    }
    if (direction === "down") {
      return "opacity-0 -translate-y-10 scale-[0.985]";
    }
    return "opacity-0";
  };

  return (
    <div
      ref={ref}
      style={{
        transitionDuration: "850ms",
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        transitionDelay: `${delay}ms`,
      }}
      className={`transition-all will-change-[transform,opacity] ${getTransitionStyle()} ${className}`}
    >
      {children}
    </div>
  );
}
