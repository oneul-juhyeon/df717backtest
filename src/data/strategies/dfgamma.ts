import type { StrategyConfig } from "@/types/strategy";

export const dfgammaConfig: StrategyConfig = {
  // Basic info
  id: "dfgamma",
  name: "DFgamma",
  namePrefix: "DF",
  nameSuffix: "gamma",
  description: "Professional Gold Trading Expert Advisor",
  tagline: "Advanced algorithmic trading system designed for XAUUSD with robust risk management and consistent performance across market conditions.",
  
  // Paths
  landingPath: "/dfgamma",
  reportPath: "/dfgamma/backtest-report",
  
  // Trading info
  symbol: "XAUUSD",
  period: "H1",
  currency: "USD",
  backtestYears: "10 Years Backtested",
  
  // Hero section metrics
  heroMetrics: [
    { value: "$4,890", label: "NET PROFIT", color: "text-foreground" },
    { value: "1.48", label: "PROFIT FACTOR", color: "text-foreground" },
    { value: "11.5%", label: "MAX DRAWDOWN", color: "text-foreground" },
    { value: "13.10", label: "RECOVERY FACTOR", color: "text-foreground" },
    { value: "2.95", label: "SHARPE RATIO", color: "text-foreground" },
  ],
  
  // Performance metrics
  performanceMetrics: {
    primary: [
      { value: "$4,890.60", label: "TOTAL NET PROFIT", highlight: true },
      { value: "1.48", label: "PROFIT FACTOR", highlight: false },
      { value: "1,065", label: "TOTAL TRADES", highlight: false },
      { value: "62.8%", label: "WIN RATE", highlight: false },
    ],
    secondary: [
      { value: "$4.59", label: "EXPECTANCY", highlight: true },
      { value: "13.10", label: "RECOVERY FACTOR", highlight: false },
      { value: "2.95", label: "SHARPE RATIO", highlight: false },
      { value: "3.42", label: "SORTINO RATIO", highlight: false },
    ],
  },
  
  // Risk metrics
  riskMetrics: [
    { value: "11.5%", label: "Equity DD %" },
    { value: "10.2%", label: "Balance DD %" },
    { value: "245d", label: "Max DD Days" },
    { value: "10.85", label: "Calmar Ratio" },
  ],
  additionalMetrics: [
    { value: "1.40", label: "Risk/Reward" },
    { value: "15", label: "Max Win Streak" },
    { value: "6", label: "Max Loss Streak" },
    { value: "0.35", label: "Avg Days/Trade" },
  ],
  
  // Trading period
  tradingPeriod: {
    symbol: "XAUUSD",
    startDate: "2016-01-01",
    endDate: "2026-02-03",
    initialDeposit: "$1,000",
  },
  
  // Equity chart
  equityChartTitle: "Equity Curve in USD (2016-2026) — $1,000 → $5,890",
  
  // Data source
  dataZipPath: "/strategies-data.zip",
  htmlFileName: "DFgamma_Backtest_Report.html",
};
