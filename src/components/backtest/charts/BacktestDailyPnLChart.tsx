import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from "recharts";
import { useState } from "react";
import { DailyPnLDataPoint } from "@/hooks/useBacktestData";

interface Props {
  data: DailyPnLDataPoint[];
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

const BacktestDailyPnLChart = ({ data }: Props) => {
  const [tooltipData, setTooltipData] = useState<{
    x: number;
    y: number;
    dataPoint: DailyPnLDataPoint;
    chartWidth: number;
    chartHeight: number;
  } | null>(null);

  const handleMouseMove = (state: any) => {
    if (state.isTooltipActive && state.activePayload && state.activePayload.length > 0) {
      const dataPoint = state.activePayload[0].payload;
      const xCoord = state.activeCoordinate?.x || 0;
      const chartWidth = state.chartWidth || 1000;
      const chartHeight = state.chartHeight || 300;
      
      setTooltipData({
        x: xCoord,
        y: state.activeCoordinate?.y || 0,
        dataPoint,
        chartWidth,
        chartHeight,
      });
    } else {
      setTooltipData(null);
    }
  };

  // Downsample for performance
  const chartData = data.length > 500 
    ? data.filter((_, i) => i % Math.ceil(data.length / 500) === 0 || i === data.length - 1)
    : data;

  return (
    <div className="w-full h-[300px] relative">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 10, right: 30, left: 10, bottom: 0 }}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setTooltipData(null)}
          barCategoryGap={0}
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
            interval={Math.floor(chartData.length / 8)}
            tick={{ fill: '#4a5568' }}
          />
          <YAxis 
            tickFormatter={(value) => {
              if (value >= 1000 || value <= -1000) {
                return `${(value / 1000).toFixed(0)},000`;
              }
              return value.toFixed(0);
            }}
            stroke="transparent"
            fontSize={11}
            tickLine={false}
            axisLine={false}
            tick={{ fill: '#4a5568' }}
            width={60}
          />
          <ReferenceLine y={0} stroke="#1a2535" strokeWidth={1} />
          <Tooltip content={() => null} cursor={{ fill: 'rgba(255,255,255,0.03)', strokeWidth: 1, stroke: 'rgba(255,255,255,0.2)' }} />
          <Bar 
            dataKey="pnl" 
            maxBarSize={2}
          >
            {chartData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.pnl >= 0 ? 'hsl(142 70% 45%)' : 'hsl(0 84% 60%)'} 
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      
      {tooltipData && (() => {
        const TOOLTIP_W = 160;
        const TOOLTIP_H = 60;
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
        const { dataPoint } = tooltipData;
        const isPositive = dataPoint.pnl >= 0;

        return (
          <div 
            className="absolute pointer-events-none bg-[#0f1a24]/95 border border-[#1e2d3d] rounded px-3 py-2 shadow-lg backdrop-blur-sm z-10"
            style={{
              left,
              top,
              transform,
              width: TOOLTIP_W,
              willChange: 'left, top, transform',
            }}
          >
            <p className="text-sm text-foreground font-bold mb-1">{dataPoint.date}</p>
            <div className="font-mono text-xs">
              <span className="text-muted-foreground">P&L: </span>
              <span className={isPositive ? 'text-success' : 'text-destructive'}>
                {isPositive ? '+' : ''}{formatCurrency(dataPoint.pnl)}
              </span>
            </div>
          </div>
        );
      })()}
    </div>
  );
};

export default BacktestDailyPnLChart;
