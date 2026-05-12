"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/landing/Navbar";
import { PremiumBackdrop } from "@/components/landing/PremiumBackdrop";
import { Footer } from "@/components/landing/Footer";
import { PreregisterForm } from "@/components/landing/PreregisterForm";
import { getNewsItem, getRelatedItems } from "@/lib/blog-data";

export default function BlogDetailPage({ params }: { params: { id: string } }) {
  const item = getNewsItem(params.id);
  const router = useRouter();

  if (!item) return notFound();

  const related = getRelatedItems(item.id, 3);

  return (
    <>
      <PremiumBackdrop />
      <Navbar />
      <main className="relative z-10 min-h-screen pt-24 md:pt-28 pb-24">
        {/* Top breadcrumb / back row */}
        <div className="max-w-3xl mx-auto px-6 md:px-8 mb-6 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => {
              if (typeof window !== "undefined" && window.history.length > 1) {
                router.back();
              } else {
                router.push("/blog");
              }
            }}
            className="inline-flex items-center gap-1.5 text-sm text-white/55 hover:text-white transition-colors font-body group"
          >
            <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            이전 페이지
          </button>
          <nav className="text-xs text-white/40 font-body flex items-center gap-1.5">
            <Link href="/" className="hover:text-white/70 transition-colors">홈</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-white/70 transition-colors">블로그</Link>
            <span>/</span>
            <span className="text-white/60 truncate max-w-[140px]">{item.category}</span>
          </nav>
        </div>

        {/* Hero */}
        <article className="max-w-3xl mx-auto px-6 md:px-8">
          <header className="mb-8">
            <div className="flex items-center gap-3 mb-5">
              <span
                className={`px-2.5 py-1 rounded-full text-[10px] font-display font-bold tracking-widest uppercase border ${item.categoryColor}`}
              >
                {item.category}
              </span>
              <span className="text-[11px] uppercase tracking-widest font-display font-bold text-white/70">
                {item.source}
              </span>
            </div>

            <h1 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-white leading-[1.15] tracking-tight mb-6">
              {item.title}
            </h1>

            <p className="font-body text-base md:text-lg text-white/65 leading-relaxed mb-6">
              {item.excerpt}
            </p>

            <div className="flex items-center justify-between pt-5 border-t border-white/10 text-[12px] text-white/50 font-body">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-primary to-brand-violet flex items-center justify-center text-white font-display font-bold text-[11px]">
                  {item.author.slice(0, 1)}
                </div>
                <div>
                  <div className="text-white/85 font-display font-semibold text-[13px]">{item.author}</div>
                  <div className="text-[11px] text-white/40">{item.source}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-white/70 font-display text-[12px]">{item.date}</div>
                <div className="text-[11px] text-white/40">{item.readTime} 읽기</div>
              </div>
            </div>
          </header>

          {/* Hero image */}
          <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-white/10 bg-black/40 mb-10">
            <Image
              src={item.image}
              alt={item.title}
              fill
              sizes="(min-width: 768px) 768px, 100vw"
              className="object-cover object-top"
              priority
            />
          </div>

          {/* Body */}
          <div className="font-body text-white/80 leading-[1.8] text-[16px] md:text-[17px] space-y-6">
            {item.body.map((para, i) => (
              <div key={i}>
                {i === 0 && (
                  <span className="float-left mr-3 mt-1 font-display font-extrabold text-5xl md:text-6xl bg-gradient-to-br from-brand-primary to-brand-violet bg-clip-text text-transparent leading-none">
                    {para.charAt(0)}
                  </span>
                )}
                <p className={i === 0 ? "" : ""}>
                  {i === 0 ? para.slice(1) : para}
                </p>

                {/* Pull quote inserted after 2nd paragraph */}
                {i === 1 && item.pullQuote && (
                  <blockquote className="my-10 pl-6 border-l-4 border-brand-primary py-3">
                    <p className="font-display font-bold text-xl md:text-2xl text-white/95 leading-snug">
                      &ldquo;{item.pullQuote}&rdquo;
                    </p>
                  </blockquote>
                )}
              </div>
            ))}
          </div>

          {/* Tags / Share */}
          <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] uppercase tracking-widest text-white/40 font-display font-bold">Tags:</span>
              <span className="px-2.5 py-1 rounded-full text-[11px] bg-white/5 border border-white/10 text-white/70">#Tony</span>
              <span className="px-2.5 py-1 rounded-full text-[11px] bg-white/5 border border-white/10 text-white/70">#AI에이전트</span>
              <span className="px-2.5 py-1 rounded-full text-[11px] bg-white/5 border border-white/10 text-white/70">#메신저</span>
              <span className="px-2.5 py-1 rounded-full text-[11px] bg-white/5 border border-white/10 text-white/70">#{item.category}</span>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm text-white/60 hover:text-white transition-colors font-body group"
            >
              <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              뉴스룸으로
            </Link>
          </div>
        </article>

        {/* Related articles */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 mt-20">
          <h2 className="font-display font-bold text-2xl md:text-3xl text-white mb-8">
            관련 기사
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((rel) => (
              <article
                key={rel.id}
                className="group relative rounded-2xl overflow-hidden border border-white/10 bg-white/[0.02] hover:border-white/25 hover:bg-white/[0.05] hover:-translate-y-0.5 transition-all duration-300 flex flex-col"
              >
                <Link href={`/blog/${rel.id}`} className="flex flex-col h-full">
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/40">
                    <Image
                      src={rel.image}
                      alt={rel.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                    <span
                      className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-display font-bold tracking-widest uppercase border ${rel.categoryColor}`}
                    >
                      {rel.category}
                    </span>
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-display font-bold text-white/40 mb-2">
                      <span className="text-white/70">{rel.source}</span>
                      <span>·</span>
                      <span>{rel.date}</span>
                    </div>
                    <h3 className="font-display font-bold text-base text-white leading-snug mb-2 line-clamp-2 group-hover:text-brand-primary transition-colors">
                      {rel.title}
                    </h3>
                    <p className="font-body text-xs text-white/55 leading-relaxed line-clamp-2 mt-auto">
                      {rel.excerpt}
                    </p>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="max-w-3xl mx-auto px-6 md:px-8 mt-20">
          <div className="relative rounded-3xl p-8 md:p-10 bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/10 overflow-hidden text-center">
            <div
              className="absolute inset-0 opacity-30 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at top, rgba(245,158,11,0.15), transparent 60%)",
              }}
            />
            <div className="relative max-w-xl mx-auto">
              <h2 className="font-display font-bold text-2xl text-white mb-3 leading-tight">
                Tony 출시 소식, 가장 먼저 받아보세요
              </h2>
              <p className="font-body text-sm text-white/55 leading-relaxed mb-6">
                베타 오픈, 신규 기능, 미디어 인터뷰 — 이메일 한 통으로 정리해 보내드립니다.
              </p>
              <PreregisterForm source={`blog-${item.id}`} variant="full" />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
