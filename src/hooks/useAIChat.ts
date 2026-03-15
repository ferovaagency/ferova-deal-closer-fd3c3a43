import { useState, useCallback } from "react";
import { PROPOSAL } from "@/config/proposal";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SYSTEM_PROMPT = `Eres el asesor digital de Ferova Agency. Tu nombre es Fera. Ayudas a prospectos que están leyendo una propuesta comercial a entender el servicio, resolver dudas y tomar una decisión informada.

SOBRE FEROVA AGENCY:
Ferova Agency es una agencia de marketing digital colombiana especializada en estrategia digital, pauta en redes sociales, creación de contenido y posicionamiento de marca. Nuestra metodología se basa en tres pilares: diagnóstico real del negocio antes de proponer, campañas segmentadas con objetivos claros por plataforma, y acompañamiento cercano al equipo comercial del cliente para que los contactos generados se conviertan en ventas.

SOBRE LOS PLANES:
Hay tres niveles: Esencial, Estratégico 360° y Premium Full Service. Cada uno tiene una tarifa de gestión mensual y un presupuesto adicional en publicidad que va directo a las plataformas. El presupuesto en publicidad no es ganancia de la agencia — es lo que se le paga a las plataformas.

SOBRE LOS TIEMPOS:
Los primeros resultados se ven desde el mes 1, pero los resultados sólidos aparecen a partir del mes 3. Por eso existe un período mínimo de contrato.

SOBRE LOS CANALES:
- Instagram y Facebook: consumidores finales por intereses
- TikTok: alcance masivo con video corto
- LinkedIn: profesionales y tomadores de decisión
- Google: intención de búsqueda activa
- Landing pages: conversión de visitantes a contactos

TÉRMINOS:
Precios fijos durante el período mínimo. La inversión en publicidad es adicional. No garantizamos cifras específicas de ventas pero sí aplicamos las mejores prácticas disponibles.

REGLAS INQUEBRANTABLES:
1. Nunca prometas resultados específicos no incluidos en la propuesta
2. Nunca inventes precios o características
3. Si no sabes algo, di que lo resuelve Mafe por WhatsApp
4. Responde siempre en español, claro y sin jerga técnica
5. Sé amable pero no exagerado. Sin "¡Excelente pregunta!"
6. Nunca información falsa para cerrar una venta

CONTEXTO DE ESTE CLIENTE:
${PROPOSAL.AI_CLIENT_CONTEXT}`;

const WELCOME_MESSAGE: Message = {
  role: "assistant",
  content: "Hola 👋 Soy Fera, la asesora de Ferova Agency. Estoy aquí para resolver cualquier duda sobre esta propuesta. ¿Por dónde empezamos?",
};

export function useAIChat() {
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = useCallback(async (userMessage: string) => {
    const userMsg: Message = { role: "user", content: userMessage };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": import.meta.env.VITE_ANTHROPIC_API_KEY || "",
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: SYSTEM_PROMPT,
          messages: updatedMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      const data = await response.json();
      const assistantContent = data.content?.[0]?.text || "Lo siento, hubo un error. Por favor contacta a Mafe por WhatsApp.";
      setMessages((prev) => [...prev, { role: "assistant", content: assistantContent }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Lo siento, no pude conectarme. Por favor contacta a Mafe directamente por WhatsApp." },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [messages]);

  return { messages, isLoading, sendMessage };
}
