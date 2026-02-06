import { useRef, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { equityCurveData } from "@/data/backtestData";

interface TooltipPayload {
  date: string;
  equity: number;
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

const EquityCurveChart = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const [tooltipData, setTooltipData] = useState<{
    x: number;
    y: number;
    payload: TooltipPayload;
  } | null>(null);

  const maxEquity = Math.max(...equityCurveData.map((d) => d.equity));
  const minEquity = Math.min(...equityCurveData.map((d) => d.equity));
  const yAxisMin = Math.floor(minEquity / 10000) * 10000;
  const yAxisMax = Math.ceil(maxEquity / 100000) * 100000;

  const handleMouseMove = (e: any) => {
    if (e.activeTooltipIndex !== undefined && e.activePayload?.[0]) {
      const payload = e.activePayload[0].payload as TooltipPayload;
      const chartBounds = chartRef.current?.getBoundingClientRect();
      if (chartBounds && e.chartX !== undefined && e.chartY !== undefined) {
        const tooltipWidth = 220;
        const tooltipHeight = 64;
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
      return `€${(value / 1000).toFixed(0)}k`;
    }
    return `€${value}`;
  };

  return (
    <div ref={chartRef} className="relative h-[380px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={equityCurveData}
          margin={{ top: 10, right: 30, left: 10, bottom: 10 }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <defs>
            <linearGradient id="equityAreaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4fd1c5" stopOpacity={0.35} />
              <stop offset="100%" stopColor="#4fd1c5" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#6b7280", fontSize: 11 }}
            interval={14}
          />
          <YAxis
            domain={[yAxisMin, yAxisMax]}
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
            fill="url(#equityAreaGradient)"
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
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-sm bg-[#4fd1c5]" />
              <span className="text-xs text-muted-foreground">DFcovenant:</span>
              <span className="text-xs font-mono text-foreground">{formatCurrency(tooltipData.payload.equity)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EquityCurveChart;
