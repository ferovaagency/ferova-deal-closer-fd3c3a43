import { useProposalContext } from "@/contexts/ProposalContext";

const OpportunitySection = () => {
  const proposal = useProposalContext();

  return (
    <section id="oportunidad" className="bg-card py-20 md:py-28 px-4">
      <div className="container mx-auto max-w-4xl">
        <h2 className="font-display text-navy text-3xl md:text-5xl mb-12 text-center">
          La oportunidad
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">
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

        <div className="bg-navy rounded-md p-8 md:p-10 border-l-4 border-l-gold">
          <p className="font-display italic text-cream text-xl md:text-2xl leading-relaxed">
            "{proposal.opportunity_quote}"
          </p>
        </div>
      </div>
    </section>
  );
};

export default OpportunitySection;
