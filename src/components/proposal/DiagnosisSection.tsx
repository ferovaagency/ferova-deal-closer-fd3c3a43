import { PROPOSAL } from "@/config/proposal";
import { AlertTriangle } from "lucide-react";

const borderColors = [
  "border-l-gold",
  "border-l-navy",
  "border-l-wine",
  "border-l-coffee",
];

const DiagnosisSection = () => {
  return (
    <section id="diagnostico" className="bg-cream py-20 md:py-28 px-4">
      <div className="container mx-auto max-w-4xl">
        <h2 className="font-display text-navy text-3xl md:text-5xl mb-12 text-center">
          Lo que encontramos
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {PROPOSAL.DIAGNOSIS.map((item, i) => (
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

        {/* Alert */}
        <div className="bg-wine/10 border-l-4 border-l-wine rounded-md p-5 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-wine flex-shrink-0 mt-0.5" />
          <p className="font-body text-sm text-wine">
            {PROPOSAL.URGENCY_TEXT}
          </p>
        </div>
      </div>
    </section>
  );
};

export default DiagnosisSection;
