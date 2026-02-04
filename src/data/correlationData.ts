// Correlation equity curve data (2016-2026) for each strategy
export const dfcovenantEquity = [
  { date: "2016-01", equity: 10000 },
  { date: "2016-06", equity: 14150 },
  { date: "2016-12", equity: 15994 },
  { date: "2017-06", equity: 17709 },
  { date: "2017-12", equity: 22994 },
  { date: "2018-06", equity: 22100 },
  { date: "2018-12", equity: 26619 },
  { date: "2019-06", equity: 32754 },
  { date: "2019-12", equity: 40212 },
  { date: "2020-06", equity: 55180 },
  { date: "2020-12", equity: 74656 },
  { date: "2021-06", equity: 77394 },
  { date: "2021-12", equity: 82337 },
  { date: "2022-06", equity: 122189 },
  { date: "2022-12", equity: 157002 },
  { date: "2023-06", equity: 185736 },
  { date: "2023-12", equity: 210082 },
  { date: "2024-06", equity: 233617 },
  { date: "2024-12", equity: 292662 },
  { date: "2025-06", equity: 411783 },
  { date: "2025-12", equity: 598348 },
  { date: "2026-01", equity: 732988 },
];

export const madTurtleEquity = [
  { date: "2016-01", equity: 10000 },
  { date: "2016-06", equity: 11200 },
  { date: "2016-12", equity: 12800 },
  { date: "2017-06", equity: 14100 },
  { date: "2017-12", equity: 16200 },
  { date: "2018-06", equity: 17800 },
  { date: "2018-12", equity: 19500 },
  { date: "2019-06", equity: 22100 },
  { date: "2019-12", equity: 25800 },
  { date: "2020-06", equity: 31200 },
  { date: "2020-12", equity: 42500 },
  { date: "2021-06", equity: 48200 },
  { date: "2021-12", equity: 55800 },
  { date: "2022-06", equity: 78500 },
  { date: "2022-12", equity: 105200 },
  { date: "2023-06", equity: 128500 },
  { date: "2023-12", equity: 152800 },
  { date: "2024-06", equity: 185200 },
  { date: "2024-12", equity: 225800 },
  { date: "2025-06", equity: 285600 },
  { date: "2025-12", equity: 342500 },
  { date: "2026-01", equity: 375656 },
];

export const goldPhantomEquity = [
  { date: "2016-01", equity: 10000 },
  { date: "2016-06", equity: 12500 },
  { date: "2016-12", equity: 14200 },
  { date: "2017-06", equity: 16800 },
  { date: "2017-12", equity: 19500 },
  { date: "2018-06", equity: 21200 },
  { date: "2018-12", equity: 24800 },
  { date: "2019-06", equity: 29500 },
  { date: "2019-12", equity: 35200 },
  { date: "2020-06", equity: 45800 },
  { date: "2020-12", equity: 62500 },
  { date: "2021-06", equity: 72800 },
  { date: "2021-12", equity: 85200 },
  { date: "2022-06", equity: 115800 },
  { date: "2022-12", equity: 152500 },
  { date: "2023-06", equity: 195200 },
  { date: "2023-12", equity: 242800 },
  { date: "2024-06", equity: 298500 },
  { date: "2024-12", equity: 385200 },
  { date: "2025-06", equity: 495800 },
  { date: "2025-12", equity: 585200 },
  { date: "2026-01", equity: 629720 },
];

// Combined portfolio equity data
export const combinedEquityData = dfcovenantEquity.map((item, index) => ({
  date: item.date,
  dfcovenant: item.equity,
  madTurtle: madTurtleEquity[index]?.equity || 0,
  goldPhantom: goldPhantomEquity[index]?.equity || 0,
  combined: item.equity + (madTurtleEquity[index]?.equity || 0) + (goldPhantomEquity[index]?.equity || 0),
}));

