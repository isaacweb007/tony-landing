"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Button } from "./Button";
import { VideoModal } from "./VideoModal";
import { PreregisterForm } from "./PreregisterForm";
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

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10"
        >
          <Button variant="primary" size="lg" href="https://tony-ai.app/" className="!px-8 group">
            <span className="inline-flex items-center gap-2">
              {t("hero.deck.cta.demo")}
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </span>
          </Button>
          <Button variant="secondary" size="lg" href="#problem" className="!px-8">
            {t("hero.deck.cta.read")} ↓
          </Button>
        </motion.div>

        {/* Pre-register form */}
        <div className="mb-14">
          <PreregisterForm source="hero" variant="compact" />
        </div>

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
