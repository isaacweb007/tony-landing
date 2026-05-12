"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { GradientOrb } from "./GradientOrb";
import { useInView } from "@/hooks/useInView";
import { LockIcon } from "./Icon";
import { useT } from "@/i18n/I18nProvider";
import type { TKey } from "@/i18n/dictionaries";

type Side = "isaac" | "sumin" | "system";

interface ChatStep {
  side: Side;
  fromKey: TKey;
  textKey: TKey;
  typingMs: number;
  pauseMs: number;
}

const script: ChatStep[] = [
  { side: "isaac",  fromKey: "a2a.s.1.from",  textKey: "a2a.s.1.text",  typingMs: 800,  pauseMs: 700 },
  { side: "isaac",  fromKey: "a2a.s.2.from",  textKey: "a2a.s.2.text",  typingMs: 700,  pauseMs: 500 },
  { side: "system", fromKey: "a2a.s.3.from",  textKey: "a2a.s.3.text",  typingMs: 0,    pauseMs: 600 },
  { side: "isaac",  fromKey: "a2a.s.4.from",  textKey: "a2a.s.4.text",  typingMs: 900,  pauseMs: 500 },
  { side: "sumin",  fromKey: "a2a.s.5.from",  textKey: "a2a.s.5.text",  typingMs: 1100, pauseMs: 500 },
  { side: "isaac",  fromKey: "a2a.s.6.from",  textKey: "a2a.s.6.text",  typingMs: 900,  pauseMs: 500 },
  { side: "sumin",  fromKey: "a2a.s.7.from",  textKey: "a2a.s.7.text",  typingMs: 1200, pauseMs: 500 },
  { side: "system", fromKey: "a2a.s.8.from",  textKey: "a2a.s.8.text",  typingMs: 0,    pauseMs: 1200 },
  { side: "sumin",  fromKey: "a2a.s.9.from",  textKey: "a2a.s.9.text",  typingMs: 800,  pauseMs: 600 },
  { side: "isaac",  fromKey: "a2a.s.10.from", textKey: "a2a.s.10.text", typingMs: 800,  pauseMs: 1500 },
];

