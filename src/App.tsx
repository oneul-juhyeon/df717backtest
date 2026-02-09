import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import BacktestReport from "./pages/BacktestReport";
import DFtrustIndex from "./pages/DFtrustIndex";
import UniversalStrategyLanding from "./pages/UniversalStrategyLanding";
import UniversalStrategyReport from "./pages/UniversalStrategyReport";
import CorrelationReport from "./pages/CorrelationReport";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* DFcovenant (메인 전략) - 기존 구현 유지 */}
          <Route path="/" element={<Index />} />
          <Route path="/backtest-report" element={<BacktestReport />} />
          
          {/* DFtrust - 기존 랜딩 페이지 유지 */}
          <Route path="/dftrust" element={<DFtrustIndex />} />
          
          {/* Correlation Report */}
          <Route path="/correlation-report" element={<CorrelationReport />} />
          
          {/* 동적 전략 라우트 - 모든 JSON 기반 전략 */}
          <Route path="/:strategyId" element={<UniversalStrategyLanding />} />
          <Route path="/:strategyId/backtest-report" element={<UniversalStrategyReport />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
