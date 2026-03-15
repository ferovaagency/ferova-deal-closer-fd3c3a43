import { useState, useRef, useEffect } from "react";
import { useAIChat } from "@/hooks/useAIChat";
import { MessageCircle, X, Send } from "lucide-react";
import ReactMarkdown from "react-markdown";

const AIChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const { messages, isLoading, sendMessage } = useAIChat();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim() || isLoading) return;
    sendMessage(input.trim());
    setInput("");
  };

  return (
    <>
      {/* Bubble */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-20 right-5 z-50 w-14 h-14 rounded-full bg-navy flex items-center justify-center shadow-card-hover hover:scale-105 transition-all duration-300"
        >
          <MessageCircle className="w-6 h-6 text-gold" />
        </button>
      )}

      {/* Panel */}
      {isOpen && (
        <div className="fixed bottom-20 right-5 z-50 w-80 h-[450px] bg-card rounded-lg shadow-card-hover flex flex-col border border-border overflow-hidden">
          {/* Header */}
          <div className="bg-navy px-4 py-3 flex items-center justify-between">
            <span className="font-display text-cream text-lg">Ferova Assistant</span>
            <button onClick={() => setIsOpen(false)} className="text-cream/60 hover:text-cream transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 chat-scrollbar">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] px-3 py-2 rounded-lg text-sm font-body ${
                    msg.role === "user"
                      ? "bg-navy text-cream"
                      : "bg-cream text-charcoal"
                  }`}
                >
                  <div className="prose prose-sm max-w-none [&>p]:m-0">
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-cream text-charcoal px-3 py-2 rounded-lg text-sm">
                  <span className="animate-pulse">Escribiendo...</span>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-3 border-t border-border flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Escribe tu pregunta..."
              className="flex-1 text-sm font-body px-3 py-2 rounded-md border border-border bg-card focus:outline-none focus:ring-1 focus:ring-gold"
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="bg-gold text-navy p-2 rounded-md hover:shadow-card transition-all duration-300 disabled:opacity-40"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatWidget;
