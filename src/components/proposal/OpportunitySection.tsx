import { useProposalContext } from "@/contexts/ProposalContext";

const OpportunitySection = () => {
  const proposal = useProposalContext();
  const s = proposal.sections?.opportunity;

  return (
    <section id="oportunidad" className="bg-card py-20 md:py-28 px-4">
      <div className="container mx-auto max-w-4xl">
        {s?.eyebrow && (
          <p className="font-body text-gold text-sm font-semibold uppercase tracking-wider text-center mb-3">
            {s.eyebrow}
          </p>
        )}

        <h2 className="font-display text-navy text-3xl md:text-5xl mb-12 text-center">
          {s?.title || "La oportunidad"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          {proposal.stats.map((stat, i) => (
            <div key={i} className="text-center">
              <p className="stat-number text-gold mb-3">
                {stat.number}
              </p>
              <p className="font-body text-charcoal text-base leading-relaxed">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {s?.footnote && (
          <p className="font-body text-charcoal/50 text-xs text-center mb-14">
            {s.footnote}
          </p>
        )}

        <div className="bg-navy rounded-md p-8 md:p-10 border-l-4 border-l-gold mb-8">
          <p className="font-display italic text-cream text-xl md:text-2xl leading-relaxed">
            "{proposal.opportunity_quote}"
          </p>
          {s?.quote_author && (
            <p className="font-body text-cream/50 text-sm mt-4">
              {s.quote_author}
            </p>
          )}
        </div>

        {s?.highlight && (
          <div className="border-l-4 border-l-gold bg-gold/5 rounded-md p-6">
            <p className="font-body text-navy text-base leading-relaxed font-medium">
              {s.highlight}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default OpportunitySection;
