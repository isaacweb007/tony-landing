"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/landing/Navbar";
import { PremiumBackdrop } from "@/components/landing/PremiumBackdrop";
import { Footer } from "@/components/landing/Footer";
import { PreregisterForm } from "@/components/landing/PreregisterForm";
import { useT } from "@/i18n/I18nProvider";
import { PencilIcon } from "@/components/landing/Icon";

export default function BlogPage() {
  const t = useT();

  return (
    <>
      <PremiumBackdrop />
      <Navbar />
      <main className="relative z-10 min-h-screen pt-32 pb-24 px-6 md:px-12 lg:px-20">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-amber/12 border border-brand-amber/30 mb-6"
          >
            <PencilIcon className="w-3.5 h-3.5 text-brand-amber" />
            <span className="text-[12px] font-display font-bold tracking-[0.18em] uppercase text-brand-amber">
              {t("blog.tag")}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-white leading-[1.1] tracking-tight mb-5"
          >
            {t("blog.title")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="font-body text-base md:text-lg text-white/55 leading-relaxed mb-14 max-w-xl mx-auto"
          >
            {t("blog.subtitle")}
          </motion.p>

          {/* Coming soon card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="relative rounded-3xl p-8 md:p-12 bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/10 overflow-hidden mb-12"
          >
            {/* Backdrop glow */}
            <div
              className="absolute inset-0 opacity-30 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at top, rgba(245,158,11,0.15), transparent 60%)",
              }}
            />

            <div className="relative">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-brand-amber/15 border border-brand-amber/30 mb-5 text-brand-amber">
                <PencilIcon className="w-7 h-7" />
              </div>
              <h2 className="font-display font-bold text-2xl md:text-3xl text-white mb-3 leading-tight">
                {t("blog.coming.title")}
              </h2>
              <p className="font-body text-sm md:text-base text-white/55 leading-relaxed max-w-lg mx-auto">
                {t("blog.coming.body")}
              </p>
            </div>
          </motion.div>

          {/* Preregister CTA */}
          <PreregisterForm source="blog" variant="full" />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-12"
          >
            <a
              href="/"
              className="inline-flex items-center gap-1.5 text-sm text-white/40 hover:text-white/70 transition-colors font-body"
            >
              {t("blog.back")}
            </a>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
