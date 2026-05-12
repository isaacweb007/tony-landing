"use client";

import { motion } from "framer-motion";
import { GradientOrb } from "./GradientOrb";
import { useT } from "@/i18n/I18nProvider";

export function TeamSection() {
  const t = useT();

  return (
    <section
      id="team"
      className="relative py-24 md:py-28 lg:py-32 px-6 md:px-12 lg:px-20 overflow-hidden bg-surface-dark"
    >
      <GradientOrb color="rgba(99, 102, 241, 0.06)" size={500} blur={180} className="top-[10%] right-[-15%]" />
      <GradientOrb color="rgba(168, 85, 247, 0.05)" size={400} blur={150} className="bottom-[10%] left-[-10%]" animation="float-slow" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <p className="text-sm font-body font-semibold text-brand-emerald mb-4 uppercase tracking-widest">
            {t("team.tag")}
          </p>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-white leading-tight mb-5">
            {t("team.title.1")}<br />
            <span className="text-gradient-primary">{t("team.title.2")}</span>
          </h2>
          <p className="font-body text-base md:text-lg text-white/45 max-w-2xl mx-auto leading-relaxed">
            {t("team.subtitle")}
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="rounded-3xl p-6 md:p-10 bg-gradient-to-br from-brand-primary/8 via-white/[0.02] to-brand-violet/5 border border-white/10 backdrop-blur-sm grid md:grid-cols-[auto_1fr] gap-6 md:gap-8 items-center"
        >
          {/* Avatar */}
          <div className="relative mx-auto md:mx-0">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-brand-primary via-brand-violet to-brand-emerald blur-2xl opacity-50" />
            <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-brand-primary via-brand-violet to-brand-emerald p-[3px] shadow-2xl shadow-brand-primary/30">
              <div className="w-full h-full rounded-full bg-surface-dark flex items-center justify-center overflow-hidden">
                <span className="font-display font-bold text-5xl text-white">T</span>
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="text-center md:text-left">
            <div className="text-[11px] font-display font-bold tracking-widest text-brand-emerald mb-2">
              {t("team.founder.role")}
            </div>
            <h3 className="font-display font-extrabold text-2xl md:text-3xl text-white mb-1.5">
              {t("team.founder.name")}
            </h3>
            <div className="font-body text-sm text-white/55 mb-4">
              {t("team.founder.org")}
            </div>
            <p className="font-body text-sm md:text-[15px] text-white/65 leading-relaxed">
              {t("team.founder.bio")}
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-6 p-5 md:p-6 rounded-2xl bg-gradient-to-br from-brand-emerald/[0.06] to-transparent border-l-4 border-brand-emerald/60"
        >
          <div className="text-[11px] font-display font-bold tracking-widest text-brand-emerald mb-2">
            {t("team.note")}
          </div>
          <p className="font-body text-sm md:text-[15px] text-white/65 leading-relaxed">
            {t("team.note.body")}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
