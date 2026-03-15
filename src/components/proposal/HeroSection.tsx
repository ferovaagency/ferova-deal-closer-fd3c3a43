import { PROPOSAL } from "@/config/proposal";

const HeroSection = () => {
  return (
    <section className="min-h-screen bg-navy flex items-center justify-center py-20 md:py-28 px-4">
      <div className="max-w-3xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/30 bg-gold/10 mb-10 animate-soft-pulse">
          <span className="w-2 h-2 rounded-full bg-gold" />
          <span className="text-gold font-body text-sm">
            Cupo disponible · Inicio: {PROPOSAL.START_DATE}
          </span>
        </div>

        {/* H1 */}
        <h1 className="font-display text-cream text-[40px] md:text-[64px] leading-tight mb-6">
          Propuesta digital para
          <br />
          <span className="text-gold">{PROPOSAL.CLIENT_COMPANY}</span>
        </h1>

        {/* Subtitle */}
        <p className="font-body text-cream/80 text-lg md:text-xl mb-8">
          Preparada exclusivamente para {PROPOSAL.CLIENT_NAME}
        </p>

        {/* Gold divider */}
        <div className="w-16 h-0.5 bg-gold mx-auto mb-8" />

        {/* Meta info */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-12 text-cream/60 font-body text-sm">
          <span>Cliente: {PROPOSAL.CLIENT_NAME}</span>
          <span>Válida hasta: {PROPOSAL.EXPIRY_DATE}</span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
