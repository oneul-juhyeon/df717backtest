import { Info, TrendingDown, TrendingUp } from "lucide-react";

const correlationData = {
  pearson: [
    ["DFcovenant", "1.00", "0.21", "0.26"],
    ["Mad Turtle", "0.21", "1.00", "0.13"],
    ["Gold Phantom", "0.26", "0.13", "1.00"],
  ],
  spearman: [
    ["DFcovenant", "1.00", "0.24", "0.22"],
    ["Mad Turtle", "0.24", "1.00", "0.12"],
    ["Gold Phantom", "0.22", "0.12", "1.00"],
  ],
};

const strategyComparison = [
  { 
    metric: "EA Name", 
    dfcovenant: "DFcovenant", 
    madTurtle: "Mad Turtle", 
    goldPhantom: "The Gold Phantom" 
  },
  { metric: "Symbol", dfcovenant: "XAUUSD", madTurtle: "XAUUSD", goldPhantom: "XAUUSD" },
  { metric: "Period", dfcovenant: "2016-01-01 – 2026-01-28", madTurtle: "2016-01-01 – 2026-02-03", goldPhantom: "2016-01-01 – 2026-02-03" },
  { metric: "Currency", dfcovenant: "EUR", madTurtle: "EUR", goldPhantom: "EUR" },
  { metric: "Initial Deposit", dfcovenant: "€10,000.00", madTurtle: "€10,000.00", goldPhantom: "€10,000.00" },
  { metric: "Total Trades", dfcovenant: "988", madTurtle: "1982", goldPhantom: "8758" },
  { metric: "Net Profit", dfcovenant: "+€722,988.07", madTurtle: "+€365,656.43", goldPhantom: "+€619,719.62" },
  { metric: "Win Rate", dfcovenant: "66.0%", madTurtle: "58.8%", goldPhantom: "63.9%" },
  { metric: "Profit Factor", dfcovenant: "3.31", madTurtle: "1.76", goldPhantom: "2.41" },
  { metric: "Expectancy", dfcovenant: "+€731.77", madTurtle: "+€184.49", goldPhantom: "+€70.76" },
  { metric: "Equity DD %", dfcovenant: "11.2%", madTurtle: "22.6%", goldPhantom: "13.4%" },
  { metric: "Balance DD %", dfcovenant: "8.7%", madTurtle: "20.4%", goldPhantom: "7.8%" },
  { metric: "Max DD Days", dfcovenant: "217d", madTurtle: "953d", goldPhantom: "81d" },
  { metric: "Max Stagnation", dfcovenant: "217d", madTurtle: "953d", goldPhantom: "81d" },
  { metric: "Sharpe Ratio", dfcovenant: "10.00", madTurtle: "2.94", goldPhantom: "4.58" },
  { metric: "Sortino Ratio", dfcovenant: "8.17", madTurtle: "2.88", goldPhantom: "5.09" },
  { metric: "Calmar Ratio", dfcovenant: "9.31", madTurtle: "2.99", goldPhantom: "6.53" },
  { metric: "Recovery Factor", dfcovenant: "22.24", madTurtle: "13.79", goldPhantom: "22.25" },
  { metric: "Risk/Reward", dfcovenant: "1.68", madTurtle: "1.24", goldPhantom: "1.37" },
  { metric: "Max Win Streak", dfcovenant: "18", madTurtle: "14", goldPhantom: "44" },
  { metric: "Max Loss Streak", dfcovenant: "5", madTurtle: "10", goldPhantom: "25" },
  { metric: "Avg Days/Trade", dfcovenant: "4.16", madTurtle: "1.85", goldPhantom: "0.42" },
];

const correlationScale = [
  { label: "Strong Negative (-1 to -0.5)", color: "bg-destructive/80" },
  { label: "Weak Negative (-0.5 to -0.2)", color: "bg-destructive/40" },
  { label: "Neutral (-0.2 to 0.2)", color: "bg-muted" },
  { label: "Weak Positive (0.2 to 0.5)", color: "bg-success/40" },
  { label: "Strong Positive (0.5 to 1)", color: "bg-success/80" },
];

const getCorrelationColor = (value: string) => {
  const num = parseFloat(value);
  if (num >= 0.5) return "bg-success/80 text-success-foreground";
  if (num >= 0.2) return "bg-success/40 text-foreground";
  if (num >= -0.2) return "bg-muted text-foreground";
  if (num >= -0.5) return "bg-destructive/40 text-foreground";
  return "bg-destructive/80 text-destructive-foreground";
};

