import type { Metadata } from "next";
import { Sora, Manrope } from "next/font/google";
import "./globals.css";
import { I18nProvider } from "@/i18n/I18nProvider";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Tony — Personal Agent OS | 당신이 자는 동안, 에이전트가 일했어요",
  description:
    "메시지를 읽고, 분류하고, 답장하고, 약속을 잡는 AI 에이전트 메신저. 230개 메시지를 3줄로 요약하고, 당신의 말투로 대신 답장합니다.",
  keywords: ["AI 메신저", "에이전트", "Tony", "Personal Agent OS", "AI 비서"],
  openGraph: {
    title: "Tony — Personal Agent OS",
    description: "당신이 자는 동안, 에이전트가 일했어요",
    url: "https://x.tony-ai.app",
    siteName: "Tony AI",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tony — Personal Agent OS",
    description: "당신이 자는 동안, 에이전트가 일했어요",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="scroll-smooth">
      <body className={`${sora.variable} ${manrope.variable} font-body antialiased`}>
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
