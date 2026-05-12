"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "./SectionWrapper";
import { AnimatedCounter } from "./AnimatedCounter";
import { GlassCard } from "./GlassCard";
import { useInView } from "@/hooks/useInView";
import { staggerContainer, fadeUp } from "@/lib/animations";
import { useT } from "@/i18n/I18nProvider";
import type { TKey } from "@/i18n/dictionaries";

const painPoints: { titleKey: TKey; descKey: TKey; color: string; icon: React.ReactNode }[] = [
  {
    titleKey: "problem.pain.1.title",
    descKey: "problem.pain.1.desc",
    color: "border-brand-rose",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
      </svg>
    ),
  },
  {
    titleKey: "problem.pain.2.title",
    descKey: "problem.pain.2.desc",
    color: "border-brand-amber",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
  {
    titleKey: "problem.pain.3.title",
    descKey: "problem.pain.3.desc",
    color: "border-brand-violet",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    titleKey: "problem.pain.4.title",
    descKey: "problem.pain.4.desc",
    color: "border-brand-primary",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

export function ProblemSection() {
  const t = useT();
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <SectionWrapper id="problem" dark={false}>
      <div className="text-center mb-16 md:mb-20">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-sm font-body font-semibold text-brand-primary mb-4 uppercase tracking-widest"
        >
          {t("problem.tag")}
        </motion.p>

        <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-gray-900 leading-tight">
          {t("problem.title")}
        </h2>
        <p className="font-body text-lg text-gray-500 mt-4">
          {t("problem.subtitle")}
        </p>
      </div>

      {/* Pain point cards */}
      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
        className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-4xl mx-auto mb-16"
      >
        {painPoints.map((p) => (
          <motion.div key={p.titleKey} variants={fadeUp}>
            <GlassCard variant="light" className={`border-l-4 ${p.color} h-full`}>
              <div className="text-gray-600 mb-3">{p.icon}</div>
              <h3 className="font-display font-bold text-lg text-gray-900 mb-2">{t(p.titleKey)}</h3>
              <p className="font-body text-sm text-gray-500 leading-relaxed">{t(p.descKey)}</p>
            </GlassCard>
          </motion.div>
        ))}
      </motion.div>

      {/* Time distribution bar */}
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between text-sm font-body text-gray-500 mb-3">
          <span>{t("problem.bar.label")}</span>
          <span className="text-brand-emerald font-semibold">
            <AnimatedCounter to={20} suffix="%" /> {t("problem.bar.signal").replace(/^20%\s*/, "")}
          </span>
        </div>
        <div className="h-4 rounded-full bg-gray-200 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "80%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
            className="h-full bg-gray-300 rounded-full relative"
          >
            <div className="absolute right-0 top-0 h-full w-[25%] bg-gradient-to-r from-brand-emerald/50 to-brand-emerald rounded-r-full" />
          </motion.div>
        </div>
        <div className="flex items-center justify-between text-xs font-body text-gray-400 mt-2">
          <span>{t("problem.bar.noise")}</span>
          <span>{t("problem.bar.signal")}</span>
        </div>
      </div>
    </SectionWrapper>
  );
}
