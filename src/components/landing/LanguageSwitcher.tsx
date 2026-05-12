"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useI18n } from "@/i18n/I18nProvider";
import { LOCALES, LOCALE_LABELS } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/dictionaries";

function GlobeIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
    </svg>
  );
}

function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}

interface Props {
  variant?: "navbar" | "mobile";
}

export function LanguageSwitcher({ variant = "navbar" }: Props) {
  const { locale, setLocale } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const current = LOCALE_LABELS[locale];

  if (variant === "mobile") {
    return (
      <div className="space-y-1.5">
        <div className="text-[10px] uppercase tracking-widest text-white/30 font-body font-semibold px-2 mb-2">
          Language · 언어
        </div>
        <div className="grid grid-cols-5 gap-1.5">
          {LOCALES.map((l) => {
            const isActive = l === locale;
            return (
              <button
                key={l}
                onClick={() => setLocale(l)}
                className={`relative flex flex-col items-center justify-center gap-0.5 py-2 rounded-xl border transition-all ${
                  isActive
                    ? "bg-gradient-to-br from-brand-primary/15 to-brand-violet/10 border-brand-primary/30 text-white"
                    : "bg-white/[0.03] border-white/5 text-white/60 hover:bg-white/[0.06]"
                }`}
              >
                <span className="text-[9px] font-bold tracking-wider">{LOCALE_LABELS[l].flag}</span>
                <span className="text-[10px] font-body leading-none">{LOCALE_LABELS[l].native}</span>
                {isActive && (
                  <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-brand-emerald" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Change language"
        aria-expanded={open}
        className={`relative flex items-center gap-1.5 px-3 h-9 rounded-full text-sm font-body transition-all border ${
          open
            ? "bg-white/10 border-white/15 text-white"
            : "bg-white/[0.03] border-white/5 text-white/70 hover:text-white hover:bg-white/[0.06]"
        }`}
      >
        <GlobeIcon className="w-3.5 h-3.5" />
        <span className="text-[11px] font-bold tracking-wider">{current.flag}</span>
        <svg
          className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.96 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute right-0 top-full mt-2 w-44 rounded-2xl bg-surface-dark/95 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/40 p-1.5 z-50"
          >
            {LOCALES.map((l) => {
              const isActive = l === locale;
              const meta = LOCALE_LABELS[l];
              return (
                <button
                  key={l}
                  onClick={() => {
                    setLocale(l as Locale);
                    setOpen(false);
                  }}
                  className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-left transition-colors ${
                    isActive ? "bg-white/10" : "hover:bg-white/5"
                  }`}
                >
                  <span className="w-7 h-5 rounded flex items-center justify-center text-[9px] font-bold tracking-wider bg-white/10 text-white/80 border border-white/5">
                    {meta.flag}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-white font-medium leading-tight">{meta.native}</div>
                    <div className="text-[10px] text-white/40 leading-tight">{meta.label}</div>
                  </div>
                  {isActive && <CheckIcon className="w-3.5 h-3.5 text-brand-emerald" />}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
