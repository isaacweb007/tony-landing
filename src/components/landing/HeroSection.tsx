"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { VideoModal } from "./VideoModal";
import { PreregisterModal } from "./PreregisterModal";
import { useT } from "@/i18n/I18nProvider";
import type { TKey } from "@/i18n/dictionaries";

// Deterministic pseudo-random for the constellation field (SSR-stable)
const STARS = Array.from({ length: 38 }, (_, i) => {
  const a = Math.sin(i * 12.9898) * 43758.5453;
  const b = Math.sin(i * 78.233) * 43758.5453;
  const c = Math.sin(i * 31.41) * 43758.5453;
  return {
    x: ((a - Math.floor(a)) * 100),
    y: ((b - Math.floor(b)) * 100),
    size: 1 + (c - Math.floor(c)) * 1.8,
    delay: (i % 6) * 0.4,
  };
});

const ROTATE_KEYS: TKey[] = ["hero.rotate.1", "hero.rotate.2", "hero.rotate.3", "hero.rotate.4", "hero.rotate.5"];
const LIVE_KEYS: TKey[] = ["hero.live.1", "hero.live.2", "hero.live.3", "hero.live.4", "hero.live.5"];

export function HeroSection() {
  const t = useT();
  const [videoOpen, setVideoOpen] = useState(false);
  const [preregOpen, setPreregOpen] = useState(false);
  const [wordIdx, setWordIdx] = useState(0);
  const [liveIdx, setLiveIdx] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  // Mouse-tracking spotlight
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const smx = useSpring(mx, { stiffness: 60, damping: 20 });
  const smy = useSpring(my, { stiffness: 60, damping: 20 });
  const spotlight = useTransform(
    [smx, smy] as unknown as [typeof smx, typeof smy],
    (latest) => {
      const [x, y] = latest as unknown as [number, number];
      return `radial-gradient(600px circle at ${x}% ${y}%, rgba(99,102,241,0.18), transparent 50%)`;
    }
  );

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const handler = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      mx.set(((e.clientX - r.left) / r.width) * 100);
      my.set(((e.clientY - r.top) / r.height) * 100);
    };
    el.addEventListener("mousemove", handler);
    return () => el.removeEventListener("mousemove", handler);
  }, [mx, my]);

  // Cycle rotating verb after the first title line
  useEffect(() => {
    const id = setInterval(() => setWordIdx((i) => (i + 1) % ROTATE_KEYS.length), 2600);
    return () => clearInterval(id);
  }, []);

  // Cycle live ticker
  useEffect(() => {
    const id = setInterval(() => setLiveIdx((i) => (i + 1) % LIVE_KEYS.length), 2400);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-20 overflow-hidden pt-24 pb-16"
    >
      {/* Animated gradient mesh */}
      <motion.div
        className="absolute -inset-[20%] -z-10 opacity-90 pointer-events-none"
        animate={{ rotate: 360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
        style={{
          background:
            "conic-gradient(from 0deg at 50% 50%, rgba(99,102,241,0.15), rgba(168,85,247,0.1), rgba(34,211,238,0.08), rgba(16,185,129,0.06), rgba(99,102,241,0.15))",
          filter: "blur(120px)",
        }}
      />

      {/* Mouse spotlight */}
      <motion.div
        className="absolute inset-0 pointer-events-none mix-blend-screen"
        style={{ background: spotlight }}
      />

      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,1) 1px, transparent 0)",
          backgroundSize: "40px 40px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 70%)",
        }}
      />

      {/* Constellation stars */}
      <div className="absolute inset-0 pointer-events-none">
        {STARS.map((s, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full bg-white"
            style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.size, height: s.size }}
            animate={{ opacity: [0.2, 0.85, 0.2] }}
            transition={{ duration: 2.4 + (i % 3), repeat: Infinity, delay: s.delay }}
          />
        ))}
      </div>

      {/* Floating Tony orb */}
      <motion.div
        className="absolute right-[8%] top-[28%] w-32 h-32 rounded-full pointer-events-none hidden lg:block"
        animate={{ y: [0, -18, 0], rotate: [0, 6, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(168,85,247,0.5), rgba(99,102,241,0.3) 50%, transparent 75%)",
          filter: "blur(8px)",
        }}
      />
      <motion.div
        className="absolute left-[10%] bottom-[20%] w-24 h-24 rounded-full pointer-events-none hidden lg:block"
        animate={{ y: [0, 14, 0], rotate: [0, -8, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
        style={{
          background:
            "radial-gradient(circle at 70% 30%, rgba(34,211,238,0.4), rgba(99,102,241,0.2) 50%, transparent 75%)",
          filter: "blur(6px)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto w-full">
        {/* Investor Deck Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-white/[0.04] border border-white/10 text-[13px] font-body font-semibold text-white/70 tracking-wider backdrop-blur-sm">
            <span className="relative inline-flex">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-emerald" />
              <span className="absolute inset-0 w-1.5 h-1.5 rounded-full bg-brand-emerald animate-ping opacity-75" />
            </span>
            {t("hero.deck.badge")}
          </span>
        </motion.div>

        {/* Mega headline with rotating verb */}
        <h1 className="font-display font-extrabold leading-[0.95] tracking-tight mb-8">
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="block text-[14vw] sm:text-[12vw] md:text-[10vw] lg:text-[8.5vw] xl:text-[128px]"
            style={{
              background: "linear-gradient(135deg, #c7d2fe 0%, #ffffff 50%, #e9d5ff 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {t("hero.deck.title.1")}
          </motion.span>
          <div className="relative block h-[14vw] sm:h-[12vw] md:h-[10vw] lg:h-[8.5vw] xl:h-[128px]">
            <AnimatePresence mode="wait">
              <motion.span
                key={wordIdx}
                initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -24, filter: "blur(8px)" }}
                transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="absolute inset-0 flex items-center justify-center text-[14vw] sm:text-[12vw] md:text-[10vw] lg:text-[8.5vw] xl:text-[128px]"
                style={{
                  background:
                    "linear-gradient(135deg, #6366f1 0%, #a855f7 35%, #22d3ee 70%, #6366f1 100%)",
                  backgroundSize: "200% 100%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  animation: "shimmer 6s linear infinite",
                }}
              >
                {t(ROTATE_KEYS[wordIdx])}
              </motion.span>
            </AnimatePresence>
          </div>
        </h1>

        {/* Sub copy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.6 }}
          className="font-body text-base sm:text-lg md:text-xl text-white/60 max-w-3xl mx-auto mb-8 leading-relaxed"
        >
          <div>{t("hero.deck.sub.line1")}</div>
          <div className="mt-1">{t("hero.deck.sub.line2")}</div>
          <div className="mt-1">
            <strong className="text-white font-semibold">{t("hero.deck.sub.line3.strong")}</strong>
            {t("hero.deck.sub.line3.tail")}
          </div>
        </motion.div>

        {/* Live activity ticker */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.6 }}
          className="mb-8 flex justify-center"
        >
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-brand-emerald/[0.06] border border-brand-emerald/25 backdrop-blur-sm">
            <span className="flex items-center gap-1.5">
              <span className="relative inline-flex">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-emerald" />
                <span className="absolute inset-0 w-1.5 h-1.5 rounded-full bg-brand-emerald animate-ping opacity-75" />
              </span>
              <span className="text-[10px] font-display font-bold tracking-widest uppercase text-brand-emerald">
                {t("hero.live.label")}
              </span>
            </span>
            <span className="w-px h-3 bg-white/15" />
            <div className="relative h-5 overflow-hidden min-w-[200px] sm:min-w-[260px]">
              <AnimatePresence mode="wait">
                <motion.span
                  key={liveIdx}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 text-[12px] sm:text-[13px] font-body text-white/80 whitespace-nowrap text-left tabular-nums"
                >
                  {t(LIVE_KEYS[liveIdx])}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* CTAs — unified premium pill row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-stretch justify-center gap-3 mb-6"
        >
          {/* Tier 1 — Primary CTA: launch demo */}
          <a
            href="https://tony-ai.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center gap-2.5 h-14 px-7 rounded-full font-display font-semibold text-[15px] text-white whitespace-nowrap select-none overflow-hidden
                       bg-[linear-gradient(135deg,#2563eb_0%,#6366f1_45%,#8b5cf6_100%)]
                       shadow-[0_10px_28px_-8px_rgba(99,102,241,0.55),inset_0_1px_0_rgba(255,255,255,0.18)]
                       hover:shadow-[0_18px_44px_-10px_rgba(99,102,241,0.75),inset_0_1px_0_rgba(255,255,255,0.22)]
                       hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]
                       transition-all duration-300 will-change-transform"
          >
            {/* shimmer sweep */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"
              style={{
                background:
                  "linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.22) 50%, transparent 70%)",
              }}
            />
            <span className="relative z-10 inline-flex items-center justify-center w-6 h-6 rounded-full bg-white/15 ring-1 ring-white/25">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </span>
            <span className="relative z-10">{t("hero.deck.cta.demo")}</span>
            <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>

          {/* Tier 2 — Secondary: preregister */}
          <button
            onClick={() => setPreregOpen(true)}
            className="group relative inline-flex items-center justify-center gap-2.5 h-14 px-7 rounded-full font-display font-semibold text-[15px] text-white whitespace-nowrap select-none overflow-hidden
                       bg-white/[0.04] backdrop-blur-xl
                       ring-1 ring-inset ring-white/15
                       shadow-[0_6px_20px_-8px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.08)]
                       hover:bg-white/[0.07] hover:ring-white/30
                       hover:shadow-[0_12px_30px_-10px_rgba(16,185,129,0.25),inset_0_1px_0_rgba(255,255,255,0.12)]
                       hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]
                       transition-all duration-300 will-change-transform"
          >
            {/* subtle emerald aura on hover */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background:
                  "radial-gradient(120% 80% at 50% 100%, rgba(16,185,129,0.22), transparent 60%)",
              }}
            />
            <span className="relative z-10 inline-flex items-center justify-center w-6 h-6 rounded-full bg-brand-emerald/15 ring-1 ring-brand-emerald/30 text-brand-emerald">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 13l4 4L19 7" />
              </svg>
            </span>
            <span className="relative z-10">{t("prereg.cta")}</span>
          </button>

          {/* Tier 3 — Tertiary: read deck */}
          <a
            href="https://drive.google.com/file/d/1PWtXE9x0gD6nUK8ODbWzvW6AaWzerQsV/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center gap-2.5 h-14 px-7 rounded-full font-display font-semibold text-[15px] text-white/85 whitespace-nowrap select-none overflow-hidden
                       bg-white/[0.02] backdrop-blur-xl
                       ring-1 ring-inset ring-white/10
                       shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]
                       hover:bg-white/[0.05] hover:ring-white/20 hover:text-white
                       hover:shadow-[0_10px_28px_-10px_rgba(245,158,11,0.25),inset_0_1px_0_rgba(255,255,255,0.08)]
                       hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]
                       transition-all duration-300 will-change-transform"
          >
            <span className="relative z-10 inline-flex items-center justify-center w-6 h-6 rounded-full bg-brand-amber/15 ring-1 ring-brand-amber/30 text-brand-amber">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8l-5-5z" />
                <path d="M14 3v5h5M9 13h6M9 17h4" />
              </svg>
            </span>
            <span className="relative z-10">{t("hero.deck.cta.read")}</span>
            <span className="relative z-10 transition-transform duration-300 group-hover:translate-y-0.5">↓</span>
          </a>
        </motion.div>

        {/* Inline reassurance line under CTAs */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.05, duration: 0.5 }}
          className="text-[12px] text-white/40 font-body mb-14 flex items-center justify-center gap-3 flex-wrap"
        >
          <span className="inline-flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-brand-emerald" />
            {t("prereg.feature.1")}
          </span>
          <span className="text-white/15">·</span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-brand-emerald" />
            {t("prereg.feature.2")}
          </span>
          <span className="text-white/15">·</span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-brand-emerald" />
            {t("prereg.feature.3")}
          </span>
        </motion.p>

        {/* Stats card with count-up */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 0.7 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 md:p-8 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-sm max-w-4xl mx-auto"
        >
          <Stat raw={t("hero.deck.stat.1.value")} label={t("hero.deck.stat.1.label")} />
          <Stat raw={t("hero.deck.stat.2.value")} label={t("hero.deck.stat.2.label")} />
          <Stat raw={t("hero.deck.stat.3.value")} label={t("hero.deck.stat.3.label")} />
          <Stat raw={t("hero.deck.stat.4.value")} label={t("hero.deck.stat.4.label")} />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2 text-white/25">
          <span className="text-[10px] tracking-[0.2em] font-body">SCROLL</span>
          <motion.div
            animate={{ scaleY: [0.4, 1, 0.4] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-8 bg-gradient-to-b from-transparent via-white/40 to-transparent origin-top"
          />
        </div>
      </motion.div>

      <VideoModal isOpen={videoOpen} onClose={() => setVideoOpen(false)} />
      <PreregisterModal isOpen={preregOpen} onClose={() => setPreregOpen(false)} source="hero" />

      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
      `}</style>
    </section>
  );
}

// Animated count-up stat. Detects numeric prefix and animates from 0.
function Stat({ raw, label }: { raw: string; label: string }) {
  const [displayed, setDisplayed] = useState(0);
  // Parse leading digits like "11", "100", "1" (from "1억+"). Anything else: render as-is.
  const m = raw.match(/^[^\d]*([\d,.]+)(.*)$/);
  const targetNum = m ? Number(m[1].replace(/,/g, "")) : NaN;
  const prefix = m ? raw.substring(0, raw.indexOf(m[1])) : "";
  const suffix = m ? m[2] : "";

  useEffect(() => {
    if (!isFinite(targetNum)) return;
    const start = performance.now();
    const dur = 1500;
    let raf: number;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplayed(Math.round(targetNum * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [targetNum]);

  return (
    <div className="text-center">
      <div
        className="font-display font-extrabold text-3xl md:text-4xl lg:text-5xl leading-none tabular-nums"
        style={{
          background: "linear-gradient(135deg, #ffffff, #a5b4fc)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          letterSpacing: "-0.02em",
        }}
      >
        {isFinite(targetNum) ? `${prefix}${displayed.toLocaleString()}${suffix}` : raw}
      </div>
      <div className="text-[11px] md:text-xs text-white/40 mt-2 font-body font-medium leading-tight">
        {label}
      </div>
    </div>
  );
}
