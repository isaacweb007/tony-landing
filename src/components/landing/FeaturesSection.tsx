"use client";

import { useEffect, useState } from "react";
import type { ComponentType, SVGProps } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionWrapper } from "./SectionWrapper";
import { PhoneMockup } from "./PhoneMockup";
import { useInView } from "@/hooks/useInView";
import { useT } from "@/i18n/I18nProvider";
import type { TKey } from "@/i18n/dictionaries";
import {
  BoltIcon,
  ShieldLockIcon,
  PencilIcon,
  CalendarIcon,
  MoonIcon,
  MountainIcon,
  GiftIcon,
  EnvelopeIcon,
  CheckIcon,
  ChartIcon,
  BowlIcon,
  PinIcon,
  PartyIcon,
  WarningIcon,
  SparkleIcon,
} from "./Icon";

interface FeatureBlockProps {
  tag: string;
  title: string;
  desc: string;
  stats: string;
  reverse?: boolean;
  dark?: boolean;
  children: React.ReactNode;
}

function FeatureBlock({ tag, title, desc, stats, reverse, dark = true, children }: FeatureBlockProps) {
  return (
    <SectionWrapper dark={dark} className="!py-14 md:!py-16 lg:!py-20">
      <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${reverse ? "direction-rtl" : ""}`}>
        <motion.div
          initial={{ opacity: 0, x: reverse ? 40 : -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className={reverse ? "lg:order-2 direction-ltr" : "direction-ltr"}
        >
          <span className={`text-xs font-body font-semibold uppercase tracking-widest ${dark ? "text-brand-primary" : "text-brand-violet"} mb-3 block`}>
            {tag}
          </span>
          <h3 className={`font-display font-bold text-2xl sm:text-3xl md:text-4xl leading-tight mb-4 ${dark ? "text-white" : "text-gray-900"}`}>
            {title}
          </h3>
          <p className={`font-body text-base leading-relaxed mb-6 ${dark ? "text-white/50" : "text-gray-500"}`}>
            {desc}
          </p>
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-body font-medium ${dark ? "bg-brand-emerald/10 text-brand-emerald border border-brand-emerald/20" : "bg-brand-primary/10 text-brand-primary border border-brand-primary/20"}`}>
            {stats}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: reverse ? -40 : 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className={reverse ? "lg:order-1" : ""}
        >
          {children}
        </motion.div>
      </div>
    </SectionWrapper>
  );
}

function BriefingDemo() {
  const t = useT();
  const { ref, isInView } = useInView();
  const cards: { Icon: ComponentType<SVGProps<SVGSVGElement>>; text: string; delay: number; alert?: boolean }[] = [
    { Icon: CheckIcon, text: t("features.briefing.demo.1"), delay: 0 },
    { Icon: CheckIcon, text: t("features.briefing.demo.2"), delay: 0.2 },
    { Icon: CheckIcon, text: t("features.briefing.demo.3"), delay: 0.4 },
    { Icon: WarningIcon, text: t("features.briefing.demo.4"), delay: 0.6, alert: true },
  ];

  return (
    <PhoneMockup tint="emerald">
      <div ref={ref} className="p-4 pt-12 space-y-3">
        <div className="px-2">
          <div className="text-white/30 text-[10px]">AM 7:00</div>
          <div className="text-white font-display font-bold text-base">{t("features.briefing.demo.h1")}</div>
          <div className="text-white/40 text-xs mt-1">{t("features.briefing.demo.h2")}</div>
        </div>
        {cards.map((card) => (
          <motion.div
            key={card.text}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: card.delay + 0.3, duration: 0.5 }}
            className="flex items-center gap-3 px-3 py-3 rounded-xl bg-white/5"
          >
            <card.Icon className={`w-4 h-4 shrink-0 ${card.alert ? "text-brand-amber" : "text-brand-emerald"}`} />
            <span className="text-sm text-white/70">{card.text}</span>
          </motion.div>
        ))}
      </div>
    </PhoneMockup>
  );
}

interface TonePeer {
  id: string;
  label: string;
  formal: number;   // 0-100
  emoji: number;    // 0-100
  length: number;   // avg chars
  match: number;    // accuracy %
  reply: string;
  accent: string;   // tailwind text color
}

const TONE_PEERS: TonePeer[] = [
  { id: "mom",    label: "엄마",  formal: 78, emoji: 18, length: 22, match: 96, reply: "네 엄마, 점심 잘 챙겨먹었어요 ㅎㅎ", accent: "text-brand-amber" },
  { id: "friend", label: "수민",  formal: 12, emoji: 84, length: 14, match: 95, reply: "ㅋㅋ 괜찮아~ 나중에 봐 ㅎㅎ", accent: "text-brand-emerald" },
  { id: "boss",   label: "팀장",  formal: 92, emoji: 4,  length: 38, match: 97, reply: "확인했습니다. 내일 오전까지 정리해서 공유드릴게요.", accent: "text-brand-primary" },
];

