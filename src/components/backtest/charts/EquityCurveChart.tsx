import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area } from "recharts";
import { equityCurveData } from "@/data/backtestData";
import { useState } from "react";

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

const EquityCurveChart = () => {
  const [tooltipData, setTooltipData] = useState<{
    x: number;
    y: number;
    date: string;
    equity: number;
    chartWidth: number;
    chartHeight: number;
  } | null>(null);

  const handleMouseMove = (state: any) => {
    if (state.isTooltipActive && state.activePayload && state.activePayload.length > 0) {
      const data = state.activePayload[0].payload;
      const xCoord = state.activeCoordinate?.x || 0;
      const chartWidth = state.chartWidth || 1000;
      const chartHeight = state.chartHeight || 380;
      
      setTooltipData({
        x: xCoord,
        y: state.activeCoordinate?.y || 0,
        date: data.date,
        equity: data.equity,
        chartWidth,
        chartHeight,
      });
    } else {
      setTooltipData(null);
    }
  };

  return (
    <div className="w-full h-[380px] relative">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={equityCurveData}
          margin={{ top: 10, right: 30, left: 10, bottom: 10 }}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setTooltipData(null)}
        >
          <defs>
            <linearGradient id="equityAreaGradient" x1="0" y1="0" x2="0" y2="1">
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
            stroke="transparent"
            fontSize={11}
            tickLine={false}
            axisLine={false}
            interval={14}
            tick={{ fill: '#4a5568' }}
          />
          <YAxis 
            tickFormatter={(value) => `€${value.toLocaleString()}`}
            stroke="transparent"
            fontSize={11}
            tickLine={false}
            axisLine={false}
            tick={{ fill: '#4a5568' }}
            width={40}
          />
          <Tooltip content={() => null} cursor={false} />
          <Area
            type="monotone"
            dataKey="equity"
            stroke="none"
            fill="url(#equityAreaGradient)"
          />
          <Line
            type="monotone"
            dataKey="equity"
            stroke="#4fd1c5"
            strokeWidth={2.4}
            dot={false}
            activeDot={{
              r: 5,
              fill: "transparent",
              stroke: "#4fd1c5",
              strokeWidth: 1.5,
              className: "animate-scale-in"
            }}
          />
        </LineChart>
      </ResponsiveContainer>
      
      {tooltipData && (() => {
        const TOOLTIP_W = 220;
        const TOOLTIP_H = 64;
        const PADDING = 8;
        const OFFSET_X = 14;
        const OFFSET_Y = 12;

        let sideRight = tooltipData.x < tooltipData.chartWidth / 2;
        if (sideRight && tooltipData.x + OFFSET_X + TOOLTIP_W > tooltipData.chartWidth - PADDING) {
          sideRight = false;
        }
        if (!sideRight && tooltipData.x - OFFSET_X - TOOLTIP_W < PADDING) {
          sideRight = true;
        }

        let top = tooltipData.y + OFFSET_Y;
        if (top + TOOLTIP_H > tooltipData.chartHeight - PADDING) {
          top = tooltipData.y - OFFSET_Y - TOOLTIP_H;
        }

        const left = sideRight ? tooltipData.x + OFFSET_X : tooltipData.x - OFFSET_X;
        const transform = sideRight ? 'translateY(0)' : 'translateX(-100%) translateY(0)';

        return (
        <div 
          className="absolute pointer-events-none bg-[#0f1a24]/95 border border-[#1e2d3d] rounded px-3 py-2 shadow-lg backdrop-blur-sm z-10"
          style={{
            left,
            top,
            transform,
            width: TOOLTIP_W,
             // Move immediately with the cursor (no smoothing/lag)
             willChange: 'left, top, transform',
          }}
        >
          <p className="text-xs text-foreground font-medium mb-1.5">{tooltipData.date}</p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-sm bg-[#4fd1c5]" />
            <span className="text-xs text-muted-foreground">DFcovenant:</span>
            <span className="text-xs font-mono text-foreground">{formatCurrency(tooltipData.equity)}</span>
          </div>
        </div>
        );
      })()}
    </div>
  );
};

export default EquityCurveChart;
