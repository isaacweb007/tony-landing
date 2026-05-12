"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "./SectionWrapper";
import { useInView } from "@/hooks/useInView";
import { staggerContainer, fadeUp } from "@/lib/animations";
import { useT } from "@/i18n/I18nProvider";
import type { TKey } from "@/i18n/dictionaries";

interface Card {
  iconKey: TKey;
  titleKey: TKey;
  descKey?: TKey;
  desc1Key?: TKey;
  strongKey?: TKey;
  desc2Key?: TKey;
}

const cards: Card[] = [
  { iconKey: "whynow.1.icon", titleKey: "whynow.1.title", descKey: "whynow.1.desc" },
  { iconKey: "whynow.2.icon", titleKey: "whynow.2.title", descKey: "whynow.2.desc" },
  {
    iconKey: "whynow.3.icon",
    titleKey: "whynow.3.title",
    desc1Key: "whynow.3.desc.1",
    strongKey: "whynow.3.desc.strong",
    desc2Key: "whynow.3.desc.2",
  },
];

export function WhyNowSection() {
  const t = useT();
  const { ref, isInView } = useInView({ threshold: 0.08 });

  return (
    <SectionWrapper id="whynow" dark>
      <div className="max-w-4xl mb-12">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex px-3.5 py-1.5 rounded-full bg-brand-primary/12 border border-brand-primary/30 mb-6"
        >
          <span className="text-[12px] font-display font-bold tracking-[0.18em] uppercase text-brand-primary">
            {t("whynow.tag")}
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[1.05] tracking-tight mb-6"
        >
          {t("whynow.title.1")}<br />
          {t("whynow.title.2")}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="font-body text-base md:text-lg lg:text-xl text-white/55 leading-relaxed max-w-3xl"
        >
          {t("whynow.lead")} <strong className="text-white font-semibold">{t("whynow.lead.strong")}</strong> {t("whynow.lead.tail")}
        </motion.p>
      </div>

      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
        className="grid grid-cols-1 md:grid-cols-3 gap-5"
      >
        {cards.map((c) => (
          <motion.div
            key={c.titleKey}
            variants={fadeUp}
            className="rounded-3xl p-8 md:p-9 transition-all hover:-translate-y-1 hover:border-rose-400/50"
            style={{
              background: "linear-gradient(135deg, rgba(239,68,68,0.08), rgba(245,158,11,0.04))",
              border: "1px solid rgba(239,68,68,0.18)",
            }}
          >
            <div
              className="font-display font-extrabold leading-none mb-4"
              style={{
                fontSize: "clamp(40px, 5.5vw, 56px)",
                background: "linear-gradient(135deg, #ef4444, #f59e0b)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                letterSpacing: "-0.04em",
              }}
            >
              {t(c.iconKey)}
            </div>
            <h3 className="font-display font-bold text-lg md:text-xl text-white mb-3 leading-tight">
              {t(c.titleKey)}
            </h3>
            <p className="font-body text-sm md:text-[14.5px] text-white/55 leading-relaxed">
              {c.descKey
                ? t(c.descKey)
                : (
                  <>
                    {c.desc1Key && t(c.desc1Key)} <strong className="text-white font-semibold">{c.strongKey && t(c.strongKey)}</strong>{c.desc2Key && t(c.desc2Key)}
                  </>
                )}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
