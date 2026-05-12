"use client";

import { motion } from "framer-motion";

/**
 * Fixed full-viewport backdrop: ultra-soft animated gradient mesh + vignette.
 * Lives behind everything (z-index: 0; content sits above).
 * Only shows where sections are not opaque (i.e. on edges/transitions).
 */
export function PremiumBackdrop() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
      {/* Aurora mesh */}
      <motion.div
        className="absolute -inset-[30%]"
        animate={{ rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
        style={{
          background:
            "conic-gradient(from 0deg at 50% 50%, rgba(99,102,241,0.10), rgba(168,85,247,0.08), rgba(34,211,238,0.06), rgba(16,185,129,0.05), rgba(99,102,241,0.10))",
          filter: "blur(180px)",
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.55) 100%)",
        }}
      />
    </div>
  );
}
