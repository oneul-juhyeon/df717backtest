import { TrendingUp, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import MetricCard from "./MetricCard";
import EquityCurveChart from "./charts/EquityCurveChart";

const performanceMetrics = [
  { value: "€722,988.07", label: "TOTAL NET PROFIT", highlight: true },
  { value: "3.31", label: "PROFIT FACTOR", highlight: false },
  { value: "988", label: "TOTAL TRADES", highlight: false },
  { value: "66.0%", label: "WIN RATE", highlight: false },
];

const secondaryMetrics = [
  { value: "€731.77", label: "EXPECTANCY", highlight: true },
  { value: "22.24", label: "RECOVERY FACTOR", highlight: false },
  { value: "10.00", label: "SHARPE RATIO", highlight: false },
  { value: "8.17", label: "SORTINO RATIO", highlight: false },
];

const PerformanceMetrics = () => {
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
        {performanceMetrics.map((metric, index) => (
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
        {secondaryMetrics.map((metric, index) => (
          <MetricCard 
            key={index}
            value={metric.value}
            label={metric.label}
            highlight={metric.highlight}
          />
        ))}
      </div>

      {/* Equity curve with interactive chart */}
      <div className="chart-container">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-muted-foreground">
            Equity Curve in EUR (2016-2026) — €10,000 → €732,988
          </p>
        </div>
        <div className="bg-card/50 rounded-lg p-4 border border-border">
          <EquityCurveChart />
        </div>
      </div>

      {/* View full report link */}
      <Link 
        to="/backtest-report"
        className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-sm"
      >
        <ExternalLink className="w-4 h-4" />
        View Full Backtest Report
      </Link>
    </div>
  );
};

export default PerformanceMetrics;
