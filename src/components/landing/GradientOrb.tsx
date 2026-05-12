"use client";

import { cn } from "@/lib/cn";

interface GradientOrbProps {
  color: string;
  size: number;
  blur?: number;
  className?: string;
  animation?: "float" | "float-slow";
}

export function GradientOrb({
  color,
  size,
  blur = 120,
  className,
  animation = "float",
}: GradientOrbProps) {
  return (
    <div
      className={cn(
        "absolute rounded-full pointer-events-none",
        animation === "float" ? "animate-float" : "animate-float-slow",
        className
      )}
      style={{
        width: size,
        height: size,
        background: color,
        filter: `blur(${blur}px)`,
      }}
      aria-hidden
    />
  );
}
