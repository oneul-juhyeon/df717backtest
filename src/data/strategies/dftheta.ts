import type { StrategyConfig } from "@/types/strategy";

export const dfthetaConfig: StrategyConfig = {
  // Basic info
  id: "dftheta",
  name: "DFtheta",
  namePrefix: "DF",
  nameSuffix: "theta",
  description: "Professional Gold Trading Expert Advisor",
  tagline: "Advanced algorithmic trading system designed for XAUUSD with robust risk management and consistent performance across market conditions.",
  
  // Paths
  landingPath: "/dftheta",
  reportPath: "/dftheta/backtest-report",
  
  // Trading info
  symbol: "XAUUSD",
  period: "H1",
  currency: "USD",
  backtestYears: "10 Years Backtested",
  
  // Hero section metrics
  heroMetrics: [
    { value: "$5,890", label: "NET PROFIT", color: "text-foreground" },
    { value: "1.58", label: "PROFIT FACTOR", color: "text-foreground" },
    { value: "9.8%", label: "MAX DRAWDOWN", color: "text-foreground" },
    { value: "16.25", label: "RECOVERY FACTOR", color: "text-foreground" },
    { value: "3.52", label: "SHARPE RATIO", color: "text-foreground" },
  ],
  
  // Performance metrics
  performanceMetrics: {
    primary: [
      { value: "$5,890.70", label: "TOTAL NET PROFIT", highlight: true },
      { value: "1.58", label: "PROFIT FACTOR", highlight: false },
      { value: "925", label: "TOTAL TRADES", highlight: false },
      { value: "66.2%", label: "WIN RATE", highlight: false },
    ],
    secondary: [
      { value: "$6.37", label: "EXPECTANCY", highlight: true },
      { value: "16.25", label: "RECOVERY FACTOR", highlight: false },
      { value: "3.52", label: "SHARPE RATIO", highlight: false },
      { value: "4.15", label: "SORTINO RATIO", highlight: false },
    ],
  },
  
  // Risk metrics
  riskMetrics: [
    { value: "9.8%", label: "Equity DD %" },
    { value: "8.5%", label: "Balance DD %" },
    { value: "175d", label: "Max DD Days" },
    { value: "13.25", label: "Calmar Ratio" },
  ],
  additionalMetrics: [
    { value: "1.62", label: "Risk/Reward" },
    { value: "18", label: "Max Win Streak" },
    { value: "5", label: "Max Loss Streak" },
    { value: "0.28", label: "Avg Days/Trade" },
  ],
  
  // Trading period
  tradingPeriod: {
    symbol: "XAUUSD",
    startDate: "2016-01-01",
    endDate: "2026-02-03",
    initialDeposit: "$1,000",
  },
  
  // Equity chart
  equityChartTitle: "Equity Curve in USD (2016-2026) — $1,000 → $6,890",
  
  // Data source
  dataZipPath: "/strategies-data.zip",
  htmlFileName: "DFtheta_Backtest_Report.html",
};
