import { useRef, useState } from "react";
import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useBacktestData } from "@/hooks/useBacktestData";
import { useDFtrustData } from "@/hooks/useDFtrustData";
import { getStrategyConfig } from "@/data/strategies";

interface TooltipPayload {
  date: string;
  equity: number;
  pnl: number;
  change: number;
}

interface EquityCurveChartProps {
  strategyId: string;
}

const EquityCurveChart = ({ strategyId }: EquityCurveChartProps) => {
  const config = getStrategyConfig(strategyId);
  const backtestData = useBacktestData();
  const dftrustData = useDFtrustData();
  
  // Select data based on strategy
  const { equityData, isLoading } = strategyId === "dftrust" ? dftrustData : backtestData;
  const currency = config.currency === "EUR" ? "€" : "$";
  
  const chartRef = useRef<HTMLDivElement>(null);
  const [tooltipData, setTooltipData] = useState<{
    x: number;
    y: number;
    payload: TooltipPayload;
  } | null>(null);

  if (isLoading) {
    return (
      <div className="h-[380px] flex items-center justify-center text-muted-foreground">
        Loading chart data...
      </div>
    );
  }

  if (equityData.length === 0) {
    return (
      <div className="h-[380px] flex items-center justify-center text-muted-foreground">
        No equity data available
      </div>
    );
  }

  const maxEquity = Math.max(...equityData.map((d) => d.equity));
  const yAxisDivisor = config.currency === "EUR" ? 100000 : 1000;
  const yAxisMax = Math.ceil(maxEquity / yAxisDivisor) * yAxisDivisor;

  const handleMouseMove = (e: any) => {
    if (e.activeTooltipIndex !== undefined && e.activePayload?.[0]) {
      const payload = e.activePayload[0].payload as TooltipPayload;
      const chartBounds = chartRef.current?.getBoundingClientRect();
      if (chartBounds && e.chartX !== undefined && e.chartY !== undefined) {
        const tooltipWidth = 220;
        const tooltipHeight = 100;
        const padding = 12;

        let x = e.chartX + 70;
        let y = e.chartY;

        const rightEdge = chartBounds.width - 60;
        if (x + tooltipWidth > rightEdge) {
          x = e.chartX - tooltipWidth + 40;
        }

        x = Math.max(padding, Math.min(x, chartBounds.width - tooltipWidth - padding));
        y = Math.max(padding, Math.min(y, chartBounds.height - tooltipHeight - padding));

        setTooltipData({ x, y, payload });
      }
    }
  };

  const handleMouseLeave = () => {
    setTooltipData(null);
  };

  const formatYAxisValue = (value: number) => {
    if (value >= 1000) {
      return `${currency}${(value / 1000).toFixed(0)}k`;
    }
    return `${currency}${value}`;
  };

  const formatCurrencyValue = (value: number) => {
    return `${currency}${value.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const gradientId = `equityGradient-${strategyId}`;

  return (
    <div ref={chartRef} className="relative h-[380px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={equityData}
          margin={{ top: 10, right: 30, left: 10, bottom: 10 }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4fd1c5" stopOpacity={0.35} />
              <stop offset="100%" stopColor="#4fd1c5" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid 
            strokeDasharray="0"
            stroke="#1a2535"
            strokeOpacity={0.4}
            vertical={true}
            horizontal={true}
          />
          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#6b7280", fontSize: 11 }}
            tickFormatter={(value) => {
              const date = new Date(value);
              return date.getFullYear().toString();
            }}
            interval={Math.floor(equityData.length / 6)}
          />
          <YAxis
            domain={[0, yAxisMax]}
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#6b7280", fontSize: 11 }}
            tickFormatter={formatYAxisValue}
            width={50}
          />
          <Tooltip content={() => null} cursor={false} />
          <Area
            type="monotone"
            dataKey="equity"
            stroke="#4fd1c5"
            strokeWidth={2.4}
            fill={`url(#${gradientId})`}
            dot={false}
            activeDot={{
              r: 5,
              fill: "transparent",
              stroke: "#4fd1c5",
              strokeWidth: 1.5,
            }}
          />
        </AreaChart>
      </ResponsiveContainer>

      {tooltipData && (
        <div
          className="absolute pointer-events-none z-50"
          style={{
            left: tooltipData.x,
            top: tooltipData.y,
            willChange: "transform",
            transform: "translateZ(0)",
          }}
        >
          <div className="bg-[#0f1a24]/95 backdrop-blur-sm border border-[#1e2d3d] rounded-lg px-3 py-2 shadow-xl min-w-[200px]">
            <p className="text-xs text-foreground font-medium mb-1.5">{tooltipData.payload.date}</p>
            <div className="space-y-1">
              <div className="flex justify-between items-center gap-4">
                <span className="text-xs text-muted-foreground">Balance</span>
                <span className="text-sm font-medium text-[#4fd1c5]">
                  {formatCurrencyValue(tooltipData.payload.equity)}
                </span>
              </div>
              <div className="flex justify-between items-center gap-4">
                <span className="text-xs text-muted-foreground">P&L</span>
                <span
                  className={`text-sm font-medium ${
                    tooltipData.payload.pnl >= 0 ? "text-emerald-400" : "text-red-400"
                  }`}
                >
                  {tooltipData.payload.pnl >= 0 ? "+" : ""}
                  {formatCurrencyValue(tooltipData.payload.pnl)}
                </span>
              </div>
              <div className="flex justify-between items-center gap-4">
                <span className="text-xs text-muted-foreground">Change</span>
                <span
                  className={`text-sm font-medium ${
                    tooltipData.payload.change >= 0 ? "text-emerald-400" : "text-red-400"
                  }`}
                >
                  {tooltipData.payload.change >= 0 ? "+" : ""}
                  {tooltipData.payload.change.toFixed(2)}%
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EquityCurveChart;
