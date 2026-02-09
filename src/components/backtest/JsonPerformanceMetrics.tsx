import { TrendingUp, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import MetricCard from "./MetricCard";
import { useUniversalStrategyData } from "@/hooks/useUniversalStrategyData";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface JsonPerformanceMetricsProps {
  strategyId: string;
}

const JsonPerformanceMetrics = ({ strategyId }: JsonPerformanceMetricsProps) => {
  const { data, isLoading } = useUniversalStrategyData(strategyId);

  if (isLoading || !data) {
    return (
      <div className="space-y-8">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <TrendingUp className="w-5 h-5 text-primary" />
          </div>
          <h3 className="text-xl font-semibold">Performance Metrics</h3>
        </div>
        <div className="h-[400px] flex items-center justify-center text-muted-foreground">
          Loading performance data...
        </div>
      </div>
    );
  }

  const currencySymbol = data.currency === 'EUR' ? '€' : '$';
  
  // Primary metrics from JSON data
  const primaryMetrics = [
    { value: `${currencySymbol}${data.keyStats.netProfit.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`, label: "Net Profit", highlight: true },
    { value: data.keyStats.profitFactor.toFixed(2), label: "Profit Factor", highlight: false },
    { value: `${data.keyStats.winRate.toFixed(1)}%`, label: "Win Rate", highlight: false },
    { value: data.keyStats.totalTrades.toString(), label: "Total Trades", highlight: false },
  ];

  const secondaryMetrics = [
    { value: `${currencySymbol}${data.keyStats.grossProfit.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`, label: "Gross Profit", highlight: false },
    { value: `${currencySymbol}${Math.abs(data.advancedStats.performance.grossLoss).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`, label: "Gross Loss", highlight: false },
    { value: `${currencySymbol}${data.advancedStats.performance.expectancy.toFixed(2)}`, label: "Expectancy", highlight: false },
    { value: data.advancedStats.performance.sharpeRatio.toFixed(2), label: "Sharpe Ratio", highlight: false },
  ];

  const maxEquity = Math.max(...data.equityData.map(d => d.equity));
  const yAxisMax = Math.ceil(maxEquity / 1000) * 1000;

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
        {primaryMetrics.map((metric, index) => (
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
          Equity Curve ({data.reportInfo.dates})
        </h3>
        <div className="h-[380px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data.equityData}
              margin={{ top: 10, right: 30, left: 10, bottom: 10 }}
            >
              <defs>
                <linearGradient id="equityGradientJson" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4fd1c5" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#4fd1c5" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#6b7280", fontSize: 11 }}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.getFullYear().toString();
                }}
                interval={Math.floor(data.equityData.length / 6)}
              />
              <YAxis
                domain={[0, yAxisMax]}
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#6b7280", fontSize: 11 }}
                tickFormatter={(value) => {
                  if (value >= 1000) {
                    return `${currencySymbol}${(value / 1000).toFixed(0)}k`;
                  }
                  return `${currencySymbol}${value}`;
                }}
                width={50}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#0f1a24', 
                  border: '1px solid #1e2d3d',
                  borderRadius: '8px',
                }}
                labelStyle={{ color: '#fff' }}
                formatter={(value: number) => [`${currencySymbol}${value.toLocaleString()}`, 'Balance']}
              />
              <Area
                type="monotone"
                dataKey="equity"
                stroke="#4fd1c5"
                strokeWidth={2.4}
                fill="url(#equityGradientJson)"
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* View full report link */}
      <div className="flex justify-center pt-4">
        <Link 
          to={`/${strategyId}/backtest-report`}
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 border border-primary/30 rounded-lg text-primary hover:bg-primary/20 transition-colors"
        >
          View Full Backtest Report
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};

export default JsonPerformanceMetrics;
