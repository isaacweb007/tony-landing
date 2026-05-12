"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "./SectionWrapper";
import { useInView } from "@/hooks/useInView";
import { staggerContainer, fadeUp } from "@/lib/animations";
import { useT } from "@/i18n/I18nProvider";
import type { TKey } from "@/i18n/dictionaries";

const tiles: { vKey: TKey; uKey: TKey; dKey: TKey }[] = [
  { vKey: "synd.t1.v", uKey: "synd.t1.u", dKey: "synd.t1.d" },
  { vKey: "synd.t2.v", uKey: "synd.t2.u", dKey: "synd.t2.d" },
  { vKey: "synd.t3.v", uKey: "synd.t3.u", dKey: "synd.t3.d" },
];

const bars: { year: string; value: string; widthPct: number; tagKey: TKey }[] = [
  { year: "2023", value: "$3.1B",  widthPct: 12,  tagKey: "synd.bar.tag.early" },
  { year: "2024", value: "$5.4B",  widthPct: 22,  tagKey: "synd.bar.tag.spread" },
  { year: "2025", value: "$9.4B",  widthPct: 38,  tagKey: "synd.bar.tag.surge" },
  { year: "2026", value: "$15.7B", widthPct: 62,  tagKey: "synd.bar.tag.mega" },
  { year: "2028", value: "$47B",   widthPct: 88,  tagKey: "synd.bar.tag.std" },
  { year: "2030", value: "$103B",  widthPct: 100, tagKey: "synd.bar.tag.full" },
];

export function MarketSyndromeSection() {
  const t = useT();
  const { ref, isInView } = useInView({ threshold: 0.05 });

  return (
    <SectionWrapper id="syndrome" dark>
      <div className="text-center max-w-4xl mx-auto mb-12">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex px-3.5 py-1.5 rounded-full bg-brand-primary/12 border border-brand-primary/30 mb-6"
        >
          <span className="text-[12px] font-display font-bold tracking-[0.18em] uppercase text-brand-primary">
            {t("synd.tag")}
          </span>
        </motion.div>

        <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-[1.1] tracking-tight mb-6">
          {t("synd.title.1")}<br />
          <span
            style={{
              background: "linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #22d3ee 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {t("synd.title.highlight")}
          </span>
          {t("synd.title.2")}
        </h2>

        <p className="font-body text-base md:text-lg text-white/60 leading-relaxed">
          {t("synd.subtitle.1")} <strong className="text-white font-semibold">{t("synd.subtitle.strong")}</strong>{t("synd.subtitle.2")}
        </p>
      </div>

      {/* 3 stat tiles */}
      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20"
      >
        {tiles.map((tile) => (
          <motion.div
            key={tile.vKey}
            variants={fadeUp}
            className="rounded-3xl p-10 text-center"
            style={{
              background: "linear-gradient(135deg, rgba(34,211,238,0.06), rgba(99,102,241,0.06))",
              border: "1px solid rgba(34,211,238,0.2)",
            }}
          >
            <div
              className="font-display font-extrabold leading-none mb-3"
              style={{
                fontSize: "clamp(40px, 5.5vw, 80px)",
                background: "linear-gradient(135deg, #22d3ee, #6366f1)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                letterSpacing: "-0.03em",
              }}
            >
              {t(tile.vKey)}
            </div>
            <div className="font-body text-sm text-white/60 font-medium mb-3">{t(tile.uKey)}</div>
            <div className="font-body text-xs md:text-sm text-white/40 leading-[1.55]">{t(tile.dKey)}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* Market growth bar chart */}
      <div className="mt-12">
        <h3 className="font-display font-bold text-2xl md:text-3xl text-white mb-2">
          {t("synd.bar.h")}
        </h3>
        <p className="font-body text-sm md:text-base text-white/55 mb-8">
          {t("synd.bar.sub.1")} <strong className="text-white font-semibold">{t("synd.bar.sub.strong")}</strong>{t("synd.bar.sub.2")}
        </p>

        <div
          className="rounded-3xl p-6 md:p-9"
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div className="space-y-4">
            {bars.map((b, i) => (
              <div key={b.year} className="flex items-center gap-4 md:gap-5">
                <div className="w-14 md:w-20 text-xs md:text-sm text-white/55 font-body font-semibold tabular-nums shrink-0">
                  {b.year}
                </div>
                <div
                  className="flex-1 h-8 md:h-9 rounded-lg relative overflow-hidden"
                  style={{ background: "rgba(255,255,255,0.04)" }}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${b.widthPct}%` }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 1.2,
                      ease: [0.34, 1.56, 0.64, 1],
                      delay: 0.1 + i * 0.1,
                    }}
                    className="h-full rounded-lg flex items-center px-3 md:px-4"
                    style={{
                      background: "linear-gradient(90deg, #6366f1, #a855f7)",
                    }}
                  >
                    <span className="text-xs md:text-sm font-bold text-white whitespace-nowrap">
                      {b.value}
                    </span>
                  </motion.div>
                </div>
                <div className="w-20 md:w-28 text-[11px] md:text-sm text-white/70 font-body font-bold text-right shrink-0">
                  {t(b.tagKey)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
