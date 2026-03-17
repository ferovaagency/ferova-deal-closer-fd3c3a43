
-- Add sections column for per-proposal section content overrides
ALTER TABLE public.proposals ADD COLUMN IF NOT EXISTS sections jsonb DEFAULT NULL;

-- Insert Techni Perú proposal
INSERT INTO public.proposals (
  slug, client_name, client_company, agent_name, whatsapp_number,
  start_date, deadline_date, expiry_date, deadline_iso,
  diagnosis, urgency_text,
  stats, opportunity_quote,
  plans, recommendation_text,
  closing_headline, closing_body,
  terms_url, ai_client_context,
  sections, is_active
) VALUES (
  'techni-peru',
  'David Arratia',
  'Techni Perú',
  'Mafe',
  '57XXXXXXXXXX',
  '28 de marzo de 2026',
  '24 de marzo de 2026',
  '24 de marzo de 2026',
  '2026-03-24T23:59:59-05:00',
  -- diagnosis
  '[
    {"label": "El sitio está indexado", "detail": "Google ya conoce tu sitio. Tienes 39 palabras clave posicionadas y 5 páginas indexadas. La base está — el trabajo ahora es crecer sobre ella."},
    {"label": "Tráfico muy bajo", "detail": "Solo 19 visitas orgánicas al mes. Para una empresa industrial con múltiples productos y servicios, ese número debería ser entre 10 y 20 veces mayor."},
    {"label": "Rendimiento móvil crítico", "detail": "El sitio tarda 8.3 segundos en cargar en celular. Google penaliza los sitios lentos bajándolos en sus resultados de búsqueda. Esto está afectando tu posición directamente hoy."},
    {"label": "Error de acceso al rastreo", "detail": "Al hacer el rastreo técnico encontramos un error 403 — el servidor está bloqueando el acceso a partes del sitio. Eso significa que hay páginas que Google posiblemente no puede indexar aunque existan."}
  ]'::jsonb,
  -- urgency_text
  'Cada empresa que busca en Google ''bombas de vacío Perú'', ''compresores de aire industriales Lima'' o ''sopladores para industria'' tiene una intención de compra alta. Si tu sitio no aparece en esos resultados, ese cliente se va a tu competencia. Hoy mismo.',
  -- stats
  '[
    {"number": "+73%", "label": "De las búsquedas B2B industriales en Latinoamérica empiezan en Google antes de contactar a un proveedor*"},
    {"number": "8.3s", "label": "Tiempo actual de carga en móvil. Google recomienda menos de 2.5 segundos. Cada segundo extra reduce las visitas*"},
    {"number": "DA 7", "label": "Es tu autoridad de dominio actual. Con la estrategia correcta puede triplicarse en 6 meses, atrayendo más tráfico sin pagar por cada clic*"}
  ]'::jsonb,
  -- opportunity_quote
  'Un sitio industrial bien optimizado es el vendedor más barato que tendrás. Trabaja 24 horas, no pide comisión y llega a clientes que aún no saben que existen.',
  -- plans
  '[
    {
      "name": "SEO Base",
      "eyebrow": "Plan Esencial",
      "price": "$950 USD",
      "priceNote": "+ IVA / mes",
      "adBudget": "Tráfico 100% orgánico — sin pauta adicional",
      "months": "8",
      "includes": [
        "Auditoría técnica completa del sitio",
        "Corrección del error 403",
        "Optimización de 5 páginas existentes",
        "Investigación de palabras clave transaccionales",
        "Mejora de velocidad de carga móvil",
        "GEO básico — apareces en respuestas de IA para búsquedas de tu sector",
        "1 informe mensual de posicionamiento",
        "1 reunión mensual de seguimiento"
      ],
      "excludes": [
        "Creación de páginas nuevas o landing pages",
        "Mantenimiento WordPress",
        "Capacitación del equipo",
        "Creación de contenido nuevo"
      ],
      "isRecommended": false,
      "buttonText": "Elegir este plan"
    },
    {
      "name": "SEO + Conversión",
      "eyebrow": "Plan Estratégico",
      "price": "$1,600 USD",
      "priceNote": "+ IVA / mes",
      "adBudget": "Tráfico 100% orgánico — sin pauta adicional",
      "months": "8",
      "includes": [
        "Todo lo del Plan SEO Base",
        "Creación de 2 landing pages orientadas a captura de contactos",
        "Optimización de arquitectura SEO del sitio completo",
        "Mantenimiento WordPress mensual",
        "2 contenidos SEO al mes (artículos de blog o páginas nuevas)",
        "GEO intermedio — schema markup y optimización para Google AI Overviews",
        "2 reuniones mensuales de estrategia",
        "Informe quincenal de resultados"
      ],
      "excludes": [
        "Capacitación del equipo interno",
        "Publicidad paga en Google"
      ],
      "isRecommended": true,
      "buttonText": "Quiero este plan"
    },
    {
      "name": "SEO Full Service",
      "eyebrow": "Plan Premium",
      "price": "$2,400 USD",
      "priceNote": "+ IVA / mes",
      "adBudget": "Tráfico 100% orgánico — sin pauta adicional",
      "months": "8",
      "includes": [
        "Todo lo del Plan SEO + Conversión",
        "Hasta 4 landing pages por servicio",
        "Capacitación completa del equipo interno (4 sesiones prácticas)",
        "GEO avanzado — estrategia para ChatGPT, Perplexity, Google IA y Bing Copilot",
        "4 contenidos SEO al mes",
        "Optimización continua de Core Web Vitals",
        "4 reuniones mensuales + acceso directo por WhatsApp",
        "Panel de seguimiento en tiempo real",
        "Soporte WordPress prioritario"
      ],
      "excludes": [
        "Publicidad paga en Google"
      ],
      "isRecommended": false,
      "buttonText": "Elegir este plan"
    }
  ]'::jsonb,
  -- recommendation_text
  'Para Techni Perú recomendamos el Plan SEO + Conversión porque el problema no es solo el posicionamiento — el sitio actual no está preparado para convertir visitas en clientes. Necesitan SEO técnico, páginas optimizadas, landing pages y mantenimiento al mismo tiempo. El Plan Base resuelve solo la mitad. El Full Service agrega capacitación que en este momento puede esperar. El Estratégico es el punto exacto entre impacto real y eficiencia del presupuesto.',
  -- closing_headline
  'Cada semana sin SEO es una semana que tu competencia te gana',
  -- closing_body
  'Los errores técnicos que encontramos están frenando tu visibilidad en Google hoy mismo. Corregirlos toma tiempo de implementación — y el SEO necesita ese tiempo para consolidarse. Empezar el 28 de marzo vs empezar en abril es una diferencia real y medible en los resultados de junio.',
  -- terms_url
  'https://ferova.agency/terminos',
  -- ai_client_context
  'Cliente: Techni Perú (techniperu.com). Sector: industrial — bombas de vacío, compresores de aire, sopladores y equipos industriales. Contacto: David Arratia. Propuesta de SEO + GEO. Hallazgos: 39 keywords indexadas, 19 visitas orgánicas/mes, PageSpeed móvil 61/100 con carga de 8.3s, error 403 bloqueando rastreo, Domain Authority 7. Sitio en WordPress. Planes: SEO Base ($950), SEO + Conversión ($1,600 recomendado), SEO Full Service ($2,400). Contrato mínimo 8 meses.',
  -- sections
  '{
    "hero": {
      "title": "Tu sitio ya existe. Ahora hagamos que venda.",
      "subtitle": "Una estrategia construida sobre lo que encontramos en techniperu.com — qué está funcionando, qué está frenando tus ventas y cómo lo corregimos.",
      "badge": "Cupo disponible · Inicio: 28 de marzo de 2026"
    },
    "diagnosis": {
      "eyebrow": "Lo que encontramos en techniperu.com",
      "title": "Tu sitio tiene base. Le falta convertir.",
      "intro": "Auditamos tu sitio antes de proponer cualquier estrategia. Esto es lo que encontramos.",
      "alert_title": "Lo que está pasando mientras el sitio está así"
    },
    "opportunity": {
      "eyebrow": "El mercado está buscando lo que vendes",
      "title": "Alta intención de compra. Baja visibilidad.",
      "footnote": "* Datos referenciales de tendencias de mercado digital — sector industrial y B2B en Latinoamérica.",
      "quote_author": "— Ferova Agency",
      "highlight": "Techni Perú ya tiene productos, trayectoria y presencia en Google. Lo que le falta es aparecer primero cuando alguien está listo para comprar — y aparecer también cuando le pregunta a la inteligencia artificial."
    },
    "strategy": {
      "eyebrow": "Cómo lo hacemos",
      "title": "Seis frentes. Un solo objetivo: ventas.",
      "intro": "Cada acción está conectada con las demás. No trabajamos por separado — todo suma hacia el mismo resultado.",
      "steps": [
        {"num": 1, "title": "SEO orientado a ventas", "desc": "Identificamos exactamente qué buscan tus clientes cuando están listos para comprar — no cuando solo investigan. Optimizamos tu sitio para aparecer en ese momento preciso.", "color": "gold"},
        {"num": 2, "title": "Páginas de productos y servicios optimizadas", "desc": "Reestructuramos cada página de producto y servicio para que Google la entienda mejor y para que el visitante encuentre rápido lo que necesita y se comunique contigo.", "color": "navy"},
        {"num": 3, "title": "Páginas de aterrizaje para captura de contactos", "desc": "Creamos páginas específicas para cada servicio clave — bombas de vacío, compresores, sopladores — diseñadas para que el visitante deje sus datos o te escriba directamente.", "color": "wine"},
        {"num": 4, "title": "Corrección técnica del sitio", "desc": "Resolvemos el error 403, mejoramos la velocidad de carga de 8.3s a menos de 3s y corregimos la arquitectura para que Google acceda a todo el sitio sin restricciones.", "color": "coffee"},
        {"num": 5, "title": "GEO — Optimización para inteligencia artificial", "desc": "Optimizamos tu marca para aparecer cuando alguien le pregunta a ChatGPT, Google IA o Perplexity quiénes son los mejores proveedores industriales en Perú. Es el canal que más crece y menos empresas están aprovechando.", "color": "gold"},
        {"num": 6, "title": "Mantenimiento WordPress y capacitación", "desc": "Mantenemos el sitio actualizado, seguro y respaldado cada mes. Y te enseñamos a gestionarlo de forma independiente para que no dependas de nadie externo para actualizarlo.", "color": "navy"}
      ],
      "components": [
        {"name": "SEO Técnico", "desc": "Correcciones de base para que Google acceda, rastree e indexe todo tu sitio sin bloqueos ni errores", "tag": "Prioridad inmediata", "tagColor": "bg-gold/15 text-gold"},
        {"name": "SEO de Contenido", "desc": "Palabras clave transaccionales en cada página para atraer visitas con intención real de compra", "tag": "Tráfico orgánico", "tagColor": "bg-gold/15 text-gold"},
        {"name": "Velocidad Web", "desc": "Optimización de carga en celular y computador — factor directo de posicionamiento en Google", "tag": "Rendimiento", "tagColor": "bg-wine/15 text-wine"},
        {"name": "Landing Pages", "desc": "Páginas por servicio diseñadas para convertir visitantes en contactos comerciales", "tag": "Conversión", "tagColor": "bg-wine/15 text-wine"},
        {"name": "GEO / IA", "desc": "Apareces cuando alguien le pregunta a ChatGPT o Google IA por proveedores de tu sector en Perú", "tag": "Canal emergente", "tagColor": "bg-navy/10 text-navy"},
        {"name": "WordPress + Capacitación", "desc": "Mantenimiento mensual y formación para que tu equipo gestione el sitio de forma autónoma", "tag": "Autonomía", "tagColor": "bg-navy/10 text-navy"}
      ]
    },
    "plans": {
      "eyebrow": "04 · Inversión",
      "title": "Elige tu nivel de impulso",
      "subtitle": "Tres caminos al mismo destino. La diferencia es la velocidad y la profundidad del trabajo.",
      "notes": [
        "* Todos los planes generan tráfico orgánico — sin pagarle a Google por cada clic. Si en el futuro quieren complementar con publicidad paga en Google (Google Ads), se puede agregar como servicio adicional.",
        "** El contrato mínimo de 8 meses existe porque el SEO y el GEO son estrategias de mediano plazo. Los algoritmos de Google e inteligencia artificial necesitan tiempo para procesar y posicionar los cambios. Terminar antes equivale a dejar la inversión a la mitad."
      ]
    },
    "closing": {
      "eyebrow": "05 · Próximo paso",
      "extra_quote": "Las marcas que dominan su mercado no esperaron el momento perfecto. Lo crearon.",
      "deadline_text": "Para iniciar el {start_date}, necesitamos tu aprobación antes del {deadline_date}",
      "button_text": "Aprobar propuesta — Escribir por WhatsApp"
    }
  }'::jsonb,
  true
);
