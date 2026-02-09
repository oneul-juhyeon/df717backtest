import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import BacktestReport from "./pages/BacktestReport";
import DFtrustIndex from "./pages/DFtrustIndex";
import DFtrustReport from "./pages/DFtrustReport";
import StrategyLanding from "./pages/StrategyLanding";
import StrategyReport from "./pages/StrategyReport";
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
          {/* DFcovenant - main strategy */}
          <Route path="/" element={<Index />} />
          <Route path="/backtest-report" element={<BacktestReport />} />
          
          {/* DFtrust - existing legacy pages */}
          <Route path="/dftrust" element={<DFtrustIndex />} />
          <Route path="/dftrust/backtest-report" element={<DFtrustReport />} />
          
          {/* Generic strategy routes for new strategies */}
          <Route path="/dfadam" element={<StrategyLanding />} />
          <Route path="/dfadam/backtest-report" element={<StrategyReport />} />
          
          <Route path="/dfpath" element={<StrategyLanding />} />
          <Route path="/dfpath/backtest-report" element={<StrategyReport />} />
          
          <Route path="/df717" element={<StrategyLanding />} />
          <Route path="/df717/backtest-report" element={<StrategyReport />} />
          
          <Route path="/dfalpha" element={<StrategyLanding />} />
          <Route path="/dfalpha/backtest-report" element={<StrategyReport />} />
          
          <Route path="/dfbeta" element={<StrategyLanding />} />
          <Route path="/dfbeta/backtest-report" element={<StrategyReport />} />
          
          <Route path="/dfgamma" element={<StrategyLanding />} />
          <Route path="/dfgamma/backtest-report" element={<StrategyReport />} />
          
          <Route path="/dfdelta" element={<StrategyLanding />} />
          <Route path="/dfdelta/backtest-report" element={<StrategyReport />} />
          
          <Route path="/dfomega" element={<StrategyLanding />} />
          <Route path="/dfomega/backtest-report" element={<StrategyReport />} />
          
          <Route path="/dfsigma" element={<StrategyLanding />} />
          <Route path="/dfsigma/backtest-report" element={<StrategyReport />} />
          
          <Route path="/dftheta" element={<StrategyLanding />} />
          <Route path="/dftheta/backtest-report" element={<StrategyReport />} />
          
          <Route path="/dfkappa" element={<StrategyLanding />} />
          <Route path="/dfkappa/backtest-report" element={<StrategyReport />} />
          
          <Route path="/dflambda" element={<StrategyLanding />} />
          <Route path="/dflambda/backtest-report" element={<StrategyReport />} />
          
          <Route path="/dfphi" element={<StrategyLanding />} />
          <Route path="/dfphi/backtest-report" element={<StrategyReport />} />
          
          {/* Correlation Report */}
          <Route path="/correlation-report" element={<CorrelationReport />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
