import { PROPOSAL } from "@/config/proposal";
import { buildWhatsAppURL } from "@/lib/whatsapp";
import CountdownTimer from "./CountdownTimer";

const StickyApproveBar = () => {
  const message = `Hola ${PROPOSAL.AGENT_NAME}, apruebo la propuesta de Ferova Agency para ${PROPOSAL.CLIENT_COMPANY}. ¡Iniciemos!`;
  const whatsappUrl = buildWhatsAppURL(message, PROPOSAL.WHATSAPP_NUMBER);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-navy border-t border-gold/20">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <div className="hidden sm:block">
          <CountdownTimer compact />
        </div>
        <p className="hidden md:block text-cream/80 font-body text-sm">
          ¿Listo para iniciar, {PROPOSAL.CLIENT_NAME}?
        </p>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gold text-navy font-body font-semibold px-6 py-2.5 rounded-md text-sm hover:shadow-card-hover transition-all duration-300 whitespace-nowrap"
        >
          Aprobar ahora →
        </a>
      </div>
    </div>
  );
};

export default StickyApproveBar;
