"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "./SectionWrapper";
import { useInView } from "@/hooks/useInView";
import { staggerContainer, fadeUp } from "@/lib/animations";
import { useT } from "@/i18n/I18nProvider";
import type { TKey } from "@/i18n/dictionaries";
import type { ReactNode } from "react";

interface Feature {
  icon: ReactNode;
  titleKey: TKey;
  descKey: TKey;
}

const stroke = "#a5b4fc";
const iconProps = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke,
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const features: Feature[] = [
  {
    titleKey: "core.1.title",
    descKey: "core.1.desc",
    icon: (
      <svg {...iconProps}>
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" />
      </svg>
    ),
  },
  {
    titleKey: "core.2.title",
    descKey: "core.2.desc",
    icon: (
      <svg {...iconProps}>
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v6M12 17v6M4.22 4.22l4.24 4.24M15.54 15.54l4.24 4.24M1 12h6M17 12h6M4.22 19.78l4.24-4.24M15.54 8.46l4.24-4.24" />
      </svg>
    ),
  },
  {
    titleKey: "core.3.title",
    descKey: "core.3.desc",
    icon: (
      <svg {...iconProps}>
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
  {
    titleKey: "core.4.title",
    descKey: "core.4.desc",
    icon: (
      <svg {...iconProps}>
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
  {
    titleKey: "core.5.title",
    descKey: "core.5.desc",
    icon: (
      <svg {...iconProps}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    titleKey: "core.6.title",
    descKey: "core.6.desc",
    icon: (
      <svg {...iconProps}>
        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
      </svg>
    ),
  },
];

export function CoreFeaturesSection() {
  const t = useT();
  const { ref, isInView } = useInView({ threshold: 0.05 });

  return (
    <SectionWrapper id="core-features" dark>
      <div className="text-center max-w-3xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex px-3.5 py-1.5 rounded-full bg-brand-primary/12 border border-brand-primary/30 mb-6"
        >
          <span className="text-[12px] font-display font-bold tracking-[0.18em] uppercase text-brand-primary">
            {t("core.tag")}
          </span>
        </motion.div>

        <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-[1.1] tracking-tight">
          {t("core.title.1")}
          <br />
          {t("core.title.2")}
        </h2>
      </div>

      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        {features.map((f) => (
          <motion.div
            key={f.titleKey}
            variants={fadeUp}
            className="group relative rounded-3xl p-8 overflow-hidden transition-all hover:-translate-y-1.5"
            style={{
              background: "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle at 30% 0%, rgba(99,102,241,0.12), transparent 60%)",
              }}
            />

            <div
              className="relative w-13 h-13 rounded-2xl flex items-center justify-center mb-5"
              style={{
                width: 52,
                height: 52,
                background: "linear-gradient(135deg, rgba(99,102,241,0.2), rgba(168,85,247,0.15))",
                border: "1px solid rgba(99,102,241,0.3)",
              }}
            >
              {f.icon}
            </div>
            <h3 className="relative font-display font-bold text-lg md:text-xl text-white mb-2.5 leading-tight">
              {t(f.titleKey)}
            </h3>
            <p className="relative font-body text-sm md:text-[14.5px] text-white/55 leading-[1.65]">
              {t(f.descKey)}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
