import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useState, useRef } from "react";
import { EquityDataPoint } from "@/hooks/useBacktestData";

interface Props {
  data: EquityDataPoint[];
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

const formatAxisValue = (value: number) => {
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(0)}M`;
  }
  if (value >= 1000) {
    return `$${(value / 1000).toFixed(0)}k`;
  }
  return `$${value}`;
};

const BacktestEquityCurveChart = ({ data }: Props) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const [tooltipData, setTooltipData] = useState<{
    x: number;
    y: number;
    dataPoint: EquityDataPoint;
    chartWidth: number;
    chartHeight: number;
  } | null>(null);

  const handleMouseMove = (state: any) => {
    if (state.isTooltipActive && state.activePayload && state.activePayload.length > 0) {
      const dataPoint = state.activePayload[0].payload;
      const xCoord = state.activeCoordinate?.x || 0;
      const chartWidth = state.chartWidth || 1000;
      const chartHeight = state.chartHeight || 380;
      
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

  // Downsample for performance if needed
  const chartData = data.length > 500 
    ? data.filter((_, i) => i % Math.ceil(data.length / 500) === 0 || i === data.length - 1)
    : data;

  return (
    <div ref={chartRef} className="w-full h-[380px] relative">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={chartData}
          margin={{ top: 10, right: 30, left: 10, bottom: 10 }}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setTooltipData(null)}
        >
          <defs>
            <linearGradient id="btEquityAreaGradient" x1="0" y1="0" x2="0" y2="1">
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
            interval={Math.floor(chartData.length / 8)}
            tick={{ fill: '#4a5568' }}
          />
          <YAxis 
            tickFormatter={formatAxisValue}
            stroke="transparent"
            fontSize={11}
            tickLine={false}
            axisLine={false}
            tick={{ fill: '#4a5568' }}
            width={60}
            domain={['auto', 'auto']}
            tickCount={8}
          />
          <Tooltip content={() => null} cursor={false} />
          <Area
            type="monotone"
            dataKey="equity"
            stroke="#4fd1c5"
            strokeWidth={2.4}
            fill="url(#btEquityAreaGradient)"
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
      
      {tooltipData && (() => {
        const TOOLTIP_W = 200;
        const TOOLTIP_H = 100;
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
        const isPositivePnL = dataPoint.pnl >= 0;
        const isPositiveChange = dataPoint.change >= 0;

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
            <p className="text-sm text-foreground font-bold mb-2">{dataPoint.date}</p>
            <div className="space-y-1 font-mono text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Balance:</span>
                <span className="text-foreground">{formatCurrency(dataPoint.equity)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">P&L:</span>
                <span className={isPositivePnL ? 'text-success' : 'text-destructive'}>
                  {isPositivePnL ? '+' : ''}{formatCurrency(dataPoint.pnl)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Change:</span>
                <span className={isPositiveChange ? 'text-success' : 'text-destructive'}>
                  {isPositiveChange ? '+' : ''}{dataPoint.change.toFixed(2)}%
                </span>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
};

export default BacktestEquityCurveChart;
