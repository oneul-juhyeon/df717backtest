import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { equityCurveData } from "@/data/backtestData";

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-[#1a2332] border border-[#2a3a4a] rounded-lg px-4 py-3 shadow-xl">
        <p className="text-sm text-foreground font-medium mb-1">{data.date}</p>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-sm bg-[#4fd1c5]" />
          <span className="text-sm text-muted-foreground">DFcovenant:</span>
          <span className="text-sm font-mono text-foreground">{formatCurrency(data.equity)}</span>
        </div>
      </div>
    );
  }
  return null;
};

const EquityCurveChart = () => {
  const startEquity = equityCurveData[0]?.equity || 10000;
  const endEquity = equityCurveData[equityCurveData.length - 1]?.equity || 10000;
  
  return (
    <div className="w-full h-[400px] bg-[#0d1421] rounded-xl p-6">
      <h3 className="text-foreground text-sm font-medium mb-4">
        Equity Curve in EUR (2016-2026) — {formatCurrency(startEquity)} → {formatCurrency(endEquity)}
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={equityCurveData}
          margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
        >
          <CartesianGrid 
            strokeDasharray="0" 
            stroke="#1e2d3d" 
            vertical={true}
            horizontal={true}
          />
          <XAxis 
            dataKey="date" 
            stroke="#4a5568"
            fontSize={11}
            tickLine={false}
            axisLine={false}
            interval={11}
            tick={{ fill: '#718096' }}
          />
          <YAxis 
            tickFormatter={(value) => `€${value.toLocaleString()}`}
            stroke="#4a5568"
            fontSize={11}
            tickLine={false}
            axisLine={false}
            tick={{ fill: '#718096' }}
            width={80}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="equity"
            stroke="#4fd1c5"
            strokeWidth={1.5}
            dot={false}
            activeDot={{ 
              r: 4, 
              stroke: "#4fd1c5", 
              strokeWidth: 2, 
              fill: "#0d1421" 
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EquityCurveChart;
