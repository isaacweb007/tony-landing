"use client";

import { useState, useEffect } from "react";
import type { ComponentType, SVGProps } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { cn } from "@/lib/cn";
import { Button } from "./Button";
import {
  SparkleIcon,
  ShieldLockIcon,
  ChartIcon,
  CrownIcon,
  RocketIcon,
  HeartIcon,
  PencilIcon,
} from "./Icon";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useT } from "@/i18n/I18nProvider";
import type { TKey } from "@/i18n/dictionaries";

interface NavLink {
  labelKey: TKey;
  href: string;
  descKey: TKey;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  accent: string;
}

const navLinks: NavLink[] = [
  { labelKey: "nav.features",  href: "#features", descKey: "nav.features.desc", Icon: SparkleIcon, accent: "text-brand-violet" },
  { labelKey: "nav.privacy",   href: "#privacy",  descKey: "nav.privacy.desc",  Icon: ShieldLockIcon, accent: "text-brand-emerald" },
  { labelKey: "nav.market",    href: "#market",   descKey: "nav.market.desc",   Icon: ChartIcon, accent: "text-brand-amber" },
  { labelKey: "nav.pricing",   href: "#pricing",  descKey: "nav.pricing.desc",  Icon: CrownIcon, accent: "text-brand-primary" },
  { labelKey: "nav.blog",      href: "/blog",     descKey: "nav.blog.desc",     Icon: PencilIcon, accent: "text-brand-amber" },
  { labelKey: "nav.demo",      href: "#demo",     descKey: "nav.demo.desc",     Icon: RocketIcon, accent: "text-brand-rose" },
];