export function AgentNetworkSection() {
  const t = useT();
  const { ref, isInView } = useInView({ threshold: 0.15 });
  const [shown, setShown] = useState<number[]>([]);
  const [typing, setTyping] = useState<Side | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [done, setDone] = useState(false);
  const [tick, setTick] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Run scripted conversation when in view, loop after completion
  useEffect(() => {
    if (!isInView) return;

    let cancelled = false;
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    async function play() {
      while (!cancelled) {
        setShown([]);
        setTyping(null);
        setElapsed(0);
        setDone(false);

        const start = Date.now();
        const timer = setInterval(() => setElapsed(Math.floor((Date.now() - start) / 1000)), 200);
        timeouts.push(timer as unknown as ReturnType<typeof setTimeout>);

        for (let i = 0; i < script.length; i++) {
          if (cancelled) break;
          const step = script[i];
          if (step.typingMs > 0 && step.side !== "system") {
            setTyping(step.side);
            await new Promise<void>((r) => {
              const t = setTimeout(() => r(), step.typingMs);
              timeouts.push(t);
            });
          }
          if (cancelled) break;
          setTyping(null);
          setShown((prev) => [...prev, i]);
          await new Promise<void>((r) => {
            const t = setTimeout(() => r(), step.pauseMs);
            timeouts.push(t);
          });
        }

        clearInterval(timer);
        if (cancelled) break;
        setDone(true);
        // Hold the completed state, then restart
        await new Promise<void>((r) => {
          const t = setTimeout(() => r(), 4500);
          timeouts.push(t);
        });
      }
    }

    play();
    return () => {
      cancelled = true;
      timeouts.forEach((t) => clearTimeout(t));
    };
  }, [isInView]);

  // Auto-scroll the chat panel to keep latest message in view
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [shown, typing]);

  // Periodic re-render so timestamps tick
  useEffect(() => {
    if (!isInView) return;
    const id = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, [isInView]);

  return (
    <section className="relative py-24 md:py-32 lg:py-40 px-6 md:px-12 lg:px-20 overflow-hidden bg-surface-dark">
      <GradientOrb color="rgba(139, 92, 246, 0.08)" size={500} blur={200} className="top-[10%] right-[-10%]" />
      <GradientOrb color="rgba(16, 185, 129, 0.06)" size={400} blur={150} className="bottom-[10%] left-[-5%]" animation="float-slow" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <p className="text-sm font-body font-semibold text-brand-violet mb-4 uppercase tracking-widest">
            {t("a2a.tag")}
          </p>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-white leading-tight mb-4">
            {t("a2a.title.1")} <span className="text-gradient-primary">{t("a2a.title.highlight")}</span> {t("a2a.title.2")}
          </h2>
          <p className="font-body text-lg text-white/40 max-w-xl mx-auto">
            {t("a2a.subtitle")}
          </p>
        </div>

        <div ref={ref}>
          <div ref={containerRef} className="relative max-w-3xl mx-auto">
            {/* Two avatars + connection */}
            <div className="flex items-center justify-between mb-6 px-2">
              <AgentAvatar
                name={t("a2a.isaac.tony")}
                gradient="from-brand-primary to-brand-violet"
                active={typing === "isaac"}
                side="left"
              />
              <ConnectionBar active={typing !== null} elapsed={elapsed} done={done} t={t} />
              <AgentAvatar
                name={t("a2a.sumin.tony")}
                gradient="from-brand-emerald to-teal-400"
                active={typing === "sumin"}
                side="right"
              />
            </div>

            {/* Chat panel */}
            <div className="relative rounded-3xl bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/10 backdrop-blur-xl overflow-hidden shadow-2xl shadow-brand-primary/5">
              {/* Panel header */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-white/5 bg-white/[0.02]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-emerald animate-pulse" />
                  <span className="text-xs font-body text-white/60">
                    {done ? t("a2a.status.done") : t("a2a.status.running")}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-[10px] text-white/30 font-body">
                  <span className="inline-flex items-center gap-1"><LockIcon className="w-3 h-3" />{t("a2a.encrypted")}</span>
                  <span className="tabular-nums">{formatTime(elapsed)}</span>
                </div>
              </div>

              {/* Messages */}
              <div
                ref={scrollRef}
                className="px-4 md:px-6 py-5 space-y-3 max-h-[480px] min-h-[420px] overflow-y-auto scroll-smooth"
              >
                <AnimatePresence initial={false}>
                  {shown.map((i) => {
                    const step = script[i];
                    const ts = stepTimestamp(i, tick);
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 12, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className={`flex ${
                          step.side === "system"
                            ? "justify-center"
                            : step.side === "isaac"
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        <ChatBubble step={step} ts={ts} isFinal={done && i === script.length - 1} t={t} />
                      </motion.div>
                    );
                  })}

                  {typing && (
                    <motion.div
                      key="typing"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className={`flex ${typing === "isaac" ? "justify-end" : "justify-start"}`}
                    >
                      <TypingBubble side={typing} t={t} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Footer status */}
              <div className="px-5 py-3 border-t border-white/5 bg-gradient-to-r from-brand-primary/5 via-brand-violet/5 to-brand-emerald/5">
                <div className="flex items-center justify-between text-[11px] font-body">
                  <div className="flex items-center gap-3 text-white/40">
                    <span>{t("a2a.msg.count", { a: shown.length, b: script.length })}</span>
                    <span>·</span>
                    <span>{t("a2a.pingpong", { n: Math.max(1, Math.floor(shown.length / 2)) })}</span>
                  </div>
                  <AnimatePresence>
                    {done && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-1.5 text-brand-emerald font-medium"
                      >
                        <CheckIcon className="w-3.5 h-3.5" />
                        {t("a2a.deal.in", { n: elapsed })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Bottom comparison strip */}
            <div className="grid grid-cols-2 gap-3 mt-6">
              <div className="rounded-xl p-4 bg-brand-rose/5 border border-brand-rose/20">
                <div className="text-[10px] uppercase tracking-wider text-brand-rose/80 font-semibold mb-1">{t("a2a.compare.before.label")}</div>
                <div className="text-2xl font-display font-bold text-white/70">{t("a2a.compare.before.value")}</div>
                <div className="text-xs text-white/40 mt-1">{t("a2a.compare.before.desc")}</div>
              </div>
              <div className="rounded-xl p-4 bg-brand-emerald/10 border border-brand-emerald/30 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-emerald/0 via-brand-emerald/5 to-brand-emerald/0 animate-pulse" />
                <div className="relative">
                  <div className="text-[10px] uppercase tracking-wider text-brand-emerald font-semibold mb-1">{t("a2a.compare.tony.label")}</div>
                  <div className="text-2xl font-display font-bold text-white">{t("a2a.compare.tony.value")}</div>
                  <div className="text-xs text-white/50 mt-1">{t("a2a.compare.tony.desc")}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AgentAvatar({
  name,
  gradient,
  active,
  side,
}: {
  name: string;
  gradient: string;
  active: boolean;
  side: "left" | "right";
}) {
  return (
    <div className={`flex flex-col items-center ${side === "left" ? "" : ""}`}>
      <div className="relative">
        {active && (
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{ scale: [1, 1.4], opacity: [0.5, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeOut" }}
            style={{ boxShadow: "0 0 0 4px rgba(16, 185, 129, 0.5)" }}
          />
        )}
        <div className={`relative w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center ${active ? "ring-2 ring-brand-emerald/60" : ""}`}>
          <span className="text-white font-display font-bold text-base md:text-lg">T</span>
        </div>
      </div>
      <span className={`text-[11px] mt-2 transition-colors ${active ? "text-brand-emerald" : "text-white/50"}`}>
        {name}
      </span>
    </div>
  );
}

type TFn = (k: TKey, params?: Record<string, string | number>) => string;

function ConnectionBar({ active, elapsed, done, t }: { active: boolean; elapsed: number; done: boolean; t: TFn }) {
  return (
    <div className="flex-1 mx-3 md:mx-6 relative">
      <div className="h-px bg-gradient-to-r from-brand-primary/40 via-brand-violet/40 to-brand-emerald/40 relative">
        {active && (
          <>
            <motion.div
              animate={{ x: ["-10%", "110%"] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-brand-emerald shadow-[0_0_10px_rgba(16,185,129,0.8)]"
            />
            <motion.div
              animate={{ x: ["110%", "-10%"] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "linear", delay: 0.7 }}
              className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-brand-primary shadow-[0_0_10px_rgba(37,99,235,0.8)]"
            />
          </>
        )}
      </div>
      <div className="text-center mt-2">
        <span className={`text-[10px] font-body tabular-nums ${done ? "text-brand-emerald" : "text-white/40"}`}>
          {done ? t("a2a.done.short") : active ? `${t("a2a.negotiating").replace("...", "")} ${elapsed}s` : `${t("a2a.waiting")} · ${elapsed}s`}
        </span>
      </div>
    </div>
  );
}

function ChatBubble({ step, ts, isFinal, t }: { step: ChatStep; ts: string; isFinal: boolean; t: TFn }) {
  if (step.side === "system") {
    const isCompletion = step.fromKey === "a2a.s.8.from";
    return (
      <div
        className={`max-w-[90%] px-4 py-2.5 rounded-full text-center text-xs font-body ${
          isCompletion
            ? "bg-brand-emerald/15 border border-brand-emerald/40 text-brand-emerald"
            : "bg-white/5 border border-white/10 text-white/50"
        }`}
      >
        <div className="flex items-center justify-center gap-2">
          {isCompletion && <CheckIcon className="w-3.5 h-3.5" />}
          <span>{t(step.textKey)}</span>
        </div>
      </div>
    );
  }

  const isIsaac = step.side === "isaac";
  const colorBase = isIsaac
    ? "bg-gradient-to-br from-brand-primary/20 to-brand-violet/20 border-brand-primary/30"
    : "bg-gradient-to-br from-brand-emerald/15 to-teal-400/15 border-brand-emerald/30";

  return (
    <div className={`max-w-[78%] ${isIsaac ? "items-end" : "items-start"} flex flex-col`}>
      <div className={`text-[10px] mb-1 px-1 ${isIsaac ? "text-brand-primary/80" : "text-brand-emerald/80"}`}>
        {t(step.fromKey)}
      </div>
      <div
        className={`relative px-4 py-2.5 rounded-2xl border backdrop-blur-sm ${colorBase} ${
          isFinal ? "ring-1 ring-brand-emerald/40" : ""
        } ${isIsaac ? "rounded-tr-sm" : "rounded-tl-sm"}`}
      >
        <div className="text-sm text-white/90 leading-relaxed">{t(step.textKey)}</div>
      </div>
      <div className={`text-[10px] text-white/25 mt-1 px-1 ${isIsaac ? "text-right" : "text-left"}`}>{ts}</div>
    </div>
  );
}

function TypingBubble({ side, t }: { side: Side; t: TFn }) {
  const isIsaac = side === "isaac";
  const colorBase = isIsaac
    ? "bg-brand-primary/15 border-brand-primary/30"
    : "bg-brand-emerald/15 border-brand-emerald/30";
  const name = isIsaac ? t("a2a.isaac.tony") : t("a2a.sumin.tony");
  return (
    <div className={`max-w-[60%] ${isIsaac ? "items-end" : "items-start"} flex flex-col`}>
      <div className={`text-[10px] mb-1 px-1 ${isIsaac ? "text-brand-primary/80" : "text-brand-emerald/80"}`}>
        {t("a2a.typing", { name })}
      </div>
      <div
        className={`px-4 py-3 rounded-2xl border ${colorBase} ${
          isIsaac ? "rounded-tr-sm" : "rounded-tl-sm"
        } flex items-center gap-1`}
      >
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className={`w-1.5 h-1.5 rounded-full ${isIsaac ? "bg-brand-primary" : "bg-brand-emerald"}`}
            animate={{ y: [0, -3, 0], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
          />
        ))}
      </div>
    </div>
  );
}

function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
    </svg>
  );
}

function formatTime(s: number) {
  const m = Math.floor(s / 60);
  const ss = s % 60;
  return `${m.toString().padStart(2, "0")}:${ss.toString().padStart(2, "0")}`;
}

function stepTimestamp(i: number, _tick: number) {
  void _tick;
  if (i === 0) return "방금";
  if (i < 3) return `${i}초 전`;
  return `${i * 2}초 전`;
}
