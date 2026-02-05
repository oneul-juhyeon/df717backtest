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

 export const dftrustEquity = [
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

 export const dfpathEquity = [
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
   dftrust: dftrustEquity[index]?.equity || 0,
   dfpath: dfpathEquity[index]?.equity || 0,
   combined: item.equity + (dftrustEquity[index]?.equity || 0) + (dfpathEquity[index]?.equity || 0),
}));

// Correlation data
export const correlationData = {
  pearson: [
    ["Karat_Killer", "1.00", "0.21", "0.26"],
    ["Mad Turtle", "0.21", "1.00", "0.13"],
    ["The Gold Phantom", "0.26", "0.13", "1.00"],
  ],
  spearman: [
    ["Karat_Killer", "1.00", "0.24", "0.22"],
    ["Mad Turtle", "0.24", "1.00", "0.12"],
    ["The Gold Phantom", "0.22", "0.12", "1.00"],
  ],
};

// Strategy comparison table
export const strategyComparison = [
  { 
    metric: "EA Name", 
    dfcovenant: "Karat_Killer", 
    dftrust: "Mad Turtle", 
    dfpath: "The Gold Phantom" 
  },
  { metric: "Symbol", dfcovenant: "XAUUSD", dftrust: "XAUUSD", dfpath: "XAUUSD" },
   { metric: "Period", dfcovenant: "2016-01-01 – 2026-01-28", dftrust: "2016-01-01 – 2026-02-03", dfpath: "2016-01-01 – 2026-02-03" },
   { metric: "Currency", dfcovenant: "EUR", dftrust: "EUR", dfpath: "EUR" },
   { metric: "Initial Deposit", dfcovenant: "€10,000.00", dftrust: "€10,000.00", dfpath: "€10,000.00" },
   { metric: "Total Trades", dfcovenant: "988", dftrust: "1982", dfpath: "8758" },
   { metric: "Net Profit", dfcovenant: "+€722,988.07", dftrust: "+€365,656.43", dfpath: "+€619,719.62" },
   { metric: "Win Rate", dfcovenant: "66.0%", dftrust: "58.8%", dfpath: "63.9%" },
   { metric: "Profit Factor", dfcovenant: "3.31", dftrust: "1.76", dfpath: "2.41" },
   { metric: "Expectancy", dfcovenant: "+€731.77", dftrust: "+€184.49", dfpath: "+€70.76" },
   { metric: "Equity DD %", dfcovenant: "11.2%", dftrust: "22.6%", dfpath: "13.4%" },
   { metric: "Balance DD %", dfcovenant: "8.7%", dftrust: "20.4%", dfpath: "7.8%" },
   { metric: "Max DD Days", dfcovenant: "217d", dftrust: "953d", dfpath: "81d" },
   { metric: "Max Stagnation", dfcovenant: "217d", dftrust: "953d", dfpath: "81d" },
   { metric: "Sharpe Ratio", dfcovenant: "10.00", dftrust: "2.94", dfpath: "4.58" },
   { metric: "Sortino Ratio", dfcovenant: "8.17", dftrust: "2.88", dfpath: "5.09" },
   { metric: "Calmar Ratio", dfcovenant: "9.31", dftrust: "2.99", dfpath: "6.53" },
   { metric: "Recovery Factor", dfcovenant: "22.24", dftrust: "13.79", dfpath: "22.25" },
   { metric: "Risk/Reward", dfcovenant: "1.68", dftrust: "1.24", dfpath: "1.37" },
   { metric: "Max Win Streak", dfcovenant: "18", dftrust: "14", dfpath: "44" },
   { metric: "Max Loss Streak", dfcovenant: "5", dftrust: "10", dfpath: "25" },
   { metric: "Avg Days/Trade", dfcovenant: "4.16", dftrust: "1.85", dfpath: "0.42" },
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

// Win/Loss Synchronization matrix
export const winLossSyncData = {
  headers: ["Karat_Killer", "Mad Turtle", "The Gold Phantom"],
  rows: [
    ["Karat_Killer", "100%", "61%", "63%"],
    ["Mad Turtle", "61%", "100%", "57%"],
    ["The Gold Phantom", "63%", "57%", "100%"],
  ],
  average: "60%",
};

// Drawdown Overlap matrix
export const drawdownOverlapData = {
  headers: ["Karat_Killer", "Mad Turtle", "The Gold Phantom"],
  rows: [
    ["Karat_Killer", "100%", "24%", "18%"],
    ["Mad Turtle", "24%", "100%", "31%"],
    ["The Gold Phantom", "18%", "31%", "100%"],
  ],
  average: "24%",
};

// Drawdown comparison data
export const drawdownComparisonData = [
   { date: "2016-01", dfcovenant: 0, dftrust: 0, dfpath: 0 },
   { date: "2016-06", dfcovenant: -2.1, dftrust: -5.2, dfpath: -3.1 },
   { date: "2016-12", dfcovenant: -1.5, dftrust: -4.8, dfpath: -2.8 },
   { date: "2017-06", dfcovenant: -3.2, dftrust: -8.5, dfpath: -4.2 },
   { date: "2017-12", dfcovenant: -2.8, dftrust: -7.2, dfpath: -3.8 },
   { date: "2018-06", dfcovenant: -5.8, dftrust: -12.5, dfpath: -6.2 },
   { date: "2018-12", dfcovenant: -4.2, dftrust: -9.8, dfpath: -5.1 },
   { date: "2019-06", dfcovenant: -2.5, dftrust: -6.2, dfpath: -3.5 },
   { date: "2019-12", dfcovenant: -3.1, dftrust: -8.5, dfpath: -4.2 },
   { date: "2020-06", dfcovenant: -4.5, dftrust: -15.2, dfpath: -7.8 },
   { date: "2020-12", dfcovenant: -2.8, dftrust: -9.5, dfpath: -5.2 },
   { date: "2021-06", dfcovenant: -6.2, dftrust: -18.5, dfpath: -8.5 },
   { date: "2021-12", dfcovenant: -3.5, dftrust: -12.8, dfpath: -6.2 },
   { date: "2022-06", dfcovenant: -5.8, dftrust: -16.5, dfpath: -9.5 },
   { date: "2022-12", dfcovenant: -4.2, dftrust: -14.2, dfpath: -7.8 },
   { date: "2023-06", dfcovenant: -3.8, dftrust: -11.5, dfpath: -6.5 },
   { date: "2023-12", dfcovenant: -4.7, dftrust: -15.8, dfpath: -8.2 },
   { date: "2024-06", dfcovenant: -5.2, dftrust: -18.2, dfpath: -9.8 },
   { date: "2024-12", dfcovenant: -6.8, dftrust: -20.5, dfpath: -11.2 },
   { date: "2025-06", dfcovenant: -8.5, dftrust: -22.6, dfpath: -12.5 },
   { date: "2025-12", dfcovenant: -11.2, dftrust: -22.6, dfpath: -13.4 },
   { date: "2026-01", dfcovenant: -4.1, dftrust: -8.5, dfpath: -5.2 },
];

// Monthly returns comparison
export const monthlyReturnsComparison = [
   { month: "Jan 2024", dfcovenant: -3119, dftrust: 1250, dfpath: -850 },
   { month: "Feb 2024", dfcovenant: -4099, dftrust: -2150, dfpath: 1580 },
   { month: "Mar 2024", dfcovenant: 6916, dftrust: 3420, dfpath: 4850 },
   { month: "Apr 2024", dfcovenant: 975, dftrust: -1820, dfpath: 2150 },
   { month: "May 2024", dfcovenant: 22184, dftrust: 8520, dfpath: 12580 },
   { month: "Jun 2024", dfcovenant: 678, dftrust: 2150, dfpath: -1580 },
   { month: "Jul 2024", dfcovenant: 2055, dftrust: -850, dfpath: 3250 },
   { month: "Aug 2024", dfcovenant: 11038, dftrust: 5420, dfpath: 7850 },
   { month: "Sep 2024", dfcovenant: 13641, dftrust: 4850, dfpath: 8520 },
   { month: "Oct 2024", dfcovenant: 5926, dftrust: 2580, dfpath: 4150 },
   { month: "Nov 2024", dfcovenant: 19507, dftrust: 8520, dfpath: 11580 },
   { month: "Dec 2024", dfcovenant: 6878, dftrust: 3250, dfpath: 5420 },
];
