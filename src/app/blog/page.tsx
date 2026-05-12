"use client";

import Image from "next/image";
import { Navbar } from "@/components/landing/Navbar";
import { PremiumBackdrop } from "@/components/landing/PremiumBackdrop";
import { Footer } from "@/components/landing/Footer";
import { PreregisterForm } from "@/components/landing/PreregisterForm";
import { PencilIcon } from "@/components/landing/Icon";

type NewsItem = {
  id: string;
  category: string;
  categoryColor: string;
  title: string;
  excerpt: string;
  source: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
};

const newsItems: NewsItem[] = [
  {
    id: "n1",
    category: "TECH",
    categoryColor: "text-brand-violet bg-brand-violet/15 border-brand-violet/30",
    title: "메신저도 이제 에이전트 시대 — Tony, 차세대 AI 메신저 공개 임박",
    excerpt:
      "글로벌 메신저 시장이 새로운 패러다임 전환을 맞이하고 있다. 카카오톡·iMessage·왓츠앱이 정의해온 '실시간 채팅'의 시대를 넘어, 사용자를 대신해 메시지를 읽고 답장까지 처리하는 '개인 에이전트' 시대가 본격 열린다.",
    source: "TechCrunch Korea",
    author: "김도현 기자",
    date: "2026.05.10",
    readTime: "4분",
    image: "/images/blog/demo-1.png",
  },
  {
    id: "n2",
    category: "PRODUCT",
    categoryColor: "text-brand-emerald bg-brand-emerald/15 border-brand-emerald/30",
    title: "잠든 사이 메시지가 정리된다 — Tony 베타 출시 카운트다운",
    excerpt:
      "Tony AI는 사용자가 자는 동안에도 단톡방 230개 메시지를 자동 분류·요약하고, 긴급한 건만 골라 알림을 보낸다. 베타 사전등록자가 한 달 새 2만 명을 돌파했다.",
    source: "The Verge",
    author: "Sarah Park",
    date: "2026.05.08",
    readTime: "3분",
    image: "/images/blog/demo-2.png",
  },
  {
    id: "n3",
    category: "AI",
    categoryColor: "text-brand-amber bg-brand-amber/15 border-brand-amber/30",
    title: "온디바이스 LLM이 바꾸는 프라이버시 — Tony의 기술적 도전",
    excerpt:
      "Llama 3.2 1B 모델을 아이폰에서 직접 구동시켜, 메시지 한 줄도 서버로 보내지 않는다. 'AI는 클라우드여야 한다'는 통념을 깨는 시도가 주목받고 있다.",
    source: "WIRED",
    author: "Andrew Chen",
    date: "2026.05.05",
    readTime: "6분",
    image: "/images/blog/demo-3.png",
  },
  {
    id: "n4",
    category: "PRODUCT",
    categoryColor: "text-brand-primary bg-brand-primary/15 border-brand-primary/30",
    title: "230개 메시지를 3줄 브리핑으로 — Tony가 제안하는 새 커뮤니케이션",
    excerpt:
      "기존 메신저의 '읽지 않음 387' 뱃지를 없애는 게 목표다. Tony는 아침 30초 브리핑으로 밤사이 도착한 모든 메시지를 정리해 보여준다.",
    source: "Bloomberg Technology",
    author: "Mina Lee",
    date: "2026.05.02",
    readTime: "5분",
    image: "/images/blog/demo-4.png",
  },
  {
    id: "n5",
    category: "AI",
    categoryColor: "text-brand-rose bg-brand-rose/15 border-brand-rose/30",
    title: "내 말투를 학습한 AI가 답장한다 — Tony의 95% 톤 매칭 정확도",
    excerpt:
      "친구별·관계별로 다른 말투를 따로 학습하는 '톤 엔진'. 친구가 받았을 때 'AI가 보낸 건지 모르겠다'고 답한 비율이 95%에 달했다는 내부 테스트 결과가 공개됐다.",
    source: "MIT Technology Review",
    author: "Daniel Wright",
    date: "2026.04.28",
    readTime: "5분",
    image: "/images/blog/demo-1.png",
  },
  {
    id: "n6",
    category: "STARTUP",
    categoryColor: "text-brand-violet bg-brand-violet/15 border-brand-violet/30",
    title: "에이전트끼리 약속을 잡는 시대 — Tony의 A2A 네트워크 공개",
    excerpt:
      "'우리 언제 볼래?'를 7번 주고받지 않아도 된다. 양쪽 에이전트가 캘린더를 협상해 약속을 잡고, 사용자는 결과만 확인하면 되는 Agent-to-Agent 프로토콜이 베일을 벗었다.",
    source: "Forbes",
    author: "Jenny Hwang",
    date: "2026.04.25",
    readTime: "4분",
    image: "/images/blog/demo-2.png",
  },
];

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
                <a href="#" className="flex flex-col h-full">
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
                      <span>{item.readTime} 읽기</span>
                    </div>
                  </div>
                </a>
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
            <a
              href="/"
              className="inline-flex items-center gap-1.5 text-sm text-white/40 hover:text-white/70 transition-colors font-body"
            >
              ← 홈으로 돌아가기
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
