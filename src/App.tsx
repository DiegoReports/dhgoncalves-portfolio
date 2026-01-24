import { Analytics } from "@vercel/analytics/next";
import ReactGA from 'react-ga4';
import React, { useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// 1. Pegamos o ID da variável de ambiente
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_ID;

// 2. Inicializamos o GA fora do componente para rodar apenas uma vez no carregamento
if (GA_MEASUREMENT_ID) {
  ReactGA.initialize(GA_MEASUREMENT_ID);
}

const App = () => {
  // 3. Este hook dispara o rastreamento de visualização de página
  useEffect(() => {
    if (GA_MEASUREMENT_ID) {
      ReactGA.send({ 
        hitType: "pageview", 
        page: window.location.pathname + window.location.search 
      });
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
      {/* Analytics da Vercel rodando em paralelo */}
      <Analytics />
    </QueryClientProvider>
  );
};

export default App;