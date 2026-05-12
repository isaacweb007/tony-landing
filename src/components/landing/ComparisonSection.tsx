"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "./SectionWrapper";
import { useInView } from "@/hooks/useInView";
import { useT } from "@/i18n/I18nProvider";
import type { TKey } from "@/i18n/dictionaries";

const featureKeys: TKey[] = [
  "compare.row.sort",
  "compare.row.tone",
  "compare.row.a2a",
  "compare.row.ondevice",
  "compare.row.away",
  "compare.row.summary",
  "compare.row.voice",
  "privacy.tag",
];

type Support = "yes" | "no" | "partial";

const competitors: Record<string, Support[]> = {
  KakaoTalk: ["no", "no", "no", "no", "no", "no", "no", "partial"],
  WhatsApp: ["no", "no", "no", "no", "partial", "no", "no", "yes"],
  ChatGPT: ["partial", "no", "no", "no", "no", "partial", "yes", "no"],
  Tony: ["yes", "yes", "yes", "yes", "yes", "yes", "yes", "yes"],
};

function StatusIcon({ status }: { status: Support }) {
  if (status === "yes")
    return (
      <svg className="w-5 h-5 text-brand-emerald" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
      </svg>
    );
  if (status === "partial")
    return (
      <svg className="w-5 h-5 text-brand-amber" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M20 12H4" />
      </svg>
    );
  return (
    <svg className="w-5 h-5 text-white/15" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

export function ComparisonSection() {
  const t = useT();
  const { ref, isInView } = useInView({ threshold: 0.05 });

  return (
    <SectionWrapper dark>
      <div className="text-center mb-16">
        <p className="text-sm font-body font-semibold text-brand-emerald mb-4 uppercase tracking-widest">
          {t("compare.tag")}
        </p>
        <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-white leading-tight">
          <span className="text-gradient-primary">{t("compare.title")}</span>
        </h2>
      </div>

      <div ref={ref} className="overflow-x-auto -mx-6 px-6">
        <table className="w-full min-w-[640px] max-w-4xl mx-auto">
          <thead>
            <tr>
              <th className="text-left font-body text-sm text-white/40 pb-4 pr-4 w-[200px]">{t("compare.col.feature")}</th>
              {Object.keys(competitors).map((name) => (
                <th
                  key={name}
                  className={`text-center font-display font-semibold text-sm pb-4 px-3 ${
                    name === "Tony" ? "text-brand-primary" : "text-white/60"
                  }`}
                >
                  {name === "Tony" && (
                    <span className="block text-[10px] font-body font-semibold text-brand-primary bg-brand-primary/10 rounded-full px-2 py-0.5 mb-1 w-fit mx-auto">
                      {t("compare.recommend")}
                    </span>
                  )}
                  {name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {featureKeys.map((featureKey, i) => (
              <motion.tr
                key={featureKey}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="border-t border-white/5"
              >
                <td className="py-4 pr-4 font-body text-sm text-white/60">{t(featureKey)}</td>
                {Object.entries(competitors).map(([name, supports]) => (
                  <td
                    key={name}
                    className={`py-4 px-3 text-center ${
                      name === "Tony" ? "bg-brand-primary/5" : ""
                    }`}
                  >
                    <div className="flex justify-center">
                      <StatusIcon status={supports[i]} />
                    </div>
                  </td>
                ))}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionWrapper>
  );
}
