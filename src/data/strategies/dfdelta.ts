import type { StrategyConfig } from "@/types/strategy";

export const dfdeltaConfig: StrategyConfig = {
  // Basic info
  id: "dfdelta",
  name: "DFdelta",
  namePrefix: "DF",
  nameSuffix: "delta",
  description: "Professional Gold Trading Expert Advisor",
  tagline: "Advanced algorithmic trading system designed for XAUUSD with robust risk management and consistent performance across market conditions.",
  
  // Paths
  landingPath: "/dfdelta",
  reportPath: "/dfdelta/backtest-report",
  
  // Trading info
  symbol: "XAUUSD",
  period: "H1",
  currency: "USD",
  backtestYears: "10 Years Backtested",
  
  // Hero section metrics
  heroMetrics: [
    { value: "$5,450", label: "NET PROFIT", color: "text-foreground" },
    { value: "1.55", label: "PROFIT FACTOR", color: "text-foreground" },
    { value: "10.2%", label: "MAX DRAWDOWN", color: "text-foreground" },
    { value: "15.65", label: "RECOVERY FACTOR", color: "text-foreground" },
    { value: "3.35", label: "SHARPE RATIO", color: "text-foreground" },
  ],
  
  // Performance metrics
  performanceMetrics: {
    primary: [
      { value: "$5,450.30", label: "TOTAL NET PROFIT", highlight: true },
      { value: "1.55", label: "PROFIT FACTOR", highlight: false },
      { value: "945", label: "TOTAL TRADES", highlight: false },
      { value: "65.2%", label: "WIN RATE", highlight: false },
    ],
    secondary: [
      { value: "$5.77", label: "EXPECTANCY", highlight: true },
      { value: "15.65", label: "RECOVERY FACTOR", highlight: false },
      { value: "3.35", label: "SHARPE RATIO", highlight: false },
      { value: "3.95", label: "SORTINO RATIO", highlight: false },
    ],
  },
  
  // Risk metrics
  riskMetrics: [
    { value: "10.2%", label: "Equity DD %" },
    { value: "8.8%", label: "Balance DD %" },
    { value: "185d", label: "Max DD Days" },
    { value: "12.65", label: "Calmar Ratio" },
  ],
  additionalMetrics: [
    { value: "1.55", label: "Risk/Reward" },
    { value: "17", label: "Max Win Streak" },
    { value: "5", label: "Max Loss Streak" },
    { value: "0.30", label: "Avg Days/Trade" },
  ],
  
  // Trading period
  tradingPeriod: {
    symbol: "XAUUSD",
    startDate: "2016-01-01",
    endDate: "2026-02-03",
    initialDeposit: "$1,000",
  },
  
  // Equity chart
  equityChartTitle: "Equity Curve in USD (2016-2026) — $1,000 → $6,450",
  
  // Data source
  dataZipPath: "/strategies-data.zip",
  htmlFileName: "DFdelta_Backtest_Report.html",
};
