import { Analytics } from "@vercel/analytics/react";
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/context/LanguageContext";
import { CookieConsentProvider } from "@/hooks/useCookieConsent";
import AnalyticsGate from "@/components/AnalyticsGate";
import CookieConsentBanner from "@/components/CookieConsentBanner";
import Index from "./pages/Index";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <CookieConsentProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <AnalyticsGate />
              <CookieConsentBanner />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/politica-de-privacidade" element={<PrivacyPolicy />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
          <Analytics />
        </CookieConsentProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
};

export default App;