const BAR_COUNT = 14;

function ToneLearningDemo() {
  const t = useT();
  const { ref, isInView } = useInView();
  const [peerIdx, setPeerIdx] = useState(0);
  // Two parallel waveforms — live driven by tick
  const [tick, setTick] = useState(0);
  // Tony follows user with ~250ms lag — capture frames into ring buffer
  const [userBars, setUserBars] = useState<number[]>(() => Array(BAR_COUNT).fill(40));
  const [tonyBars, setTonyBars] = useState<number[]>(() => Array(BAR_COUNT).fill(40));
  const [cursor, setCursor] = useState(0);

  const peer = TONE_PEERS[peerIdx];

  // Animate waveforms in real time
  useEffect(() => {
    if (!isInView) return;
    const id = setInterval(() => setTick((t) => t + 1), 80);
    return () => clearInterval(id);
  }, [isInView]);

  useEffect(() => {
    // Generate new user bars based on per-peer tone signature
    const next = Array(BAR_COUNT).fill(0).map((_, i) => {
      // Combine multiple sine waves seeded by peer.id for stable signature
      const seed = peer.id.charCodeAt(0) + i * 0.7;
      const a = Math.sin(seed + tick * 0.25) * 0.5;
      const b = Math.sin(seed * 1.3 + tick * 0.15) * 0.3;
      const c = Math.sin(i * 0.9 + tick * 0.4) * 0.2;
      return Math.max(15, Math.min(95, 55 + (a + b + c) * 40));
    });
    setUserBars(next);
    // Tony follows with a 1-tick lag and slight noise (learning curve)
    setTonyBars((prev) => prev.map((p, i) => p + (next[i] - p) * 0.7 + (Math.sin(tick * 0.3 + i) * 2)));
    setCursor((tick % BAR_COUNT));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tick]);

  // Recompute initial tony bars when peer changes (smoother transition)
  useEffect(() => {
    setTonyBars(Array(BAR_COUNT).fill(40));
  }, [peerIdx]);

  return (
    <PhoneMockup>
      <div ref={ref} className="p-4 pt-11">
        {/* Header with recording dot */}
        <div className="px-1 mb-3 flex items-start justify-between">
          <div>
            <div className="text-white font-display font-bold text-[15px] leading-tight">
              {t("features.tone.demo.h")}
            </div>
            <div className="text-white/40 text-[11px] mt-0.5">{t("features.tone.demo.sub")}</div>
          </div>
          <div className="flex items-center gap-1.5 px-1.5 py-1 rounded-full bg-brand-rose/15 border border-brand-rose/30">
            <span className="relative inline-flex">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-rose" />
              <span className="absolute inset-0 w-1.5 h-1.5 rounded-full bg-brand-rose animate-ping opacity-75" />
            </span>
            <span className="text-[8px] text-brand-rose font-bold tracking-widest uppercase">REC</span>
          </div>
        </div>

        {/* Peer tabs */}
        <div className="flex gap-1 mb-3 p-0.5 rounded-full bg-white/[0.04] border border-white/5">
          {TONE_PEERS.map((p, i) => {
            const active = i === peerIdx;
            return (
              <button
                key={p.id}
                onClick={() => setPeerIdx(i)}
                className={`relative flex-1 text-[10px] py-1 rounded-full font-bold transition-colors ${active ? "text-white" : "text-white/40 hover:text-white/70"}`}
              >
                {active && (
                  <motion.span
                    layoutId="tone-tab-bg"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-brand-primary/30 to-brand-violet/30 border border-brand-primary/30"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{p.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tone metrics row */}
        <AnimatePresence mode="wait">
          <motion.div
            key={peer.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-3 gap-1.5 mb-3"
          >
            <ToneStat label="격식" value={`${peer.formal}%`} tone="primary" />
            <ToneStat label="이모지" value={`${peer.emoji}%`} tone="amber" />
            <ToneStat label="평균 길이" value={`${peer.length}자`} tone="violet" />
          </motion.div>
        </AnimatePresence>

        {/* User waveform */}
        <div className="p-2.5 rounded-xl bg-white/5 mb-2 relative overflow-hidden">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] text-white/70 font-medium">{t("features.tone.demo.real")}</span>
            <span className="text-[9px] text-white/30 tabular-nums">100%</span>
          </div>
          <Waveform bars={userBars} color="primary" cursor={cursor} />
        </div>

        {/* Tony waveform with convergence */}
        <div className="p-2.5 rounded-xl bg-white/5 mb-3 relative overflow-hidden">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] text-white/70 font-medium">{t("features.tone.demo.tony")}</span>
            <motion.span
              key={peer.match}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              className="text-[9px] text-brand-emerald font-bold tabular-nums"
            >
              {peer.match}% 일치
            </motion.span>
          </div>
          <Waveform bars={tonyBars} color="violet" cursor={cursor} secondary />
        </div>

        {/* Generated reply */}
        <div className="p-2.5 rounded-xl bg-gradient-to-br from-brand-primary/10 to-brand-violet/8 border border-brand-primary/20">
          <div className="text-[9px] text-white/40 mb-1 flex items-center gap-1.5">
            <span className={`w-1 h-1 rounded-full ${peer.accent.replace("text-", "bg-")} animate-pulse`} />
            {t("features.tone.demo.generated")} · {peer.label}
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={peer.id}
              initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0)" }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4 }}
              className={`text-[12px] ${peer.accent} font-medium leading-relaxed`}
            >
              &ldquo;{peer.reply}&rdquo;
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </PhoneMockup>
  );
}

function Waveform({ bars, color, cursor, secondary }: { bars: number[]; color: "primary" | "violet"; cursor: number; secondary?: boolean }) {
  const fill = color === "primary" ? "rgb(37,99,235)" : "rgb(139,92,246)";
  return (
    <div className="relative flex items-end gap-[2px] h-8">
      {bars.map((h, i) => {
        const isHot = i === cursor || i === (cursor + 1) % bars.length;
        return (
          <div
            key={i}
            className="flex-1 rounded-[2px] transition-[height,opacity,box-shadow] duration-150 ease-out self-end"
            style={{
              height: `${h}%`,
              minHeight: 3,
              background: isHot
                ? `linear-gradient(180deg, ${fill}, ${fill}cc)`
                : `${fill}80`,
              boxShadow: isHot ? `0 0 8px ${fill}99` : undefined,
              opacity: secondary && !isHot ? 0.75 : 1,
            }}
          />
        );
      })}
      {/* Center mirror line for waveform look */}
      <div className="absolute left-0 right-0 top-1/2 h-px bg-white/[0.04] pointer-events-none" />
    </div>
  );
}

function ToneStat({ label, value, tone }: { label: string; value: string; tone: "primary" | "amber" | "violet" }) {
  const toneCls =
    tone === "primary" ? "text-brand-primary" :
    tone === "amber" ? "text-brand-amber" :
    "text-brand-violet";
  return (
    <div className="rounded-lg bg-white/[0.04] border border-white/5 px-2 py-1.5">
      <div className="text-[8px] uppercase tracking-wider text-white/40 mb-0.5">{label}</div>
      <div className={`font-display font-bold text-[12px] tabular-nums ${toneCls}`}>{value}</div>
    </div>
  );
}

interface AwayActivity {
  time: string;     // simulated wall-clock time HH:MM
  minute: number;   // minutes since sleep start (0-480)
  text: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  color: string;
  status: AwayStatus;
}

const AWAY_ACTIVITIES: (Omit<AwayActivity, "text"> & { textKey: TKey })[] = [
  { time: "23:42", minute: 42,  textKey: "features.away.act.1", Icon: BoltIcon,       color: "emerald", status: "done" },
  { time: "00:18", minute: 78,  textKey: "features.away.act.2", Icon: ShieldLockIcon, color: "amber",   status: "hold" },
  { time: "01:05", minute: 125, textKey: "features.away.act.3", Icon: ChartIcon,      color: "primary", status: "done" },
  { time: "02:33", minute: 213, textKey: "features.away.act.4", Icon: PencilIcon,     color: "primary", status: "draft" },
  { time: "03:47", minute: 287, textKey: "features.away.act.5", Icon: CalendarIcon,   color: "violet",  status: "wait" },
  { time: "05:12", minute: 372, textKey: "features.away.act.6", Icon: EnvelopeIcon,   color: "emerald", status: "done" },
  { time: "06:30", minute: 450, textKey: "features.away.act.7", Icon: SparkleIcon,    color: "amber",   status: "done" },
];

const AWAY_TOTAL_MIN = 480; // 8h sleep window

function AwayModeDemo() {
  const t = useT();
  const { ref, isInView } = useInView();
  const [progress, setProgress] = useState(0); // 0..1 across the night
  const [revealed, setRevealed] = useState<number[]>([]);

  // Animate the night progress on a loop
  useEffect(() => {
    if (!isInView) return;
    const start = performance.now();
    const cycleMs = 10000; // 10s = full night, then loop
    let raf: number;
    const tick = (now: number) => {
      const t = ((now - start) % cycleMs) / cycleMs;
      setProgress(t);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isInView]);

  // Reveal activities up to current progress
  useEffect(() => {
    const minuteNow = progress * AWAY_TOTAL_MIN;
    const next = AWAY_ACTIVITIES.reduce<number[]>((acc, a, i) => {
      if (a.minute <= minuteNow) acc.push(i);
      return acc;
    }, []);
    if (next.length !== revealed.length) setRevealed(next);
  }, [progress, revealed.length]);

  // Live wall-clock based on progress (start at 23:00)
  const minuteNow = progress * AWAY_TOTAL_MIN;
  const totalMinFromMidnight = (23 * 60 + Math.floor(minuteNow)) % (24 * 60);
  const hh = Math.floor(totalMinFromMidnight / 60).toString().padStart(2, "0");
  const mm = Math.floor(totalMinFromMidnight % 60).toString().padStart(2, "0");
  const completed = revealed.length;
  const totalSavedMin = revealed.reduce((sum, i) => {
    const s = AWAY_ACTIVITIES[i].status;
    return sum + (s === "done" ? 8 : s === "draft" ? 4 : 2);
  }, 0);

  return (
    <PhoneMockup>
      <div ref={ref} className="relative w-full h-full overflow-hidden">
        {/* Star field background */}
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/80 via-slate-950 to-slate-900 pointer-events-none">
          {STAR_POSITIONS.map((s, i) => (
            <motion.span
              key={i}
              className="absolute rounded-full bg-white"
              style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.size, height: s.size }}
              animate={{ opacity: [0.2, 0.9, 0.2] }}
              transition={{ duration: 2 + (i % 3), repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </div>

        <div className="relative p-4 pt-11 h-full flex flex-col">
          {/* Header */}
          <div className="px-1 mb-3 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-emerald animate-pulse" />
                <span className="text-[9px] uppercase tracking-widest text-brand-emerald font-bold">{t("features.network.demo.live")}</span>
              </div>
              <div className="text-white font-display font-bold text-sm mt-0.5">{t("features.away.demo.h")}</div>
            </div>
            <div className="text-right">
              <div className="text-white/40 text-[9px] uppercase tracking-widest">{t("features.away.demo.now")}</div>
              <div className="text-white font-display font-bold text-base tabular-nums">
                {hh}:{mm}
              </div>
            </div>
          </div>

          {/* Sleep arc + moon */}
          <div className="relative h-24 mb-2">
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 80" preserveAspectRatio="none">
              <path d="M 10 70 Q 100 -20 190 70" stroke="rgba(99, 102, 241, 0.25)" strokeWidth="0.8" fill="none" strokeDasharray="2 2" />
              <motion.path
                d="M 10 70 Q 100 -20 190 70"
                stroke="url(#arcGrad)"
                strokeWidth="1.5"
                fill="none"
                strokeDasharray="500"
                style={{ strokeDashoffset: 500 - progress * 500 }}
              />
              <defs>
                <linearGradient id="arcGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="50%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#f59e0b" />
                </linearGradient>
              </defs>
            </svg>

            {/* Moving moon */}
            {(() => {
              const p = progress;
              const x = 10 + (190 - 10) * p;
              const y = 70 + (-20 - 70) * 4 * p * (1 - p);
              return (
                <motion.div
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${(x / 200) * 100}%`, top: `${(y / 80) * 100}%` }}
                >
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-indigo-400/40 blur-md" style={{ width: 28, height: 28, marginLeft: -2, marginTop: -2 }} />
                    <div className="relative w-6 h-6 rounded-full bg-gradient-to-br from-indigo-200 to-indigo-400 flex items-center justify-center text-indigo-900 shadow-lg shadow-indigo-500/30">
                      <MoonIcon className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </motion.div>
              );
            })()}

            {/* Endpoint labels */}
            <div className="absolute bottom-0 left-0 text-[8px] text-white/40">23:00</div>
            <div className="absolute bottom-0 right-0 text-[8px] text-white/40">07:00</div>
          </div>

          {/* Compact stats */}
          <div className="grid grid-cols-3 gap-1.5 mb-2.5">
            <CountStat label={t("features.away.demo.stat.done")} value={completed} suffix={t("privacy.unit.count")} tone="emerald" />
            <CountStat label={t("features.away.demo.stat.save")} value={totalSavedMin} suffix={t("features.away.demo.now").includes("이") ? "분" : "min"} tone="primary" />
            <CountStat label={t("features.away.demo.stat.progress")} value={Math.round(progress * 100)} suffix="%" tone="violet" />
          </div>

          {/* Activity timeline */}
          <div className="flex-1 overflow-hidden relative">
            <div className="text-[9px] uppercase tracking-wider text-white/30 mb-1.5 px-1">{t("features.away.demo.log")}</div>
            <div className="space-y-1.5 relative">
              {/* Vertical timeline line */}
              <div className="absolute left-[18px] top-1 bottom-1 w-px bg-white/10" />
              {AWAY_ACTIVITIES.map((a, i) => {
                const visible = revealed.includes(i);
                return (
                  <motion.div
                    key={i}
                    initial={false}
                    animate={{
                      opacity: visible ? 1 : 0.15,
                      x: visible ? 0 : 8,
                    }}
                    transition={{ duration: 0.4 }}
                    className="flex items-center gap-2 pl-1 relative"
                  >
                    <div className={`relative z-10 w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${dotBg(a.color)} ${visible ? "" : "saturate-0 opacity-40"}`}>
                      <a.Icon className={`w-3.5 h-3.5 ${textColor(a.color)}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[9px] text-white/40 tabular-nums">{a.time}</span>
                        <StatusPill status={a.status} />
                      </div>
                      <div className="text-[10.5px] text-white/85 truncate leading-tight mt-0.5">{t(a.textKey)}</div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </PhoneMockup>
  );
}

function AgentNetworkDemo() {
  const t = useT();
  const { ref, isInView } = useInView();
  const peers: { x: number; y: number; label: string; color: string; action: string; Icon: ComponentType<SVGProps<SVGSVGElement>> }[] = [
    { x: 15, y: 18, label: t("features.network.peer.sumin"),  color: "from-brand-emerald to-teal-400",    action: t("features.network.act.sumin"),  Icon: MountainIcon },
    { x: 85, y: 22, label: t("features.network.peer.jisu"),   color: "from-brand-violet to-fuchsia-400",  action: t("features.network.act.jisu"),   Icon: GiftIcon },
    { x: 18, y: 78, label: t("features.network.peer.mom"),    color: "from-brand-amber to-orange-400",    action: t("features.network.act.mom"),    Icon: EnvelopeIcon },
    { x: 82, y: 74, label: t("features.network.peer.minjun"), color: "from-brand-primary to-blue-400",    action: t("features.network.act.minjun"), Icon: CalendarIcon },
    { x: 50, y: 92, label: t("features.network.peer.sara"),   color: "from-brand-rose to-pink-400",       action: t("features.network.act.sara"),   Icon: CheckIcon },
    { x: 8, y: 50,  label: t("features.network.peer.boss"),   color: "from-brand-amber to-amber-300",     action: t("features.network.act.boss"),   Icon: ChartIcon },
    { x: 92, y: 50, label: t("features.network.peer.hyejin"), color: "from-brand-violet to-purple-400",   action: t("features.network.act.hyejin"), Icon: BowlIcon },
  ];
  const me = { x: 50, y: 50 };
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const id = setInterval(() => setActive((a) => (a + 1) % peers.length), 1800);
    return () => clearInterval(id);
  }, [isInView, peers.length]);

  return (
    <PhoneMockup>
      <div ref={ref} className="p-4 pt-12 h-full flex flex-col">
        <div className="px-2 mb-3 flex items-start justify-between">
          <div>
            <div className="text-white font-display font-bold text-base">{t("features.network.demo.h")}</div>
            <div className="text-white/40 text-xs mt-1">{t("features.network.demo.sub", { n: peers.length })}</div>
          </div>
          <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-brand-emerald/10 border border-brand-emerald/30">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-emerald animate-pulse" />
            <span className="text-[9px] text-brand-emerald font-medium">{t("features.network.demo.live")}</span>
          </div>
        </div>

        <div className="relative w-full" style={{ height: 240 }}>
          {/* Connection lines + traveling particles */}
          <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <radialGradient id="hub-glow" cx="50%" cy="50%">
                <stop offset="0%" stopColor="rgba(37,99,235,0.5)" />
                <stop offset="100%" stopColor="rgba(37,99,235,0)" />
              </radialGradient>
            </defs>
            <circle cx={me.x} cy={me.y} r="18" fill="url(#hub-glow)" />
            {peers.map((p, i) => {
              const isActive = i === active;
              return (
                <g key={i}>
                  <motion.line
                    x1={me.x} y1={me.y} x2={p.x} y2={p.y}
                    stroke={isActive ? "rgba(16, 185, 129, 0.9)" : "rgba(139, 92, 246, 0.2)"}
                    strokeWidth={isActive ? 0.5 : 0.25}
                    initial={{ pathLength: 0 }}
                    animate={isInView ? { pathLength: 1 } : {}}
                    transition={{ delay: 0.4 + i * 0.12, duration: 0.7 }}
                  />
                  {isInView && (
                    <motion.circle
                      r="0.9"
                      fill={isActive ? "#10b981" : "#8b5cf6"}
                      initial={{ cx: me.x, cy: me.y, opacity: 0 }}
                      animate={{
                        cx: [me.x, p.x, me.x],
                        cy: [me.y, p.y, me.y],
                        opacity: [0, 1, 1, 0],
                      }}
                      transition={{
                        duration: 2.4,
                        repeat: Infinity,
                        delay: i * 0.35,
                        ease: "easeInOut",
                      }}
                    />
                  )}
                </g>
              );
            })}
          </svg>

          {/* Center "나" node with pulsing rings */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="absolute flex flex-col items-center"
            style={{ left: `${me.x}%`, top: `${me.y}%`, transform: "translate(-50%, -50%)" }}
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute rounded-full border border-brand-primary/40"
                style={{ width: 36, height: 36 }}
                animate={isInView ? { scale: [1, 2.4], opacity: [0.6, 0] } : {}}
                transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.7, ease: "easeOut" }}
              />
            ))}
            <div className="relative w-9 h-9 rounded-full bg-gradient-to-br from-brand-primary via-brand-violet to-brand-emerald p-[2px] z-10">
              <div className="w-full h-full rounded-full bg-surface-dark flex items-center justify-center">
                <span className="text-white font-display font-bold text-xs">나</span>
              </div>
            </div>
            <span className="text-[8px] text-brand-primary font-semibold mt-1 z-10">나의 Tony</span>
          </motion.div>

          {/* Peer nodes */}
          {peers.map((p, i) => {
            const isActive = i === active;
            return (
              <motion.div
                key={p.label}
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.4 + i * 0.08, type: "spring", stiffness: 220 }}
                className="absolute flex flex-col items-center"
                style={{ left: `${p.x}%`, top: `${p.y}%`, transform: "translate(-50%, -50%)" }}
              >
                <motion.div
                  animate={isActive ? { scale: [1, 1.15, 1] } : { scale: 1 }}
                  transition={{ duration: 1.2, repeat: isActive ? Infinity : 0 }}
                  className={`relative rounded-full bg-gradient-to-br ${p.color} flex items-center justify-center ${
                    isActive ? "ring-2 ring-brand-emerald/70 shadow-lg shadow-brand-emerald/30" : ""
                  }`}
                  style={{ width: 22, height: 22 }}
                >
                  <span className="text-white font-display font-bold text-[10px]">{p.label[0]}</span>
                  {isActive && (
                    <motion.span
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-brand-emerald flex items-center justify-center text-white"
                    >
                      <p.Icon className="w-2 h-2" />
                    </motion.span>
                  )}
                </motion.div>
                <span className={`text-[8px] mt-0.5 transition-colors ${isActive ? "text-brand-emerald" : "text-white/40"}`}>
                  {p.label}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* Live activity ticker */}
        <div className="mt-auto pt-2 border-t border-white/5">
          <div className="text-[9px] text-white/30 uppercase tracking-wider mb-1.5 px-1">{t("features.network.demo.curr")}</div>
          <div className="relative h-9 overflow-hidden">
            {peers.map((p, i) => (
              <motion.div
                key={i}
                initial={false}
                animate={{
                  opacity: i === active ? 1 : 0,
                  y: i === active ? 0 : 8,
                }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 flex items-center gap-2 px-2"
              >
                <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${p.color} flex items-center justify-center shrink-0`}>
                  <span className="text-white font-bold text-[8px]">{p.label[0]}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] text-white/80 truncate">
                    <span className="text-brand-emerald font-medium">{t("features.network.demo.peer", { name: p.label })}</span>
                    <span className="text-white/40"> · {p.action}</span>
                  </div>
                  <div className="h-0.5 mt-0.5 rounded-full bg-white/5 overflow-hidden">
                    <motion.div
                      key={`bar-${active}-${i}`}
                      initial={{ width: "0%" }}
                      animate={i === active ? { width: "100%" } : { width: "0%" }}
                      transition={{ duration: 1.7, ease: "linear" }}
                      className="h-full bg-gradient-to-r from-brand-primary to-brand-emerald"
                    />
                  </div>
                </div>
                <p.Icon className="w-3 h-3 text-white/60" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </PhoneMockup>
  );
}

function GroupSummaryDemo() {
  const t = useT();
  const { ref, isInView } = useInView();

  return (
    <PhoneMockup>
      <div ref={ref} className="p-4 pt-12">
        <div className="px-2 mb-4">
          <div className="flex items-center gap-2">
            <div className="text-white font-display font-bold text-base">{t("features.group.demo.h")}</div>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.5, type: "spring" }}
              className="px-2 py-0.5 rounded-full bg-brand-rose/20 text-brand-rose text-[10px] font-bold"
            >
              70+
            </motion.div>
          </div>
        </div>

        {/* Messages collapsing */}
        <motion.div
          initial={{ height: 180 }}
          animate={isInView ? { height: 0, opacity: 0 } : {}}
          transition={{ delay: 1, duration: 0.8, ease: "easeInOut" }}
          className="overflow-hidden mb-3"
        >
          <div className="space-y-1.5 px-1">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-white/10" />
                <div className="h-3 rounded-full bg-white/5 flex-1" />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 2, duration: 0.6 }}
          className="p-4 rounded-xl bg-gradient-to-br from-brand-primary/10 to-brand-violet/5 border border-brand-primary/15"
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-bold text-brand-primary">{t("features.group.demo.ai")}</span>
            <div className="h-px flex-1 bg-white/5" />
          </div>
          <div className="space-y-2 text-sm text-white/70">
            <p className="flex items-start gap-2">
              <PinIcon className="w-3.5 h-3.5 text-brand-rose mt-0.5 shrink-0" />
              <span>{t("features.group.demo.1")}</span>
            </p>
            <p className="flex items-start gap-2">
              <ChartIcon className="w-3.5 h-3.5 text-brand-primary mt-0.5 shrink-0" />
              <span>{t("features.group.demo.2")}</span>
            </p>
            <p className="flex items-start gap-2">
              <PartyIcon className="w-3.5 h-3.5 text-brand-violet mt-0.5 shrink-0" />
              <span>{t("features.group.demo.3")}</span>
            </p>
          </div>
          <div className="mt-3 pt-3 border-t border-white/5">
            <div className="text-xs text-brand-amber flex items-center gap-1.5">
              <WarningIcon className="w-3.5 h-3.5" />
              {t("features.group.demo.alert")}
            </div>
          </div>
        </motion.div>
      </div>
    </PhoneMockup>
  );
}

function VoiceFirstDemo() {
  const t = useT();
  const { ref, isInView } = useInView();

  return (
    <PhoneMockup>
      <div ref={ref} className="p-4 pt-12 flex flex-col items-center justify-center h-full">
        <div className="text-white/40 text-xs font-body mb-6">{t("features.voice.demo.listen")}</div>

        {/* Mic button with pulse rings */}
        <div className="relative mb-8">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? {
                opacity: [0.3, 0],
                scale: [1, 1.8 + i * 0.3],
              } : {}}
              transition={{
                delay: i * 0.4,
                duration: 2,
                repeat: Infinity,
                ease: "easeOut",
              }}
              className="absolute inset-0 rounded-full border border-brand-primary/30"
            />
          ))}
          <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-brand-primary to-brand-violet flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
              <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
            </svg>
          </div>
        </div>

        {/* Waveform */}
        <div className="flex items-center gap-0.5 h-8 mb-4">
          {Array.from({ length: 24 }).map((_, i) => (
            <motion.div
              key={i}
              animate={isInView ? {
                height: [4, Math.random() * 28 + 4, 4],
              } : {}}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.05,
                ease: "easeInOut",
              }}
              className="w-1 rounded-full bg-brand-primary/40"
              style={{ height: 4 }}
            />
          ))}
        </div>

        <div className="text-sm text-white/50 font-body text-center">
          &ldquo;{t("features.voice.demo.sample")}&rdquo;
        </div>
      </div>
    </PhoneMockup>
  );
}

export function FeaturesSection() {
  const t = useT();
  return (
    <div id="features">
      <FeatureBlock
        tag={t("features.briefing.tag")}
        title={t("features.briefing.title")}
        desc={t("features.briefing.desc")}
        stats={t("features.demo.stats")}
        dark
      >
        <BriefingDemo />
      </FeatureBlock>

      <FeatureBlock
        tag={t("features.tone.tag")}
        title={t("features.tone.title")}
        desc={t("features.tone.desc")}
        stats={t("features.tone.stats")}
        dark={false}
        reverse
      >
        <ToneLearningDemo />
      </FeatureBlock>

      <FeatureBlock
        tag={t("features.away.tag")}
        title={t("features.away.title")}
        desc={t("features.away.desc")}
        stats={t("features.away.stats")}
        dark
      >
        <AwayModeDemo />
      </FeatureBlock>

      <FeatureBlock
        tag={t("features.network.tag")}
        title={t("features.network.title")}
        desc={t("features.network.desc")}
        stats={t("features.network.stats")}
        dark={false}
        reverse
      >
        <AgentNetworkDemo />
      </FeatureBlock>

      <FeatureBlock
        tag={t("features.group.tag")}
        title={t("features.group.title")}
        desc={t("features.group.desc")}
        stats={t("features.group.stats")}
        dark
      >
        <GroupSummaryDemo />
      </FeatureBlock>

      <FeatureBlock
        tag={t("features.voice.tag")}
        title={t("features.voice.title")}
        desc={t("features.voice.desc")}
        stats={t("features.voice.stats")}
        dark={false}
        reverse
      >
        <VoiceFirstDemo />
      </FeatureBlock>
    </div>
  );
}

// ===== Away Mode helpers =====
type AwayStatus = "done" | "hold" | "draft" | "wait";

const STAR_POSITIONS = [
  { x: 8, y: 12, size: 1.5 }, { x: 22, y: 6, size: 2 }, { x: 38, y: 18, size: 1 },
  { x: 55, y: 9, size: 1.5 }, { x: 70, y: 22, size: 1 }, { x: 85, y: 14, size: 2 },
  { x: 92, y: 32, size: 1 }, { x: 12, y: 35, size: 1 }, { x: 30, y: 42, size: 1.5 },
  { x: 76, y: 38, size: 1 }, { x: 5, y: 55, size: 1 }, { x: 95, y: 60, size: 1.5 },
  { x: 18, y: 72, size: 1 }, { x: 88, y: 78, size: 1 }, { x: 45, y: 88, size: 1 },
];

function dotBg(color: string) {
  switch (color) {
    case "emerald": return "bg-brand-emerald/15 border border-brand-emerald/30";
    case "amber": return "bg-brand-amber/15 border border-brand-amber/30";
    case "primary": return "bg-brand-primary/15 border border-brand-primary/30";
    case "violet": return "bg-brand-violet/15 border border-brand-violet/30";
    default: return "bg-white/10 border border-white/20";
  }
}

function textColor(color: string) {
  switch (color) {
    case "emerald": return "text-brand-emerald";
    case "amber": return "text-brand-amber";
    case "primary": return "text-brand-primary";
    case "violet": return "text-brand-violet";
    default: return "text-white";
  }
}

function StatusPill({ status }: { status: AwayStatus }) {
  const t = useT();
  const map: Record<AwayStatus, { labelKey: TKey; cls: string }> = {
    done:  { labelKey: "features.away.status.done",  cls: "bg-brand-emerald/20 text-brand-emerald" },
    hold:  { labelKey: "features.away.status.hold",  cls: "bg-brand-amber/20 text-brand-amber" },
    draft: { labelKey: "features.away.status.draft", cls: "bg-brand-primary/20 text-brand-primary" },
    wait:  { labelKey: "features.away.status.wait",  cls: "bg-brand-violet/20 text-brand-violet" },
  };
  const m = map[status];
  return (
    <span className={`inline-block px-1.5 py-0.5 rounded-full text-[8px] font-bold tracking-wide ${m.cls}`}>
      {t(m.labelKey)}
    </span>
  );
}

function CountStat({ label, value, suffix, tone }: { label: string; value: number; suffix: string; tone: string }) {
  const [shown, setShown] = useState(value);
  useEffect(() => {
    const start = shown;
    const diff = value - start;
    if (diff === 0) return;
    let raf: number;
    const t0 = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - t0) / 400);
      setShown(Math.round(start + diff * (1 - Math.pow(1 - t, 3))));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);
  const toneCls =
    tone === "emerald" ? "text-brand-emerald" :
    tone === "primary" ? "text-brand-primary" :
    tone === "violet" ? "text-brand-violet" : "text-white";
  return (
    <div className="rounded-lg bg-white/5 border border-white/10 px-2 py-1.5 backdrop-blur-sm">
      <div className="text-[8px] uppercase tracking-wider text-white/40">{label}</div>
      <div className={`font-display font-bold text-sm tabular-nums ${toneCls}`}>
        {shown}
        <span className="text-[9px] text-white/50 ml-0.5 font-body">{suffix}</span>
      </div>
    </div>
  );
}
