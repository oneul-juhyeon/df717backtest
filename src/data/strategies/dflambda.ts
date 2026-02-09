import type { StrategyConfig } from "@/types/strategy";

export const dflambdaConfig: StrategyConfig = {
  // Basic info
  id: "dflambda",
  name: "DFlambda",
  namePrefix: "DF",
  nameSuffix: "lambda",
  description: "Professional Gold Trading Expert Advisor",
  tagline: "Advanced algorithmic trading system designed for XAUUSD with robust risk management and consistent performance across market conditions.",
  
  // Paths
  landingPath: "/dflambda",
  reportPath: "/dflambda/backtest-report",
  
  // Trading info
  symbol: "XAUUSD",
  period: "H1",
  currency: "USD",
  backtestYears: "10 Years Backtested",
  
  // Hero section metrics
  heroMetrics: [
    { value: "$6,340", label: "NET PROFIT", color: "text-foreground" },
    { value: "1.62", label: "PROFIT FACTOR", color: "text-foreground" },
    { value: "9.5%", label: "MAX DRAWDOWN", color: "text-foreground" },
    { value: "17.35", label: "RECOVERY FACTOR", color: "text-foreground" },
    { value: "3.85", label: "SHARPE RATIO", color: "text-foreground" },
  ],
  
  // Performance metrics
  performanceMetrics: {
    primary: [
      { value: "$6,340.25", label: "TOTAL NET PROFIT", highlight: true },
      { value: "1.62", label: "PROFIT FACTOR", highlight: false },
      { value: "892", label: "TOTAL TRADES", highlight: false },
      { value: "67.5%", label: "WIN RATE", highlight: false },
    ],
    secondary: [
      { value: "$7.11", label: "EXPECTANCY", highlight: true },
      { value: "17.35", label: "RECOVERY FACTOR", highlight: false },
      { value: "3.85", label: "SHARPE RATIO", highlight: false },
      { value: "4.55", label: "SORTINO RATIO", highlight: false },
    ],
  },
  
  // Risk metrics
  riskMetrics: [
    { value: "9.5%", label: "Equity DD %" },
    { value: "8.0%", label: "Balance DD %" },
    { value: "162d", label: "Max DD Days" },
    { value: "14.55", label: "Calmar Ratio" },
  ],
  additionalMetrics: [
    { value: "1.75", label: "Risk/Reward" },
    { value: "19", label: "Max Win Streak" },
    { value: "4", label: "Max Loss Streak" },
    { value: "0.27", label: "Avg Days/Trade" },
  ],
  
  // Trading period
  tradingPeriod: {
    symbol: "XAUUSD",
    startDate: "2016-01-01",
    endDate: "2026-02-03",
    initialDeposit: "$1,000",
  },
  
  // Equity chart
  equityChartTitle: "Equity Curve in USD (2016-2026) — $1,000 → $7,340",
  
  // Data source
  dataZipPath: "/strategies-data.zip",
  htmlFileName: "DFlambda_Backtest_Report.html",
};
