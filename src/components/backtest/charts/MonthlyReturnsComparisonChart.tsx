import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { monthlyReturnsComparison } from "@/data/correlationData";

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
    return (
      <div className="bg-card border border-border rounded-lg p-4 shadow-lg">
        <p className="text-sm text-muted-foreground mb-3 font-medium">{label}</p>
        <div className="space-y-2">
          {payload.map((entry: any, index: number) => {
            const isPositive = entry.value >= 0;
            return (
              <div key={index} className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: entry.color }}
                  />
                  <span className="text-sm text-muted-foreground">{entry.name}</span>
                </div>
                <span className={`text-sm font-mono font-medium ${isPositive ? 'text-success' : 'text-destructive'}`}>
                  {isPositive ? '+' : ''}{formatCurrency(entry.value)}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
  return null;
};

const MonthlyReturnsComparisonChart = () => {
  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={monthlyReturnsComparison}
          margin={{ top: 10, right: 30, left: 10, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
          <XAxis 
            dataKey="month" 
            stroke="hsl(var(--muted-foreground))"
            fontSize={10}
            tickLine={false}
            angle={-45}
            textAnchor="end"
            height={60}
          />
          <YAxis 
            tickFormatter={(value) => `€${(value / 1000).toFixed(0)}K`}
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            wrapperStyle={{ paddingTop: '20px' }}
            formatter={(value) => <span className="text-muted-foreground text-sm">{value}</span>}
          />
          <Bar
            dataKey="dfcovenant"
            fill="hsl(170 60% 50%)"
            radius={[2, 2, 0, 0]}
            name="DFcovenant"
          />
          <Bar
            dataKey="madTurtle"
            fill="hsl(45 93% 47%)"
            radius={[2, 2, 0, 0]}
            name="Mad Turtle"
          />
          <Bar
            dataKey="goldPhantom"
            fill="hsl(142 70% 45%)"
            radius={[2, 2, 0, 0]}
            name="Gold Phantom"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyReturnsComparisonChart;
