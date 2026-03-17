import { useProposalContext } from "@/contexts/ProposalContext";
import { AlertTriangle } from "lucide-react";

const borderColors = [
  "border-l-gold",
  "border-l-navy",
  "border-l-wine",
  "border-l-coffee",
];

const DiagnosisSection = () => {
  const proposal = useProposalContext();

  return (
    <section id="diagnostico" className="bg-cream py-20 md:py-28 px-4">
      <div className="container mx-auto max-w-4xl">
        <h2 className="font-display text-navy text-3xl md:text-5xl mb-6 text-center">
          Lo que encontramos
        </h2>

        <p className="font-body text-charcoal/70 text-center max-w-2xl mx-auto mb-12">
          Antes de preparar esta propuesta, analizamos a fondo la situación digital de {proposal.client_company}. Esto es lo que encontramos.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {proposal.diagnosis.map((item, i) => (
            <div
              key={i}
              className={`bg-card rounded-md shadow-card p-6 border-l-4 ${borderColors[i]} hover:shadow-card-hover transition-all duration-300`}
            >
              <p className="font-body font-semibold text-xs uppercase tracking-wider text-charcoal mb-2">
                {item.label}
              </p>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                {item.detail}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-wine/10 border-l-4 border-l-wine rounded-md p-5 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-wine flex-shrink-0 mt-0.5" />
          <p className="font-body text-sm text-wine">
            {proposal.urgency_text}
          </p>
        </div>
      </div>
    </section>
  );
};

export default DiagnosisSection;
