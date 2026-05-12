"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "./SectionWrapper";
import { useInView } from "@/hooks/useInView";
import { useT } from "@/i18n/I18nProvider";
import type { TKey } from "@/i18n/dictionaries";

interface Step {
  dateKey: TKey;
  titleKey: TKey;
  bodyKey: TKey;
  now?: boolean;
}

const steps: Step[] = [
  { dateKey: "roadmap.1.date", titleKey: "roadmap.1.title", bodyKey: "roadmap.1.body", now: true },
  { dateKey: "roadmap.2.date", titleKey: "roadmap.2.title", bodyKey: "roadmap.2.body" },
  { dateKey: "roadmap.3.date", titleKey: "roadmap.3.title", bodyKey: "roadmap.3.body" },
  { dateKey: "roadmap.4.date", titleKey: "roadmap.4.title", bodyKey: "roadmap.4.body" },
  { dateKey: "roadmap.5.date", titleKey: "roadmap.5.title", bodyKey: "roadmap.5.body" },
];

export function RoadmapSection() {
  const t = useT();
  const { ref, isInView } = useInView({ threshold: 0.05 });

  return (
    <SectionWrapper id="roadmap" dark={false}>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-sm font-body font-semibold text-brand-primary mb-4 uppercase tracking-widest">
            {t("roadmap.tag")}
          </p>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-gray-900 leading-tight mb-5">
            {t("roadmap.title.1")} <span className="text-gradient-primary">{t("roadmap.title.highlight")}</span>{t("roadmap.title.2")}
          </h2>
          <p className="font-body text-base md:text-lg text-gray-500 max-w-xl mx-auto leading-relaxed">
            {t("roadmap.subtitle")}
          </p>
        </div>

        <div ref={ref} className="relative">
          {/* Vertical line */}
          <div className="absolute left-3 md:left-4 top-2 bottom-2 w-px bg-gradient-to-b from-brand-primary via-brand-violet to-brand-primary/0" />

          <div className="space-y-8">
            {steps.map((s, i) => (
              <motion.div
                key={s.dateKey}
                initial={{ opacity: 0, x: -16 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                className="relative pl-12 md:pl-14"
              >
                {/* Dot */}
                <div
                  className={`absolute left-0 top-1.5 w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center shadow-lg ${
                    s.now
                      ? "bg-gradient-to-br from-brand-primary to-brand-violet shadow-brand-primary/40"
                      : "bg-white border-2 border-gray-200 shadow-gray-200/50"
                  }`}
                >
                  {s.now && <span className="w-2 h-2 rounded-full bg-white animate-pulse" />}
                </div>
                <div
                  className={`rounded-2xl p-5 md:p-6 transition-all ${
                    s.now
                      ? "bg-gradient-to-br from-brand-primary/8 to-brand-violet/4 border border-brand-primary/25"
                      : "bg-white border border-gray-100 hover:border-gray-200"
                  }`}
                >
                  <div
                    className={`text-[11px] font-display font-bold tracking-widest mb-2 ${
                      s.now ? "text-brand-primary" : "text-gray-400"
                    }`}
                  >
                    {t(s.dateKey)}
                  </div>
                  <div className="font-display font-bold text-lg md:text-xl text-gray-900 mb-1.5">
                    {t(s.titleKey)}
                  </div>
                  <div className="font-body text-sm md:text-[15px] text-gray-500 leading-relaxed">
                    {t(s.bodyKey)}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
