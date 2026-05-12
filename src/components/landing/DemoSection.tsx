"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./Button";
import { VideoModal } from "./VideoModal";
import { GradientOrb } from "./GradientOrb";
import { RocketIcon } from "./Icon";
import { useT } from "@/i18n/I18nProvider";

export function DemoSection() {
  const t = useT();
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <section
      id="demo"
      className="relative py-24 md:py-32 lg:py-40 px-6 md:px-12 lg:px-20 overflow-hidden bg-surface-dark"
    >
      <GradientOrb color="rgba(37, 99, 235, 0.1)" size={400} blur={150} className="top-[20%] left-[-5%]" />
      <GradientOrb color="rgba(139, 92, 246, 0.08)" size={350} blur={120} className="bottom-[20%] right-[-5%]" animation="float-slow" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-sm font-body font-semibold text-brand-primary mb-4 uppercase tracking-widest"
        >
          {t("demo.tag")}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-white leading-tight mb-6"
        >
          {t("demo.title")}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="font-body text-lg text-white/40 mb-12 max-w-xl mx-auto"
        >
          {t("demo.subtitle")}
        </motion.p>

        {/* Demo CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <Button variant="primary" size="lg" href="https://x.tony-ai.app" className="text-lg !px-12 !py-5">
            <RocketIcon className="w-5 h-5" />
            {t("demo.cta")}
          </Button>
        </motion.div>

        {/* Video embed area */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="relative max-w-3xl mx-auto mb-12"
        >
          <div
            onClick={() => setVideoOpen(true)}
            className="relative aspect-video rounded-2xl bg-white/5 border border-white/10 overflow-hidden cursor-pointer group hover:border-white/20 transition-all"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/10 to-brand-violet/10" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/20 group-hover:scale-110 transition-all duration-300">
                <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
            <div className="absolute bottom-6 left-6 right-6 text-left">
              <div className="text-white/60 text-sm font-body">{t("demo.video.label")}</div>
              <div className="text-white font-display font-semibold">{t("demo.video.title")}</div>
            </div>
          </div>
        </motion.div>

        {/* Resources row */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button variant="secondary" size="md">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            {t("demo.resource.pdf")}
          </Button>
          <div className="flex items-center gap-3">
            <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white/30 text-sm font-body flex items-center gap-2">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
              </svg>
              {t("demo.store.appstore")} — {t("demo.store.soon")}
            </div>
            <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white/30 text-sm font-body flex items-center gap-2">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-1.775l2.45 1.42c.9.52.9 1.776 0 2.297l-2.45 1.42-2.553-2.569 2.553-2.568zM5.864 3.458L16.8 9.791l-2.302 2.302-8.634-8.635z" />
              </svg>
              {t("demo.store.playstore")} — {t("demo.store.soon")}
            </div>
          </div>
        </motion.div>
      </div>

      <VideoModal isOpen={videoOpen} onClose={() => setVideoOpen(false)} />
    </section>
  );
}
