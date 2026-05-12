"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { ShieldLockIcon, LockIcon, BrainIcon, SparkleIcon, ChatBubbleIcon, CalendarIcon } from "./Icon";
import { useT } from "@/i18n/I18nProvider";
import type { TKey } from "@/i18n/dictionaries";
import type { ComponentType, SVGProps } from "react";

const badges: { labelKey: TKey; descKey: TKey }[] = [
  { labelKey: "privacy.badge.label.llama",  descKey: "privacy.badge.desc.llama" },
  { labelKey: "privacy.badge.label.neural", descKey: "privacy.badge.desc.neural" },
  { labelKey: "privacy.badge.label.e2e",    descKey: "privacy.badge.desc.e2e" },
  { labelKey: "privacy.badge.label.gdpr",   descKey: "privacy.badge.desc.gdpr" },
  { labelKey: "privacy.badge.label.zero",   descKey: "privacy.badge.desc.zero" },
];

interface Scenario {
  id: string;
  labelKey: TKey;
  inboundKey: TKey;
  processKey: TKey;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
}

const SCENARIOS: Scenario[] = [
  { id: "msg",      labelKey: "privacy.scenario.msg",      inboundKey: "privacy.scenario.msg.inbound",      processKey: "privacy.scenario.msg.process",      Icon: ChatBubbleIcon },
  { id: "reply",    labelKey: "privacy.scenario.reply",    inboundKey: "privacy.scenario.reply.inbound",    processKey: "privacy.scenario.reply.process",    Icon: SparkleIcon },
  { id: "schedule", labelKey: "privacy.scenario.schedule", inboundKey: "privacy.scenario.schedule.inbound", processKey: "privacy.scenario.schedule.process", Icon: CalendarIcon },
];

