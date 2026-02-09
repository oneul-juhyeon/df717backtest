import type { StrategyConfig } from "@/types/strategy";

export const dfbetaConfig: StrategyConfig = {
  // Basic info
  id: "dfbeta",
  name: "DFbeta",
  namePrefix: "DF",
  nameSuffix: "beta",
  description: "Professional Gold Trading Expert Advisor",
  tagline: "Advanced algorithmic trading system designed for XAUUSD with robust risk management and consistent performance across market conditions.",
  
  // Paths
  landingPath: "/dfbeta",
  reportPath: "/dfbeta/backtest-report",
  
  // Trading info
  symbol: "XAUUSD",
  period: "H1",
  currency: "USD",
  backtestYears: "10 Years Backtested",
  
  // Hero section metrics
  heroMetrics: [
    { value: "$3,680", label: "NET PROFIT", color: "text-foreground" },
    { value: "1.35", label: "PROFIT FACTOR", color: "text-foreground" },
    { value: "15.2%", label: "MAX DRAWDOWN", color: "text-foreground" },
    { value: "8.85", label: "RECOVERY FACTOR", color: "text-foreground" },
    { value: "2.05", label: "SHARPE RATIO", color: "text-foreground" },
  ],
  
  // Performance metrics
  performanceMetrics: {
    primary: [
      { value: "$3,680.25", label: "TOTAL NET PROFIT", highlight: true },
      { value: "1.35", label: "PROFIT FACTOR", highlight: false },
      { value: "1,342", label: "TOTAL TRADES", highlight: false },
      { value: "57.8%", label: "WIN RATE", highlight: false },
    ],
    secondary: [
      { value: "$2.74", label: "EXPECTANCY", highlight: true },
      { value: "8.85", label: "RECOVERY FACTOR", highlight: false },
      { value: "2.05", label: "SHARPE RATIO", highlight: false },
      { value: "2.55", label: "SORTINO RATIO", highlight: false },
    ],
  },
  
  // Risk metrics
  riskMetrics: [
    { value: "15.2%", label: "Equity DD %" },
    { value: "14.0%", label: "Balance DD %" },
    { value: "320d", label: "Max DD Days" },
    { value: "7.25", label: "Calmar Ratio" },
  ],
  additionalMetrics: [
    { value: "1.18", label: "Risk/Reward" },
    { value: "11", label: "Max Win Streak" },
    { value: "9", label: "Max Loss Streak" },
    { value: "0.45", label: "Avg Days/Trade" },
  ],
  
  // Trading period
  tradingPeriod: {
    symbol: "XAUUSD",
    startDate: "2016-01-01",
    endDate: "2026-02-03",
    initialDeposit: "$1,000",
  },
  
  // Equity chart
  equityChartTitle: "Equity Curve in USD (2016-2026) — $1,000 → $4,680",
  
  // Data source
  dataZipPath: "/strategies-data.zip",
  htmlFileName: "DFbeta_Backtest_Report.html",
};
