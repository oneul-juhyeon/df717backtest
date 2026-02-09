import { ShieldCheck, Calendar, TrendingDown, Award } from "lucide-react";
import { getStrategyConfig } from "@/data/strategies";

interface RiskMetricsProps {
  strategyId: string;
}

const RiskMetrics = ({ strategyId }: RiskMetricsProps) => {
  const config = getStrategyConfig(strategyId);

  const tradingPeriodItems = [
    { value: config.tradingPeriod.symbol, label: "Symbol" },
    { value: config.tradingPeriod.startDate, label: "Start Date" },
    { value: config.tradingPeriod.endDate, label: "End Date" },
    { value: config.tradingPeriod.initialDeposit, label: "Initial Deposit" },
  ];

  return (
    <div className="space-y-8">
      {/* Risk Metrics Section */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-primary/10">
            <ShieldCheck className="w-5 h-5 text-primary" />
          </div>
          <h3 className="text-xl font-semibold">Risk Metrics</h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {config.riskMetrics.map((metric, index) => (
            <div key={index} className="metric-card text-center">
              <div className="text-2xl font-bold font-mono text-primary mb-2">
                {metric.value}
              </div>
              <div className="text-xs text-muted-foreground tracking-wider uppercase">
                {metric.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {config.additionalMetrics.map((metric, index) => (
          <div key={index} className="metric-card text-center">
            <div className="text-2xl font-bold font-mono text-primary mb-2">
              {metric.value}
            </div>
            <div className="text-xs text-muted-foreground tracking-wider uppercase">
              {metric.label}
            </div>
          </div>
        ))}
      </div>

      {/* Trading Period Section */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-primary/10">
            <Calendar className="w-5 h-5 text-primary" />
          </div>
          <h3 className="text-xl font-semibold">Trading Period</h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {tradingPeriodItems.map((item, index) => (
            <div key={index} className="metric-card text-center">
              <div className="text-lg font-bold font-mono text-foreground mb-2">
                {item.value}
              </div>
              <div className="text-xs text-muted-foreground tracking-wider uppercase">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RiskMetrics;
