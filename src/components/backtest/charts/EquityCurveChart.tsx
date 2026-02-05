import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
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
  const [tooltipData, setTooltipData] = useState<{ x: number; y: number; date: string; equity: number; isLeftHalf: boolean; chartWidth: number } | null>(null);

  const handleMouseMove = (state: any) => {
    if (state.isTooltipActive && state.activePayload && state.activePayload.length > 0) {
      const data = state.activePayload[0].payload;
      const xCoord = state.activeCoordinate?.x || 0;
      const chartWidth = state.chartWidth || 1000;
      const isLeftHalf = xCoord < chartWidth / 2;
      
      setTooltipData({
        x: xCoord,
        y: state.activeCoordinate?.y || 0,
        date: data.date,
        equity: data.equity,
        isLeftHalf,
        chartWidth
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
      
      {tooltipData && (
        <div 
          className="absolute pointer-events-none bg-[#0f1a24]/95 border border-[#1e2d3d] rounded px-3 py-2 shadow-lg backdrop-blur-sm z-10"
          style={{
            left: tooltipData.isLeftHalf 
              ? tooltipData.x + 60 
              : tooltipData.x + 30,
            top: tooltipData.y + 20,
            transform: tooltipData.isLeftHalf 
              ? 'translateY(-50%)' 
              : 'translateX(-100%) translateY(-50%)',
          }}
        >
          <p className="text-xs text-foreground font-medium mb-1.5">{tooltipData.date}</p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-sm bg-[#4fd1c5]" />
            <span className="text-xs text-muted-foreground">DFcovenant:</span>
            <span className="text-xs font-mono text-foreground">{formatCurrency(tooltipData.equity)}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EquityCurveChart;
