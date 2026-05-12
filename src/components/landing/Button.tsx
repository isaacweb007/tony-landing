"use client";

import { cn } from "@/lib/cn";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  href?: string;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  onClick,
  href,
}: ButtonProps) {
  const base =
    "relative inline-flex items-center justify-center gap-2 font-display font-semibold rounded-full select-none transition-[transform,box-shadow,background] duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] active:scale-[0.97] will-change-transform";

  const variants = {
    primary: cn(
      "text-white shimmer-overlay glow-primary",
      "bg-[linear-gradient(135deg,#2563eb_0%,#6366f1_45%,#8b5cf6_100%)]",
      "hover:-translate-y-0.5 hover:shadow-[0_14px_36px_-6px_rgba(99,102,241,0.6)]"
    ),
    secondary: cn(
      "text-white",
      "bg-white/[0.06] border border-white/15 backdrop-blur-sm",
      "hover:bg-white/[0.1] hover:border-white/25 hover:-translate-y-0.5",
      "hover:shadow-[0_10px_30px_-8px_rgba(255,255,255,0.15)]"
    ),
    ghost:
      "text-white/70 hover:text-white hover:bg-white/5",
  };

  const sizes = {
    sm: "px-5 py-2.5 text-sm",
    md: "px-7 py-3.5 text-base",
    lg: "px-9 py-4.5 text-lg",
  };

  const cls = cn(base, variants[variant], sizes[size], className);

  if (href) {
    const isExternal = /^https?:\/\//.test(href) || href.startsWith("mailto:");
    return (
      <a
        href={href}
        className={cls}
        onClick={onClick}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
      >
        <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
      </a>
    );
  }

  return (
    <button className={cls} onClick={onClick}>
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </button>
  );
}
