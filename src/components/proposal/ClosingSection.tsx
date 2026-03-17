import { useProposalContext } from "@/contexts/ProposalContext";
import { buildWhatsAppURL } from "@/lib/whatsapp";
import CountdownTimer from "@/components/widgets/CountdownTimer";

const ClosingSection = () => {
  const proposal = useProposalContext();
  const s = proposal.sections?.closing;
  const msg = `Hola ${proposal.agent_name}, acabo de revisar la propuesta de Ferova Agency para ${proposal.client_company} y la apruebo. ¡Podemos iniciar!`;
  const url = buildWhatsAppURL(msg, proposal.whatsapp_number);

  const deadlineText = s?.deadline_text
    ? s.deadline_text
        .replace("{start_date}", proposal.start_date)
        .replace("{deadline_date}", proposal.deadline_date)
    : `Aprueba antes del ${proposal.deadline_date} y arrancamos el ${proposal.start_date}. Esta propuesta vence el ${proposal.expiry_date}.`;

  return (
    <section id="aprobar" className="bg-wine py-20 md:py-28 px-4">
      <div className="container mx-auto max-w-3xl text-center">
        {s?.eyebrow && (
          <p className="font-body text-cream/50 text-sm font-semibold uppercase tracking-wider mb-4">
            {s.eyebrow}
          </p>
        )}

        <h2 className="font-display text-cream text-4xl md:text-[56px] leading-tight mb-6">
          {proposal.closing_headline}
        </h2>

        {s?.extra_quote && (
          <p className="font-body text-cream/70 text-base md:text-lg italic mb-6 max-w-xl mx-auto">
            {s.extra_quote}
          </p>
        )}

        <p className="font-body text-cream/80 text-base md:text-lg mb-10 max-w-xl mx-auto">
          {proposal.closing_body}
        </p>

        <div className="border-2 border-gold rounded-lg bg-wine/50 p-6 md:p-8 mb-10 inline-block">
          <p className="font-body text-cream text-sm md:text-base mb-3">
            {deadlineText}
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
            {s?.button_text || "Aprobar propuesta →"}
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
