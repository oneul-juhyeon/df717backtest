import { ShieldCheck, Calendar } from "lucide-react";
import { useUniversalStrategyData } from "@/hooks/useUniversalStrategyData";

interface JsonRiskMetricsProps {
  strategyId: string;
}

const JsonRiskMetrics = ({ strategyId }: JsonRiskMetricsProps) => {
  const { data, isLoading } = useUniversalStrategyData(strategyId);

  if (isLoading || !data) {
    return (
      <div className="space-y-8">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <ShieldCheck className="w-5 h-5 text-primary" />
          </div>
          <h3 className="text-xl font-semibold">Risk Metrics</h3>
        </div>
        <div className="h-[200px] flex items-center justify-center text-muted-foreground">
          Loading risk data...
        </div>
      </div>
    );
  }

  const currencySymbol = data.currency === 'EUR' ? '€' : '$';

  const riskMetrics = [
    { value: `${data.keyStats.maxDDPercent.toFixed(1)}%`, label: "Max Drawdown" },
    { value: data.advancedStats.riskRatios.recoveryFactor.toFixed(2), label: "Recovery Factor" },
    { value: data.advancedStats.riskRatios.sortinoRatio.toFixed(2), label: "Sortino Ratio" },
    { value: data.advancedStats.riskRatios.calmarRatio.toFixed(2), label: "Calmar Ratio" },
  ];

  const additionalMetrics = [
    { value: `${data.advancedStats.riskRatios.kellyCriterion.toFixed(1)}%`, label: "Kelly Criterion" },
    { value: data.advancedStats.riskRatios.riskReward.toFixed(2), label: "Risk/Reward" },
    { value: `${currencySymbol}${data.advancedStats.tradeStats.avgWin.toFixed(2)}`, label: "Avg Win" },
    { value: `${currencySymbol}${Math.abs(data.advancedStats.tradeStats.avgLoss).toFixed(2)}`, label: "Avg Loss" },
  ];

  const tradingPeriodItems = [
    { value: data.reportInfo.symbol, label: "Symbol" },
    { value: data.reportInfo.dates.split(' - ')[0], label: "Start Date" },
    { value: data.reportInfo.dates.split(' - ')[1] || 'Present', label: "End Date" },
    { value: data.reportInfo.deposit, label: "Initial Deposit" },
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
          {riskMetrics.map((metric, index) => (
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
        {additionalMetrics.map((metric, index) => (
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

export default JsonRiskMetrics;
