import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { equityCurveData } from "@/data/backtestData";

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
    const data = payload[0].payload;
    const prevIndex = equityCurveData.findIndex(d => d.date === data.date) - 1;
    const prevEquity = prevIndex >= 0 ? equityCurveData[prevIndex].equity : 10000;
    const change = data.equity - prevEquity;
    const changePercent = ((data.equity - 10000) / 10000 * 100).toFixed(1);

    return (
      <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
        <p className="text-sm text-muted-foreground mb-1">{formatDate(data.date)}</p>
        <p className="text-lg font-semibold text-foreground">{formatCurrency(data.equity)}</p>
        <p className={`text-sm ${change >= 0 ? 'text-success' : 'text-destructive'}`}>
          {change >= 0 ? '+' : ''}{formatCurrency(change)} this month
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          +{changePercent}% total return
        </p>
      </div>
    );
  }
  return null;
};

const EquityCurveChart = () => {
  return (
    <div className="w-full h-[380px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={equityCurveData}
          margin={{ top: 10, right: 30, left: 10, bottom: 0 }}
        >
          <defs>
            <linearGradient id="equityGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(142 70% 45%)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(142 70% 45%)" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
          <XAxis 
            dataKey="date" 
            tickFormatter={(value) => value.split('-')[0]}
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            interval={11}
          />
          <YAxis 
            tickFormatter={(value) => `€${(value / 1000).toFixed(0)}K`}
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="equity"
            stroke="hsl(142 70% 45%)"
            strokeWidth={2}
            fill="url(#equityGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EquityCurveChart;
