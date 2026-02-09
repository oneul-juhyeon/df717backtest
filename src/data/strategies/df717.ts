import type { StrategyConfig } from "@/types/strategy";

export const df717Config: StrategyConfig = {
  // Basic info
  id: "df717",
  name: "DF717",
  namePrefix: "DF",
  nameSuffix: "717",
  description: "Professional Gold Trading Expert Advisor",
  tagline: "Advanced algorithmic trading system designed for XAUUSD with robust risk management and consistent performance across market conditions.",
  
  // Paths
  landingPath: "/df717",
  reportPath: "/df717/backtest-report",
  
  // Trading info
  symbol: "XAUUSD",
  period: "H1",
  currency: "USD",
  backtestYears: "10 Years Backtested",
  
  // Hero section metrics
  heroMetrics: [
    { value: "$6,890", label: "NET PROFIT", color: "text-foreground" },
    { value: "1.68", label: "PROFIT FACTOR", color: "text-foreground" },
    { value: "9.2%", label: "MAX DRAWDOWN", color: "text-foreground" },
    { value: "18.45", label: "RECOVERY FACTOR", color: "text-foreground" },
    { value: "4.25", label: "SHARPE RATIO", color: "text-foreground" },
  ],
  
  // Performance metrics
  performanceMetrics: {
    primary: [
      { value: "$6,890.55", label: "TOTAL NET PROFIT", highlight: true },
      { value: "1.68", label: "PROFIT FACTOR", highlight: false },
      { value: "876", label: "TOTAL TRADES", highlight: false },
      { value: "68.2%", label: "WIN RATE", highlight: false },
    ],
    secondary: [
      { value: "$7.87", label: "EXPECTANCY", highlight: true },
      { value: "18.45", label: "RECOVERY FACTOR", highlight: false },
      { value: "4.25", label: "SHARPE RATIO", highlight: false },
      { value: "5.10", label: "SORTINO RATIO", highlight: false },
    ],
  },
  
  // Risk metrics
  riskMetrics: [
    { value: "9.2%", label: "Equity DD %" },
    { value: "7.8%", label: "Balance DD %" },
    { value: "165d", label: "Max DD Days" },
    { value: "15.20", label: "Calmar Ratio" },
  ],
  additionalMetrics: [
    { value: "1.85", label: "Risk/Reward" },
    { value: "20", label: "Max Win Streak" },
    { value: "4", label: "Max Loss Streak" },
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
  equityChartTitle: "Equity Curve in USD (2016-2026) — $1,000 → $7,890",
  
  // Data source
  dataZipPath: "/strategies-data.zip",
  htmlFileName: "DF717_Backtest_Report.html",
};
