import { useState, useRef, useEffect } from "react";
import { useAIChat } from "@/hooks/useAIChat";
import { useProposalContext } from "@/contexts/ProposalContext";
import { buildWhatsAppURL } from "@/lib/whatsapp";
import { X, Send } from "lucide-react";
import ReactMarkdown from "react-markdown";

const CHIPS = [
  "¿Qué incluye cada plan?",
  "¿Cuánto tarda en dar resultados?",
  "¿Puedo pagar en cuotas?",
];

const APPROVAL_TAG_1 = "[MOSTRAR_APROBACION]";
const APPROVAL_TAG_2 = "[MOSTRAR_PLANES]";

const PlanApprovalBlock = () => {
  const proposal = useProposalContext();
  const plans = proposal.plans as { name: string; price: string }[];

  return (
    <div
      className="mt-2 space-y-2"
      style={{
        background: "#FAF6F0",
        border: "1px solid #C0930E",
        borderRadius: 8,
        padding: 12,
      }}
    >
      {plans.map((plan) => {
        const url = buildWhatsAppURL(
          `Hola ${proposal.agent_name}, apruebo el ${plan.name} de Ferova Agency para ${proposal.client_company}. ¡Iniciemos!`,
          proposal.whatsapp_number
        );
        return (
          <div key={plan.name} className="flex items-center justify-between gap-2">
            <div>
              <div className="font-body" style={{ fontWeight: 600, color: "#2F2D56", fontSize: 13 }}>
                {plan.name}
              </div>
              <div className="font-body" style={{ color: "#C0930E", fontSize: 12 }}>
                {plan.price}
              </div>
            </div>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-body whitespace-nowrap shrink-0"
              style={{
                background: "#C0930E",
                color: "#2F2D56",
                fontSize: 11,
                padding: "6px 12px",
                borderRadius: 6,
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Aprobar este plan →
            </a>
          </div>
        );
      })}
    </div>
  );
};

const AIChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [pillVisible, setPillVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [showChips, setShowChips] = useState(true);
  const { messages, isLoading, sendMessage } = useAIChat();
  const scrollRef = useRef<HTMLDivElement>(null);
  const tooltipTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tooltipHideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setPillVisible(true), 2500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!pillVisible || isOpen) return;
    tooltipTimer.current = setTimeout(() => {
      setShowTooltip(true);
      tooltipHideTimer.current = setTimeout(() => setShowTooltip(false), 3000);
    }, 10000);
    return () => {
      if (tooltipTimer.current) clearTimeout(tooltipTimer.current);
      if (tooltipHideTimer.current) clearTimeout(tooltipHideTimer.current);
    };
  }, [pillVisible, isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleOpen = () => {
    setIsOpen(true);
    setShowTooltip(false);
    if (tooltipTimer.current) clearTimeout(tooltipTimer.current);
    if (tooltipHideTimer.current) clearTimeout(tooltipHideTimer.current);
  };

  const handleSend = (text?: string) => {
    const msg = (text || input).trim();
    if (!msg || isLoading) return;
    sendMessage(msg);
    if (!text) setInput("");
    setShowChips(false);
  };

  const renderMessageContent = (content: string, role: string) => {
    const hasApproval = role === "assistant" && (content.includes(APPROVAL_TAG_1) || content.includes(APPROVAL_TAG_2));
    const displayContent = hasApproval ? content.replace(APPROVAL_TAG_1, "").replace(APPROVAL_TAG_2, "").trim() : content;

    return (
      <>
        <div className="prose prose-sm max-w-none [&>p]:m-0 [&>p]:leading-relaxed">
          <ReactMarkdown>{displayContent}</ReactMarkdown>
        </div>
        {hasApproval && <PlanApprovalBlock />}
      </>
    );
  };

  return (
    <>
      {/* Pill */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
          {showTooltip && (
            <div
              className="mb-2 px-3 py-1.5 rounded-lg text-xs font-body font-medium whitespace-nowrap"
              style={{
                background: "#C0930E",
                color: "#2F2D56",
                animation: "fade-in 0.3s ease-out",
              }}
            >
              Puedo explicarte los planes 💡
            </div>
          )}
          <button
            onClick={handleOpen}
            className="flex items-center gap-2.5 cursor-pointer"
            style={{
              background: "#2F2D56",
              border: "1.5px solid #C0930E",
              borderRadius: 999,
              boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
              padding: "10px 18px 10px 10px",
              opacity: pillVisible ? 1 : 0,
              transform: pillVisible ? "translateY(0)" : "translateY(100px)",
              transition: "opacity 0.4s ease-out, transform 0.4s ease-out",
            }}
          >
            <div
              className="flex items-center justify-center font-body"
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: "#C0930E",
                color: "#2F2D56",
                fontWeight: 700,
                fontSize: 16,
              }}
            >
              F
            </div>
            <span className="font-body text-sm text-white">
              <span className="hidden sm:inline">¿Tienes dudas? Soy Fera 👋</span>
              <span className="sm:hidden">Fera 👋</span>
            </span>
          </button>
        </div>
      )}

      {/* Panel */}
      {isOpen && (
        <div
          className="fixed z-50 flex flex-col overflow-hidden fera-panel"
          style={{
            bottom: 24,
            right: 24,
            width: 340,
            height: 480,
            borderRadius: 16,
            boxShadow: "0 16px 48px rgba(0,0,0,0.3)",
            animation: "slide-up 0.3s ease-out",
          }}
        >
          <style>{`
            @keyframes slide-up {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
            }
            @keyframes fade-in {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes dot-pulse {
              0%, 80%, 100% { opacity: 0.3; }
              40% { opacity: 1; }
            }
            @media (max-width: 639px) {
              .fera-panel {
                width: calc(100vw - 32px) !important;
                height: 70vh !important;
              }
            }
          `}</style>

          {/* Header */}
          <div
            className="flex items-center gap-3 px-4 shrink-0"
            style={{ height: 56, background: "#2F2D56" }}
          >
            <div
              className="flex items-center justify-center font-body"
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: "#C0930E",
                color: "#2F2D56",
                fontWeight: 700,
                fontSize: 14,
              }}
            >
              F
            </div>
            <div className="flex-1">
              <div className="font-body font-bold text-white text-sm">Fera</div>
              <div className="font-body text-white/60 text-xs">Asesora Ferova</div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/60 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chips */}
          {showChips && (
            <div
              className="flex flex-wrap gap-2 px-3 py-3 shrink-0"
              style={{ background: "#FAF6F0" }}
            >
              {CHIPS.map((chip) => (
                <button
                  key={chip}
                  onClick={() => handleSend(chip)}
                  className="font-body cursor-pointer transition-colors duration-200"
                  style={{
                    border: "1px solid #C0930E",
                    borderRadius: 999,
                    padding: "6px 14px",
                    fontSize: 12,
                    color: "#C0930E",
                    background: "#FFFFFF",
                  }}
                >
                  {chip}
                </button>
              ))}
            </div>
          )}

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto px-4 py-3 space-y-3 chat-scrollbar"
            style={{ background: "#FAF6F0" }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className="max-w-[85%] px-3 py-2 text-sm font-body"
                  style={
                    msg.role === "user"
                      ? {
                          background: "rgba(192,147,14,0.2)",
                          color: "#3C3C3B",
                          borderRadius: "16px 4px 16px 16px",
                        }
                      : {
                          background: "#2F2D56",
                          color: "#FFFFFF",
                          borderRadius: "4px 16px 16px 16px",
                        }
                  }
                >
                  {renderMessageContent(msg.content, msg.role)}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div
                  className="px-3 py-2 text-sm font-body flex gap-1"
                  style={{
                    background: "#2F2D56",
                    borderRadius: "4px 16px 16px 16px",
                  }}
                >
                  {[0, 1, 2].map((d) => (
                    <span
                      key={d}
                      className="text-white text-lg"
                      style={{
                        animation: `dot-pulse 1.4s infinite ease-in-out`,
                        animationDelay: `${d * 0.2}s`,
                      }}
                    >
                      ●
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div
            className="flex items-center gap-2 px-3 shrink-0"
            style={{
              height: 56,
              background: "#FFFFFF",
              borderTop: "1px solid #e5e5e5",
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Escríbele a Fera..."
              className="flex-1 text-sm font-body px-3 py-2 rounded-md border border-border bg-transparent focus:outline-none focus:ring-1 focus:ring-gold"
            />
            <button
              onClick={() => handleSend()}
              disabled={isLoading || !input.trim()}
              className="p-2 rounded-md transition-all duration-300 disabled:opacity-40"
              style={{ background: "#C0930E" }}
            >
              <Send className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatWidget;
