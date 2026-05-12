"use client";

import { HeartIcon } from "./Icon";
import { useT } from "@/i18n/I18nProvider";
import type { TKey } from "@/i18n/dictionaries";

export function Footer() {
  const t = useT();

  const productLinks: TKey[] = ["footer.link.features", "footer.link.pricing", "footer.link.demo"];
  const companyLinks: TKey[] = ["footer.link.about", "footer.link.careers", "footer.link.investors"];
  const legalLinks:   TKey[] = ["footer.link.terms", "footer.link.privacy", "footer.link.security"];

  return (
    <footer className="bg-[#030308] border-t border-white/5 px-6 md:px-12 lg:px-20 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand-primary to-brand-violet flex items-center justify-center">
                <span className="text-white font-display font-bold text-sm">T</span>
              </div>
              <span className="font-display font-bold text-lg text-white">Tony</span>
            </div>
            <p className="font-body text-sm text-white/30 leading-relaxed mb-4 whitespace-pre-line">
              {t("footer.tagline")}
            </p>
            <div className="flex items-center gap-3">
              {["X", "LI", "GH"].map((icon) => (
                <div
                  key={icon}
                  className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/30 text-xs font-display hover:bg-white/10 hover:text-white/50 transition-colors cursor-pointer"
                >
                  {icon}
                </div>
              ))}
            </div>
          </div>

          <FooterCol title={t("footer.col.product")} items={productLinks.map((k) => t(k))} />
          <FooterCol title={t("footer.col.company")} items={companyLinks.map((k) => t(k))} />
          <FooterCol title={t("footer.col.legal")}   items={legalLinks.map((k) => t(k))} />
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-white/20">
            {t("footer.copy")}
          </p>
          <p className="font-body text-xs text-white/20 inline-flex items-center gap-1.5">
            {t("footer.made")} <HeartIcon className="w-3.5 h-3.5 text-brand-rose" /> {t("footer.in")}
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h4 className="font-display font-semibold text-sm text-white/60 mb-4 uppercase tracking-wider">
        {title}
      </h4>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item}>
            <a href="#" className="font-body text-sm text-white/30 hover:text-white/60 transition-colors">
              {item}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
