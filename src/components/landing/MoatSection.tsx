"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "./SectionWrapper";
import { useInView } from "@/hooks/useInView";
import { staggerContainer, fadeUp } from "@/lib/animations";
import { useT } from "@/i18n/I18nProvider";
import type { TKey } from "@/i18n/dictionaries";

interface Moat {
  labelKey: TKey;
  titleKey: TKey;
  descKey: TKey;
}

const moats: Moat[] = [
  { labelKey: "moat.1.label", titleKey: "moat.1.title", descKey: "moat.1.desc" },
  { labelKey: "moat.2.label", titleKey: "moat.2.title", descKey: "moat.2.desc" },
  { labelKey: "moat.3.label", titleKey: "moat.3.title", descKey: "moat.3.desc" },
  { labelKey: "moat.4.label", titleKey: "moat.4.title", descKey: "moat.4.desc" },
];

export function MoatSection() {
  const t = useT();
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <SectionWrapper id="moat" dark>
      <div className="max-w-3xl mb-16">
        <p className="text-sm font-body font-semibold text-brand-violet mb-4 uppercase tracking-widest">
          {t("moat.tag")}
        </p>
        <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-white leading-tight mb-6">
          {t("moat.title.1")}<br />
          {t("moat.title.2")}<br />
          <span className="text-gradient-primary">{t("moat.title.highlight")}</span>
        </h2>
        <p className="font-body text-base md:text-lg text-white/45 leading-relaxed">
          {t("moat.subtitle")}
        </p>
      </div>

      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
        className="grid grid-cols-1 md:grid-cols-2 gap-5"
      >
        {moats.map((m) => (
          <motion.div
            key={m.labelKey}
            variants={fadeUp}
            className="relative rounded-2xl p-6 md:p-8 bg-white/[0.02] border border-white/10 hover:border-brand-primary/30 transition-all overflow-hidden group"
          >
            <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-gradient-to-br from-brand-primary/15 to-brand-violet/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative">
              <div className="text-[11px] font-display font-bold tracking-widest text-brand-primary mb-3">
                {t(m.labelKey)}
              </div>
              <h3 className="font-display font-bold text-xl md:text-2xl text-white mb-3 leading-tight">
                {t(m.titleKey)}
              </h3>
              <p className="font-body text-sm text-white/55 leading-relaxed">
                {t(m.descKey)}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="mt-10 p-6 md:p-7 rounded-2xl bg-gradient-to-br from-brand-emerald/[0.06] to-brand-primary/[0.04] border-l-4 border-brand-emerald/60"
      >
        <p className="font-body text-sm md:text-base text-white/70 leading-relaxed italic">
          {t("moat.lesson")}
        </p>
      </motion.div>
    </SectionWrapper>
  );
}
