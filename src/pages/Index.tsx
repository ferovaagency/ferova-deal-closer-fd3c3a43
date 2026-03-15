import HeroSection from "@/components/proposal/HeroSection";
import DiagnosisSection from "@/components/proposal/DiagnosisSection";
import OpportunitySection from "@/components/proposal/OpportunitySection";
import StrategySection from "@/components/proposal/StrategySection";
import PlansSection from "@/components/proposal/PlansSection";
import ClosingSection from "@/components/proposal/ClosingSection";
import TermsSection from "@/components/proposal/TermsSection";
import StickyApproveBar from "@/components/widgets/StickyApproveBar";
import AIChatWidget from "@/components/widgets/AIChatWidget";

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <DiagnosisSection />
      <OpportunitySection />
      <StrategySection />
      <PlansSection />
      <ClosingSection />
      <TermsSection />
      {/* Spacer for sticky bar */}
      <div className="h-16" />
      <StickyApproveBar />
      <AIChatWidget />
    </div>
  );
};

export default Index;
