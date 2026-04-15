import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import RouteScrollToTop from "@/components/RouteScrollToTop";
import WhatsAppButton from "@/components/WhatsAppButton";
import { SpecialistContactProvider } from "@/contexts/SpecialistContactContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Content from "./pages/Content";
import ContentDetail from "./pages/ContentDetail";
import ProductDetail from "./pages/ProductDetail";
import { ExitIntentContactListener } from "@/components/ExitIntentContactListener";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider storageKey="hirayama-seguros-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <SpecialistContactProvider>
            <RouteScrollToTop />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/solucoes/:slug" element={<ProductDetail />} />
              <Route path="/conteudo" element={<Content />} />
              <Route path="/conteudo/:slug" element={<ContentDetail />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <WhatsAppButton />
            <ExitIntentContactListener />
          </SpecialistContactProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
