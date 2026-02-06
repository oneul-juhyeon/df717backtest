import { TrendingUp, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import MetricCard from "./MetricCard";
import DFtrustEquityCurveChart from "./charts/DFtrustEquityCurveChart";

const performanceMetrics = [
  { value: "$4,306.36", label: "TOTAL NET PROFIT", highlight: true },
  { value: "1.44", label: "PROFIT FACTOR", highlight: false },
  { value: "1,246", label: "TOTAL TRADES", highlight: false },
  { value: "61.8%", label: "WIN RATE", highlight: false },
];

const secondaryMetrics = [
  { value: "$2.65", label: "EXPECTANCY", highlight: true },
  { value: "12.85", label: "RECOVERY FACTOR", highlight: false },
  { value: "2.74", label: "SHARPE RATIO", highlight: false },
  { value: "3.20", label: "SORTINO RATIO", highlight: false },
];

const DFtrustPerformanceMetrics = () => {
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
      <div className="bg-[#0a1018] rounded-xl p-6 border border-[#1a2535]">
        <h3 className="text-muted-foreground text-sm mb-4">
          Equity Curve in USD (2016-2026) — $1,000 → $4,306
        </h3>
        <DFtrustEquityCurveChart />
      </div>

      {/* View full report link */}
      <div className="flex justify-center pt-4">
        <Link 
          to="/dftrust/backtest-report"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 border border-primary/30 rounded-lg text-primary hover:bg-primary/20 transition-colors"
        >
          View Full Backtest Report
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};

export default DFtrustPerformanceMetrics;
