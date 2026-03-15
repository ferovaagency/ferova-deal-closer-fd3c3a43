export const PROPOSAL = {
  // Cliente
  CLIENT_NAME: "[NOMBRE_CLIENTE]",
  CLIENT_COMPANY: "[EMPRESA_CLIENTE]",

  // Agente Ferova
  AGENT_NAME: "Mafe",
  WHATSAPP_NUMBER: "57XXXXXXXXXX",

  // Fechas (formato: "15 de abril de 2025")
  START_DATE: "[FECHA_INICIO]",
  DEADLINE_DATE: "[FECHA_LÍMITE_APROBACIÓN]",
  EXPIRY_DATE: "[FECHA_VENCIMIENTO_PROPUESTA]",
  // Para el countdown — formato ISO: "2025-04-15T23:59:59"
  DEADLINE_ISO: "2025-04-15T23:59:59",

  // Diagnóstico (4 hallazgos del cliente)
  DIAGNOSIS: [
    { label: "[PROBLEMA 1]", detail: "[DETALLE DEL HALLAZGO 1]" },
    { label: "[PROBLEMA 2]", detail: "[DETALLE DEL HALLAZGO 2]" },
    { label: "[PROBLEMA 3]", detail: "[DETALLE DEL HALLAZGO 3]" },
    { label: "[PROBLEMA 4]", detail: "[DETALLE DEL HALLAZGO 4]" },
  ],
  URGENCY_TEXT: "[TEXTO DE ALERTA DE URGENCIA]",

  // Estadísticas de oportunidad (3)
  STATS: [
    { number: "[0%]", label: "[DESCRIPCIÓN ESTADÍSTICA 1]" },
    { number: "[0%]", label: "[DESCRIPCIÓN ESTADÍSTICA 2]" },
    { number: "[0x]", label: "[DESCRIPCIÓN ESTADÍSTICA 3]" },
  ],
  OPPORTUNITY_QUOTE: "[FRASE DESTACADA DE OPORTUNIDAD]",

  // Planes (3)
  PLANS: [
    {
      name: "Esencial",
      price: "[PRECIO]",
      adBudget: "[PAUTA RECOMENDADA]",
      months: "[MESES]",
      includes: ["[ITEM 1]", "[ITEM 2]", "[ITEM 3]"],
      excludes: ["[NO INCLUYE 1]", "[NO INCLUYE 2]"],
      isRecommended: false,
    },
    {
      name: "Estratégico 360°",
      price: "[PRECIO]",
      adBudget: "[PAUTA RECOMENDADA]",
      months: "[MESES]",
      includes: ["[ITEM 1]", "[ITEM 2]", "[ITEM 3]", "[ITEM 4]"],
      excludes: ["[NO INCLUYE 1]"],
      isRecommended: true,
    },
    {
      name: "Premium Full Service",
      price: "[PRECIO]",
      adBudget: "[PAUTA RECOMENDADA]",
      months: "[MESES]",
      includes: ["[ITEM 1]", "[ITEM 2]", "[ITEM 3]", "[ITEM 4]", "[ITEM 5]"],
      excludes: [],
      isRecommended: false,
    },
  ],
  RECOMMENDATION_TEXT: "[POR QUÉ RECOMENDAMOS EL PLAN DEL MEDIO PARA ESTE CLIENTE]",

  // Cierre
  CLOSING_HEADLINE: "[TITULAR DE CIERRE]",
  CLOSING_BODY: "[PÁRRAFO CORTO DE URGENCIA FINAL]",
  TERMS_URL: "[URL_TÉRMINOS]",

  // Bot de IA — variables específicas del cliente
  AI_CLIENT_CONTEXT: "[CONTEXTO ESPECÍFICO DE ESTE CLIENTE PARA EL BOT]",
};
