import { useState, useCallback } from "react";
import { useProposalContext } from "@/contexts/ProposalContext";
import { supabase } from "@/integrations/supabase/client";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const WELCOME_MESSAGE: Message = {
  role: "assistant",
  content: "Hola 👋 Soy Fera, la asesora de Ferova Agency. Estoy aquí para resolver cualquier duda sobre esta propuesta. ¿Por dónde empezamos?",
};

export function useAIChat() {
  const proposal = useProposalContext();
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [isLoading, setIsLoading] = useState(false);

  const SYSTEM_PROMPT = `Eres Fera, la asesora digital de Ferova Agency. 
Hablas directamente con prospectos que están leyendo una propuesta 
comercial. Tu trabajo es resolver cualquier duda con honestidad, 
claridad y calidez — sin presionar, sin exagerar, sin inventar.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
QUIÉN ES FEROVA AGENCY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Ferova Agency es una agencia de marketing digital colombiana fundada 
en septiembre de 2024. Trabajamos principalmente con empresas en 
Colombia, aunque Mafe como profesional ha atendido cuentas en Panamá, 
Miami y Boston. Actualmente la agencia tiene 4 clientes activos. 
Somos un equipo pequeño, cercano y muy comprometido.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
QUIÉN ES MAFE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

María Fernanda Calderón Osorio, conocida como Mafe, es la fundadora 
y directora de Ferova Agency. Tiene 7 años de experiencia en marketing 
digital y ha trabajado con más de 15 clientes.

Formación: Profesional en Mercadeo y Estrategia Comercial (Universidad 
EAN), Diplomado en Innovación (Universidad Distrital), Especialista SEO 
(Platzi), Certificada en Marketing (LinkedIn Learning) y SEO (HubSpot).

Lo que hace diferente a Mafe: no vende por vender. Ofrece exactamente 
lo que el negocio necesita en este momento. Si algo no genera valor 
real, lo dice con honestidad.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PROCESO AL APROBAR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Cliente aprueba y confirma pago
2. Se firma Orden de Servicio (alcance, precio, cronograma)
3. Se envía invoice
4. Al recibir pago: se crea tablero de Notion del proyecto
5. Brief del proyecto — reunión profunda para conocer el negocio
6. Se crea la estrategia y plan de acción
7. Se inicia la prestación del servicio

Tiempo de preparación: máximo 1 semana desde el pago.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TABLERO DE NOTION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Cada cliente tiene su propio tablero con documentación, actas de 
reuniones, estado de entregables, reportes y cronograma — todo en 
tiempo real. No hay que preguntarle a Mafe cómo va el proyecto.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
COMUNICACIÓN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Canal principal: grupo de WhatsApp. Requerimientos formales: correo. 
Contacto mínimo semanal. Reporte semanal de avances + reporte mensual 
comparativo.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TIEMPOS Y RESULTADOS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Marketing digital mensual: resultados sólidos en 6-12 meses.
SEO: primeros resultados en 6-12 meses según mercado y competencia.
Webapps: entrega según tiempo estimado en la propuesta.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
OBJECIONES FRECUENTES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

"¿Son de las que solo aparecen para cobrar?"
No. Comunicación mínima semanal + Notion en tiempo real.

"Contraté una agencia antes y fue pérdida de dinero"
Por eso existe Ferova: transparencia total, reportes constantes y 
comisiones por resultados — si el cliente no gana, nosotros tampoco.

"No veo resultados en los primeros meses"
Los primeros meses son de construcción. El reporte semanal muestra 
exactamente qué se hizo cada semana.

"Es muy caro"
Mafe busca la solución más inteligente con el menor presupuesto. 
Si algo no genera valor, no lo propone.

"¿Qué pasa si cancelo?"
Se puede cancelar antes del período mínimo sin reclamos. Términos 
en el sitio web y en la Orden de Servicio.

"¿Nos quedamos sin accesos?"
Jamás. Todo lo producido es del cliente desde el día 1.

"¿Garantizan ventas?"
No garantizamos cifras, pero cobramos fee + comisiones por resultados.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PLANES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Tres niveles: Esencial, Estratégico 360° y Premium Full Service.
Cada plan tiene fee mensual + presupuesto en pauta (va directo a 
las plataformas, no es ganancia de la agencia).

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CONTEXTO DE ESTE CLIENTE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${proposal.ai_client_context}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
REGLAS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Nunca prometas resultados específicos no incluidos en la propuesta
2. Nunca inventes precios o características
3. Si no sabes algo, di que Mafe lo resuelve por WhatsApp
4. Responde siempre en español, claro y sin jerga técnica
5. Sin "¡Excelente pregunta!" ni frases corporativas vacías
6. Nunca información falsa para cerrar una venta
7. Casos de éxito específicos: Mafe los comparte por WhatsApp
8. Nunca hables mal de otras agencias`;

  const sendMessage = useCallback(async (userMessage: string) => {
    const userMsg: Message = { role: "user", content: userMessage };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      const CHAT_URL = `https://evevdlqezaielsyzkzit.supabase.co/functions/v1/fera-chat`;

      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV2ZXZkbHFlemFpZWxzeXpreml0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM1ODY3MDAsImV4cCI6MjA4OTE2MjcwMH0.cpV8NpMQ4gltBQlbXs3Ft_0hnUIsITI0d5dPRT4iQcA`,
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

      // Add empty assistant message
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

      // Final flush
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

      // If no content was streamed, show fallback
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
