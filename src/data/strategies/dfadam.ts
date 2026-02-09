import type { StrategyConfig } from "@/types/strategy";

export const dfadamConfig: StrategyConfig = {
  // Basic info
  id: "dfadam",
  name: "DFadam",
  namePrefix: "DF",
  nameSuffix: "adam",
  description: "Professional Gold Trading Expert Advisor",
  tagline: "Advanced algorithmic trading system designed for XAUUSD with robust risk management and consistent performance across market conditions.",
  
  // Paths
  landingPath: "/dfadam",
  reportPath: "/dfadam/backtest-report",
  
  // Trading info
  symbol: "XAUUSD",
  period: "H1",
  currency: "USD",
  backtestYears: "10 Years Backtested",
  
  // Hero section metrics
  heroMetrics: [
    { value: "$3,850", label: "NET PROFIT", color: "text-foreground" },
    { value: "1.38", label: "PROFIT FACTOR", color: "text-foreground" },
    { value: "14.5%", label: "MAX DRAWDOWN", color: "text-foreground" },
    { value: "9.65", label: "RECOVERY FACTOR", color: "text-foreground" },
    { value: "2.15", label: "SHARPE RATIO", color: "text-foreground" },
  ],
  
  // Performance metrics
  performanceMetrics: {
    primary: [
      { value: "$3,850.42", label: "TOTAL NET PROFIT", highlight: true },
      { value: "1.38", label: "PROFIT FACTOR", highlight: false },
      { value: "1,124", label: "TOTAL TRADES", highlight: false },
      { value: "58.2%", label: "WIN RATE", highlight: false },
    ],
    secondary: [
      { value: "$3.43", label: "EXPECTANCY", highlight: true },
      { value: "9.65", label: "RECOVERY FACTOR", highlight: false },
      { value: "2.15", label: "SHARPE RATIO", highlight: false },
      { value: "2.85", label: "SORTINO RATIO", highlight: false },
    ],
  },
  
  // Risk metrics
  riskMetrics: [
    { value: "14.5%", label: "Equity DD %" },
    { value: "13.2%", label: "Balance DD %" },
    { value: "285d", label: "Max DD Days" },
    { value: "8.45", label: "Calmar Ratio" },
  ],
  additionalMetrics: [
    { value: "1.25", label: "Risk/Reward" },
    { value: "12", label: "Max Win Streak" },
    { value: "8", label: "Max Loss Streak" },
    { value: "0.42", label: "Avg Days/Trade" },
  ],
  
  // Trading period
  tradingPeriod: {
    symbol: "XAUUSD",
    startDate: "2016-01-01",
    endDate: "2026-02-03",
    initialDeposit: "$1,000",
  },
  
  // Equity chart
  equityChartTitle: "Equity Curve in USD (2016-2026) — $1,000 → $4,850",
  
  // Data source
  dataZipPath: "/strategies-data.zip",
  htmlFileName: "DFadam_Backtest_Report.html",
};
