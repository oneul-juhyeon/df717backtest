 import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Area } from "recharts";
 import { useCorrelationData, DailyEquityPoint } from "@/hooks/useCorrelationData";
 import { combinedEquityData } from "@/data/correlationData";
 import { useState, useMemo } from "react";

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

const formatDate = (dateStr: string) => {
  return dateStr; // Show as YYYY-MM format
};

 const formatTooltipDate = (dateStr: string) => {
   return dateStr; // Show full date as-is
};

 // Custom tooltip is now handled inline for better positioning

interface CorrelationEquityChartProps {
  showCombined?: boolean;
}

const CorrelationEquityChart = ({ showCombined = false }: CorrelationEquityChartProps) => {
   const { loading, error, dailyEquityData } = useCorrelationData();
   const [tooltipData, setTooltipData] = useState<{
     x: number;
     y: number;
     date: string;
     values: { name: string; value: number; color: string }[];
     chartWidth: number;
     chartHeight: number;
   } | null>(null);
 
   // Use daily data if available, fall back to static data
   const chartData = useMemo(() => {
     if (dailyEquityData.length > 0) {
       return dailyEquityData;
     }
     return combinedEquityData;
   }, [dailyEquityData]);
 
   // Calculate tick interval based on data length (~10 ticks for readability)
   const tickInterval = useMemo(() => {
     return Math.max(1, Math.floor(chartData.length / 10));
   }, [chartData.length]);
 
   const handleMouseMove = (state: any) => {
     if (state.isTooltipActive && state.activePayload && state.activePayload.length > 0) {
       const data = state.activePayload[0].payload;
       const xCoord = state.activeCoordinate?.x || 0;
       const chartWidth = state.chartWidth || 1000;
       const chartHeight = state.chartHeight || 300;
       
       const values = state.activePayload.map((entry: any) => ({
         name: entry.name,
         value: entry.value,
         color: entry.stroke,
       }));
       
       setTooltipData({
         x: xCoord,
         y: state.activeCoordinate?.y || 0,
         date: data.date,
         values,
         chartWidth,
         chartHeight,
       });
     } else {
       setTooltipData(null);
     }
   };
 
   if (loading) {
     return (
       <div className="w-full h-[380px] flex items-center justify-center">
         <div className="text-muted-foreground">Loading daily data...</div>
       </div>
     );
   }
 
   if (error) {
     return (
       <div className="w-full h-[380px] flex items-center justify-center">
         <div className="text-destructive text-sm">Error: {error}</div>
       </div>
     );
   }
 
  return (
     <div className="w-full h-[380px] relative">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
           data={chartData}
           margin={{ top: 10, right: 30, left: 10, bottom: 10 }}
           onMouseMove={handleMouseMove}
           onMouseLeave={() => setTooltipData(null)}
        >
           <defs>
             {showCombined ? (
               <linearGradient id="combinedAreaGradient" x1="0" y1="0" x2="0" y2="1">
                 <stop offset="0%" stopColor="#4fd1c5" stopOpacity={0.35} />
                 <stop offset="100%" stopColor="#4fd1c5" stopOpacity={0.02} />
               </linearGradient>
             ) : (
               <>
                 <linearGradient id="dfcovenantGradient" x1="0" y1="0" x2="0" y2="1">
                   <stop offset="0%" stopColor="#4fd1c5" stopOpacity={0.25} />
                   <stop offset="100%" stopColor="#4fd1c5" stopOpacity={0.02} />
                 </linearGradient>
                 <linearGradient id="dftrustGradient" x1="0" y1="0" x2="0" y2="1">
                   <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.2} />
                   <stop offset="100%" stopColor="#f59e0b" stopOpacity={0.02} />
                 </linearGradient>
                 <linearGradient id="dfpathGradient" x1="0" y1="0" x2="0" y2="1">
                   <stop offset="0%" stopColor="#22c55e" stopOpacity={0.2} />
                   <stop offset="100%" stopColor="#22c55e" stopOpacity={0.02} />
                 </linearGradient>
               </>
             )}
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
            tickFormatter={formatDate}
             stroke="transparent"
            fontSize={11}
            tickLine={false}
             axisLine={false}
             interval={tickInterval}
             tick={{ fill: '#4a5568' }}
          />
          <YAxis 
            tickFormatter={(value) => `€${(value / 1000).toFixed(0)}K`}
             stroke="transparent"
             fontSize={11}
            tickLine={false}
            axisLine={false}
             tick={{ fill: '#4a5568' }}
             width={50}
          />
           <Tooltip content={() => null} cursor={false} />
          <Legend 
            wrapperStyle={{ paddingTop: '20px' }}
            formatter={(value) => <span className="text-muted-foreground text-sm">{value}</span>}
          />
          {showCombined ? (
             <>
               <Area
                 type="monotone"
                 dataKey="combined"
                 stroke="none"
                 fill="url(#combinedAreaGradient)"
               />
               <Line
                 type="monotone"
                 dataKey="combined"
                 stroke="#4fd1c5"
                 strokeWidth={2.4}
                 dot={false}
                 activeDot={{
                   r: 5,
                   fill: "transparent",
                   stroke: "#4fd1c5",
                   strokeWidth: 1.5,
                 }}
                 name="Combined Portfolio"
               />
             </>
          ) : (
            <>
               <Area
                 type="monotone"
                 dataKey="dfcovenant"
                 stroke="none"
                 fill="url(#dfcovenantGradient)"
               />
               <Area
                 type="monotone"
                 dataKey="dftrust"
                 stroke="none"
                 fill="url(#dftrustGradient)"
               />
               <Area
                 type="monotone"
                 dataKey="dfpath"
                 stroke="none"
                 fill="url(#dfpathGradient)"
               />
              <Line
                type="monotone"
                dataKey="dfcovenant"
                 stroke="#4fd1c5"
                 strokeWidth={2.4}
                dot={false}
                 activeDot={{
                   r: 5,
                   fill: "transparent",
                   stroke: "#4fd1c5",
                   strokeWidth: 1.5,
                 }}
                name="DFcovenant"
              />
              <Line
                type="monotone"
               dataKey="dftrust"
                 stroke="#f59e0b"
                 strokeWidth={2.4}
                dot={false}
                 activeDot={{
                   r: 5,
                   fill: "transparent",
                   stroke: "#f59e0b",
                   strokeWidth: 1.5,
                 }}
                 name="DFtrust"
              />
              <Line
                type="monotone"
               dataKey="dfpath"
                 stroke="#22c55e"
                 strokeWidth={2.4}
                dot={false}
                 activeDot={{
                   r: 5,
                   fill: "transparent",
                   stroke: "#22c55e",
                   strokeWidth: 1.5,
                 }}
                 name="DFpath"
              />
            </>
          )}
        </LineChart>
      </ResponsiveContainer>
       
       {tooltipData && (() => {
         const TOOLTIP_W = 240;
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
             <p className="text-xs text-foreground font-medium mb-1.5">{tooltipData.date}</p>
             <div className="space-y-1">
               {tooltipData.values.map((entry, index) => (
                 <div key={index} className="flex items-center gap-2">
                   <span 
                     className="w-2 h-2 rounded-sm" 
                     style={{ backgroundColor: entry.color }}
                   />
                   <span className="text-xs text-muted-foreground">{entry.name}:</span>
                   <span className="text-xs font-mono text-foreground">{formatCurrency(entry.value)}</span>
                 </div>
               ))}
             </div>
           </div>
         );
       })()}
    </div>
  );
};

export default CorrelationEquityChart;
