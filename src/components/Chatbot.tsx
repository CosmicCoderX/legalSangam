import React, { useState, useRef, useEffect } from "react";
import { getChatbotResponse } from "../services/chatbotService";

type Msg = { sender: "bot" | "user"; text: string };

interface SpeechRecognition extends EventTarget {
  lang: string;
  interimResults: boolean;
  onresult: (event: SpeechRecognitionEvent) => void;
  start(): void;
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
  [index: number]: SpeechRecognitionResult;
  length: number;
}

interface SpeechRecognitionResult {
  [index: number]: SpeechRecognitionAlternative;
  length: number;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

const Chatbot: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { sender: "bot", text: "Hello! I’m AskCounsel. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    listRef.current?.scrollTo({
      top: listRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, open]);

  const send = async () => {
    if (!input.trim() || isLoading) return;
    const userMessage = input.trim();
    setInput("");
    setMessages((m) => [...m, { sender: "user", text: userMessage }]);
    setIsLoading(true);

    try {
      const botResponse = await getChatbotResponse(userMessage);
      setMessages((m) => [...m, { sender: "bot", text: botResponse }]);
    } catch (error) {
      console.error("Error getting chatbot response:", error);
      setMessages((m) => [
        ...m,
        {
          sender: "bot",
          text: "Sorry, I'm having trouble connecting right now. Please try again later or contact support.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // minimal speech-to-text (browser)
  const startVoice = async () => {
    const SpeechRecognition =
      (
        window as Window & {
          SpeechRecognition?: new () => SpeechRecognition;
          webkitSpeechRecognition?: new () => SpeechRecognition;
        }
      ).SpeechRecognition ||
      (
        window as Window & {
          SpeechRecognition?: new () => SpeechRecognition;
          webkitSpeechRecognition?: new () => SpeechRecognition;
        }
      ).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition not supported in this browser.");
      return;
    }
    const rec = new SpeechRecognition();
    rec.lang = "en-IN";
    rec.interimResults = false;
    rec.onresult = (e: SpeechRecognitionEvent) => {
      const txt = e.results[0][0].transcript;
      setInput(txt);
    };
    rec.start();
  };

  return (
    <>
      {/* Enhanced Chat Button with Better Size and Positioning */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 bg-primary text-primary-foreground px-4 py-3 sm:px-6 sm:py-4 rounded-full shadow-large hover:bg-primary-dark transition-all duration-300 hover:scale-105 z-40 text-base sm:text-lg"
        aria-label="Open chat"
      >
        💬
      </button>

      {/* Enhanced Chat Window with Improved Size and Alignment */}
      {open && (
        <div className="fixed bottom-24 right-8 w-96 max-w-[calc(100vw-2rem)] bg-card shadow-large rounded-2xl overflow-hidden z-50 border border-border animate-scale-in sm:w-80 md:w-96 lg:w-[400px]">
          {/* Header */}
          <div className="bg-primary text-primary-foreground p-5 font-semibold text-lg">
            AskCounsel
          </div>

          {/* Messages Area with Better Spacing */}
          <div
            ref={listRef}
            className="h-80 max-h-[60vh] overflow-y-auto p-5 flex flex-col gap-4 sm:h-64 md:h-80 lg:h-96"
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] rounded-xl p-4 text-base animate-fade-in ${
                  m.sender === "bot"
                    ? "bg-muted text-muted-foreground self-start"
                    : "bg-primary text-primary-foreground self-end ml-auto"
                }`}
              >
                {m.text}
              </div>
            ))}
            {isLoading && (
              <div className="max-w-[85%] rounded-xl p-4 text-base animate-fade-in bg-muted text-muted-foreground self-start">
                typing...
              </div>
            )}
          </div>

          {/* Input Area with Better Layout */}
          <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 border-t border-border bg-background">
            <button
              onClick={startVoice}
              className="px-3 py-2 sm:px-4 sm:py-3 rounded-lg bg-muted hover:bg-accent transition-colors text-base sm:text-lg flex-shrink-0"
              aria-label="Voice input"
            >
              🎤
            </button>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && send()}
              className="flex-1 px-3 py-2 sm:px-4 sm:py-3 bg-background border border-input rounded-lg outline-none focus:ring-2 focus:ring-ring transition-all text-sm sm:text-base min-w-0"
              placeholder="Type your message..."
            />
            <button
              onClick={send}
              className="px-4 py-2 sm:px-6 sm:py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary-dark transition-colors font-medium flex-shrink-0 text-sm sm:text-base whitespace-nowrap"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
