"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useT, useI18n } from "@/i18n/I18nProvider";
import { RocketIcon, CheckIcon, SparkleIcon } from "./Icon";

interface Props {
  source?: string;
  /** Visual style — compact: inline in hero; full: standalone section */
  variant?: "compact" | "full";
}

type Status = "idle" | "loading" | "success" | "duplicate" | "error";

export function PreregisterForm({ source = "hero", variant = "compact" }: Props) {
  const t = useT();
  const { locale } = useI18n();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errMsg, setErrMsg] = useState<string>("");
  const [position, setPosition] = useState<number | null>(null);

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading") return;

    if (!EMAIL_RE.test(email.trim())) {
      setErrMsg(t("prereg.error.invalid"));
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrMsg("");

    try {
      const res = await fetch("/api/preregister", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), locale, source }),
      });
      const data = (await res.json()) as { ok: boolean; duplicate?: boolean; position?: number; error?: string };

      if (!res.ok || !data.ok) {
        if (data.error === "invalid_email") {
          setErrMsg(t("prereg.error.invalid"));
        } else {
          setErrMsg(t("prereg.error.generic"));
        }
        setStatus("error");
        return;
      }

      setPosition(data.position ?? null);
      setStatus(data.duplicate ? "duplicate" : "success");
    } catch {
      setErrMsg(t("prereg.error.generic"));
      setStatus("error");
    }
  }

  const isSuccess = status === "success" || status === "duplicate";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.6 }}
      className={
        variant === "compact"
          ? "max-w-xl mx-auto"
          : "max-w-2xl mx-auto"
      }
    >
      {/* Top mini pill */}
      <div className="flex items-center justify-center gap-1.5 mb-2.5">
        <SparkleIcon className="w-3.5 h-3.5 text-brand-emerald" />
        <span className="text-[11px] font-display font-bold tracking-[0.18em] uppercase text-brand-emerald">
          {t("prereg.tag")}
        </span>
      </div>

      <h3 className={`font-display font-bold ${variant === "compact" ? "text-base md:text-lg" : "text-xl md:text-2xl"} text-white text-center mb-2`}>
        {t("prereg.title")}
      </h3>

      {/* 3 perks */}
      <div className="flex items-center justify-center gap-3 mb-4 flex-wrap">
        {(["prereg.feature.1", "prereg.feature.2", "prereg.feature.3"] as const).map((k) => (
          <span key={k} className="inline-flex items-center gap-1 text-[11px] text-white/55 font-body">
            <CheckIcon className="w-3 h-3 text-brand-emerald" />
            {t(k)}
          </span>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {!isSuccess ? (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -8 }}
            onSubmit={submit}
            className="relative"
          >
            <div
              className={`flex items-center gap-2 p-1.5 rounded-full bg-white/[0.04] border transition-colors ${
                status === "error" ? "border-brand-rose/60" : "border-white/15 focus-within:border-brand-primary/50"
              }`}
              style={{
                boxShadow:
                  status === "error"
                    ? "0 0 0 3px rgba(244,63,94,0.1)"
                    : "0 0 0 1px rgba(255,255,255,0.04)",
              }}
            >
              <input
                type="email"
                required
                inputMode="email"
                autoComplete="email"
                placeholder={t("prereg.placeholder")}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === "error") {
                    setStatus("idle");
                    setErrMsg("");
                  }
                }}
                disabled={status === "loading"}
                className="flex-1 bg-transparent px-4 py-3 text-sm md:text-[15px] text-white placeholder-white/35 outline-none disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="relative inline-flex items-center gap-1.5 px-5 py-3 rounded-full text-sm font-display font-semibold text-white shimmer-overlay glow-primary disabled:opacity-70 disabled:cursor-not-allowed transition-transform active:scale-[0.97]"
                style={{
                  background: "linear-gradient(135deg, #2563eb 0%, #6366f1 45%, #8b5cf6 100%)",
                }}
              >
                <span className="relative z-10 inline-flex items-center gap-1.5 whitespace-nowrap">
                  {status === "loading" ? (
                    <>
                      <Spinner />
                      {t("prereg.cta.loading")}
                    </>
                  ) : (
                    <>
                      <RocketIcon className="w-4 h-4" />
                      {t("prereg.cta")}
                    </>
                  )}
                </span>
              </button>
            </div>

            <AnimatePresence>
              {status === "error" && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="text-[12px] text-brand-rose mt-2 px-4"
                >
                  {errMsg}
                </motion.p>
              )}
            </AnimatePresence>

            <p className="text-[11px] text-white/30 mt-3 text-center px-2 leading-relaxed">
              {t("prereg.sub")}
            </p>
          </motion.form>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 280, damping: 22 }}
            className="relative rounded-2xl p-5 md:p-6 bg-gradient-to-br from-brand-emerald/[0.12] to-brand-primary/[0.05] border border-brand-emerald/30"
          >
            <div className="flex items-start gap-3">
              <div className="relative shrink-0 mt-0.5">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 380, damping: 18 }}
                  className="w-9 h-9 rounded-full bg-brand-emerald flex items-center justify-center"
                >
                  <CheckIcon className="w-5 h-5 text-white" />
                </motion.div>
                <motion.span
                  initial={{ scale: 1, opacity: 0.5 }}
                  animate={{ scale: 1.8, opacity: 0 }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                  className="absolute inset-0 rounded-full border-2 border-brand-emerald"
                />
              </div>
              <div className="flex-1 min-w-0 text-left">
                <h4 className="font-display font-bold text-white text-base md:text-lg leading-tight">
                  {t("prereg.success.title")}
                </h4>
                <p className="text-sm text-white/65 mt-1.5 leading-relaxed">
                  {t("prereg.success.body")}
                </p>
                {position !== null && (
                  <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-emerald/15 border border-brand-emerald/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-emerald animate-pulse" />
                    <span className="text-xs text-brand-emerald font-semibold tabular-nums">
                      {t("prereg.success.position", { n: position })}
                    </span>
                  </div>
                )}
                <p className="text-[10px] text-white/30 mt-3 leading-relaxed">
                  {t("prereg.privacy")}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function Spinner() {
  return (
    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3" />
      <path d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
