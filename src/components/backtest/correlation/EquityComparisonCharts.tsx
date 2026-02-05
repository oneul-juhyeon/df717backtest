import { TrendingUp } from "lucide-react";
import CorrelationEquityChart from "@/components/backtest/charts/CorrelationEquityChart";

const EquityComparisonCharts = () => {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">Equity Comparison Charts</h2>
      <div className="space-y-6">
        <div className="border border-white/10 rounded-xl p-6 bg-card/30">
          <h4 className="text-sm text-muted-foreground mb-4">
            Overlay Equity Curves (Normalized to 100%)
          </h4>
          <CorrelationEquityChart showCombined={false} />
        </div>
        <div className="border border-white/10 rounded-xl p-6 bg-card/30">
          <h4 className="text-sm text-muted-foreground mb-4">
            Combined Portfolio (Equal Weight)
          </h4>
          <CorrelationEquityChart showCombined={true} />
        </div>
      </div>
    </section>
  );
};

export default EquityComparisonCharts;