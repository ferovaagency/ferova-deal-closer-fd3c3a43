import { useParams } from "react-router-dom";
import { useProposal } from "@/hooks/useProposal";
import { ProposalProvider } from "@/contexts/ProposalContext";
import HeroSection from "@/components/proposal/HeroSection";
import DiagnosisSection from "@/components/proposal/DiagnosisSection";
import OpportunitySection from "@/components/proposal/OpportunitySection";
import StrategySection from "@/components/proposal/StrategySection";
import PlansSection from "@/components/proposal/PlansSection";
import ClosingSection from "@/components/proposal/ClosingSection";
import TermsSection from "@/components/proposal/TermsSection";
import StickyApproveBar from "@/components/widgets/StickyApproveBar";
import AIChatWidget from "@/components/widgets/AIChatWidget";

const ProposalSkeleton = () => (
  <div className="min-h-screen bg-navy flex items-center justify-center">
    <div className="text-center space-y-6 animate-pulse">
      <p className="font-display text-cream text-2xl">
        Ferova <span className="text-gold font-body text-base">/ AGENCY</span>
      </p>
      <div className="w-48 h-1 bg-gold/30 mx-auto rounded" />
      <p className="font-body text-cream/40 text-sm">Cargando propuesta…</p>
    </div>
  </div>
);

const ProposalNotFound = () => (
  <div className="min-h-screen bg-navy flex items-center justify-center px-4">
    <div className="text-center space-y-6">
      <p className="font-display text-cream text-2xl">
        Ferova <span className="text-gold font-body text-base">/ AGENCY</span>
      </p>
      <div className="w-16 h-0.5 bg-gold/30 mx-auto" />
      <h1 className="font-display text-cream text-4xl">404</h1>
      <p className="font-body text-cream/60 text-base">
        Esta propuesta no existe o ya venció
      </p>
      <a href="/" className="font-body text-gold text-sm underline hover:text-gold/80">
        Volver al inicio
      </a>
    </div>
  </div>
);

const ProposalPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { proposal, loading, error } = useProposal(slug || "");

  if (loading) return <ProposalSkeleton />;
  if (!proposal || error) return <ProposalNotFound />;

  return (
    <ProposalProvider value={proposal}>
      <div className="min-h-screen">
        <HeroSection />
        <DiagnosisSection />
        <OpportunitySection />
        <StrategySection />
        <PlansSection />
        <ClosingSection />
        <TermsSection />
        <div className="h-16" />
        <StickyApproveBar />
        <AIChatWidget />
      </div>
    </ProposalProvider>
  );
};

export default ProposalPage;
