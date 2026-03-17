import { useState, useCallback, useRef } from "react";
import { useProposalContext } from "@/contexts/ProposalContext";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const WELCOME_MESSAGE: Message = {
  role: "assistant",
  content: "Hola, soy el asesor de Ferova Agency. Estoy aquí para resolver cualquier duda sobre esta propuesta — los planes, los precios, cómo funciona el SEO, qué es el GEO o lo que necesites. ¿En qué te puedo ayudar?",
};

export function useAIChat() {
  const proposal = useProposalContext();
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [isLoading, setIsLoading] = useState(false);
  const messageCountRef = useRef(0);

  const SYSTEM_PROMPT = `Eres el asesor digital de Ferova Agency. Tu nombre es Ferova Assistant. Ayudas a prospectos que están leyendo una propuesta comercial a entender el servicio, resolver dudas y tomar una decisión informada.

CONTEXTO DE ESTA PROPUESTA:
El cliente es ${proposal.client_company}, empresa industrial peruana que vende bombas de vacío, compresores de aire, sopladores de aire y equipos industriales. Su contacto es ${proposal.client_name}. La propuesta es de SEO + GEO — posicionamiento en Google e inteligencia artificial.

HALLAZGOS DE LA AUDITORÍA:
- 39 palabras clave indexadas, 19 visitas orgánicas al mes — muy bajo para el sector industrial
- Rendimiento móvil 61/100 en Google PageSpeed — carga en 8.3 segundos (debe ser menos de 2.5s)
- Error 403 en el rastreo — Google tiene restricciones para acceder a partes del sitio, lo que puede impedir que ciertas páginas aparezcan en resultados
- Domain Authority de 7 — hay mucho espacio para crecer
- El sitio está construido en WordPress

SOBRE FEROVA AGENCY:
Somos una agencia de marketing digital colombiana especializada en estrategia digital, SEO, GEO, desarrollo web y posicionamiento de marca. Nuestra metodología se basa en tres pilares: diagnóstico real del negocio antes de proponer, ejecución técnica precisa con objetivos claros, y acompañamiento cercano para que los resultados se traduzcan en ventas reales.

SOBRE LOS PLANES:
Hay tres planes: SEO Base ($950 USD/mes), SEO + Conversión ($1,600 USD/mes) y SEO Full Service ($2,400 USD/mes). Todos generan tráfico orgánico sin pagar por cada clic. La diferencia entre planes es la profundidad del trabajo: número de páginas optimizadas, landing pages creadas, nivel de GEO, reuniones incluidas y si incluye capacitación. El plan recomendado para ${proposal.client_company} es el SEO + Conversión.

SOBRE EL GEO:
GEO significa Generative Engine Optimization — es la optimización para aparecer en respuestas de inteligencia artificial como ChatGPT, Perplexity, Google AI Overviews y Bing Copilot. Cuando alguien le pregunta a ChatGPT "¿quiénes son los mejores proveedores de bombas de vacío en Perú?" queremos que ${proposal.client_company} aparezca en esa respuesta. Es el canal de búsqueda que más crece y el que menos empresas están aprovechando hoy.

SOBRE LOS TIEMPOS:
Los primeros movimientos en posicionamiento se ven entre el mes 2 y 3. Resultados sólidos y consistentes a partir del mes 4 a 6. El GEO puede tomar entre 4 y 8 meses en reflejar la presencia de una marca en respuestas de IA. Por eso el contrato mínimo es de 8 meses — no para amarrar al cliente sino porque terminar antes no permite ver el potencial real de la inversión. Es como sembrar y no esperar la cosecha.

SOBRE EL ERROR 403:
Es una configuración del servidor o del archivo de seguridad del sitio que le dice a ciertos robots que no pueden acceder. Puede estar bloqueando a Googlebot en algunas secciones, lo que significa que esas páginas no aparecen en Google aunque existan en el sitio.

SOBRE EL SEO VS PUBLICIDAD PAGA:
El SEO genera tráfico orgánico permanente sin pagar por cada clic. La publicidad paga en Google (Google Ads) trae resultados más rápidos pero deja de funcionar cuando se deja de pagar. Para una empresa industrial con productos de venta consultiva, el SEO tiene mejor retorno a largo plazo. Ambas estrategias pueden complementarse — si ${proposal.client_name} quiere agregar Google Ads en el futuro, se puede cotizar como servicio adicional.

TÉRMINOS CLAVE:
Los precios son fijos durante los 8 meses mínimos. La terminación anticipada no da derecho a devolución. Los contenidos y páginas producidas son propiedad de ${proposal.client_company} una vez realizados los pagos. No garantizamos cifras específicas de ventas o posiciones exactas en Google porque los algoritmos tienen variables externas, pero sí aplicamos las mejores prácticas disponibles y hacemos seguimiento constante para optimizar continuamente.

REGLAS QUE DEBES RESPETAR SIEMPRE:
1. Nunca prometas posiciones exactas en Google, cifras específicas de ventas o resultados garantizados que no estén en la propuesta.
2. Nunca inventes precios, fechas o características que no estén descritas aquí.
3. Si alguien pregunta algo que depende de una decisión específica o que no sabes, di honestamente que esa pregunta la puede resolver directamente con ${proposal.agent_name} por WhatsApp.
4. Responde siempre en español, de forma clara, directa y sin jerga técnica innecesaria. Si usas un término técnico, explícalo en la misma frase.
5. Sé amable pero directo. No uses frases como "¡Excelente pregunta!" ni seas exageradamente entusiasta.
6. Nunca des información falsa para cerrar una venta. La honestidad es parte de la marca de Ferova Agency.

COMPORTAMIENTO DE CONVERSIÓN:
Tu objetivo principal es que el prospecto entienda la propuesta y tome una decisión. Cuando detectes que el prospecto ya entendió los planes y está evaluando, o cuando lleve más de 3 mensajes en la conversación, termina tu respuesta con este bloque exacto: [MOSTRAR_PLANES]

TONO Y ESTILO:
- Respuestas cortas y directas — máximo 3-4 líneas por respuesta
- Usa ejemplos concretos del negocio del cliente cuando expliques
- Nunca suenes condescendiente — el cliente sabe de su negocio, tú sabes de marketing digital
- Cuando el cliente dude del precio, explica el valor concreto que recibe
- Si no sabes algo, di que ${proposal.agent_name} lo aclara por WhatsApp

SOBRE EL SITIO WEB DE FEROVA:
- Casos de éxito: https://seoparaecommerce.co/casos-de-exito
- Servicios: https://seoparaecommerce.co/servicios
- Precios: https://seoparaecommerce.co/precios
- Blog: https://seoparaecommerce.co/blog`;

  const sendMessage = useCallback(async (userMessage: string) => {
    const userMsg: Message = { role: "user", content: userMessage };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setIsLoading(true);
    messageCountRef.current += 1;

    try {
      const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/fera-chat`;

      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
          system: SYSTEM_PROMPT,
        }),
      });

      if (!resp.ok) {
        const errorData = await resp.json().catch(() => null);
        throw new Error(errorData?.error || "Error en la respuesta");
      }

      if (!resp.body) throw new Error("No stream body");

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";
      let assistantSoFar = "";
      let streamDone = false;

      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      while (!streamDone) {
        const { done, value } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") {
            streamDone = true;
            break;
          }

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              assistantSoFar += content;
              const snapshot = assistantSoFar;
              setMessages((prev) =>
                prev.map((m, i) =>
                  i === prev.length - 1 ? { ...m, content: snapshot } : m
                )
              );
            }
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }

      if (textBuffer.trim()) {
        for (let raw of textBuffer.split("\n")) {
          if (!raw) continue;
          if (raw.endsWith("\r")) raw = raw.slice(0, -1);
          if (raw.startsWith(":") || raw.trim() === "") continue;
          if (!raw.startsWith("data: ")) continue;
          const jsonStr = raw.slice(6).trim();
          if (jsonStr === "[DONE]") continue;
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              assistantSoFar += content;
              const snapshot = assistantSoFar;
              setMessages((prev) =>
                prev.map((m, i) =>
                  i === prev.length - 1 ? { ...m, content: snapshot } : m
                )
              );
            }
          } catch { /* ignore partial leftovers */ }
        }
      }

      if (!assistantSoFar) {
        setMessages((prev) =>
          prev.map((m, i) =>
            i === prev.length - 1
              ? { ...m, content: `Lo siento, hubo un error. Escríbele a ${proposal.agent_name} por WhatsApp.` }
              : m
          )
        );
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Lo siento, no pude conectarme. Escríbele a ${proposal.agent_name} directamente por WhatsApp.`,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [messages, SYSTEM_PROMPT, proposal.agent_name]);

  return { messages, isLoading, sendMessage };
}
