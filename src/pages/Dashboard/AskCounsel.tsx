import { useEffect } from "react";
import { DashboardLayout } from "../../components/layout";

declare global {
  interface Window {
    botpress: any;
  }
}

export default function AskCounsel() {
  useEffect(() => {
    // 1. Inject the Botpress script
    const script = document.createElement("script");
    script.src = "https://cdn.botpress.cloud/webchat/v3.7/inject.js";
    script.async = true;

    script.onload = () => {
      // 2. Initialize the bot
      if (window.botpress) {
        window.botpress.init({
          "botId": "8690910d-7adf-402a-bd80-c0d8f89c1555",
          "clientId": "1cde259d-c212-4813-81f9-d66a4452a333",
          "configuration": {
            "version": "v2",
            "botName": "AskCounsel",
            "botAvatar": "https://files.bpcontent.cloud/2026/09/20/11/20260920115453-31F3285K.png",
            "botDescription": "Your AI legal assistant and advocate bridge",
            "color": "#6366f1", // Indigo 500 / brand color
            "variant": "solid",
            "themeMode": document.documentElement.classList.contains('dark') ? "dark" : "light",
            "fontFamily": "Inter, sans-serif",
            "radius": 1,
            "embeddedChatId": "bp-embedded-webchat",
            "allowFileUpload": false,
            "soundEnabled": true,
          }
        });
      }
    };

    document.body.appendChild(script);

    return () => {
      // Cleanup the script
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
      
      // Attempt to destroy botpress instance to prevent memory leaks or floating widget leftovers
      if (window.botpress && typeof window.botpress.destroy === 'function') {
        window.botpress.destroy();
      }
      
      // Clean up injected DOM elements from botpress just in case
      const bpWidget = document.getElementById("bp-web-widget");
      if (bpWidget) bpWidget.remove();
      
      const bpContainer = document.getElementById("bp-webchat-container");
      if (bpContainer) bpContainer.remove();
    };
  }, []);

  return (
    <DashboardLayout role="client">
      <div className="flex flex-col h-[calc(100vh-140px)] min-h-[600px]">
        <div className="mb-6 shrink-0 rounded-2xl border border-brand/10 bg-gradient-to-r from-brand/10 via-white to-white p-5">
          <p className="eyebrow">AI legal guidance</p><h1 className="mt-1 text-3xl font-bold text-ink tracking-tight">AskCounsel</h1>
          <p className="mt-2 text-slate-500 max-w-3xl">
            Chat with your AI legal assistant. Describe your legal situation, explore your options, and discover relevant advocates based on your specific needs.
          </p>
        </div>
        
        <div className="flex-1 w-full bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-lg shadow-ink/5 flex flex-col relative p-0 m-0">
          {/* Botpress Embedded Container */}
          <div id="bp-embedded-webchat" className="w-full h-full min-h-full border-none m-0 p-0" />
        </div>
        
        <p className="mt-4 rounded-xl bg-amber-50 px-4 py-3 text-xs text-amber-800 text-center shrink-0">
          <strong>Disclaimer:</strong> AskCounsel is an informational tool and does not replace advice from a qualified legal professional.
        </p>
      </div>
    </DashboardLayout>
  );
}
