import { TrendingUp, ExternalLink } from "lucide-react";
import MetricCard from "./MetricCard";

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

      {/* Equity curve placeholder */}
      <div className="chart-container">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-muted-foreground">
            Equity Curve in EUR (2016-2026) — €10,000 → €732,988
          </p>
        </div>
        <div className="h-64 bg-gradient-to-r from-primary/5 via-success/10 to-success/20 rounded-lg flex items-end justify-center relative overflow-hidden">
          {/* Simulated equity curve */}
          <svg className="w-full h-full" viewBox="0 0 400 150" preserveAspectRatio="none">
            <defs>
              <linearGradient id="equityGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="hsl(142 70% 45%)" stopOpacity="0.3" />
                <stop offset="100%" stopColor="hsl(142 70% 45%)" stopOpacity="0.05" />
              </linearGradient>
            </defs>
            <path
              d="M0,140 Q50,130 100,120 T150,100 T200,80 T250,60 T300,40 T350,25 L400,10 L400,150 L0,150 Z"
              fill="url(#equityGradient)"
            />
            <path
              d="M0,140 Q50,130 100,120 T150,100 T200,80 T250,60 T300,40 T350,25 L400,10"
              fill="none"
              stroke="hsl(142 70% 45%)"
              strokeWidth="2"
            />
          </svg>
          <div className="absolute bottom-4 right-4 flex items-center gap-2 text-success text-sm font-mono">
            <TrendingUp className="w-4 h-4" />
            +7,229%
          </div>
        </div>
      </div>

      {/* View full report link */}
      <a 
        href="#"
        className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-sm"
      >
        <ExternalLink className="w-4 h-4" />
        View Full Backtest Report
      </a>
    </div>
  );
};

export default PerformanceMetrics;
