export type NewsItem = {
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
  /** Full article body, array of paragraphs */
  body: string[];
  /** Optional pull quote shown inside article */
  pullQuote?: string;
};

export const newsItems: NewsItem[] = [
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
    pullQuote:
      "사용자가 메시지를 읽는 시대는 끝났다. 이제는 에이전트가 대신 읽고, 우리는 결과만 받는다.",
    body: [
      "글로벌 메신저 시장이 25년 만의 패러다임 전환을 맞이하고 있다. 1992년 IRC, 2009년 카카오톡, 2011년 iMessage로 이어져 온 '실시간 채팅'의 시대를 넘어, 사용자를 대신해 메시지를 읽고 답장까지 처리하는 '개인 에이전트(Personal Agent)' 시대가 본격 막을 열고 있다.",
      "이 흐름의 가장 앞자리에 선 스타트업이 한국에서 출발한 'Tony'다. Tony는 자체 개발한 톤 엔진(Tone Engine)과 온디바이스 LLM을 결합해, 사용자가 잠든 사이에도 단톡방 메시지를 분류하고 요약하며, 친구별로 다른 말투로 답장 초안을 작성한다.",
      "팀이 공개한 클로즈드 베타 지표에 따르면 일일 평균 230개의 메시지가 자동 처리되며, 그중 80% 가량이 사용자가 직접 읽거나 답하지 않아도 되는 '에이전트 처리' 카테고리로 분류된다. '읽지 않음 387' 뱃지가 사라지는 셈이다.",
      "업계 관계자들은 Tony가 노리는 시장을 단순한 메신저 카테고리로 보지 않는다. '개인 OS의 메시지 레이어'라는 새로운 정의가 등장했다는 평가다. 카카오톡·iMessage·왓츠앱이 채팅창의 UX 경쟁을 했다면, Tony는 그 채팅창 위에서 사용자의 시간을 대신 쓰는 에이전트를 제안한다.",
      "Tony 측은 이번 분기 내 한국·일본·베트남 3개국 동시 베타 오픈을 목표로 하고 있다. 사전등록자는 최근 2주 만에 2만 명을 돌파했다.",
    ],
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
    pullQuote: "Tony는 '읽지 않은 메시지'라는 개념 자체를 폐기한다.",
    body: [
      "Tony가 다음 달 클로즈드 베타 단계에 들어간다. 사전등록자는 출시 발표 한 달 만에 2만 명을 넘었다.",
      "이 앱의 핵심은 'AwayMode'다. 사용자가 잠들거나 회의에 들어간 시간 동안 들어온 메시지를 Tony가 1차로 분류한다. 긴급(즉시 알림) / 일반(아침 브리핑 포함) / 무시(노이즈)의 3단계로 나뉜다.",
      "단톡방에 쌓인 100개 메시지가 아침에는 3줄 브리핑으로 요약된다. 사용자는 '읽지 않음 387'이라는 뱃지 대신, '어젯밤 단톡방 4개에서 진행된 일'이라는 한 문단을 받는다.",
      "Tony 팀은 '읽지 않은 메시지'라는 개념 자체를 폐기하는 것이 목표라고 밝혔다. 'inbox zero'가 이메일에 있다면, Tony는 메신저의 inbox zero를 만들고 있는 셈이다.",
    ],
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
    pullQuote:
      "당신의 메시지는 당신의 기기를 떠나지 않는다. 클라우드가 없는 AI 메신저의 기술적 베팅.",
    body: [
      "AI 메신저 시장에서 가장 어려운 질문은 '내 메시지가 어디로 가는가'다. Tony는 이 질문에 가장 과감하게 답한 스타트업이다. 답은 단순하다 — '아무 데도 가지 않는다.'",
      "Tony는 Llama 3.2 1B 모델을 양자화해 iPhone 15 이상에서 직접 구동한다. 메시지 분류, 요약, 답장 초안 생성 등 핵심 AI 기능 대부분이 기기 안에서 처리된다. 사용자의 채팅 내용은 단 한 줄도 외부 서버로 전송되지 않는다.",
      "이 접근은 결코 쉬운 베팅이 아니다. 클라우드 LLM 대비 모델 크기는 600배 가량 작고, 처리 속도와 품질에서 트레이드오프가 존재한다. Tony 팀은 친구별 톤 학습은 LoRA 어댑터로, 컨텍스트 요약은 전용 미세조정 모델로 풀어 정확도를 끌어올렸다.",
      "내부 평가에서 '말투 정확도 95%, 친구가 알아차리는 비율 5% 미만'이라는 결과를 얻었다는 게 회사 설명이다. iCloud나 어떤 외부 서버에도 메시지 사본이 남지 않는다는 점은 Apple Intelligence와도 차별화된 지점이다.",
      "WIRED와의 인터뷰에서 CTO는 '클라우드 AI는 본질적으로 신뢰 모델이지만, 메신저는 그것보다 더 사적인 공간이다. 우리는 그 공간을 클라우드와 분리해야 한다고 본다'고 말했다.",
    ],
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
    pullQuote:
      "Tony의 아침 화면에는 '읽지 않은 메시지 수'가 없다. 대신 30초짜리 브리핑이 떠 있다.",
    body: [
      "오늘날 평균적인 직장인은 하루 230개의 메시지를 받는다. 그중 80%는 본인이 직접 응답하지 않아도 되는 '노이즈'다. Tony는 이 비대칭을 해소하는 것을 미션으로 내건다.",
      "Tony의 첫 화면은 '오늘(Today)' 탭이다. 이 탭에는 '읽지 않은 메시지 387개' 같은 뱃지가 없다. 대신 밤사이 일어난 일을 30초 브리핑으로 요약한 카드들이 떠 있다. '단톡방 4개에서 일정 변경 논의가 있었고, 어머니가 안부 메시지를 보냈으며, A 친구가 약속 시간을 묻고 있다' 같은 문장이 보인다.",
      "사용자는 각 카드를 탭해 원문을 볼 수도 있고, '답장 초안 보기'를 눌러 Tony가 사용자의 평소 톤으로 작성한 초안을 검토할 수도 있다. 보낸다는 결정은 언제나 사람이 한다.",
      "Bloomberg는 이 디자인이 '메시지 앱의 inbox zero'를 가능하게 한다고 평가했다. 이메일이 1990년대에 inbox zero라는 개념을 만들었다면, 메신저 시대의 답은 Tony 같은 에이전트가 될 가능성이 높다는 분석이다.",
    ],
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
    pullQuote: "친구가 'AI가 답한 건지 사람이 답한 건지' 95% 확률로 구분하지 못했다.",
    body: [
      "Tony의 가장 도발적인 기능은 '내 말투로 대신 답장'이다. 친구별, 관계별, 그리고 시간대별로 미묘하게 다른 사용자의 말투를 따로 학습해, 받는 사람에게 '이 사람이 보낸 것 같은' 메시지를 만들어낸다.",
      "MIT Tech Review가 입수한 내부 평가 자료에 따르면, Tony의 톤 엔진이 작성한 답장 초안을 30명의 베타 테스터 친구들에게 보낸 결과, '이 메시지가 AI가 작성한 것 같다'고 정확히 짚어낸 비율은 5% 미만이었다.",
      "기술적으로는 사용자의 과거 채팅 데이터를 친구별로 분리해 LoRA 어댑터로 미세조정하는 방식이다. 이모지 사용 빈도, 줄임말, 호칭, 답장 길이 등 30개 이상의 스타일 변수를 기기 내에서 추적한다.",
      "물론 모든 답장이 자동으로 전송되는 것은 아니다. Tony는 '초안 작성'까지만 한다. 보낼지 말지는 사람이 결정한다. 이 디자인이 '대리인 (proxy)'과 '에이전트 (agent)'의 경계선이며, Tony가 가장 신중하게 다루는 지점이다.",
    ],
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
    pullQuote: "약속 잡기에 평균 7번 오가던 메시지가, 0번이 된다.",
    body: [
      "약속을 잡는 데 메시지가 평균 7번 오간다는 통계가 있다. '언제 시간 돼?' '나는 화요일 좋아' '난 그날 안 돼' '그럼 목요일?' — Tony는 이 7번을 0번으로 만들기 위한 Agent-to-Agent(A2A) 프로토콜을 공개했다.",
      "사용자 A가 'B랑 다음 주에 저녁 잡아줘'라고 Tony에게 말하면, A의 에이전트가 B의 에이전트에게 시간 협상 요청을 보낸다. 두 에이전트는 사용자가 미리 정의한 가용 시간과 우선순위 규칙을 바탕으로 협상을 진행한다. 결과만 양쪽 사용자에게 통보된다.",
      "Forbes는 이 디자인이 '메신저의 자동화' 수준을 넘어 '사회적 관계의 인프라'로 진입하는 시도라고 평가했다. 단순한 챗봇이나 비서 도구가 아니라, 사람 사이의 거래를 대신 처리하는 새로운 사회 계층이 등장하는 셈이다.",
      "Tony 팀은 이 프로토콜을 오픈 스펙으로 공개할 계획이라고 밝혔다. 다른 메신저나 캘린더 앱도 이 스펙을 따르면 Tony와 협상할 수 있게 된다. 'WhatsApp의 에이전트와 Tony의 에이전트가 약속을 잡는' 미래가 멀지 않을 것이라는 전망이다.",
    ],
  },
];

export function getNewsItem(id: string): NewsItem | undefined {
  return newsItems.find((item) => item.id === id);
}

export function getRelatedItems(currentId: string, limit = 3): NewsItem[] {
  return newsItems.filter((item) => item.id !== currentId).slice(0, limit);
}
