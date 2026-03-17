import { useProposalContext } from "@/contexts/ProposalContext";
import logoImg from "@/assets/ferova-logo.png";

const HeroSection = () => {
  const proposal = useProposalContext();
  const s = proposal.sections?.hero;

  return (
    <section className="min-h-screen bg-navy flex flex-col py-0 px-0">
      {/* Top bar */}
      <div className="relative flex items-center justify-between px-8 py-5">
        <img
          src={logoImg}
          alt="Ferova Agency"
          className="h-10 w-auto brightness-0 invert"
        />
        <a
          href="#aprobar"
          className="font-body font-semibold text-sm rounded-lg transition-all duration-300 hover:shadow-card-hover"
          style={{
            background: "#C0930E",
            color: "#2F2D56",
            padding: "10px 20px",
          }}
        >
          Aprobar propuesta →
        </a>
      </div>

      {/* Hero content */}
      <div className="flex-1 flex items-center justify-center px-4 pb-20">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/30 bg-gold/10 mb-10 animate-soft-pulse">
            <span className="w-2 h-2 rounded-full bg-gold" />
            <span className="text-gold font-body text-sm">
              {s?.badge || `● Propuesta activa · Cierre: ${proposal.deadline_date}`}
            </span>
          </div>

          {s?.title ? (
            <>
              <h1 className="font-display font-bold text-gold text-[48px] md:text-[72px] leading-tight mb-4">
                {s.title}
              </h1>
              {s.subtitle && (
                <p className="font-body text-cream/70 text-base md:text-lg max-w-2xl mx-auto mb-6">
                  {s.subtitle}
                </p>
              )}
            </>
          ) : (
            <h1 className="mb-6">
              <span className="font-body font-medium text-cream/60 text-xl block mb-2">
                Propuesta digital para
              </span>
              <span className="font-display font-bold text-gold text-[64px] md:text-[88px] leading-tight block">
                {proposal.client_company}
              </span>
            </h1>
          )}

          <p className="font-body text-base text-cream/50 mb-8">
            Atención: {proposal.client_name}
          </p>

          <div className="w-16 h-0.5 bg-gold mx-auto mb-8" />

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-12 text-cream/60 font-body text-sm">
            <span>Empresa: {proposal.client_company}</span>
            <span>Válida hasta: {proposal.expiry_date}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
