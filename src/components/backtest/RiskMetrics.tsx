import { ShieldCheck, Calendar, TrendingDown, Flame, Award } from "lucide-react";

const riskMetrics = [
  { value: "11.2%", label: "Equity DD %", icon: TrendingDown },
  { value: "8.7%", label: "Balance DD %", icon: TrendingDown },
  { value: "217d", label: "Max DD Days", icon: Calendar },
  { value: "9.31", label: "Calmar Ratio", icon: Award },
];

const additionalMetrics = [
  { value: "1.72", label: "Risk/Reward" },
  { value: "18", label: "Max Win Streak" },
  { value: "5", label: "Max Loss Streak" },
  { value: "0.29", label: "Avg Days/Trade" },
];

const tradingPeriod = [
  { value: "XAUUSD", label: "Symbol" },
  { value: "2016-01-01", label: "Start Date" },
  { value: "2026-02-02", label: "End Date" },
  { value: "$10,000", label: "Initial Deposit" },
];

const RiskMetrics = () => {
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
          {tradingPeriod.map((item, index) => (
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
