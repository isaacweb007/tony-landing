"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionWrapper } from "./SectionWrapper";
import { PhoneMockup } from "./PhoneMockup";
import { CheckIcon, WarningIcon } from "./Icon";
import { useT } from "@/i18n/I18nProvider";

interface Chat {
  name: string;
  initial: string;
  base: number; // starting unread count
}

const chatList: Chat[] = [
  { name: "회사 단톡",  initial: "회", base: 12 },
  { name: "가족 모임",  initial: "가", base: 8 },
  { name: "동창회",     initial: "동", base: 5 },
  { name: "프로젝트 A", initial: "프", base: 17 },
  { name: "엄마",       initial: "엄", base: 3 },
  { name: "친구들",     initial: "친", base: 9 },
  { name: "동아리",     initial: "동", base: 6 },
];

const briefItems = [
  "47개 메시지 정리 완료",
  "엄마 답장 초안 준비됨",
  "회사 단톡 3줄 요약",
];

const decisions = [
  { who: "엄마", text: "엄마가 토요일 저녁 같이 먹자고 하셨어요" },
  { who: "수민", text: "수민이가 토요일 9시 북한산 등산 제안했어요" },
  { who: "회사", text: "회식 다음주 금요일 7시, 참석 회신 필요해요" },
  { who: "지수", text: "지수 생일 선물 같이 사기로 했어요. 예산은?" },
];