export function PrivacySection() {
  const t = useT();
  const { ref, isInView } = useInView({ threshold: 0.15 });
  const [scenarioIdx, setScenarioIdx] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [stats, setStats] = useState({ processed: 0, blocked: 0 });

  useEffect(() => {
    if (!isInView || !autoplay) return;
    const id = setInterval(() => setScenarioIdx((i) => (i + 1) % SCENARIOS.length), 4200);
    return () => clearInterval(id);
  }, [isInView, autoplay]);

  useEffect(() => {
    if (!isInView) return;
    const id = setInterval(() => {
      setStats((s) => ({
        processed: s.processed + Math.floor(Math.random() * 3) + 1,
        blocked: s.blocked + (Math.random() > 0.7 ? 1 : 0),
      }));
    }, 1100);
    return () => clearInterval(id);
  }, [isInView]);

  const scenario = SCENARIOS[scenarioIdx];

  return (
    <section
      id="privacy"
      className="relative py-24 md:py-32 lg:py-40 px-6 md:px-12 lg:px-20 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #030308 0%, #0a0a14 50%, #030308 100%)" }}
    >
      <div ref={ref} className="max-w-6xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm font-body font-semibold text-brand-emerald mb-6 uppercase tracking-widest"
          >
            {t("privacy.tag")}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight mb-6"
          >
            <span className="text-gradient-emerald">{t("privacy.title.1")}</span>
            <br />
            <span className="text-white">{t("privacy.title.2")}</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="font-body text-base md:text-lg text-white/45 max-w-2xl mx-auto"
          >
            {t("privacy.subtitle")}
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-[1fr_1.2fr_1fr] gap-6 items-stretch mb-12">
          <ExternalCard scenario={scenario} active={isInView} t={t} />
          <DeviceCenter scenario={scenario} active={isInView} t={t} />
          <OutboundCard active={isInView} blocked={stats.blocked} t={t} />
        </div>

        <div className="flex items-center justify-center gap-2 mb-10 flex-wrap">
          {SCENARIOS.map((s, i) => {
            const isActive = i === scenarioIdx;
            return (
              <button
                key={s.id}
                onClick={() => { setScenarioIdx(i); setAutoplay(false); }}
                className={`relative inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-body transition-all ${
                  isActive ? "bg-white/10 text-white border border-white/15" : "bg-white/[0.03] text-white/50 border border-white/5 hover:text-white/80"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="privacy-tab-bg"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-brand-primary/20 to-brand-emerald/20"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <s.Icon className="w-4 h-4" />
                  {t(s.labelKey)}
                </span>
              </button>
            );
          })}
          <button
            onClick={() => setAutoplay((a) => !a)}
            className="ml-2 text-[10px] text-white/30 hover:text-white/60 font-body transition-colors px-2 py-1 rounded-full"
          >
            {autoplay ? t("privacy.autoplay.on") : t("privacy.autoplay.off")}
          </button>
        </div>

        <div className="grid grid-cols-3 gap-3 md:gap-4 max-w-3xl mx-auto mb-10">
          <LiveStat label={t("privacy.stat.processed")} value={stats.processed} suffix={t("privacy.unit.count")} tone="primary" />
          <LiveStat label={t("privacy.stat.blocked")}   value={stats.blocked}   suffix={t("privacy.unit.times")} tone="rose" />
          <LiveStat label={t("privacy.stat.zero")}      value={0}               suffix="bytes" tone="emerald" pinned pinnedLabel={t("privacy.stat.pinned")} />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-2"
        >
          {badges.map((b, i) => (
            <motion.div
              key={b.labelKey}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + i * 0.07 }}
              className="group flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/10 hover:border-brand-emerald/30 hover:bg-brand-emerald/[0.05] transition-all"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-brand-emerald shadow-[0_0_6px_rgba(16,185,129,0.6)]" />
              <span className="text-xs font-body font-medium text-white/80">{t(b.labelKey)}</span>
              <span className="text-[10px] text-white/30">{t(b.descKey)}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

type TFn = (key: TKey, params?: Record<string, string | number>) => string;

function ExternalCard({ scenario, active, t }: { scenario: Scenario; active: boolean; t: TFn }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="relative rounded-3xl bg-white/[0.02] border border-white/10 p-5 overflow-hidden min-h-[280px]"
    >
      <div className="text-[10px] uppercase tracking-widest text-white/30 font-semibold mb-3">
        {t("privacy.inbound")}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={scenario.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="rounded-2xl bg-gradient-to-br from-brand-primary/15 to-brand-violet/10 border border-brand-primary/20 p-4 mb-4"
        >
          <div className="text-[10px] text-brand-primary/80 font-medium mb-1">{t("privacy.received")}</div>
          <div className="text-sm text-white/90 leading-relaxed">{t(scenario.inboundKey)}</div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute -right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
        {[0, 1, 2, 3].map((i) => (
          <motion.span
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-brand-primary shadow-[0_0_8px_rgba(37,99,235,0.8)]"
            animate={active ? { opacity: [0, 1, 0], x: [0, 8, 16] } : {}}
            transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.25 }}
          />
        ))}
      </div>

      <div className="mt-auto pt-3 text-[10px] text-white/40 flex items-center gap-1.5">
        <span className="w-1 h-1 rounded-full bg-white/30" />
        {t("privacy.inbound.tls")}
      </div>
    </motion.div>
  );
}

function DeviceCenter({ scenario, active, t }: { scenario: Scenario; active: boolean; t: TFn }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.15 }}
      className="relative rounded-3xl bg-gradient-to-b from-brand-emerald/[0.06] to-brand-primary/[0.04] border border-brand-emerald/20 p-5 overflow-hidden flex flex-col"
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute w-44 h-44 rounded-full border border-brand-emerald/30"
            animate={active ? { scale: [1, 1.4], opacity: [0.5, 0] } : {}}
            transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.8, ease: "easeOut" }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-emerald/15 border border-brand-emerald/30 mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-emerald animate-pulse" />
          <span className="text-[10px] uppercase tracking-widest text-brand-emerald font-bold">{t("privacy.secure")}</span>
        </div>

        <div className="relative w-32 h-44 rounded-[1.5rem] bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950 border border-white/10 shadow-2xl shadow-brand-emerald/20 mb-3 overflow-hidden">
          <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-12 h-1.5 rounded-full bg-black" />
          <div className="absolute inset-2 top-4 rounded-xl bg-gradient-to-b from-brand-primary/10 to-brand-emerald/10 border border-white/5 flex flex-col items-center justify-center gap-2 p-2">
            <motion.div
              animate={active ? { rotate: 360 } : {}}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="text-brand-emerald"
            >
              <BrainIcon className="w-7 h-7" />
            </motion.div>
            <AnimatePresence mode="wait">
              <motion.div
                key={scenario.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                <div className="text-[8px] text-brand-emerald/80 uppercase tracking-wider font-semibold">{t("privacy.processing")}</div>
                <div className="text-[9px] text-white/70 leading-tight mt-0.5 px-1">{t(scenario.processKey)}</div>
              </motion.div>
            </AnimatePresence>
            <div className="flex items-end gap-0.5 h-3">
              {[0, 1, 2, 3, 4].map((i) => (
                <motion.span
                  key={i}
                  className="w-0.5 bg-brand-emerald/60 rounded-full"
                  animate={active ? { height: ["20%", "100%", "40%", "80%", "30%"] } : {}}
                  transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.1 }}
                />
              ))}
            </div>
          </div>
          <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-10 h-0.5 rounded-full bg-white/30" />
        </div>

        <div className="text-white font-display font-bold text-sm">{t("privacy.device")}</div>
        <div className="text-[10px] text-white/40 mt-0.5">{t("privacy.device.sub")}</div>

        <div className="mt-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/10">
          <LockIcon className="w-3 h-3 text-brand-emerald" />
          <span className="text-[10px] text-white/60">{t("privacy.keychain")}</span>
        </div>
      </div>
    </motion.div>
  );
}

function OutboundCard({ active, blocked, t }: { active: boolean; blocked: number; t: TFn }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.3 }}
      className="relative rounded-3xl bg-white/[0.02] border border-white/10 p-5 overflow-hidden min-h-[280px] flex flex-col"
    >
      <div className="text-[10px] uppercase tracking-widest text-white/30 font-semibold mb-3">
        {t("privacy.outbound")}
      </div>

      <div className="rounded-2xl bg-gradient-to-br from-brand-emerald/15 to-teal-400/10 border border-brand-emerald/20 p-3 mb-3">
        <div className="flex items-center gap-1.5 mb-1">
          <ShieldLockIcon className="w-3 h-3 text-brand-emerald" />
          <span className="text-[10px] text-brand-emerald/90 font-semibold uppercase tracking-wider">{t("privacy.outbound.user")}</span>
        </div>
        <div className="text-xs text-white/85 leading-relaxed">{t("privacy.outbound.user.text")}</div>
      </div>

      <div className="relative rounded-2xl bg-brand-rose/[0.06] border border-brand-rose/20 p-3 overflow-hidden">
        <div className="flex items-center gap-1.5 mb-1">
          <svg className="w-3 h-3 text-brand-rose" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <circle cx="12" cy="12" r="10" />
            <path d="M5 5l14 14" />
          </svg>
          <span className="text-[10px] text-brand-rose font-semibold uppercase tracking-wider">{t("privacy.outbound.cloud")}</span>
        </div>
        <div className="text-[10px] text-white/55 leading-relaxed">{t("privacy.outbound.cloud.text")}</div>

        <div className="relative h-6 mt-2 overflow-hidden">
          {active && [0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-brand-rose shadow-[0_0_8px_rgba(244,63,94,0.6)]"
              animate={{ x: ["0%", "70%", "0%"], opacity: [0, 1, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.5 }}
            />
          ))}
          <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-brand-rose/0 via-brand-rose to-brand-rose/0" />
        </div>
      </div>

      <div className="mt-auto pt-4 flex items-center justify-between">
        <div className="text-[10px] text-white/40">{t("privacy.outbound.counter")}</div>
        <div className="text-sm font-display font-bold text-brand-rose tabular-nums">
          {blocked}{t("privacy.unit.times")}
        </div>
      </div>
    </motion.div>
  );
}

function LiveStat({ label, value, suffix, tone, pinned, pinnedLabel }: { label: string; value: number; suffix: string; tone: "primary" | "rose" | "emerald"; pinned?: boolean; pinnedLabel?: string }) {
  const [shown, setShown] = useState(value);
  useEffect(() => {
    if (pinned) return;
    const start = shown;
    const diff = value - start;
    if (diff === 0) return;
    const t0 = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const t = Math.min(1, (now - t0) / 400);
      setShown(Math.round(start + diff * (1 - Math.pow(1 - t, 3))));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, pinned]);

  const toneCls =
    tone === "primary" ? "text-brand-primary" :
    tone === "rose" ? "text-brand-rose" :
    "text-brand-emerald";

  const display = pinned ? value : shown;

  return (
    <div className="rounded-2xl bg-white/[0.03] border border-white/10 px-4 py-3 backdrop-blur-sm">
      <div className="text-[10px] uppercase tracking-widest text-white/40 font-semibold mb-1">{label}</div>
      <div className={`font-display font-bold text-2xl md:text-3xl tabular-nums ${toneCls} flex items-baseline gap-1`}>
        {display.toLocaleString()}
        <span className="text-xs text-white/40 font-body">{suffix}</span>
        {pinned && (
          <span className="ml-auto text-[9px] uppercase tracking-wider text-brand-emerald/70 font-semibold">{pinnedLabel}</span>
        )}
      </div>
    </div>
  );
}
