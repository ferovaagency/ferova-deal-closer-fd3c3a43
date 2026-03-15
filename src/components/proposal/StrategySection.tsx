const steps = [
  { num: 1, title: "Diagnóstico real", desc: "Analizamos tu negocio antes de proponer" },
  { num: 2, title: "Estrategia a medida", desc: "Canales y objetivos según tu mercado" },
  { num: 3, title: "Ejecución con seguimiento", desc: "Campañas activas con reportes claros" },
  { num: 4, title: "Acompañamiento comercial", desc: "Te ayudamos a convertir contactos en ventas" },
];

const channels = [
  { name: "Instagram & Facebook", desc: "Llega a personas según sus intereses y comportamientos", tag: "Consumidor final", tagColor: "bg-gold/15 text-gold" },
  { name: "TikTok", desc: "Alcance masivo con videos cortos que generan reconocimiento de marca", tag: "Consumidor final", tagColor: "bg-gold/15 text-gold" },
  { name: "LinkedIn", desc: "Conecta con gerentes y tomadores de decisión en empresas", tag: "Compradores profesionales", tagColor: "bg-navy/10 text-navy" },
  { name: "Google", desc: "Aparece cuando alguien busca activamente lo que tú ofreces", tag: "Alta intención", tagColor: "bg-navy/10 text-navy" },
  { name: "Landing Pages", desc: "Páginas enfocadas que convierten visitantes en contactos o compradores", tag: "Conversión", tagColor: "bg-coffee/15 text-coffee" },
  { name: "Email Marketing", desc: "Comunicación directa con prospectos y clientes actuales", tag: "Retención", tagColor: "bg-charcoal/10 text-charcoal" },
];

const StrategySection = () => {
  return (
    <section id="estrategia" className="bg-cream py-20 md:py-28 px-4">
      <div className="container mx-auto max-w-5xl">
        <h2 className="font-display text-navy text-3xl md:text-5xl mb-14 text-center">
          Nuestra estrategia
        </h2>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {steps.map((s) => (
            <div key={s.num} className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-gold flex items-center justify-center flex-shrink-0">
                <span className="font-body font-semibold text-navy text-sm">{s.num}</span>
              </div>
              <div>
                <p className="font-body font-semibold text-navy mb-1">{s.title}</p>
                <p className="font-body text-sm text-muted-foreground">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Channels */}
        <h3 className="font-display text-navy text-2xl md:text-3xl mb-8 text-center">
          Canales que activamos
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {channels.map((ch) => (
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
