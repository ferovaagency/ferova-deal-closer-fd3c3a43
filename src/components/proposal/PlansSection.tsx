import { useProposalContext } from "@/contexts/ProposalContext";
import { buildWhatsAppURL } from "@/lib/whatsapp";
import { Check, Minus } from "lucide-react";

const PlansSection = () => {
  const proposal = useProposalContext();
  const s = proposal.sections?.plans;

  return (
    <section id="planes">
      <div className="bg-charcoal py-14 px-4">
        <div className="container mx-auto max-w-5xl text-center">
          {s?.eyebrow && (
            <p className="font-body text-gold text-sm font-semibold uppercase tracking-wider mb-3">
              {s.eyebrow}
            </p>
          )}
          <h2 className="font-display text-cream text-3xl md:text-5xl">
            {s?.title || "Planes diseñados para ti"}
          </h2>
          {s?.subtitle && (
            <p className="font-body text-cream/60 text-base max-w-2xl mx-auto mt-4">
              {s.subtitle}
            </p>
          )}
        </div>
      </div>

      <div className="bg-cream py-20 md:py-28 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start mb-12">
            {proposal.plans.map((plan, i) => {
              const msg = `Hola ${proposal.agent_name}, apruebo el ${plan.name} de Ferova Agency para ${proposal.client_company}. ¡Iniciemos!`;
              const url = buildWhatsAppURL(msg, proposal.whatsapp_number);

              return (
                <div
                  key={i}
                  className={`relative bg-card rounded-lg shadow-card p-6 transition-all duration-300 hover:shadow-card-hover ${
                    plan.isRecommended
                      ? "border-[2.5px] border-gold md:-mt-4"
                      : "border border-navy/20"
                  }`}
                >
                  {plan.isRecommended && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                      <span className="bg-gold text-navy font-body font-semibold text-xs px-4 py-1 rounded-full">
                        Más elegido
                      </span>
                    </div>
                  )}

                  {plan.eyebrow && (
                    <p className="font-body text-xs uppercase tracking-wider text-muted-foreground mb-1">
                      {plan.eyebrow}
                    </p>
                  )}

                  <h3 className="font-display text-navy text-2xl mb-2">{plan.name}</h3>
                  <div className="mb-1">
                    <span className="font-display text-gold text-4xl">{plan.price}</span>
                    <span className="font-body text-muted-foreground text-sm">
                      {plan.priceNote ? ` ${plan.priceNote}` : "/mes"}
                    </span>
                  </div>
                  <p className="font-body text-muted-foreground text-xs mb-5">
                    {plan.adBudget}
                  </p>

                  <ul className="space-y-2 mb-4">
                    {plan.includes.map((item, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm font-body text-charcoal">
                        <Check className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  {plan.excludes.length > 0 && (
                    <ul className="space-y-2 mb-5">
                      {plan.excludes.map((item, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm font-body text-muted-foreground/50">
                          <Minus className="w-4 h-4 flex-shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}

                  <p className="font-body text-xs text-navy/60 mb-5">
                    Contrato mínimo: {plan.months} meses
                  </p>

                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block text-center font-body font-semibold text-sm py-3 rounded-md transition-all duration-300 ${
                      plan.isRecommended
                        ? "bg-gold text-navy hover:shadow-card-hover"
                        : "border border-navy text-navy hover:bg-navy hover:text-cream"
                    }`}
                  >
                    {plan.buttonText || `Elegir ${plan.name}`} →
                  </a>
                </div>
              );
            })}
          </div>

          <div className="bg-navy/10 border-l-4 border-l-navy rounded-md p-6 mb-8">
            <p className="font-body text-sm text-navy leading-relaxed">
              {proposal.recommendation_text}
            </p>
          </div>

          {s?.notes && s.notes.length > 0 && (
            <div className="space-y-3">
              {s.notes.map((note, i) => (
                <p key={i} className={`font-body text-xs leading-relaxed ${i === 1 ? 'text-gold' : 'text-charcoal/60'}`}>
                  {note}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PlansSection;
