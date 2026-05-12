"use client";

import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/landing/Navbar";
import { PremiumBackdrop } from "@/components/landing/PremiumBackdrop";
import { Footer } from "@/components/landing/Footer";
import { PreregisterForm } from "@/components/landing/PreregisterForm";
import { PencilIcon } from "@/components/landing/Icon";
import { newsItems } from "@/lib/blog-data";

export default function BlogPage() {
  return (
    <>
      <PremiumBackdrop />
      <Navbar />
      <main className="relative z-10 min-h-screen pt-28 md:pt-32 pb-24 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-amber/12 border border-brand-amber/30 mb-6">
              <PencilIcon className="w-3.5 h-3.5 text-brand-amber" />
              <span className="text-[12px] font-display font-bold tracking-[0.18em] uppercase text-brand-amber">
                Newsroom
              </span>
            </div>

            <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-white leading-[1.1] tracking-tight mb-5">
              메신저의 다음 시대,
              <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-brand-primary via-brand-violet to-brand-emerald bg-clip-text text-transparent">
                지금 일어나는 일들
              </span>
            </h1>

            <p className="font-body text-base md:text-lg text-white/55 leading-relaxed max-w-2xl mx-auto">
              세계 주요 매체가 주목하는 Tony AI 에이전트 메신저의 출시 소식과 기술 이야기를 모았습니다.
            </p>
          </div>

          {/* News Grid — 3 columns × 2 rows */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsItems.map((item, idx) => (
              <article
                key={item.id}
                className="group relative rounded-2xl overflow-hidden border border-white/10 bg-white/[0.02] hover:border-white/25 hover:bg-white/[0.05] hover:-translate-y-0.5 transition-all duration-300 flex flex-col"
              >
                <Link href={`/blog/${item.id}`} className="flex flex-col h-full">
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/40">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                      priority={idx < 3}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                    <span
                      className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-display font-bold tracking-widest uppercase border ${item.categoryColor}`}
                    >
                      {item.category}
                    </span>
                  </div>
                  <div className="p-5 md:p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-display font-bold text-white/40 mb-3">
                      <span className="text-white/70">{item.source}</span>
                      <span>·</span>
                      <span>{item.date}</span>
                    </div>
                    <h3 className="font-display font-bold text-lg md:text-xl text-white leading-snug mb-3 line-clamp-2 group-hover:text-brand-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="font-body text-sm text-white/55 leading-relaxed line-clamp-3 mb-4 flex-1">
                      {item.excerpt}
                    </p>
                    <div className="flex items-center justify-between pt-3 border-t border-white/5 text-[11px] text-white/45 font-body">
                      <span>By {item.author}</span>
                      <span className="inline-flex items-center gap-1 group-hover:text-brand-primary transition-colors">
                        기사 읽기
                        <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>

          {/* Newsletter / Preregister */}
          <div className="mt-20 relative rounded-3xl p-8 md:p-12 bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/10 overflow-hidden text-center">
            <div
              className="absolute inset-0 opacity-30 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at top, rgba(245,158,11,0.15), transparent 60%)",
              }}
            />
            <div className="relative max-w-2xl mx-auto">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-brand-amber/15 border border-brand-amber/30 mb-5 text-brand-amber">
                <PencilIcon className="w-7 h-7" />
              </div>
              <h2 className="font-display font-bold text-2xl md:text-3xl text-white mb-3 leading-tight">
                Tony 출시 소식, 가장 먼저 받아보세요
              </h2>
              <p className="font-body text-sm md:text-base text-white/55 leading-relaxed max-w-lg mx-auto mb-8">
                베타 오픈, 신규 기능, 미디어 인터뷰 — 이메일 한 통으로 정리해 보내드립니다.
              </p>
              <PreregisterForm source="blog" variant="full" />
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-sm text-white/40 hover:text-white/70 transition-colors font-body"
            >
              ← 홈으로 돌아가기
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
