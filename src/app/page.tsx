"use client";

import { Navbar } from "@/components/landing/Navbar";
import { PremiumBackdrop } from "@/components/landing/PremiumBackdrop";
import { HeroSection } from "@/components/landing/HeroSection";
import { WhyNowSection } from "@/components/landing/WhyNowSection";
import { ProblemSection } from "@/components/landing/ProblemSection";
import { SolutionSection } from "@/components/landing/SolutionSection";
import { ParadigmShiftSection } from "@/components/landing/ParadigmShiftSection";
import { CoreFeaturesSection } from "@/components/landing/CoreFeaturesSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { PrivacySection } from "@/components/landing/PrivacySection";
import { AgentNetworkSection } from "@/components/landing/AgentNetworkSection";
import { MarketSyndromeSection } from "@/components/landing/MarketSyndromeSection";
import { MarketSection } from "@/components/landing/MarketSection";
import { ComparisonSection } from "@/components/landing/ComparisonSection";
import { MomentsSection } from "@/components/landing/MomentsSection";
import { DemoSection } from "@/components/landing/DemoSection";
import { PricingSection } from "@/components/landing/PricingSection";
import { MoatSection } from "@/components/landing/MoatSection";
import { RoadmapSection } from "@/components/landing/RoadmapSection";
import { TeamSection } from "@/components/landing/TeamSection";
import { InvestorSection } from "@/components/landing/InvestorSection";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  return (
    <>
      <PremiumBackdrop />
      <Navbar />
      <main className="relative z-10">
        <HeroSection />
        <WhyNowSection />
        <ProblemSection />
        <SolutionSection />
        <ParadigmShiftSection />
        <CoreFeaturesSection />
        <FeaturesSection />
        <PrivacySection />
        <AgentNetworkSection />
        <MarketSyndromeSection />
        <MarketSection />
        <MoatSection />
        <ComparisonSection />
        <MomentsSection />
        <DemoSection />
        <PricingSection />
        <RoadmapSection />
        <TeamSection />
        <InvestorSection />
      </main>
      <Footer />
    </>
  );
}