const PortfolioCorrelation = () => {
  return (
    <div className="space-y-12">
      {/* About This Analysis */}
      <div className="border border-border rounded-xl p-6 bg-card/50">
        <div className="flex items-start gap-3 mb-4">
          <Info className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
          <h4 className="font-semibold text-foreground">About This Analysis</h4>
        </div>
        <p className="text-muted-foreground text-sm mb-4">
          <strong>Why this matters:</strong> Many of our clients already trade with popular XAUUSD Expert 
          Advisors like The Gold Phantom or Mad Turtle. A common concern is whether adding DFcovenant 
          to their setup would create overlapping trades, correlated drawdowns, or redundant exposure 
          to the same market conditions.
        </p>
        <p className="text-muted-foreground text-sm mb-4">
          This correlation analysis is provided <strong>for informational purposes only</strong>. Its sole 
          objective is to demonstrate that <strong>DFcovenant can be deployed alongside two of the most 
          popular XAUUSD Expert Advisors on the MQL5 marketplace</strong> — The Gold Phantom and Mad Turtle — 
          within the same trading account or multi-strategy setup, without significant overlap in trading 
          signals or equity curve behavior.
        </p>
        <p className="text-muted-foreground text-sm">
          The low correlation coefficients (avg. 0.20) indicate that these strategies operate on different 
          market mechanics and timeframes, making them <strong>technically compatible for simultaneous 
          execution</strong>. This analysis does not constitute investment advice, portfolio allocation 
          recommendations, or any guarantee of future diversification benefits.
        </p>
        <p className="text-muted-foreground text-sm mt-4">
          <strong>Data source:</strong> All equity curves were obtained from backtests conducted on 
          <strong> IC Trading</strong> broker data. Each strategy was configured with comparable risk 
          parameters to ensure a fair comparison across similar exposure levels.
        </p>
      </div>

      {/* Portfolio Diversification Analysis */}
      <div>
        <h3 className="text-xl font-semibold mb-6">Portfolio Diversification Analysis</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="metric-card text-center">
            <div className="text-sm text-muted-foreground mb-1">Strategies Compared</div>
            <div className="text-2xl font-bold text-primary">3</div>
            <div className="text-xs text-muted-foreground">Expert Advisors</div>
          </div>
          <div className="metric-card text-center">
            <div className="text-sm text-muted-foreground mb-1">Avg Individual DD</div>
            <div className="text-2xl font-bold text-warning">16.0%</div>
            <div className="text-xs text-muted-foreground">Average of all EAs</div>
          </div>
          <div className="metric-card text-center">
            <div className="text-sm text-muted-foreground mb-1">Combined Max DD</div>
            <div className="text-2xl font-bold text-success">9.4%</div>
            <div className="text-xs text-muted-foreground">Equal-weight portfolio</div>
          </div>
          <div className="metric-card text-center">
            <div className="text-sm text-muted-foreground mb-1">Diversification Benefit</div>
            <div className="text-2xl font-bold text-success">-41%</div>
            <div className="text-xs text-muted-foreground">DD reduction vs avg</div>
          </div>
        </div>
      </div>

      {/* Correlation Matrices */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Pearson Correlation */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold">Pearson Correlation</h4>
            <span className="text-sm text-muted-foreground">Avg: 0.20</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 px-3 text-muted-foreground font-medium text-sm"></th>
                  <th className="text-center py-2 px-3 text-muted-foreground font-medium text-sm">DFcovenant</th>
                  <th className="text-center py-2 px-3 text-muted-foreground font-medium text-sm">Mad Turtle</th>
                  <th className="text-center py-2 px-3 text-muted-foreground font-medium text-sm">Gold Phantom</th>
                </tr>
              </thead>
              <tbody>
                {correlationData.pearson.map((row, i) => (
                  <tr key={i} className="border-b border-border/50">
                    <td className="py-2 px-3 text-foreground font-medium text-sm">{row[0]}</td>
                    {row.slice(1).map((cell, j) => (
                      <td key={j} className="py-2 px-3 text-center">
                        <span className={`inline-block px-3 py-1 rounded text-sm font-mono ${getCorrelationColor(cell)}`}>
                          {cell}
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Spearman Correlation */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold">Spearman Correlation</h4>
            <span className="text-sm text-muted-foreground">Avg: 0.20</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 px-3 text-muted-foreground font-medium text-sm"></th>
                  <th className="text-center py-2 px-3 text-muted-foreground font-medium text-sm">DFcovenant</th>
                  <th className="text-center py-2 px-3 text-muted-foreground font-medium text-sm">Mad Turtle</th>
                  <th className="text-center py-2 px-3 text-muted-foreground font-medium text-sm">Gold Phantom</th>
                </tr>
              </thead>
              <tbody>
                {correlationData.spearman.map((row, i) => (
                  <tr key={i} className="border-b border-border/50">
                    <td className="py-2 px-3 text-foreground font-medium text-sm">{row[0]}</td>
                    {row.slice(1).map((cell, j) => (
                      <td key={j} className="py-2 px-3 text-center">
                        <span className={`inline-block px-3 py-1 rounded text-sm font-mono ${getCorrelationColor(cell)}`}>
                          {cell}
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Correlation Scale Legend */}
      <div className="flex flex-wrap items-center gap-4 justify-center">
        {correlationScale.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <span className={`w-4 h-4 rounded ${item.color}`}></span>
            <span className="text-xs text-muted-foreground">{item.label}</span>
          </div>
        ))}
      </div>

      {/* Equity Curves */}
      <div className="space-y-6">
        <div className="chart-container">
          <h4 className="text-sm text-muted-foreground mb-4">
            Equity Curves in EUR (€10,000 Initial per Strategy)
          </h4>
          <div className="h-48 bg-gradient-to-r from-primary/5 via-warning/5 to-success/5 rounded-lg flex items-center justify-center relative overflow-hidden">
            <svg className="w-full h-full" viewBox="0 0 400 120" preserveAspectRatio="none">
              {/* DFcovenant curve */}
              <path
                d="M0,100 Q50,95 100,80 T150,60 T200,45 T250,30 T300,20 T350,15 L400,10"
                fill="none"
                stroke="hsl(170 60% 50%)"
                strokeWidth="2"
              />
              {/* Mad Turtle curve */}
              <path
                d="M0,100 Q50,98 100,90 T150,75 T200,65 T250,50 T300,40 T350,35 L400,30"
                fill="none"
                stroke="hsl(45 93% 47%)"
                strokeWidth="2"
              />
              {/* Gold Phantom curve */}
              <path
                d="M0,100 Q50,96 100,85 T150,70 T200,55 T250,40 T300,25 T350,20 L400,15"
                fill="none"
                stroke="hsl(142 70% 45%)"
                strokeWidth="2"
              />
            </svg>
            {/* Legend */}
            <div className="absolute bottom-4 right-4 flex gap-4 text-xs">
              <div className="flex items-center gap-1">
                <span className="w-3 h-0.5 bg-primary"></span>
                <span className="text-muted-foreground">DFcovenant</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-3 h-0.5 bg-warning"></span>
                <span className="text-muted-foreground">Mad Turtle</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-3 h-0.5 bg-success"></span>
                <span className="text-muted-foreground">Gold Phantom</span>
              </div>
            </div>
          </div>
        </div>

        <div className="chart-container">
          <h4 className="text-sm text-muted-foreground mb-4">
            Combined Portfolio Equity (€30,000 Initial = €10K × 3 Strategies)
          </h4>
          <div className="h-48 bg-gradient-to-r from-primary/5 to-success/10 rounded-lg flex items-center justify-center relative overflow-hidden">
            <svg className="w-full h-full" viewBox="0 0 400 120" preserveAspectRatio="none">
              <defs>
                <linearGradient id="combinedGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="hsl(170 60% 50%)" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="hsl(170 60% 50%)" stopOpacity="0.05" />
                </linearGradient>
              </defs>
              <path
                d="M0,100 Q50,96 100,82 T150,65 T200,50 T250,35 T300,22 T350,18 L400,12 L400,120 L0,120 Z"
                fill="url(#combinedGradient)"
              />
              <path
                d="M0,100 Q50,96 100,82 T150,65 T200,50 T250,35 T300,22 T350,18 L400,12"
                fill="none"
                stroke="hsl(170 60% 50%)"
                strokeWidth="2.5"
              />
            </svg>
            <div className="absolute bottom-4 right-4 flex items-center gap-2 text-success text-sm font-mono">
              <TrendingUp className="w-4 h-4" />
              Combined Portfolio
            </div>
          </div>
        </div>
      </div>

      {/* Strategy Comparison Table */}
      <div>
        <h3 className="text-xl font-semibold mb-6">Strategy Comparison</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">Metric</th>
                <th className="text-center py-3 px-4 text-primary font-medium">DFcovenant (XAUUSD)</th>
                <th className="text-center py-3 px-4 text-muted-foreground font-medium">Mad Turtle (XAUUSD)</th>
                <th className="text-center py-3 px-4 text-muted-foreground font-medium">The Gold Phantom (XAUUSD)</th>
              </tr>
            </thead>
            <tbody>
              {strategyComparison.map((row, index) => (
                <tr key={index} className="border-b border-border/50 hover:bg-card/50 transition-colors">
                  <td className="py-3 px-4 text-muted-foreground font-medium">{row.metric}</td>
                  <td className="py-3 px-4 text-center text-foreground font-mono">{row.dfcovenant}</td>
                  <td className="py-3 px-4 text-center text-foreground font-mono">{row.madTurtle}</td>
                  <td className="py-3 px-4 text-center text-foreground font-mono">{row.goldPhantom}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PortfolioCorrelation;
