import { useParams, Navigate } from "react-router-dom";
import { useUniversalStrategyData } from "@/hooks/useUniversalStrategyData";
import { getStrategyById, isJsonStrategy } from "@/config/strategies";
import TabsContainer from "@/components/backtest/TabsContainer";
import Header from "@/components/backtest/Header";

const UniversalStrategyLanding = () => {
  const { strategyId } = useParams<{ strategyId: string }>();
  const normalizedId = strategyId?.toLowerCase() || '';
  const strategy = getStrategyById(normalizedId);
  const { data, isLoading, error } = useUniversalStrategyData(normalizedId);

  // 존재하지 않는 전략이면 404로 리다이렉트
  if (!strategy || !isJsonStrategy(normalizedId)) {
    return <Navigate to="/404" replace />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-destructive mb-2">Error Loading Strategy</h1>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  if (isLoading || !data) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-muted-foreground">Loading strategy...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header currentStrategy={normalizedId} />
      
      {/* Custom Hero Section based on JSON data */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern opacity-30" />
        
        <div className="container mx-auto px-6 relative z-10">
          {/* Badge */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span className="text-sm tracking-wider text-white/70">
                {data.reportInfo.symbol} • {data.reportInfo.period} • {data.reportInfo.dates.split(' - ')[0].slice(0, 4)}-{data.reportInfo.dates.split(' - ')[1]?.slice(0, 4) || '2026'}
              </span>
            </div>
          </div>
          
          {/* Title */}
          <div className="text-center mb-6">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4">
              <span className="text-foreground">DF</span>
              <span className="text-foreground">{strategy.name.replace('DF', '')}</span>
            </h1>
            <p className="text-lg text-white/60 max-w-2xl mx-auto font-light">
              {strategy.description}
            </p>
          </div>
          
          {/* Description */}
          <p className="text-center text-white/50 max-w-3xl mx-auto mb-12 font-light leading-relaxed">
            Systematic trading approach with {data.keyStats.totalTrades} trades analyzed.
          </p>
          
          {/* Key metrics from JSON data */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 max-w-5xl mx-auto">
            <div className="metric-card text-center group border-white/10">
              <div className={`text-2xl md:text-3xl font-semibold tracking-tight ${data.keyStats.netProfit >= 0 ? 'text-success' : 'text-destructive'} mb-2`}>
                {data.currency === 'EUR' ? '€' : '$'}{Math.abs(data.keyStats.netProfit).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
              </div>
              <div className="text-xs text-white/40 tracking-widest uppercase">NET PROFIT</div>
            </div>
            <div className="metric-card text-center group border-white/10">
              <div className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground mb-2">
                {data.keyStats.profitFactor.toFixed(2)}
              </div>
              <div className="text-xs text-white/40 tracking-widest uppercase">PROFIT FACTOR</div>
            </div>
            <div className="metric-card text-center group border-white/10">
              <div className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground mb-2">
                {data.keyStats.maxDDPercent.toFixed(1)}%
              </div>
              <div className="text-xs text-white/40 tracking-widest uppercase">MAX DRAWDOWN</div>
            </div>
            <div className="metric-card text-center group border-white/10">
              <div className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground mb-2">
                {data.advancedStats.riskRatios.recoveryFactor.toFixed(2)}
              </div>
              <div className="text-xs text-white/40 tracking-widest uppercase">RECOVERY FACTOR</div>
            </div>
            <div className="metric-card text-center group border-white/10">
              <div className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground mb-2">
                {data.advancedStats.performance.sharpeRatio.toFixed(2)}
              </div>
              <div className="text-xs text-white/40 tracking-widest uppercase">SHARPE RATIO</div>
            </div>
          </div>
        </div>
      </section>

      <TabsContainer strategyId={normalizedId} />
      
      {/* Footer */}
      <footer className="border-t border-white/10 py-8 mt-16">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm text-white/40">
            © 2025 DF717. Past performance is not indicative of future results. Trading involves substantial risk. All analytics are provided for educational purposes only.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default UniversalStrategyLanding;