export function Navbar() {
  const t = useT();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>("");

  const { scrollYProgress } = useScroll();
  const progressX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, mass: 0.3 });

  useEffect(() => {
    function handleScroll() {
      const y = window.scrollY;
      setScrolled(y > 80);
      setHidden(y > lastScrollY && y > 400 && !mobileOpen);
      setLastScrollY(y);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, mobileOpen]);

  // Lock body scroll while mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Track which section is active using IntersectionObserver
  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1));
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (href: string) => (e: React.MouseEvent) => {
    // Unlock body NOW so the native anchor jump can scroll the page.
    document.body.style.overflow = "";
    setMobileOpen(false);
    if (href === "#") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    // Path links (/blog) and section anchors (#features) both fall through to native nav.
  };

  // Close on Escape
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMobileOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: 0 }}
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.3 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-[background,backdrop-filter,border-color] duration-500",
          scrolled || mobileOpen
            ? "bg-surface-dark/70 backdrop-blur-2xl backdrop-saturate-150 border-b border-white/[0.06] shadow-[0_8px_32px_-12px_rgba(0,0,0,0.4)]"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 h-16 md:h-20 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            onClick={handleNavClick("#")}
            className="flex items-center gap-2.5 group"
          >
            <div className="w-9 h-9 rounded-xl overflow-hidden shadow-lg shadow-yellow-400/20 group-hover:scale-105 transition-transform">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/tony-logo.png" alt="Tony" className="w-full h-full object-cover" />
            </div>
            <span className="font-display font-bold text-lg text-white tracking-tight">Tony</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1 rounded-full px-2 py-1 bg-white/[0.03] border border-white/5">
            {navLinks.slice(0, 5).map((link) => {
              const isActive = activeId === link.href.slice(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={handleNavClick(link.href)}
                  className={cn(
                    "relative px-4 py-1.5 text-sm font-body rounded-full transition-colors",
                    isActive ? "text-white" : "text-white/55 hover:text-white"
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-bg"
                      className="absolute inset-0 rounded-full bg-white/10 border border-white/10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{t(link.labelKey)}</span>
                </a>
              );
            })}
          </div>

          {/* Desktop CTA + Language */}
          <div className="hidden md:flex items-center gap-2">
            <LanguageSwitcher variant="navbar" />
            <Button variant="primary" size="sm" href="https://tony-ai.app/">
              {t("nav.cta")}
            </Button>
          </div>

          {/* Mobile Hamburger */}
          <button
            aria-label={mobileOpen ? "메뉴 닫기" : "메뉴 열기"}
            className="md:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-full hover:bg-white/5 transition-colors"
            onClick={() => setMobileOpen((o) => !o)}
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className="w-5 h-[1.5px] bg-white block"
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              className="w-5 h-[1.5px] bg-white block"
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className="w-5 h-[1.5px] bg-white block"
            />
          </button>
        </div>

        {/* Scroll progress bar */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px origin-left bg-gradient-to-r from-brand-primary via-brand-violet to-brand-emerald"
          style={{ scaleX: progressX }}
        />
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 bg-surface-dark/85 backdrop-blur-xl"
            />

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="fixed inset-x-0 top-16 z-40 px-4 pb-6 max-h-[calc(100vh-4rem)] overflow-y-auto"
            >
              <div className="max-w-md mx-auto">
                {/* Section title */}
                <motion.p
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 }}
                  className="text-[10px] uppercase tracking-widest text-white/30 font-body font-semibold px-4 mt-2 mb-3"
                >
                  {t("nav.section")}
                </motion.p>

                {/* Section cards */}
                <div className="space-y-2">
                  {navLinks.map((link, i) => {
                    const isActive = activeId === link.href.slice(1);
                    return (
                      <motion.a
                        key={link.href}
                        href={link.href}
                        onClick={handleNavClick(link.href)}
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -16 }}
                        transition={{ delay: 0.08 + i * 0.05, duration: 0.3 }}
                        className={cn(
                          "group relative flex items-center gap-4 p-4 rounded-2xl border transition-all overflow-hidden",
                          isActive
                            ? "bg-gradient-to-r from-white/[0.08] to-white/[0.04] border-white/20"
                            : "bg-white/[0.03] border-white/5 hover:bg-white/[0.06] hover:border-white/15"
                        )}
                      >
                        {isActive && (
                          <motion.span
                            layoutId="mobile-active-edge"
                            className="absolute left-0 top-2 bottom-2 w-0.5 rounded-r-full bg-gradient-to-b from-brand-primary to-brand-violet"
                          />
                        )}
                        <div
                          className={cn(
                            "w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-all",
                            isActive
                              ? "bg-white/10 border border-white/15"
                              : "bg-white/5 border border-white/5 group-hover:bg-white/10"
                          )}
                        >
                          <link.Icon className={cn("w-5 h-5", link.accent)} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-display font-semibold text-base text-white flex items-center gap-2">
                            {t(link.labelKey)}
                            {isActive && (
                              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-brand-emerald/15 text-brand-emerald text-[9px] font-bold">
                                <span className="w-1 h-1 rounded-full bg-brand-emerald animate-pulse" />
                                {t("nav.viewing")}
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-white/45 mt-0.5 truncate">{t(link.descKey)}</div>
                        </div>
                        <svg
                          className={cn(
                            "w-4 h-4 shrink-0 transition-all",
                            isActive ? "text-white translate-x-0.5" : "text-white/30 group-hover:text-white/60 group-hover:translate-x-0.5"
                          )}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </motion.a>
                    );
                  })}
                </div>

                {/* CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 16 }}
                  transition={{ delay: 0.4 }}
                  className="mt-5"
                >
                  <a
                    href="https://tony-ai.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => { document.body.style.overflow = ""; setMobileOpen(false); }}
                    className="block w-full text-center font-display font-semibold text-white py-4 rounded-2xl bg-gradient-to-r from-brand-primary via-brand-violet to-brand-emerald shadow-lg shadow-brand-primary/30 hover:shadow-xl hover:shadow-brand-primary/40 transition-all"
                  >
                    <span className="inline-flex items-center gap-2">
                      <RocketIcon className="w-5 h-5" />
                      {t("nav.cta.long")}
                    </span>
                  </a>
                </motion.div>

                {/* Language switcher (mobile) */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.45 }}
                  className="mt-6"
                >
                  <LanguageSwitcher variant="mobile" />
                </motion.div>

                {/* Footer */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-6 pt-5 border-t border-white/5 flex items-center justify-between text-[11px] text-white/30 font-body px-2"
                >
                  <span>© 2026 Tony AI</span>
                  <span className="inline-flex items-center gap-1.5">
                    {t("footer.made")} <HeartIcon className="w-3 h-3 text-brand-rose" /> {t("footer.in")}
                  </span>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
