import type { StrategyConfig } from "@/types/strategy";

export const dfpathConfig: StrategyConfig = {
  // Basic info
  id: "dfpath",
  name: "DFpath",
  namePrefix: "DF",
  nameSuffix: "path",
  description: "Professional Gold Trading Expert Advisor",
  tagline: "Advanced algorithmic trading system designed for XAUUSD with robust risk management and consistent performance across market conditions.",
  
  // Paths
  landingPath: "/dfpath",
  reportPath: "/dfpath/backtest-report",
  
  // Trading info
  symbol: "XAUUSD",
  period: "H1",
  currency: "USD",
  backtestYears: "10 Years Backtested",
  
  // Hero section metrics
  heroMetrics: [
    { value: "$5,120", label: "NET PROFIT", color: "text-foreground" },
    { value: "1.52", label: "PROFIT FACTOR", color: "text-foreground" },
    { value: "10.8%", label: "MAX DRAWDOWN", color: "text-foreground" },
    { value: "14.25", label: "RECOVERY FACTOR", color: "text-foreground" },
    { value: "3.12", label: "SHARPE RATIO", color: "text-foreground" },
  ],
  
  // Performance metrics
  performanceMetrics: {
    primary: [
      { value: "$5,120.88", label: "TOTAL NET PROFIT", highlight: true },
      { value: "1.52", label: "PROFIT FACTOR", highlight: false },
      { value: "1,089", label: "TOTAL TRADES", highlight: false },
      { value: "63.5%", label: "WIN RATE", highlight: false },
    ],
    secondary: [
      { value: "$4.70", label: "EXPECTANCY", highlight: true },
      { value: "14.25", label: "RECOVERY FACTOR", highlight: false },
      { value: "3.12", label: "SHARPE RATIO", highlight: false },
      { value: "3.65", label: "SORTINO RATIO", highlight: false },
    ],
  },
  
  // Risk metrics
  riskMetrics: [
    { value: "10.8%", label: "Equity DD %" },
    { value: "9.5%", label: "Balance DD %" },
    { value: "198d", label: "Max DD Days" },
    { value: "11.85", label: "Calmar Ratio" },
  ],
  additionalMetrics: [
    { value: "1.45", label: "Risk/Reward" },
    { value: "16", label: "Max Win Streak" },
    { value: "6", label: "Max Loss Streak" },
    { value: "0.32", label: "Avg Days/Trade" },
  ],
  
  // Trading period
  tradingPeriod: {
    symbol: "XAUUSD",
    startDate: "2016-01-01",
    endDate: "2026-02-03",
    initialDeposit: "$1,000",
  },
  
  // Equity chart
  equityChartTitle: "Equity Curve in USD (2016-2026) — $1,000 → $6,120",
  
  // Data source
  dataZipPath: "/strategies-data.zip",
  htmlFileName: "DFpath_Backtest_Report.html",
};
