import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { combinedEquityData } from "@/data/correlationData";

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

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
              <span className="text-sm font-mono font-medium text-foreground">
                {formatCurrency(entry.value)}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

interface CorrelationEquityChartProps {
  showCombined?: boolean;
}

const CorrelationEquityChart = ({ showCombined = false }: CorrelationEquityChartProps) => {
  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={combinedEquityData}
          margin={{ top: 10, right: 30, left: 10, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
          <XAxis 
            dataKey="date" 
            tickFormatter={formatDate}
            stroke="hsl(var(--muted-foreground))"
            fontSize={11}
            tickLine={false}
            interval={2}
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
          {showCombined ? (
            <Line
              type="monotone"
              dataKey="combined"
              stroke="hsl(170 60% 50%)"
              strokeWidth={2.5}
              dot={{ r: 3, fill: "hsl(170 60% 50%)" }}
              activeDot={{ r: 5, stroke: "hsl(170 60% 50%)", strokeWidth: 2, fill: "#fff" }}
              name="Combined Portfolio"
            />
          ) : (
            <>
              <Line
                type="monotone"
                dataKey="dfcovenant"
                stroke="hsl(170 60% 50%)"
                strokeWidth={2}
                dot={{ r: 2, fill: "hsl(170 60% 50%)" }}
                activeDot={{ r: 4, stroke: "hsl(170 60% 50%)", strokeWidth: 2, fill: "#fff" }}
                name="DFcovenant"
              />
              <Line
                type="monotone"
                dataKey="madTurtle"
                stroke="hsl(45 93% 47%)"
                strokeWidth={2}
                dot={{ r: 2, fill: "hsl(45 93% 47%)" }}
                activeDot={{ r: 4, stroke: "hsl(45 93% 47%)", strokeWidth: 2, fill: "#fff" }}
                name="Mad Turtle"
              />
              <Line
                type="monotone"
                dataKey="goldPhantom"
                stroke="hsl(142 70% 45%)"
                strokeWidth={2}
                dot={{ r: 2, fill: "hsl(142 70% 45%)" }}
                activeDot={{ r: 4, stroke: "hsl(142 70% 45%)", strokeWidth: 2, fill: "#fff" }}
                name="Gold Phantom"
              />
            </>
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CorrelationEquityChart;
