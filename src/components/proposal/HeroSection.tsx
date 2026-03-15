import { PROPOSAL } from "@/config/proposal";

const HeroSection = () => {
  return (
    <section className="min-h-screen bg-navy flex flex-col py-0 px-0">
      {/* Top bar */}
      <div className="relative flex items-center justify-between px-8 py-5">
        <a href="#" className="font-display text-cream text-xl tracking-wide">
          Ferova <span className="text-gold text-base font-body font-light">/ AGENCY</span>
        </a>
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
              Cupo disponible · Inicio: {PROPOSAL.START_DATE}
            </span>
          </div>

          <h1 className="font-display text-cream text-[40px] md:text-[64px] leading-tight mb-6">
            Propuesta digital para
            <br />
            <span className="text-gold">{PROPOSAL.CLIENT_COMPANY}</span>
          </h1>

          <p className="font-body text-cream/80 text-lg md:text-xl mb-8">
            Preparada exclusivamente para {PROPOSAL.CLIENT_NAME}
          </p>

          <div className="w-16 h-0.5 bg-gold mx-auto mb-8" />

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-12 text-cream/60 font-body text-sm">
            <span>Cliente: {PROPOSAL.CLIENT_NAME}</span>
            <span>Válida hasta: {PROPOSAL.EXPIRY_DATE}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
