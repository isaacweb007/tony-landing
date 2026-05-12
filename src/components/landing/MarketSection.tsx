"use client";

import { useEffect, useState } from "react";
import type { ComponentType, SVGProps } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionWrapper } from "./SectionWrapper";
import { AnimatedCounter } from "./AnimatedCounter";
import { GlassCard } from "./GlassCard";
import { useInView } from "@/hooks/useInView";
import { staggerContainer, fadeUp } from "@/lib/animations";
import { LeafIcon, RocketIcon, BoltIcon, FlameIcon, GlobeIcon, BrainIcon, CrownIcon } from "./Icon";
import { useT } from "@/i18n/I18nProvider";
import type { TKey } from "@/i18n/dictionaries";

export function MarketSection() {
  const t = useT();
  const { ref, isInView } = useInView();

  return (
    <SectionWrapper id="market" dark={false}>
      <div className="text-center mb-16">
        <p className="text-sm font-body font-semibold text-brand-amber mb-4 uppercase tracking-widest">
          {t("market.tag")}
        </p>
        <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-gray-900 leading-tight">
          {t("market.title.1")}
          <br />
          <span className="text-gradient-primary">{t("market.title.2")}</span> {t("market.title.3")}
        </h2>
      </div>

      {/* Market stats */}
      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
        className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16"
      >
        <motion.div variants={fadeUp}>
          <GlassCard variant="light" className="text-center h-full">
            <div className="font-display font-bold text-4xl md:text-5xl text-gray-900 mb-2">
              $<AnimatedCounter to={35} />B
            </div>
            <div className="font-body text-sm text-gray-500">{t("market.stat.1.label")}</div>
          </GlassCard>
        </motion.div>

        <motion.div variants={fadeUp}>
          <GlassCard variant="light" className="text-center h-full border-2 !border-brand-primary/20">
            <div className="font-display font-bold text-4xl md:text-5xl text-brand-primary mb-2">
              $<AnimatedCounter to={250} />B
            </div>
            <div className="font-body text-sm text-gray-500">{t("market.stat.2.label")}</div>
            <div className="mt-2 text-xs text-brand-emerald font-semibold">{t("market.stat.2.growth")}</div>
          </GlassCard>
        </motion.div>

        <motion.div variants={fadeUp}>
          <GlassCard variant="light" className="text-center h-full">
            <div className="font-display font-bold text-4xl md:text-5xl text-gray-900 mb-2">
              $<AnimatedCounter to={80} />B
            </div>
            <div className="font-body text-sm text-gray-500">{t("market.stat.3.label")}</div>
          </GlassCard>
        </motion.div>
      </motion.div>

      {/* Growth chart */}
      <div className="max-w-3xl mx-auto mb-16">
        <div className="rounded-3xl bg-white border border-gray-100 shadow-xl shadow-brand-primary/5 p-6 md:p-8">
          {/* Chart header */}
          <div className="flex items-start justify-between mb-6 flex-wrap gap-3">
            <div>
              <div className="text-xs font-body uppercase tracking-widest text-gray-400 mb-1">
                Global AI Agent Market
              </div>
              <div className="font-display font-bold text-xl text-gray-900">
                {t("market.chart.h")}
              </div>
            </div>
            <div className="flex items-center gap-4 text-xs font-body">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-gray-300" />
                <span className="text-gray-500">{t("market.legend.actual")}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-gradient-to-t from-brand-primary to-brand-violet" />
                <span className="text-gray-500">{t("market.legend.forecast")}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 bg-brand-amber" />
                <span className="text-gray-500">{t("market.legend.cagr")}</span>
              </div>
            </div>
          </div>

          {/* Chart body */}
          <InteractiveChart inView={isInView} />
          {false && (() => {
            const bars = [
              { year: "2024", value: 35, label: "기준", forecast: false },
              { year: "2025", value: 50, label: null, forecast: false },
              { year: "2026", value: 70, label: "Golden Window", forecast: false, highlight: true },
              { year: "2027", value: 98, label: null, forecast: false, highlight: true },
              { year: "2028", value: 138, label: null, forecast: true },
              { year: "2029", value: 188, label: null, forecast: true },
              { year: "2030", value: 250, label: "+614%", forecast: true, peak: true },
            ];
            const max = 280;
            const ticks = [0, 50, 100, 150, 200, 250];
            return (
              <div className="relative">
                {/* Y-axis grid + labels */}
                <div className="relative h-64 ml-10">
                  {ticks.map((t) => (
                    <div
                      key={t}
                      className="absolute left-0 right-0 border-t border-dashed border-gray-100 flex items-center"
                      style={{ bottom: `${(t / max) * 100}%` }}
                    >
                      <span className="absolute -left-10 -translate-y-1/2 text-[10px] font-body text-gray-400 tabular-nums">
                        ${t}B
                      </span>
                    </div>
                  ))}

                  {/* Golden Window backdrop (2026-2027) */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="absolute top-0 bottom-0 bg-gradient-to-b from-brand-amber/10 to-transparent rounded-md pointer-events-none"
                    style={{ left: "calc(2/7 * 100%)", width: "calc(2/7 * 100%)" }}
                  >
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-brand-amber text-white text-[9px] font-semibold whitespace-nowrap shadow-md">
                      Golden Window
                    </div>
                  </motion.div>

                  {/* Bars */}
                  <div className="absolute inset-0 flex items-end gap-2">
                    {bars.map((bar, i) => {
                      const heightPct = (bar.value / max) * 100;
                      const fillClass = bar.peak
                        ? "bg-gradient-to-t from-brand-primary via-brand-violet to-brand-emerald"
                        : bar.forecast
                        ? "bg-gradient-to-t from-brand-primary/70 to-brand-violet/60"
                        : bar.highlight
                        ? "bg-gradient-to-t from-brand-primary to-brand-primary/80"
                        : "bg-gray-300";
                      return (
                        <div key={bar.year} className="flex-1 h-full flex flex-col items-center justify-end relative group">
                          <motion.div
                            initial={{ opacity: 0, y: -4 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.6 + i * 0.1, duration: 0.4 }}
                            className={`text-[11px] md:text-xs font-display font-bold tabular-nums mb-1 ${
                              bar.peak ? "text-brand-primary" : bar.forecast ? "text-brand-violet" : "text-gray-500"
                            }`}
                          >
                            ${bar.value}B
                          </motion.div>
                          <motion.div
                            initial={{ height: 0 }}
                            whileInView={{ height: `${heightPct}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.3 + i * 0.08 }}
                            className={`w-full max-w-[44px] rounded-t-lg ${fillClass} relative ${
                              bar.peak ? "shadow-lg shadow-brand-primary/30" : ""
                            }`}
                          >
                            {bar.peak && (
                              <motion.div
                                initial={{ opacity: 0, scale: 0.5 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 1.6, type: "spring" }}
                                className="absolute -top-8 right-0 translate-x-2 px-2 py-1 rounded-md bg-brand-emerald text-white text-[10px] font-bold whitespace-nowrap shadow-lg z-10"
                              >
                                {bar.label}
                                <span className="absolute left-2 -bottom-1 w-2 h-2 rotate-45 bg-brand-emerald" />
                              </motion.div>
                            )}
                          </motion.div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Trend line overlay */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 700 256" preserveAspectRatio="none">
                    <motion.path
                      d={(() => {
                        const points = bars.map((b, i) => {
                          const x = (i + 0.5) * (700 / bars.length);
                          const y = 256 - (b.value / max) * 256;
                          return `${x},${y}`;
                        });
                        return `M ${points.join(" L ")}`;
                      })()}
                      stroke="url(#trendGrad)"
                      strokeWidth="2"
                      strokeDasharray="5 4"
                      fill="none"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.6, delay: 1, ease: "easeInOut" }}
                    />
                    <defs>
                      <linearGradient id="trendGrad" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#f59e0b" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

                {/* X-axis labels */}
                <div className="ml-10 flex gap-2 mt-3">
                  {bars.map((bar) => (
                    <div key={bar.year} className="flex-1 text-center">
                      <div className={`text-xs font-body tabular-nums ${bar.peak ? "text-brand-primary font-bold" : "text-gray-500"}`}>
                        {bar.year}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}

          {/* Footnote */}
          <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-[11px] font-body text-gray-400 flex-wrap gap-2">
            <span>{t("market.source")}</span>
            <div className="flex items-center gap-3">
              <span className="text-gray-500">2024 → 2030</span>
              <span className="px-2 py-0.5 rounded-full bg-brand-emerald/10 text-brand-emerald font-semibold">
                {t("market.growth.7x")}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Funnel — user acquisition roadmap */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto mb-12"
      >
        <h3 className="font-display font-bold text-xl md:text-2xl text-center text-gray-900 mb-6">
          {t("market.funnel.title")}
        </h3>
        <div className="flex flex-col items-center gap-3">
          {[
            { lk: "market.funnel.1.l", vk: "market.funnel.1.v", width: 100 },
            { lk: "market.funnel.2.l", vk: "market.funnel.2.v", width: 80 },
            { lk: "market.funnel.3.l", vk: "market.funnel.3.v", width: 60 },
            { lk: "market.funnel.4.l", vk: "market.funnel.4.v", width: 45 },
          ].map((row, i) => (
            <motion.div
              key={row.lk}
              initial={{ opacity: 0, scaleX: 0.8 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="rounded-2xl px-6 py-5 bg-gradient-to-br from-brand-primary/8 to-brand-violet/6 border border-brand-primary/20 flex items-center justify-between gap-4 origin-center"
              style={{ width: `${row.width}%`, minWidth: 280 }}
            >
              <span className="font-body text-sm font-semibold text-gray-600">{t(row.lk as TKey)}</span>
              <span className="font-display font-extrabold text-xl md:text-2xl text-gray-900 tabular-nums">
                {t(row.vk as TKey)}
              </span>
            </motion.div>
          ))}
        </div>
        <p className="text-center text-xs text-gray-400 mt-4 font-body leading-relaxed max-w-2xl mx-auto">
          {t("market.funnel.note")}
        </p>
      </motion.div>

      {/* Quote */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-2xl mx-auto"
      >
        <GlassCard variant="light" className="text-center !border-brand-violet/15">
          <blockquote className="font-display font-semibold text-lg md:text-xl text-gray-800 leading-relaxed whitespace-pre-line">
            {t("market.quote")}
          </blockquote>
        </GlassCard>
      </motion.div>
    </SectionWrapper>
  );
}

interface YearData {
  year: number;
  value: number;
  growth: number;
  event: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  iconColor: string;
  forecast: boolean;
  highlight?: boolean;
  peak?: boolean;
  eventKey: TKey;
}

const YEARS: YearData[] = [
  { year: 2024, value: 35, growth: 0,   event: "", eventKey: "market.event.2024", Icon: LeafIcon,    iconColor: "text-emerald-500",   forecast: false },
  { year: 2025, value: 50, growth: 43,  event: "", eventKey: "market.event.2025", Icon: RocketIcon,  iconColor: "text-brand-primary", forecast: false },
  { year: 2026, value: 70, growth: 100, event: "", eventKey: "market.event.2026", Icon: BoltIcon,    iconColor: "text-brand-amber",   forecast: false, highlight: true },
  { year: 2027, value: 98, growth: 180, event: "", eventKey: "market.event.2027", Icon: FlameIcon,   iconColor: "text-orange-500",    forecast: false, highlight: true },
  { year: 2028, value: 138,growth: 294, event: "", eventKey: "market.event.2028", Icon: GlobeIcon,   iconColor: "text-brand-violet",  forecast: true },
  { year: 2029, value: 188,growth: 437, event: "", eventKey: "market.event.2029", Icon: BrainIcon,   iconColor: "text-fuchsia-500",   forecast: true },
  { year: 2030, value: 250,growth: 614, event: "", eventKey: "market.event.2030", Icon: CrownIcon,   iconColor: "text-brand-amber",   forecast: true, peak: true },
];

function InteractiveChart({ inView }: { inView: boolean }) {
  const t = useT();
  const max = 280;
  const ticks = [0, 50, 100, 150, 200, 250];
  const [activeIdx, setActiveIdx] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);

  // Auto-advance year scrubber
  useEffect(() => {
    if (!inView || !playing) return;
    const id = setInterval(() => {
      setActiveIdx((i) => (i + 1) % YEARS.length);
    }, 1600);
    return () => clearInterval(id);
  }, [inView, playing]);

  const focusIdx = hoverIdx ?? activeIdx;
  const focus = YEARS[focusIdx];

  return (
    <div className="space-y-5">
      {/* Year scrubber timeline */}
      <div className="bg-gradient-to-r from-gray-50 to-white rounded-2xl p-4 border border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={() => setPlaying((p) => !p)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-primary text-white text-xs font-semibold hover:bg-brand-primary/90 transition-colors shadow-md shadow-brand-primary/20"
            aria-label={playing ? t("market.autoplay.on") : t("market.autoplay.off")}
          >
            {playing ? (
              <>
                <span className="flex gap-0.5">
                  <span className="w-0.5 h-2.5 bg-white" />
                  <span className="w-0.5 h-2.5 bg-white" />
                </span>
                {t("market.autoplay.on")}
              </>
            ) : (
              <>
                <svg className="w-2.5 h-2.5" viewBox="0 0 8 8" fill="currentColor">
                  <path d="M1 0 L7 4 L1 8 Z" />
                </svg>
                {t("market.autoplay.off")}
              </>
            )}
          </button>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">{t("market.now.label")}</span>
            <AnimatePresence mode="popLayout">
              <motion.span
                key={focus.year}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
                className="font-display font-bold text-2xl text-brand-primary tabular-nums"
              >
                {focus.year}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>

        {/* Timeline track with year dots */}
        <div className="relative h-2 rounded-full bg-gray-200 overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-brand-primary via-brand-violet to-brand-emerald"
            animate={{ width: `${((focusIdx + 1) / YEARS.length) * 100}%` }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </div>
        <div className="flex justify-between mt-2 px-0.5">
          {YEARS.map((y, i) => (
            <button
              key={y.year}
              onClick={() => {
                setActiveIdx(i);
                setPlaying(false);
              }}
              onMouseEnter={() => setHoverIdx(i)}
              onMouseLeave={() => setHoverIdx(null)}
              className="group flex flex-col items-center cursor-pointer focus:outline-none"
            >
              <div
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  i <= focusIdx
                    ? y.peak
                      ? "bg-brand-emerald scale-125 ring-2 ring-brand-emerald/30"
                      : "bg-brand-primary"
                    : "bg-gray-300"
                } ${i === focusIdx ? "scale-150 ring-2 ring-brand-primary/30" : ""}`}
              />
              <span
                className={`text-[10px] mt-1 tabular-nums transition-colors ${
                  i === focusIdx ? "text-brand-primary font-bold" : "text-gray-400 group-hover:text-gray-600"
                }`}
              >
                {y.year}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Active year info card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={focus.year}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-3 gap-3"
        >
          <div className="rounded-xl bg-white border border-gray-100 p-3">
            <div className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold mb-1">{t("market.size.label")}</div>
            <div className="font-display font-bold text-2xl text-gray-900 tabular-nums">
              $<CountUp value={focus.value} />B
            </div>
          </div>
          <div className="rounded-xl bg-brand-emerald/5 border border-brand-emerald/20 p-3">
            <div className="text-[10px] uppercase tracking-wider text-brand-emerald font-semibold mb-1">{t("market.vs.label")}</div>
            <div className="font-display font-bold text-2xl text-brand-emerald tabular-nums">
              {focus.growth === 0 ? t("market.baseline") : `+${focus.growth}%`}
            </div>
          </div>
          <div className="rounded-xl bg-brand-violet/5 border border-brand-violet/20 p-3 flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg bg-white flex items-center justify-center shrink-0 ${focus.iconColor} shadow-sm`}>
              <focus.Icon className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[10px] uppercase tracking-wider text-brand-violet font-semibold mb-0.5">
                {t("market.event.label")}
              </div>
              <div className="text-[11px] text-gray-700 leading-tight font-medium truncate">{t(focus.eventKey)}</div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Bar chart */}
      <div className="relative">
        <div className="relative h-64 ml-10">
          {/* Y-axis grid */}
          {ticks.map((t) => (
            <div
              key={t}
              className="absolute left-0 right-0 border-t border-dashed border-gray-100 flex items-center"
              style={{ bottom: `${(t / max) * 100}%` }}
            >
              <span className="absolute -left-10 -translate-y-1/2 text-[10px] font-body text-gray-400 tabular-nums">
                ${t}B
              </span>
            </div>
          ))}

          {/* Golden Window backdrop */}
          <div
            className="absolute top-0 bottom-0 bg-gradient-to-b from-brand-amber/10 to-transparent rounded-md pointer-events-none"
            style={{ left: `${(2 / 7) * 100}%`, width: `${(2 / 7) * 100}%` }}
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-brand-amber text-white text-[9px] font-semibold whitespace-nowrap shadow-md">
              {t("market.golden")}
            </div>
          </div>

          {/* Bars */}
          <div className="absolute inset-0 flex items-end gap-2">
            {YEARS.map((bar, i) => {
              const isFocus = i === focusIdx;
              const isReached = i <= focusIdx;
              const heightPct = isReached ? (bar.value / max) * 100 : 0;
              const fillClass = bar.peak
                ? "bg-gradient-to-t from-brand-primary via-brand-violet to-brand-emerald"
                : bar.forecast
                ? "bg-gradient-to-t from-brand-primary/70 to-brand-violet/60"
                : bar.highlight
                ? "bg-gradient-to-t from-brand-primary to-brand-primary/80"
                : "bg-gray-300";
              return (
                <button
                  key={bar.year}
                  onClick={() => {
                    setActiveIdx(i);
                    setPlaying(false);
                  }}
                  onMouseEnter={() => setHoverIdx(i)}
                  onMouseLeave={() => setHoverIdx(null)}
                  className="flex-1 h-full flex flex-col items-center justify-end relative group cursor-pointer focus:outline-none"
                >
                  <AnimatePresence>
                    {isReached && (
                      <motion.div
                        key="lbl"
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                        className={`text-[11px] md:text-xs font-display font-bold tabular-nums mb-1 ${
                          bar.peak ? "text-brand-primary" : bar.forecast ? "text-brand-violet" : "text-gray-500"
                        }`}
                      >
                        ${bar.value}B
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <motion.div
                    initial={false}
                    animate={{ height: `${heightPct}%` }}
                    transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className={`w-full max-w-[44px] rounded-t-lg ${fillClass} relative ${
                      isFocus ? "ring-2 ring-offset-2 ring-brand-amber shadow-xl shadow-brand-amber/30" : ""
                    } ${bar.peak && isReached ? "shadow-lg shadow-brand-primary/30" : ""} transition-shadow`}
                  >
                    {isFocus && isReached && (
                      <motion.div
                        layoutId="active-pointer"
                        className="absolute -top-1 left-1/2 -translate-x-1/2 -translate-y-full"
                      >
                        <svg className="w-4 h-4 text-brand-amber drop-shadow-md" viewBox="0 0 16 16" fill="currentColor">
                          <path d="M8 16 L0 4 L16 4 Z" />
                        </svg>
                      </motion.div>
                    )}
                    {bar.peak && i === focusIdx && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute -top-8 right-0 translate-x-2 px-2 py-1 rounded-md bg-brand-emerald text-white text-[10px] font-bold whitespace-nowrap shadow-lg z-10"
                      >
                        +614%
                        <span className="absolute left-2 -bottom-1 w-2 h-2 rotate-45 bg-brand-emerald" />
                      </motion.div>
                    )}
                  </motion.div>
                </button>
              );
            })}
          </div>

          {/* Trend line — animated to focus point */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 700 256"
            preserveAspectRatio="none"
          >
            <motion.path
              d={(() => {
                const points = YEARS.slice(0, focusIdx + 1).map((b, i) => {
                  const x = (i + 0.5) * (700 / YEARS.length);
                  const y = 256 - (b.value / max) * 256;
                  return `${x},${y}`;
                });
                return `M ${points.join(" L ")}`;
              })()}
              stroke="url(#trendGrad)"
              strokeWidth="2"
              strokeDasharray="5 4"
              fill="none"
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6 }}
            />
            <defs>
              <linearGradient id="trendGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#f59e0b" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* X-axis labels */}
        <div className="ml-10 flex gap-2 mt-3">
          {YEARS.map((bar, i) => (
            <div key={bar.year} className="flex-1 text-center">
              <div
                className={`text-xs font-body tabular-nums transition-colors ${
                  i === focusIdx
                    ? "text-brand-primary font-bold"
                    : bar.peak
                    ? "text-gray-700 font-semibold"
                    : "text-gray-500"
                }`}
              >
                {bar.year}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CountUp({ value }: { value: number }) {
  const [displayed, setDisplayed] = useState(value);
  useEffect(() => {
    const start = displayed;
    const diff = value - start;
    if (diff === 0) return;
    const startTs = performance.now();
    const duration = 600;
    let raf: number;
    const tick = (now: number) => {
      const t = Math.min(1, (now - startTs) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplayed(Math.round(start + diff * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);
  return <>{displayed}</>;
}
