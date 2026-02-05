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
  return dateStr; // Show as YYYY-MM format
};

const formatTooltipDate = (dateStr: string) => {
  const [year, month] = dateStr.split('-');
  return `${year}-${month}-01`; // Show as YYYY-MM-DD format
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card/95 backdrop-blur border border-border rounded-lg p-3 shadow-lg">
        <p className="text-sm text-foreground mb-2 font-bold">{formatTooltipDate(label)}</p>
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
              strokeWidth={2}
              dot={false}
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
                dot={false}
                activeDot={{ r: 4, stroke: "hsl(170 60% 50%)", strokeWidth: 2, fill: "#fff" }}
                name="DFcovenant"
              />
              <Line
                type="monotone"
               dataKey="dftrust"
                stroke="hsl(45 93% 47%)"
                strokeWidth={2}
                dot={false}
               activeDot={{ r: 4, stroke: "hsl(45 93% 47%)", strokeWidth: 2, fill: "#fff" }}
                 name="DFtrust"
              />
              <Line
                type="monotone"
               dataKey="dfpath"
                stroke="hsl(142 70% 45%)"
                strokeWidth={2}
                dot={false}
               activeDot={{ r: 4, stroke: "hsl(142 70% 45%)", strokeWidth: 2, fill: "#fff" }}
                 name="DFpath"
              />
            </>
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CorrelationEquityChart;
