"use client";

import { motion } from "framer-motion";
import { Button } from "./Button";
import { GradientOrb } from "./GradientOrb";
import { useT } from "@/i18n/I18nProvider";

export function InvestorSection() {
  const t = useT();
  return (
    <section className="relative py-24 md:py-32 lg:py-40 px-6 md:px-12 lg:px-20 overflow-hidden bg-surface-dark">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 via-transparent to-brand-violet/5" />
      <GradientOrb color="rgba(37, 99, 235, 0.06)" size={400} blur={150} className="top-[20%] right-[10%]" />

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-sm font-body font-semibold text-brand-violet mb-6 uppercase tracking-widest"
        >
          {t("investor.tag")}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-white leading-tight mb-6"
        >
          {t("investor.title")}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="font-body text-lg text-white/40 mb-12 leading-relaxed"
        >
          {t("investor.subtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <Button variant="primary" size="lg">
            {t("investor.cta")}
          </Button>
          <Button variant="secondary" size="lg" href={`mailto:${t("investor.email")}`}>
            {t("investor.email")}
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-6 text-white/20 text-sm font-body"
        >
          <span>{t("investor.info.round.label")}: {t("investor.info.round.value")}</span>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <span>{t("investor.info.region.value")}</span>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <span>{t("investor.info.target.label")}: {t("investor.info.target.value")}</span>
        </motion.div>
      </div>
    </section>
  );
}
