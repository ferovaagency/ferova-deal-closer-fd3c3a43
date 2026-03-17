import { useProposalContext } from "@/contexts/ProposalContext";

const defaultSteps = [
  { num: 1, title: "Diagnóstico real", desc: "Analizamos tu negocio antes de proponer", color: "gold" },
  { num: 2, title: "Estrategia a medida", desc: "Canales y objetivos según tu mercado", color: "navy" },
  { num: 3, title: "Ejecución con seguimiento", desc: "Campañas activas con reportes claros", color: "wine" },
  { num: 4, title: "Acompañamiento comercial", desc: "Te ayudamos a convertir contactos en ventas", color: "coffee" },
];

const defaultComponents = [
  { name: "Instagram & Facebook", desc: "Llega a personas según sus intereses y comportamientos", tag: "Consumidor final", tagColor: "bg-gold/15 text-gold" },
  { name: "TikTok", desc: "Alcance masivo con videos cortos que generan reconocimiento de marca", tag: "Consumidor final", tagColor: "bg-gold/15 text-gold" },
  { name: "LinkedIn", desc: "Conecta con gerentes y tomadores de decisión en empresas", tag: "Compradores profesionales", tagColor: "bg-navy/10 text-navy" },
  { name: "Google", desc: "Aparece cuando alguien busca activamente lo que tú ofreces", tag: "Alta intención", tagColor: "bg-navy/10 text-navy" },
  { name: "Landing Pages", desc: "Páginas enfocadas que convierten visitantes en contactos o compradores", tag: "Conversión", tagColor: "bg-coffee/15 text-coffee" },
  { name: "Email Marketing", desc: "Comunicación directa con prospectos y clientes actuales", tag: "Retención", tagColor: "bg-charcoal/10 text-charcoal" },
];

const colorMap: Record<string, string> = {
  gold: "bg-gold",
  navy: "bg-navy",
  wine: "bg-wine",
  coffee: "bg-coffee",
};

const colorTextMap: Record<string, string> = {
  gold: "text-navy",
  navy: "text-cream",
  wine: "text-cream",
  coffee: "text-cream",
};

const StrategySection = () => {
  const proposal = useProposalContext();
  const s = proposal.sections?.strategy;
  const steps = s?.steps || defaultSteps;
  const components = s?.components || defaultComponents;

  return (
    <section id="estrategia" className="bg-cream py-20 md:py-28 px-4">
      <div className="container mx-auto max-w-5xl">
        {s?.eyebrow && (
          <p className="font-body text-gold text-sm font-semibold uppercase tracking-wider text-center mb-3">
            {s.eyebrow}
          </p>
        )}

        <h2 className="font-display text-navy text-3xl md:text-5xl mb-6 text-center">
          {s?.title || "Nuestra estrategia"}
        </h2>

        {s?.intro && (
          <p className="font-body text-charcoal/70 text-center max-w-2xl mx-auto mb-14">
            {s.intro}
          </p>
        )}

        {/* Steps */}
        <div className={`grid grid-cols-1 ${steps.length > 4 ? 'md:grid-cols-3' : 'md:grid-cols-2'} gap-8 mb-20`}>
          {steps.map((step) => (
            <div key={step.num} className="flex items-start gap-4">
              <div className={`w-10 h-10 rounded-full ${colorMap[step.color] || 'bg-gold'} flex items-center justify-center flex-shrink-0`}>
                <span className={`font-body font-semibold text-sm ${colorTextMap[step.color] || 'text-navy'}`}>{step.num}</span>
              </div>
              <div>
                <p className="font-body font-semibold text-navy mb-1">{step.title}</p>
                <p className="font-body text-sm text-muted-foreground">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Components */}
        <div className={`grid grid-cols-1 ${components.length > 4 ? 'md:grid-cols-3' : 'md:grid-cols-3'} gap-5`}>
          {components.map((ch) => (
            <div key={ch.name} className="bg-card rounded-md shadow-card p-5 hover:shadow-card-hover transition-all duration-300">
              <p className="font-body font-semibold text-navy mb-2">{ch.name}</p>
              <p className="font-body text-sm text-muted-foreground mb-3">{ch.desc}</p>
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-body font-medium ${ch.tagColor}`}>
                {ch.tag}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StrategySection;
