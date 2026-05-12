"use client";

import { motion } from "framer-motion";
import type { ComponentType, SVGProps } from "react";
import { SectionWrapper } from "./SectionWrapper";
import { GlassCard } from "./GlassCard";
import { useInView } from "@/hooks/useInView";
import { staggerContainer, fadeUp } from "@/lib/animations";
import { EnvelopeIcon, CalendarIcon, ChatBubbleIcon, MoonIcon, HandshakeIcon } from "./Icon";
import { useT } from "@/i18n/I18nProvider";
import type { TKey } from "@/i18n/dictionaries";

const moments: {
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  iconColor: string;
  titleKey: TKey;
  descKey: TKey;
  targetKey: TKey;
  gradient: string;
}[] = [
  { Icon: EnvelopeIcon,   iconColor: "text-brand-amber",   titleKey: "moments.1.title", descKey: "moments.1.desc", targetKey: "moments.1.target", gradient: "from-brand-amber/20 to-brand-amber/5" },
  { Icon: CalendarIcon,   iconColor: "text-brand-primary", titleKey: "moments.2.title", descKey: "moments.2.desc", targetKey: "moments.2.target", gradient: "from-brand-primary/20 to-brand-primary/5" },
  { Icon: ChatBubbleIcon, iconColor: "text-brand-violet",  titleKey: "moments.3.title", descKey: "moments.3.desc", targetKey: "moments.3.target", gradient: "from-brand-violet/20 to-brand-violet/5" },
  { Icon: MoonIcon,       iconColor: "text-indigo-500",    titleKey: "moments.4.title", descKey: "moments.4.desc", targetKey: "moments.4.target", gradient: "from-indigo-500/20 to-indigo-500/5" },
  { Icon: HandshakeIcon,  iconColor: "text-brand-emerald", titleKey: "moments.5.title", descKey: "moments.5.desc", targetKey: "moments.5.target", gradient: "from-brand-emerald/20 to-brand-emerald/5" },
];

export function MomentsSection() {
  const t = useT();
  const { ref, isInView } = useInView();

  return (
    <SectionWrapper dark={false}>
      <div className="text-center mb-16">
        <p className="text-sm font-body font-semibold text-brand-violet mb-4 uppercase tracking-widest">
          {t("moments.tag")}
        </p>
        <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-gray-900 leading-tight">
          {t("moments.title.1")} <span className="text-gradient-primary">{t("moments.title.highlight")}</span> {t("moments.title.2")}
        </h2>
      </div>

      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto"
      >
        {moments.map((m, i) => (
          <motion.div
            key={m.titleKey}
            variants={fadeUp}
            className={i === 4 ? "sm:col-span-2 lg:col-span-1" : ""}
          >
            <GlassCard variant="light" className={`h-full bg-gradient-to-br ${m.gradient} !border-0 shadow-sm`}>
              <div className={`w-11 h-11 rounded-xl bg-white/80 backdrop-blur-sm flex items-center justify-center mb-4 ${m.iconColor} shadow-sm`}>
                <m.Icon className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-gray-900 mb-2">{t(m.titleKey)}</h3>
              <p className="font-body text-sm text-gray-500 leading-relaxed mb-3">{t(m.descKey)}</p>
              <span className="inline-block px-2.5 py-1 rounded-full bg-white/60 text-xs font-body text-gray-400">
                {t(m.targetKey)}
              </span>
            </GlassCard>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
