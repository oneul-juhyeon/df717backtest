import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { monthlyReturnsData } from "@/data/backtestData";

// Aggregate by year
const yearlyData = monthlyReturnsData.reduce((acc, item) => {
  const existing = acc.find(d => d.year === item.year);
  if (existing) {
    existing.return += item.return;
  } else {
    acc.push({ year: item.year, return: item.return });
  }
  return acc;
}, [] as { year: number; return: number }[]);

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const isPositive = data.return >= 0;

    return (
      <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
        <p className="text-sm text-muted-foreground mb-1">{data.year}</p>
        <p className={`text-lg font-semibold ${isPositive ? 'text-success' : 'text-destructive'}`}>
          {isPositive ? '+' : ''}{formatCurrency(data.return)}
        </p>
        <p className="text-xs text-muted-foreground mt-1">Yearly Return</p>
      </div>
    );
  }
  return null;
};

const MonthlyReturnsChart = () => {
  return (
    <div className="w-full h-[274px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={yearlyData}
          margin={{ top: 10, right: 20, left: 10, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
          <XAxis 
            dataKey="year" 
            stroke="hsl(var(--muted-foreground))"
            fontSize={11}
            tickLine={false}
          />
          <YAxis 
            tickFormatter={(value) => `€${(value / 1000).toFixed(0)}K`}
            stroke="hsl(var(--muted-foreground))"
            fontSize={11}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="return" radius={[4, 4, 0, 0]}>
            {yearlyData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.return >= 0 ? 'hsl(142 70% 45%)' : 'hsl(0 84% 60%)'} 
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyReturnsChart;
