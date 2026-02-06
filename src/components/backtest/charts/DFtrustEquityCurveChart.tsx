import { useRef, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useDFtrustData } from "@/hooks/useDFtrustData";

interface TooltipPayload {
  date: string;
  equity: number;
  pnl: number;
  change: number;
}

const DFtrustEquityCurveChart = () => {
  const { equityData, isLoading } = useDFtrustData();
  const chartRef = useRef<HTMLDivElement>(null);
  const [tooltipData, setTooltipData] = useState<{
    x: number;
    y: number;
    payload: TooltipPayload;
  } | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  if (isLoading) {
    return (
      <div className="h-[320px] flex items-center justify-center text-muted-foreground">
        Loading chart data...
      </div>
    );
  }

  if (equityData.length === 0) {
    return (
      <div className="h-[320px] flex items-center justify-center text-muted-foreground">
        No equity data available
      </div>
    );
  }

  const maxEquity = Math.max(...equityData.map((d) => d.equity));
  const yAxisMax = Math.ceil(maxEquity / 1000) * 1000;

  const handleMouseMove = (e: any) => {
    if (e.activeTooltipIndex !== undefined && e.activePayload?.[0]) {
      const payload = e.activePayload[0].payload as TooltipPayload;
      const chartBounds = chartRef.current?.getBoundingClientRect();
      if (chartBounds && e.chartX !== undefined && e.chartY !== undefined) {
        const tooltipWidth = 180;
        const tooltipHeight = 90;
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
        setActiveIndex(e.activeTooltipIndex);
      }
    }
  };

  const handleMouseLeave = () => {
    setTooltipData(null);
    setActiveIndex(null);
  };

  const formatYAxisValue = (value: number) => {
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}k`;
    }
    return `$${value}`;
  };

  return (
    <div ref={chartRef} className="relative h-[320px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={equityData}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <defs>
            <linearGradient id="dftrustEquityGradient" x1="0" y1="0" x2="0" y2="1">
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
            fill="url(#dftrustEquityGradient)"
            dot={false}
            activeDot={{
              r: 6,
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
          <div className="bg-[#1a2535]/95 backdrop-blur-sm border border-[#2d3b4f] rounded-lg px-3 py-2 shadow-xl min-w-[160px]">
            <p className="text-xs text-gray-400 mb-1.5">{tooltipData.payload.date}</p>
            <div className="space-y-1">
              <div className="flex justify-between items-center gap-4">
                <span className="text-xs text-gray-400">Balance</span>
                <span className="text-sm font-medium text-[#4fd1c5]">
                  ${tooltipData.payload.equity.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
              <div className="flex justify-between items-center gap-4">
                <span className="text-xs text-gray-400">P&L</span>
                <span
                  className={`text-sm font-medium ${
                    tooltipData.payload.pnl >= 0 ? "text-emerald-400" : "text-red-400"
                  }`}
                >
                  {tooltipData.payload.pnl >= 0 ? "+" : ""}
                  ${tooltipData.payload.pnl.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
              <div className="flex justify-between items-center gap-4">
                <span className="text-xs text-gray-400">Change</span>
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

export default DFtrustEquityCurveChart;
