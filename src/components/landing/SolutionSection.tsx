"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "./SectionWrapper";
import { useT } from "@/i18n/I18nProvider";

export function SolutionSection() {
  const t = useT();

  return (
    <SectionWrapper id="solution" dark>
      <div className="mb-12">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex px-3.5 py-1.5 rounded-full bg-brand-primary/12 border border-brand-primary/30 mb-6"
        >
          <span className="text-[12px] font-display font-bold tracking-[0.18em] uppercase text-brand-primary">
            {t("solution.tag")}
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[1.05] tracking-tight max-w-5xl"
        >
          {t("solution.title.1")}
          <span
            style={{
              background: "linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #22d3ee 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {t("solution.title.highlight")}
          </span>
          {t("solution.title.2")}
        </motion.h2>
      </div>

      <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16 items-start">
        {/* Left text column */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h3 className="font-display font-bold text-2xl md:text-3xl lg:text-4xl text-white leading-tight mb-6">
            {t("solution.split.h")}
          </h3>
          <p className="font-body text-base md:text-lg lg:text-xl text-white/55 leading-relaxed mb-6">
            {t("solution.split.lead.1")} <strong className="text-white font-semibold">{t("solution.split.lead.strong")}</strong>{t("solution.split.lead.tail")}
          </p>
          <p className="font-body text-sm md:text-base text-white/55 leading-[1.7] mb-8">
            {t("solution.split.body.1")} <strong className="text-white font-semibold">{t("solution.split.body.strong")}</strong> {t("solution.split.body.2")}
          </p>

          <div
            className="p-5 md:p-6 rounded-r-2xl"
            style={{
              background: "linear-gradient(135deg, rgba(34,211,238,0.06), rgba(99,102,241,0.04))",
              borderLeft: "3px solid rgba(34,211,238,0.6)",
              borderRadius: "0 16px 16px 0",
            }}
          >
            <p className="font-body text-sm md:text-[15px] text-white/65 leading-relaxed">
              <strong className="text-white font-semibold">{t("solution.callout.label")}</strong>
              <span className="text-white/40 mx-2">—</span>
              {t("solution.callout.body")}
            </p>
          </div>
        </motion.div>

        {/* Right conversation viz */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative rounded-[32px] p-6 md:p-7 overflow-hidden"
          style={{
            background: "linear-gradient(180deg, #0e0e1a, #050510)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 40px 80px -20px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)",
          }}
        >
          <div
            className="absolute top-0 left-0 right-0 h-16 pointer-events-none"
            style={{
              background: "linear-gradient(180deg, rgba(99,102,241,0.1), transparent)",
            }}
          />

          <div className="relative">
            <div className="text-[11px] font-display font-bold tracking-[0.15em] text-white/40 mb-5">
              ◉ {t("solution.viz.live")}
            </div>

            <div className="space-y-4">
              {/* Message 1: my Tony */}
              <Bubble side="tony" gradient="from-blue-400 to-indigo-500" delay={0.1}>
                <Label color="white/40">{t("solution.viz.m1.from")}</Label>
                <Body tone="indigo">{t("solution.viz.m1.body")}</Body>
              </Bubble>

              {/* Message 2: Mei Lin's Tony */}
              <Bubble side="default" gradient="from-purple-500 to-cyan-400" delay={0.4}>
                <Label color="white/40">{t("solution.viz.m2.from")}</Label>
                <Body>{t("solution.viz.m2.body")}</Body>
              </Bubble>

              {/* Message 3: my Tony confirmation */}
              <Bubble side="tony" gradient="from-blue-400 to-indigo-500" delay={0.8}>
                <Label color="white/40">{t("solution.viz.m3.from")}</Label>
                <Body tone="indigo">{t("solution.viz.m3.body")}</Body>
                <Meta>{t("solution.viz.m3.meta")}</Meta>
              </Bubble>

              {/* Spacer */}
              <div className="h-6" />

              {/* Message 4: user wake up */}
              <Bubble side="user" gradient="from-amber-500 to-rose-500" delay={1.4} initial="I">
                <Label color="amber">{t("solution.viz.m4.from")}</Label>
                <Body tone="amber">{t("solution.viz.m4.body")}</Body>
              </Bubble>
            </div>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}

interface BubbleProps {
  children: React.ReactNode;
  side: "tony" | "default" | "user";
  gradient: string;
  delay?: number;
  initial?: string;
}

function Bubble({ children, side, gradient, delay = 0, initial }: BubbleProps) {
  const bubbleStyle: React.CSSProperties =
    side === "tony"
      ? { background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.3)" }
      : side === "user"
      ? { background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.3)" }
      : { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="flex gap-3"
    >
      <div
        className={`w-9 h-9 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-sm font-bold text-white shrink-0 relative shadow-md`}
      >
        {side === "user" ? (
          initial
        ) : (
          <>
            <span className="absolute left-[10px] top-[12px] w-1 h-1 rounded-full bg-white" />
            <span className="absolute right-[10px] top-[12px] w-1 h-1 rounded-full bg-white" />
          </>
        )}
      </div>
      <div
        className="px-4 py-3 rounded-2xl max-w-[320px]"
        style={bubbleStyle}
      >
        {children}
      </div>
    </motion.div>
  );
}

function Label({ children, color = "white/40" }: { children: React.ReactNode; color?: string }) {
  const cls =
    color === "amber"
      ? "text-amber-400"
      : "text-white/40";
  return <div className={`text-[11px] font-semibold ${cls} mb-1`}>{children}</div>;
}

function Body({ children, tone }: { children: React.ReactNode; tone?: "indigo" | "amber" }) {
  const cls =
    tone === "indigo" ? "text-indigo-100" : tone === "amber" ? "text-white" : "text-white";
  return <div className={`text-sm leading-relaxed ${cls}`}>{children}</div>;
}

function Meta({ children }: { children: React.ReactNode }) {
  return <div className="text-[11px] text-white/40 mt-1.5">{children}</div>;
}
