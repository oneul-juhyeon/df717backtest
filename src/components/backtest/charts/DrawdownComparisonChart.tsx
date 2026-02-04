import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { drawdownComparisonData } from "@/data/correlationData";

const formatDate = (dateStr: string) => {
  const [year, month] = dateStr.split('-');
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${monthNames[parseInt(month) - 1]} ${year}`;
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-lg p-4 shadow-lg">
        <p className="text-sm text-muted-foreground mb-3 font-medium">{formatDate(label)}</p>
        <div className="space-y-2">
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-sm text-muted-foreground">{entry.name}</span>
              </div>
              <span className="text-sm font-mono font-medium text-destructive">
                {entry.value.toFixed(1)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

const DrawdownComparisonChart = () => {
  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={drawdownComparisonData}
          margin={{ top: 10, right: 30, left: 10, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
          <XAxis 
            dataKey="date" 
            tickFormatter={(value) => value.split('-')[0]}
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            interval={3}
          />
          <YAxis 
            tickFormatter={(value) => `${value}%`}
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            domain={[-25, 0]}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            wrapperStyle={{ paddingTop: '20px' }}
            formatter={(value) => <span className="text-muted-foreground text-sm">{value}</span>}
          />
          <Area
            type="monotone"
            dataKey="dfcovenant"
            stroke="hsl(170 60% 50%)"
            fill="hsl(170 60% 50% / 0.2)"
            strokeWidth={2}
            name="DFcovenant"
          />
          <Area
            type="monotone"
            dataKey="madTurtle"
            stroke="hsl(45 93% 47%)"
            fill="hsl(45 93% 47% / 0.2)"
            strokeWidth={2}
            name="Mad Turtle"
          />
          <Area
            type="monotone"
            dataKey="goldPhantom"
            stroke="hsl(142 70% 45%)"
            fill="hsl(142 70% 45% / 0.2)"
            strokeWidth={2}
            name="Gold Phantom"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DrawdownComparisonChart;
