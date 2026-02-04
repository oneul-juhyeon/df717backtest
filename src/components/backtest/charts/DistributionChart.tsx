import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { distributionData } from "@/data/backtestData";

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;

    return (
      <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
        <p className="text-sm text-muted-foreground mb-1">{data.range}</p>
        <p className="text-lg font-semibold text-foreground">{data.count} trades</p>
        <p className="text-xs text-muted-foreground mt-1">
          {((data.count / 988) * 100).toFixed(1)}% of total
        </p>
      </div>
    );
  }
  return null;
};

const DistributionChart = () => {
  return (
    <div className="w-full h-[274px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={distributionData}
          margin={{ top: 10, right: 20, left: 10, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
          <XAxis 
            dataKey="range" 
            stroke="hsl(var(--muted-foreground))"
            fontSize={10}
            tickLine={false}
            angle={-45}
            textAnchor="end"
            height={60}
          />
          <YAxis 
            stroke="hsl(var(--muted-foreground))"
            fontSize={11}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="count" radius={[4, 4, 0, 0]}>
            {distributionData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={
                  entry.range.includes('<') || entry.range.includes('to 0') 
                    ? 'hsl(0 84% 60%)' 
                    : 'hsl(142 70% 45%)'
                } 
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DistributionChart;
