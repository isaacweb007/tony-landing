"use client";

import { cn } from "@/lib/cn";

interface PhoneMockupProps {
  children: React.ReactNode;
  className?: string;
  tint?: "none" | "emerald" | "rose";
  /** Render with a soft glow + gradient backdrop to fill column space. */
  showcase?: boolean;
}

export function PhoneMockup({ children, className, tint = "none", showcase = true }: PhoneMockupProps) {
  return (
    <div
      className={cn(
        "relative mx-auto w-full",
        showcase ? "max-w-[320px] aspect-[280/580]" : "max-w-[280px] aspect-[280/580]",
        className
      )}
    >
      {showcase && (
        <>
          {/* Ambient gradient backdrop behind the phone */}
          <div
            className="absolute inset-[-12%] -z-10 rounded-[40%] blur-3xl opacity-60 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(37,99,235,0.18) 0%, rgba(139,92,246,0.12) 35%, rgba(16,185,129,0.08) 60%, transparent 75%)",
            }}
          />
          {/* Soft halo ring */}
          <div className="absolute inset-[-4%] -z-10 rounded-[3.5rem] border border-white/5 pointer-events-none" />
        </>
      )}

      <div className="relative w-full h-full">
        <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-b from-gray-700 to-gray-900 p-[3px] shadow-2xl shadow-black/50">
          <div className="relative w-full h-full rounded-[2.85rem] bg-surface-dark overflow-hidden">
            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[34%] h-[5%] bg-black rounded-b-2xl z-10" />

            {/* Screen content */}
            <div className="relative w-full h-full overflow-hidden">
              {tint === "emerald" && (
                <div className="absolute inset-0 bg-brand-emerald/5 z-[1] pointer-events-none" />
              )}
              {tint === "rose" && (
                <div className="absolute inset-0 bg-brand-rose/8 z-[1] pointer-events-none" />
              )}
              {children}
            </div>

            {/* Home indicator */}
            <div className="absolute bottom-[1.4%] left-1/2 -translate-x-1/2 w-[36%] h-[0.7%] bg-white/20 rounded-full z-10" />
          </div>
        </div>
      </div>
    </div>
  );
}
