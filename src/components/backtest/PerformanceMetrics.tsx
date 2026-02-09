import { TrendingUp, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import MetricCard from "./MetricCard";
import EquityCurveChart from "./charts/EquityCurveChart";
import { getStrategyConfig } from "@/data/strategies";

interface PerformanceMetricsProps {
  strategyId: string;
}

const PerformanceMetrics = ({ strategyId }: PerformanceMetricsProps) => {
  const config = getStrategyConfig(strategyId);

  return (
    <div className="space-y-8">
      {/* Section header */}
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-primary/10">
          <TrendingUp className="w-5 h-5 text-primary" />
        </div>
        <h3 className="text-xl font-semibold">Performance Metrics</h3>
      </div>

      {/* Primary metrics grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {config.performanceMetrics.primary.map((metric, index) => (
          <MetricCard 
            key={index}
            value={metric.value}
            label={metric.label}
            highlight={metric.highlight}
          />
        ))}
      </div>

      {/* Secondary metrics grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {config.performanceMetrics.secondary.map((metric, index) => (
          <MetricCard 
            key={index}
            value={metric.value}
            label={metric.label}
            highlight={metric.highlight}
          />
        ))}
      </div>

      {/* Equity curve with interactive chart */}
      <div className="bg-[#0a1018] rounded-xl p-6 border border-[#1a2535]">
        <h3 className="text-muted-foreground text-sm mb-4">
          {config.equityChartTitle}
        </h3>
        <EquityCurveChart strategyId={strategyId} />
      </div>

      {/* View full report link */}
      <div className="flex justify-center pt-4">
        <Link 
          to={config.reportPath}
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 border border-primary/30 rounded-lg text-primary hover:bg-primary/20 transition-colors"
        >
          View Full Backtest Report
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};

export default PerformanceMetrics;
