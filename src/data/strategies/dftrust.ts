import type { StrategyConfig } from "@/types/strategy";

export const dftrustConfig: StrategyConfig = {
  // Basic info
  id: "dftrust",
  name: "DFtrust",
  namePrefix: "DF",
  nameSuffix: "trust",
  description: "Professional Gold Trading Expert Advisor",
  tagline: "Advanced algorithmic trading system designed for XAUUSD with robust risk management and consistent performance across market conditions.",
  
  // Paths
  landingPath: "/dftrust",
  reportPath: "/dftrust/backtest-report",
  
  // Trading info
  symbol: "XAUUSD",
  period: "H1",
  currency: "USD",
  backtestYears: "10 Years Backtested",
  
  // Hero section metrics
  heroMetrics: [
    { value: "$4,306", label: "NET PROFIT", color: "text-foreground" },
    { value: "1.44", label: "PROFIT FACTOR", color: "text-foreground" },
    { value: "12.2%", label: "MAX DRAWDOWN", color: "text-foreground" },
    { value: "12.85", label: "RECOVERY FACTOR", color: "text-foreground" },
    { value: "2.74", label: "SHARPE RATIO", color: "text-foreground" },
  ],
  
  // Performance metrics
  performanceMetrics: {
    primary: [
      { value: "$4,306.36", label: "TOTAL NET PROFIT", highlight: true },
      { value: "1.44", label: "PROFIT FACTOR", highlight: false },
      { value: "1,246", label: "TOTAL TRADES", highlight: false },
      { value: "61.8%", label: "WIN RATE", highlight: false },
    ],
    secondary: [
      { value: "$2.65", label: "EXPECTANCY", highlight: true },
      { value: "12.85", label: "RECOVERY FACTOR", highlight: false },
      { value: "2.74", label: "SHARPE RATIO", highlight: false },
      { value: "3.20", label: "SORTINO RATIO", highlight: false },
    ],
  },
  
  // Risk metrics
  riskMetrics: [
    { value: "12.2%", label: "Equity DD %" },
    { value: "11.8%", label: "Balance DD %" },
    { value: "312d", label: "Max DD Days" },
    { value: "12.85", label: "Calmar Ratio" },
  ],
  additionalMetrics: [
    { value: "1.15", label: "Risk/Reward" },
    { value: "14", label: "Max Win Streak" },
    { value: "7", label: "Max Loss Streak" },
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
  equityChartTitle: "Equity Curve in USD (2016-2026) — $1,000 → $4,306",
  
  // Data source
  dataZipPath: "/dftrust-backtest.html",
  htmlFileName: "DFtrust.html",
};
