import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Bot,
  Send,
  Loader2,
  Trash2,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useAuthStore } from "../store/auth-store";
import Sidebar from "./sidebar";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "motion/react";
import api from "../lib/api";
import { cn } from "../lib/utils";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
  citations?: { title: string; amount: number }[];
}

export default function ChatbotPage() {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: `Hello ${user?.name}! I'm your SpendWise AI Assistant. How can I help you with your finances today?`,
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const res = await api.post("/ai/chat", { message: input });

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: res.data.text,
        sender: "ai",
        timestamp: new Date(),
        citations: res.data.citations,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error: any) {
      const backendError =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Failed to get response from AI";
      toast.error(backendError);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: `Error: ${backendError}. Please ensure your GEMINI_API_KEY is correct and your database is connected.`,
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const clearChat = () => {
    if (window.confirm("Are you sure you want to clear the chat history?")) {
      setMessages([
        {
          id: Date.now().toString(),
          text: `Chat cleared. How can I help you now, ${user?.name}?`,
          sender: "ai",
          timestamp: new Date(),
        },
      ]);
    }
  };

  return (
    <div className="flex h-screen bg-[#FDFCFB] font-poppins text-zinc-900 overflow-hidden">
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden lg:pl-64">
        {/* Mobile Spacer (for fixed mobile header in Sidebar) is not needed if we use pl-64 and fixed sidebar */}

        <main className="flex-1 flex flex-col bg-white lg:m-4 lg:rounded-[2.5rem] lg:border border-zinc-100 shadow-sm overflow-hidden min-h-0">
          {/* Main Header */}
          <header className="p-6 border-b border-zinc-50 flex items-center justify-between bg-white/50 backdrop-blur-sm shrink-0">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/dashboard")}
                className="rounded-xl hover:bg-zinc-50 lg:hidden"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-brand/10 rounded-xl flex items-center justify-center text-brand">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-zinc-900 tracking-tight leading-none">
                    AI Assistant
                  </h1>
                  <p className="text-[10px] text-green-500 font-extrabold uppercase tracking-widest mt-1.5 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                    Online & Ready
                  </p>
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={clearChat}
              className="rounded-xl hover:text-red-500 transition-colors"
              title="Clear Chat"
            >
              <Trash2 className="w-5 h-5" />
            </Button>
          </header>

          {/* Messages Area */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-6 space-y-6 bg-zinc-50/30 scroll-smooth"
          >
            <AnimatePresence initial={false}>
              {messages.map((m) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className={cn(
                    "flex flex-col max-w-[85%] lg:max-w-[70%]",
                    m.sender === "user" ? "ml-auto items-end" : "items-start",
                  )}
                >
                  <div
                    className={cn(
                      "p-4 rounded-[1.5rem] text-sm font-medium leading-relaxed shadow-sm",
                      m.sender === "user"
                        ? "bg-zinc-900 text-white rounded-tr-none"
                        : "bg-white text-zinc-800 border border-zinc-100 rounded-tl-none",
                    )}
                  >
                    {m.text}

                    {m.citations && m.citations.length > 0 && (
                      <div className="mt-4 pt-3 border-t border-zinc-100">
                        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2">
                          Sources
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {m.citations.map((c, i) => (
                            <div
                              key={i}
                              className="px-2 py-1 bg-zinc-50 border border-zinc-100 rounded-lg text-[10px] font-bold text-zinc-600"
                            >
                              {c.title} • ${c.amount}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <span className="text-[10px] font-bold text-zinc-400 mt-2 px-1">
                    {m.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </motion.div>
              ))}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-zinc-400 p-4 bg-white border border-zinc-100 rounded-[1.5rem] rounded-tl-none w-fit shadow-sm"
                >
                  <Loader2 className="w-4 h-4 animate-spin text-brand" />
                  <span className="text-xs font-bold tracking-tight">
                    AI is thinking...
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Input Area */}
          <footer className="p-6 bg-white border-t border-zinc-50 shrink-0">
            <form
              onSubmit={handleSendMessage}
              className="relative max-w-4xl mx-auto group"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about your spending habits..."
                className="w-full h-14 pl-6 pr-14 rounded-2xl border-zinc-100 bg-zinc-50/50 focus:bg-white focus:ring-brand focus:border-brand transition-all font-medium"
              />
              <Button
                type="submit"
                size="icon"
                disabled={!input.trim() || isTyping}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl bg-zinc-900 hover:bg-black text-white w-10 h-10 shadow-lg transition-transform active:scale-95 disabled:bg-zinc-200"
              >
                <Send className="w-4 h-4" />
              </Button>
            </form>
            <div className="flex items-center justify-center gap-4 mt-4">
              <p className="text-[10px] font-bold text-zinc-400 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-brand" />
                Powered by Gemini AI Core
              </p>
              <div className="h-1 w-1 bg-zinc-200 rounded-full" />
              <p className="text-[10px] font-bold text-zinc-400 flex items-center gap-1">
                <AlertCircle className="w-3 h-3 text-red-400" />
                Check financial data for accuracy
              </p>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
