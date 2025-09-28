import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SignUp from "./pages/SignUp";

import FindLawyers from "./pages/FindLawyers";
import SignIn from "./pages/SignIn";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Community from "./pages/Community";
import DocumentReview from "./pages/DocumentReview";
import MapView from "./pages/MapView";
import Payments from "./pages/Payments";
import AILegalAssistant from "./pages/AILegalAssistant";
import UserProfile from "./pages/UserProfile";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Chatbot from "./components/Chatbot";
import Loading from "./components/Loading";

const queryClient = new QueryClient();

const App = () => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Simulate loading time - disabled for testing
    // const timer = setTimeout(() => {
    //   setIsLoading(false);
    // }, 3000); // 3 seconds loading

    // return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <div className="flex flex-col min-h-screen">
              {/* Global Navbar */}
              <Navbar />

              {/* Main Routes */}
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/find" element={<FindLawyers />} />
                  <Route path="/login" element={<SignIn />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/community" element={<Community />} />
                  <Route path="/document-review" element={<DocumentReview />} />
                  <Route path="/map" element={<MapView />} />
                  <Route path="/payments" element={<Payments />} />
                  <Route
                    path="/ai-legal-assistant"
                    element={<AILegalAssistant />}
                  />
                  <Route path="/profile" element={<UserProfile />} />
                  {/* Catch-all */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>

              {/* Global Footer */}
              <Footer />

              {/* Floating Chatbot */}
              <Chatbot />
            </div>
          </TooltipProvider>
        </LanguageProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