export function ParadigmShiftSection() {
  const t = useT();

  /* ── Left phone: live unread bombardment ── */
  const [unreads, setUnreads] = useState(() => chatList.map((c) => c.base));
  const [pulseIdx, setPulseIdx] = useState<number | null>(null);
  const [extra, setExtra] = useState(40);

  useEffect(() => {
    const id = setInterval(() => {
      // Pick a random chat, increment its unread by 1-3
      const idx = Math.floor(Math.random() * chatList.length);
      const bump = 1 + Math.floor(Math.random() * 3);
      setUnreads((prev) => prev.map((u, i) => (i === idx ? u + bump : u)));
      setPulseIdx(idx);
      setExtra((e) => e + bump);
      const t = setTimeout(() => setPulseIdx(null), 700);
      return () => clearTimeout(t);
    }, 1400);
    return () => clearInterval(id);
  }, []);

  const totalUnread = unreads.reduce((s, n) => s + n, 0) + extra;

  /* ── Right phone: tasks check off, decision rotates ── */
  const [checked, setChecked] = useState<number[]>([]);
  const [decisionIdx, setDecisionIdx] = useState(0);
  const [tonyWorking, setTonyWorking] = useState(false);

  useEffect(() => {
    // Reveal brief items one at a time
    if (checked.length < briefItems.length) {
      const timer = setTimeout(() => {
        setChecked((prev) => [...prev, prev.length]);
      }, 900);
      return () => clearTimeout(timer);
    }
    return;
  }, [checked]);

  useEffect(() => {
    // After all items checked, cycle decisions
    if (checked.length < briefItems.length) return;
    const id = setInterval(() => {
      setTonyWorking(true);
      setTimeout(() => {
        setDecisionIdx((i) => (i + 1) % decisions.length);
        setTonyWorking(false);
      }, 450);
    }, 3800);
    return () => clearInterval(id);
  }, [checked.length]);

  return (
    <SectionWrapper id="paradigm" dark>
      <div className="text-center mb-12">
        <p className="text-sm font-body font-semibold text-brand-violet mb-4 uppercase tracking-widest">
          {t("paradigm.tag")}
        </p>
        <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-white leading-tight">
          {t("paradigm.title.1")}
          <br />
          <span className="text-gradient-primary">{t("paradigm.title.2")}</span>{t("paradigm.title.3")}
        </h2>
      </div>

      {/* Central transformation arrow (desktop only) */}
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center max-w-5xl mx-auto">
        <CenterTransformArrow />

        {/* Before */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center"
        >
          <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-rose/10 border border-brand-rose/20 text-brand-rose text-sm font-body">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            {t("paradigm.before.badge")}
          </div>

          <motion.div
            // Subtle stress shake when new message arrives
            animate={pulseIdx !== null ? { x: [0, -1, 1.5, -1, 0] } : { x: 0 }}
            transition={{ duration: 0.35 }}
          >
            <PhoneMockup tint="rose">
              <div className="p-4 pt-10 space-y-2.5">
                <div className="flex items-baseline justify-between px-2 pt-3">
                  <div className="text-left text-white/85 font-display font-bold text-lg">
                    {t("paradigm.before.title")}
                  </div>
                  <motion.span
                    key={totalUnread}
                    initial={{ scale: 1.3, color: "#fda4af" }}
                    animate={{ scale: 1, color: "rgba(244,63,94,0.85)" }}
                    transition={{ duration: 0.3 }}
                    className="text-[11px] font-display font-bold tabular-nums"
                  >
                    {totalUnread} 안 읽음
                  </motion.span>
                </div>

                {chatList.map((chat, i) => {
                  const isPulsing = pulseIdx === i;
                  return (
                    <motion.div
                      key={chat.name}
                      animate={isPulsing ? { scale: [1, 1.02, 1], borderColor: ["rgba(244,63,94,0)", "rgba(244,63,94,0.5)", "rgba(244,63,94,0)"] } : {}}
                      transition={{ duration: 0.6 }}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/5 border border-transparent"
                    >
                      <div className="relative w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-xs text-white/50 shrink-0">
                        {chat.initial}
                        {isPulsing && (
                          <motion.span
                            initial={{ scale: 1, opacity: 0.5 }}
                            animate={{ scale: 2, opacity: 0 }}
                            transition={{ duration: 0.7 }}
                            className="absolute inset-0 rounded-full border-2 border-brand-rose"
                          />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm text-white/70 font-medium truncate">{chat.name}</div>
                        <div className="text-xs text-white/30 truncate">{t("paradigm.before.line")}</div>
                      </div>
                      <motion.div
                        key={unreads[i]}
                        initial={isPulsing ? { scale: 1.4 } : { scale: 1 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 380, damping: 14 }}
                        className="min-w-[20px] h-5 px-1.5 rounded-full bg-brand-rose/85 text-[10px] text-white flex items-center justify-center font-bold tabular-nums shadow-md shadow-brand-rose/30"
                      >
                        {unreads[i]}
                      </motion.div>
                    </motion.div>
                  );
                })}

                <div className="text-center text-white/25 text-xs pt-2 italic">
                  +{extra}{t("paradigm.before.more").replace(/^\+\d+/, "")}
                </div>
              </div>
            </PhoneMockup>
          </motion.div>

          <p className="mt-6 font-body text-white/40 text-sm">
            {t("paradigm.before.caption")}
          </p>
        </motion.div>

        {/* After */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
          className="text-center"
        >
          <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-emerald/10 border border-brand-emerald/20 text-brand-emerald text-sm font-body">
            <CheckIcon className="w-4 h-4" />
            Tony
          </div>

          <PhoneMockup tint="emerald">
            <div className="p-4 pt-10 space-y-3">
              <div className="text-left px-2 pt-4">
                <div className="text-white/40 text-xs font-body">{t("paradigm.after.greet")}</div>
                <div className="text-white font-display font-bold text-lg mt-1">{t("paradigm.after.title")}</div>
              </div>

              <div className="px-1 space-y-2.5">
                {/* Animated check items */}
                {briefItems.map((textKey, i) => {
                  const isChecked = checked.includes(i);
                  // Re-use existing translated keys
                  const tKey = (["paradigm.after.item1","paradigm.after.item2","paradigm.after.item3"] as const)[i];
                  return (
                    <motion.div
                      key={i}
                      animate={{ opacity: isChecked ? 1 : 0.4 }}
                      className="flex items-center gap-3 px-3 py-3 rounded-xl bg-white/5 relative overflow-hidden"
                    >
                      <motion.div
                        initial={false}
                        animate={isChecked ? { scale: 1, opacity: 1 } : { scale: 0.5, opacity: 0.3 }}
                        transition={{ type: "spring", stiffness: 400, damping: 18 }}
                        className="shrink-0"
                      >
                        <CheckIcon className="w-4 h-4 text-brand-emerald" />
                      </motion.div>
                      <span className={`text-sm transition-colors ${isChecked ? "text-white/85" : "text-white/40"}`}>
                        {t(tKey)}
                      </span>
                      {/* Reveal sweep overlay */}
                      <AnimatePresence>
                        {!isChecked && (
                          <motion.span
                            key="sweep"
                            initial={{ x: "-100%" }}
                            animate={{ x: "100%" }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-y-0 w-1/3"
                            style={{
                              background: "linear-gradient(90deg, transparent, rgba(16,185,129,0.18), transparent)",
                            }}
                          />
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}

                {/* Warning item (always shown) */}
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{
                    opacity: checked.length >= briefItems.length ? 1 : 0.3,
                    y: 0,
                  }}
                  transition={{ duration: 0.4 }}
                  className="flex items-center gap-3 px-3 py-3 rounded-xl bg-white/5"
                >
                  <WarningIcon className="w-4 h-4 shrink-0 text-brand-amber" />
                  <span className="text-sm text-white/85">{t("paradigm.after.item4")}</span>
                </motion.div>

                {/* Decision card with rotating content */}
                <AnimatePresence mode="wait">
                  {checked.length >= briefItems.length && (
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.45 }}
                      className="mt-4 p-4 rounded-xl bg-gradient-to-br from-brand-primary/12 to-brand-violet/10 border border-brand-primary/25 relative overflow-hidden"
                    >
                      <div className="absolute inset-0 opacity-30 pointer-events-none">
                        <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-brand-primary/30 blur-2xl" />
                      </div>

                      <div className="relative">
                        <div className="flex items-center justify-between mb-2">
                          <div className="text-xs text-brand-primary font-semibold flex items-center gap-1.5">
                            <span className="w-1 h-1 rounded-full bg-brand-primary animate-pulse" />
                            {t("paradigm.after.decision.tag")}
                          </div>
                          <AnimatePresence mode="wait">
                            {tonyWorking && (
                              <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="text-[9px] text-brand-emerald font-bold tracking-wider uppercase flex items-center gap-1"
                              >
                                <span className="flex gap-0.5">
                                  {[0, 1, 2].map((d) => (
                                    <motion.span
                                      key={d}
                                      className="w-0.5 h-0.5 rounded-full bg-brand-emerald"
                                      animate={{ opacity: [0.3, 1, 0.3] }}
                                      transition={{ duration: 0.9, repeat: Infinity, delay: d * 0.15 }}
                                    />
                                  ))}
                                </span>
                                Tony 처리 중
                              </motion.span>
                            )}
                          </AnimatePresence>
                        </div>

                        <AnimatePresence mode="wait">
                          <motion.div
                            key={decisionIdx}
                            initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0)" }}
                            exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
                            transition={{ duration: 0.35 }}
                            className="text-sm text-white/80 mb-3 leading-relaxed min-h-[40px]"
                          >
                            {decisionIdx === 0 ? t("paradigm.after.decision.text") : decisions[decisionIdx].text}
                          </motion.div>
                        </AnimatePresence>

                        <div className="flex gap-2">
                          <motion.button
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.97 }}
                            className="px-3 py-1.5 rounded-lg bg-brand-primary/25 text-brand-primary text-xs font-medium border border-brand-primary/30 hover:bg-brand-primary/35 transition-colors"
                          >
                            {t("paradigm.after.btn.approve")}
                          </motion.button>
                          <button className="px-3 py-1.5 rounded-lg bg-white/5 text-white/55 text-xs hover:bg-white/10 transition-colors">
                            {t("paradigm.after.btn.edit")}
                          </button>
                          <button className="px-3 py-1.5 rounded-lg bg-white/5 text-white/55 text-xs hover:bg-white/10 transition-colors">
                            {t("paradigm.after.btn.later")}
                          </button>
                        </div>

                        {/* Progress indicator showing decision cycle */}
                        <div className="flex gap-1 mt-3">
                          {decisions.map((_, i) => (
                            <span
                              key={i}
                              className={`h-0.5 flex-1 rounded-full transition-colors ${
                                i === decisionIdx ? "bg-brand-primary" : "bg-white/10"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </PhoneMockup>
          <p className="mt-6 font-body text-white/40 text-sm">
            {t("paradigm.after.caption")}
          </p>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}

function CenterTransformArrow() {
  return (
    <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20 flex-col items-center gap-2">
      <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-brand-primary to-brand-violet flex items-center justify-center shadow-2xl shadow-brand-primary/40">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute -inset-1 rounded-full border border-dashed border-brand-primary/40"
        />
        <svg className="w-5 h-5 text-white relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 12h14" />
        </svg>
      </div>
      <div className="text-[10px] font-display font-bold tracking-[0.18em] uppercase text-brand-primary/80 bg-surface-dark/80 backdrop-blur-sm px-2 py-1 rounded-full border border-brand-primary/20">
        Tony 처리
      </div>
    </div>
  );
}
