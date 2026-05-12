"use client";

import { cn } from "@/lib/cn";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "dark" | "light";
  /** Adds a subtle lift on hover. Default true. */
  hoverable?: boolean;
}

export function GlassCard({ children, className, variant = "dark", hoverable = true }: GlassCardProps) {
  return (
    <div
      className={cn(
        "relative rounded-2xl p-6 lift",
        variant === "dark" ? "glass" : "glass-light",
        hoverable && (variant === "dark"
          ? "hover:border-white/15 hover:shadow-[0_24px_64px_-20px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.1)]"
          : "hover:border-black/10 hover:shadow-[0_24px_64px_-20px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.9)]"),
        className
      )}
    >
      {children}
    </div>
  );
}
