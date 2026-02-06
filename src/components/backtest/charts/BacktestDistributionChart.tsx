import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { useState } from "react";
import { DistributionDataPoint } from "@/hooks/useBacktestData";

interface Props {
  data: DistributionDataPoint[];
}

const BacktestDistributionChart = ({ data }: Props) => {
  const [tooltipData, setTooltipData] = useState<{
    x: number;
    y: number;
    dataPoint: DistributionDataPoint;
    chartWidth: number;
    chartHeight: number;
  } | null>(null);

  const handleMouseMove = (state: any) => {
    if (state.isTooltipActive && state.activePayload && state.activePayload.length > 0) {
      const dataPoint = state.activePayload[0].payload;
      const xCoord = state.activeCoordinate?.x || 0;
      const chartWidth = state.chartWidth || 1000;
      const chartHeight = state.chartHeight || 274;
      
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

  // Calculate total for percentage
  const totalTrades = data.reduce((sum, d) => sum + d.count, 0);

  // Helper to determine if range is negative
  const isNegativeRange = (range: string) => {
    return range.startsWith('-') || range.includes('to -') || range.includes('< -');
  };

  return (
    <div className="w-full h-[274px] relative">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 10, right: 20, left: 10, bottom: 40 }}
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
            dataKey="range" 
            stroke="transparent"
            fontSize={10}
            tickLine={false}
            axisLine={false}
            angle={-45}
            textAnchor="end"
            height={60}
            tick={{ fill: '#4a5568' }}
          />
          <YAxis 
            stroke="transparent"
            fontSize={11}
            tickLine={false}
            axisLine={false}
            tick={{ fill: '#4a5568' }}
            width={40}
            domain={[0, 700]}
            ticks={[0, 100, 200, 300, 400, 500, 600, 700]}
          />
          <Tooltip content={() => null} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
          <Bar dataKey="count" radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={isNegativeRange(entry.range) ? 'hsl(0 84% 60%)' : 'hsl(172 66% 50%)'}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      
      {tooltipData && (() => {
        const TOOLTIP_W = 140;
        const TOOLTIP_H = 50;
        const PADDING = 8;
        const OFFSET_X = 14;
        const OFFSET_Y = -50;

        let sideRight = tooltipData.x < tooltipData.chartWidth / 2;
        if (sideRight && tooltipData.x + OFFSET_X + TOOLTIP_W > tooltipData.chartWidth - PADDING) {
          sideRight = false;
        }
        if (!sideRight && tooltipData.x - OFFSET_X - TOOLTIP_W < PADDING) {
          sideRight = true;
        }

        const left = sideRight ? tooltipData.x + OFFSET_X : tooltipData.x - OFFSET_X;
        const transform = sideRight ? 'translateY(0)' : 'translateX(-100%) translateY(0)';
        const { dataPoint } = tooltipData;

        return (
          <div 
            className="absolute pointer-events-none bg-[#0f1a24]/95 border border-[#1e2d3d] rounded px-3 py-2 shadow-lg backdrop-blur-sm z-10"
            style={{
              left,
              top: tooltipData.y + OFFSET_Y,
              transform,
              width: TOOLTIP_W,
              willChange: 'left, top, transform',
            }}
          >
            <p className="text-sm text-foreground font-bold mb-1">{dataPoint.range}</p>
            <p className="font-mono text-xs text-muted-foreground">
              {dataPoint.count} trades
            </p>
          </div>
        );
      })()}
    </div>
  );
};

export default BacktestDistributionChart;