// Correlation data
export const correlationData = {
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

// Strategy comparison table
export const strategyComparison = [
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

// Diversification metrics
export const diversificationMetrics = {
  strategiesCompared: 3,
  avgIndividualDD: 16.0,
  combinedMaxDD: 9.4,
  diversificationBenefit: -41,
};

// Correlation scale legend
export const correlationScale = [
  { label: "Strong Negative (-1 to -0.5)", color: "bg-destructive/80" },
  { label: "Weak Negative (-0.5 to -0.2)", color: "bg-destructive/40" },
  { label: "Neutral (-0.2 to 0.2)", color: "bg-muted" },
  { label: "Weak Positive (0.2 to 0.5)", color: "bg-success/40" },
  { label: "Strong Positive (0.5 to 1)", color: "bg-success/80" },
];

// Drawdown comparison data
export const drawdownComparisonData = [
  { date: "2016-01", dfcovenant: 0, madTurtle: 0, goldPhantom: 0 },
  { date: "2016-06", dfcovenant: -2.1, madTurtle: -5.2, goldPhantom: -3.1 },
  { date: "2016-12", dfcovenant: -1.5, madTurtle: -4.8, goldPhantom: -2.8 },
  { date: "2017-06", dfcovenant: -3.2, madTurtle: -8.5, goldPhantom: -4.2 },
  { date: "2017-12", dfcovenant: -2.8, madTurtle: -7.2, goldPhantom: -3.8 },
  { date: "2018-06", dfcovenant: -5.8, madTurtle: -12.5, goldPhantom: -6.2 },
  { date: "2018-12", dfcovenant: -4.2, madTurtle: -9.8, goldPhantom: -5.1 },
  { date: "2019-06", dfcovenant: -2.5, madTurtle: -6.2, goldPhantom: -3.5 },
  { date: "2019-12", dfcovenant: -3.1, madTurtle: -8.5, goldPhantom: -4.2 },
  { date: "2020-06", dfcovenant: -4.5, madTurtle: -15.2, goldPhantom: -7.8 },
  { date: "2020-12", dfcovenant: -2.8, madTurtle: -9.5, goldPhantom: -5.2 },
  { date: "2021-06", dfcovenant: -6.2, madTurtle: -18.5, goldPhantom: -8.5 },
  { date: "2021-12", dfcovenant: -3.5, madTurtle: -12.8, goldPhantom: -6.2 },
  { date: "2022-06", dfcovenant: -5.8, madTurtle: -16.5, goldPhantom: -9.5 },
  { date: "2022-12", dfcovenant: -4.2, madTurtle: -14.2, goldPhantom: -7.8 },
  { date: "2023-06", dfcovenant: -3.8, madTurtle: -11.5, goldPhantom: -6.5 },
  { date: "2023-12", dfcovenant: -4.7, madTurtle: -15.8, goldPhantom: -8.2 },
  { date: "2024-06", dfcovenant: -5.2, madTurtle: -18.2, goldPhantom: -9.8 },
  { date: "2024-12", dfcovenant: -6.8, madTurtle: -20.5, goldPhantom: -11.2 },
  { date: "2025-06", dfcovenant: -8.5, madTurtle: -22.6, goldPhantom: -12.5 },
  { date: "2025-12", dfcovenant: -11.2, madTurtle: -22.6, goldPhantom: -13.4 },
  { date: "2026-01", dfcovenant: -4.1, madTurtle: -8.5, goldPhantom: -5.2 },
];

// Monthly returns comparison
export const monthlyReturnsComparison = [
  { month: "Jan 2024", dfcovenant: -3119, madTurtle: 1250, goldPhantom: -850 },
  { month: "Feb 2024", dfcovenant: -4099, madTurtle: -2150, goldPhantom: 1580 },
  { month: "Mar 2024", dfcovenant: 6916, madTurtle: 3420, goldPhantom: 4850 },
  { month: "Apr 2024", dfcovenant: 975, madTurtle: -1820, goldPhantom: 2150 },
  { month: "May 2024", dfcovenant: 22184, madTurtle: 8520, goldPhantom: 12580 },
  { month: "Jun 2024", dfcovenant: 678, madTurtle: 2150, goldPhantom: -1580 },
  { month: "Jul 2024", dfcovenant: 2055, madTurtle: -850, goldPhantom: 3250 },
  { month: "Aug 2024", dfcovenant: 11038, madTurtle: 5420, goldPhantom: 7850 },
  { month: "Sep 2024", dfcovenant: 13641, madTurtle: 4850, goldPhantom: 8520 },
  { month: "Oct 2024", dfcovenant: 5926, madTurtle: 2580, goldPhantom: 4150 },
  { month: "Nov 2024", dfcovenant: 19507, madTurtle: 8520, goldPhantom: 11580 },
  { month: "Dec 2024", dfcovenant: 6878, madTurtle: 3250, goldPhantom: 5420 },
];
