import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { useState } from "react";

export interface DurationVsProfitPoint {
  durationHours: number;
  profit: number;
}

interface Props {
  data: DurationVsProfitPoint[];
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

const DurationVsProfitScatter = ({ data }: Props) => {
  const [tooltipData, setTooltipData] = useState<{
    x: number;
    y: number;
    dataPoint: DurationVsProfitPoint;
    chartWidth: number;
  } | null>(null);

  const handleMouseMove = (state: any) => {
    if (state.isTooltipActive && state.activePayload && state.activePayload.length > 0) {
      const dataPoint = state.activePayload[0].payload;
      const xCoord = state.activeCoordinate?.x || 0;
      const chartWidth = state.chartWidth || 1000;
      
      setTooltipData({
        x: xCoord,
        y: state.activeCoordinate?.y || 0,
        dataPoint,
        chartWidth,
      });
    } else {
      setTooltipData(null);
    }
  };

  // Calculate axis bounds
  const maxDuration = Math.max(...data.map(d => d.durationHours), 90);
  const maxProfit = Math.max(...data.map(d => d.profit), 40000);
  const minProfit = Math.min(...data.map(d => d.profit), -20000);

  return (
    <div className="w-full h-[320px] relative">
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart
          margin={{ top: 20, right: 30, left: 10, bottom: 40 }}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setTooltipData(null)}
        >
          <CartesianGrid 
            strokeDasharray="0"
            stroke="#1a2535"
            strokeOpacity={0.4}
          />
          <XAxis 
            type="number"
            dataKey="durationHours" 
            name="Duration"
            domain={[0, maxDuration]}
            stroke="transparent"
            fontSize={11}
            tickLine={false}
            axisLine={false}
            tick={{ fill: '#4a5568' }}
            label={{ value: 'Duration (hours)', position: 'bottom', offset: 20, fill: '#4a5568', fontSize: 12 }}
          />
          <YAxis 
            type="number"
            dataKey="profit" 
            name="Profit"
            domain={[minProfit, maxProfit]}
            tickFormatter={(value) => {
              if (value === 0) return '0';
              return `${(value / 1000).toFixed(0)},000`;
            }}
            stroke="transparent"
            fontSize={11}
            tickLine={false}
            axisLine={false}
            tick={{ fill: '#4a5568' }}
            width={60}
            label={{ value: 'Profit', angle: -90, position: 'insideLeft', offset: 10, fill: '#4a5568', fontSize: 12 }}
          />
          <Tooltip content={() => null} cursor={{ strokeDasharray: '3 3' }} />
          <Scatter data={data} fillOpacity={0.8}>
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.profit >= 0 ? 'hsl(142 70% 45%)' : 'hsl(0 70% 55%)'}
                r={4}
              />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
      
      {tooltipData && (() => {
        const TOOLTIP_W = 160;
        const TOOLTIP_H = 60;
        const PADDING = 8;
        const OFFSET_X = 14;

        let sideRight = tooltipData.x < tooltipData.chartWidth / 2;
        const left = sideRight ? tooltipData.x + OFFSET_X : tooltipData.x - OFFSET_X;
        const transform = sideRight ? 'translateY(0)' : 'translateX(-100%) translateY(0)';
        const { dataPoint } = tooltipData;
        const isPositive = dataPoint.profit >= 0;

        return (
          <div 
            className="absolute pointer-events-none bg-[#0f1a24]/95 border border-[#1e2d3d] rounded px-3 py-2 shadow-lg backdrop-blur-sm z-10"
            style={{
              left,
              top: Math.max(PADDING, tooltipData.y - TOOLTIP_H / 2),
              transform,
              width: TOOLTIP_W,
              willChange: 'left, top, transform',
            }}
          >
            <p className="text-sm text-foreground font-bold mb-1">
              {dataPoint.durationHours.toFixed(1)} hours
            </p>
            <p className={`font-mono text-xs ${isPositive ? 'text-success' : 'text-destructive'}`}>
              Profit: {isPositive ? '+' : ''}{formatCurrency(dataPoint.profit)}
            </p>
          </div>
        );
      })()}
    </div>
  );
};

export default DurationVsProfitScatter;
