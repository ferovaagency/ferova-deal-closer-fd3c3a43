import { PROPOSAL } from "@/config/proposal";
import { buildWhatsAppURL } from "@/lib/whatsapp";
import CountdownTimer from "@/components/widgets/CountdownTimer";

const ClosingSection = () => {
  const msg = `Hola ${PROPOSAL.AGENT_NAME}, acabo de revisar la propuesta de Ferova Agency para ${PROPOSAL.CLIENT_COMPANY} y la apruebo. ¡Podemos iniciar!`;
  const url = buildWhatsAppURL(msg, PROPOSAL.WHATSAPP_NUMBER);

  return (
    <section id="aprobar" className="bg-wine py-20 md:py-28 px-4">
      <div className="container mx-auto max-w-3xl text-center">
        <h2 className="font-display text-cream text-4xl md:text-[56px] leading-tight mb-6">
          {PROPOSAL.CLOSING_HEADLINE}
        </h2>

        <p className="font-body text-cream/80 text-base md:text-lg mb-10 max-w-xl mx-auto">
          {PROPOSAL.CLOSING_BODY}
        </p>

        {/* Deadline box */}
        <div className="border-2 border-gold rounded-lg bg-wine/50 p-6 md:p-8 mb-10 inline-block">
          <p className="font-body text-cream text-sm md:text-base mb-3">
            Para iniciar el {PROPOSAL.START_DATE} necesitamos tu aprobación antes del {PROPOSAL.DEADLINE_DATE}
          </p>
          <CountdownTimer />
        </div>

        <div>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gold text-navy font-body font-semibold text-lg px-10 py-4 rounded-md hover:shadow-card-hover transition-all duration-300"
          >
            Aprobar propuesta →
          </a>
          <p className="font-body text-cream/50 text-xs mt-4">
            Al hacer clic se abre WhatsApp con el mensaje listo. Solo debes enviarlo.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ClosingSection;
