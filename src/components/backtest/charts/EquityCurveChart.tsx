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
      <div className="bg-[#0f1a24]/95 border border-[#1e2d3d] rounded px-3 py-2 shadow-lg backdrop-blur-sm">
        <p className="text-xs text-foreground font-medium mb-1.5">{data.date}</p>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-sm bg-[#4fd1c5]" />
          <span className="text-xs text-muted-foreground">DFcovenant:</span>
          <span className="text-xs font-mono text-foreground">{formatCurrency(data.equity)}</span>
        </div>
      </div>
    );
  }
  return null;
};

const EquityCurveChart = () => {
  return (
    <div className="w-full h-[380px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={equityCurveData}
          margin={{ top: 10, right: 30, left: 10, bottom: 10 }}
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
          <Tooltip 
            content={<CustomTooltip />}
            cursor={false}
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
    </div>
  );
};

export default EquityCurveChart;
