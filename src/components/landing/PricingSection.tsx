"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "./SectionWrapper";
import { useInView } from "@/hooks/useInView";
import { staggerContainer, fadeUp } from "@/lib/animations";
import { cn } from "@/lib/cn";
import { useT } from "@/i18n/I18nProvider";
import type { TKey } from "@/i18n/dictionaries";

interface Plan {
  tierKey: TKey;
  amountKey: TKey;
  tokensKey: TKey;
  featureKeys: TKey[];
  popular?: boolean;
}

const plans: Plan[] = [
  {
    tierKey: "pricing.deck.free.tier",
    amountKey: "pricing.deck.free.amount",
    tokensKey: "pricing.deck.free.tokens",
    featureKeys: ["pricing.deck.free.f1", "pricing.deck.free.f2", "pricing.deck.free.f3"],
  },
  {
    tierKey: "pricing.deck.lite.tier",
    amountKey: "pricing.deck.lite.amount",
    tokensKey: "pricing.deck.lite.tokens",
    featureKeys: ["pricing.deck.lite.f1", "pricing.deck.lite.f2", "pricing.deck.lite.f3"],
  },
  {
    tierKey: "pricing.deck.std.tier",
    amountKey: "pricing.deck.std.amount",
    tokensKey: "pricing.deck.std.tokens",
    featureKeys: ["pricing.deck.std.f1", "pricing.deck.std.f2", "pricing.deck.std.f3", "pricing.deck.std.f4"],
    popular: true,
  },
  {
    tierKey: "pricing.deck.pro.tier",
    amountKey: "pricing.deck.pro.amount",
    tokensKey: "pricing.deck.pro.tokens",
    featureKeys: ["pricing.deck.pro.f1", "pricing.deck.pro.f2", "pricing.deck.pro.f3", "pricing.deck.pro.f4"],
  },
  {
    tierKey: "pricing.deck.ult.tier",
    amountKey: "pricing.deck.ult.amount",
    tokensKey: "pricing.deck.ult.tokens",
    featureKeys: ["pricing.deck.ult.f1", "pricing.deck.ult.f2", "pricing.deck.ult.f3", "pricing.deck.ult.f4"],
  },
];

const kpis: { vKey: TKey; uKey: TKey; dKey: TKey }[] = [
  { vKey: "pricing.deck.kpi.ltv.v", uKey: "pricing.deck.kpi.ltv.u", dKey: "pricing.deck.kpi.ltv.d" },
  { vKey: "pricing.deck.kpi.arr.v", uKey: "pricing.deck.kpi.arr.u", dKey: "pricing.deck.kpi.arr.d" },
  { vKey: "pricing.deck.kpi.gm.v",  uKey: "pricing.deck.kpi.gm.u",  dKey: "pricing.deck.kpi.gm.d" },
];

export function PricingSection() {
  const t = useT();
  const { ref, isInView } = useInView();

  return (
    <SectionWrapper id="pricing" dark={false}>
      <div className="text-center mb-12">
        <p className="text-sm font-body font-semibold text-brand-primary mb-4 uppercase tracking-widest">
          {t("pricing.tag")}
        </p>
        <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-gray-900 leading-tight mb-4">
          {t("pricing.title")}
        </h2>
        <p className="font-body text-base md:text-lg text-gray-500 max-w-2xl mx-auto">
          {t("pricing.subtitle")}
        </p>
      </div>

      {/* Heading row 1 */}
      <div className="mb-6 max-w-6xl mx-auto">
        <h3 className="font-display font-bold text-xl md:text-2xl text-gray-900 mb-1">
          {t("pricing.deck.h1")}
        </h3>
        <p className="font-body text-sm md:text-[15px] text-gray-500">
          {t("pricing.deck.subtitle")}
        </p>
      </div>

      {/* 5 tiers */}
      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 max-w-6xl mx-auto mb-16"
      >
        {plans.map((plan) => (
          <motion.div key={plan.tierKey} variants={fadeUp}>
            <div
              className={cn(
                "relative rounded-2xl p-6 h-full flex flex-col",
                plan.popular
                  ? "bg-gradient-to-b from-brand-primary/8 via-brand-violet/4 to-transparent border-2 border-brand-primary/40 shadow-xl shadow-brand-primary/15"
                  : "bg-white border border-gray-100 shadow-sm hover:border-brand-primary/20 transition-colors"
              )}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-brand-primary to-brand-violet text-white text-[11px] font-display font-bold tracking-wider">
                  {t("pricing.deck.recommend")}
                </div>
              )}
              <div className="text-[11px] font-display font-bold tracking-widest uppercase text-gray-400 mb-3">
                {t(plan.tierKey)}
              </div>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="font-display font-extrabold text-3xl text-gray-900">{t(plan.amountKey)}</span>
                <span className="font-body text-sm text-gray-400">{t("pricing.deck.unit.month")}</span>
              </div>
              <div className="text-xs text-gray-500 font-body mb-4">{t(plan.tokensKey)}</div>
              <ul className="space-y-2 text-[13px] font-body text-gray-600 flex-1">
                {plan.featureKeys.map((fk) => (
                  <li key={fk} className="flex items-start gap-1.5">
                    <span className={cn("font-bold", plan.popular ? "text-brand-primary" : "text-brand-emerald")}>✓</span>
                    <span>{t(fk)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Heading row 2: in-app ads */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto mb-12"
      >
        <h3 className="font-display font-bold text-xl md:text-2xl text-gray-900 mb-2">
          {t("pricing.deck.h2")}
        </h3>
        <p className="font-body text-sm md:text-[15px] text-gray-500 leading-relaxed">
          {t("pricing.deck.h2.body")}
        </p>
      </motion.div>

      {/* Heading row 3: Tony Pay */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto mb-12"
      >
        <h3 className="font-display font-bold text-xl md:text-2xl text-gray-900 mb-2">
          {t("pricing.deck.h3")}
        </h3>
        <p className="font-body text-sm md:text-[15px] text-gray-500 leading-relaxed">
          {t("pricing.deck.h3.body")}
        </p>
      </motion.div>

      {/* KPI tiles */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-6xl mx-auto"
      >
        {kpis.map((k) => (
          <div
            key={k.vKey}
            className="rounded-2xl p-7 text-center bg-gradient-to-br from-cyan-50 to-indigo-50 border border-indigo-100"
          >
            <div
              className="font-display font-extrabold text-4xl md:text-5xl leading-none mb-2"
              style={{
                background: "linear-gradient(135deg, #22d3ee, #6366f1)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                letterSpacing: "-0.02em",
              }}
            >
              {t(k.vKey)}
            </div>
            <div className="font-body text-sm text-gray-600 font-semibold mt-2 mb-1">{t(k.uKey)}</div>
            <div className="font-body text-xs text-gray-400 leading-snug">{t(k.dKey)}</div>
          </div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
