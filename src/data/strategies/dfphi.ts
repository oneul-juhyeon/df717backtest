import type { StrategyConfig } from "@/types/strategy";

export const dfphiConfig: StrategyConfig = {
  // Basic info
  id: "dfphi",
  name: "DFphi",
  namePrefix: "DF",
  nameSuffix: "phi",
  description: "Professional Gold Trading Expert Advisor",
  tagline: "Advanced algorithmic trading system designed for XAUUSD with robust risk management and consistent performance across market conditions.",
  
  // Paths
  landingPath: "/dfphi",
  reportPath: "/dfphi/backtest-report",
  
  // Trading info
  symbol: "XAUUSD",
  period: "H1",
  currency: "USD",
  backtestYears: "10 Years Backtested",
  
  // Hero section metrics
  heroMetrics: [
    { value: "$5,560", label: "NET PROFIT", color: "text-foreground" },
    { value: "1.54", label: "PROFIT FACTOR", color: "text-foreground" },
    { value: "10.5%", label: "MAX DRAWDOWN", color: "text-foreground" },
    { value: "14.85", label: "RECOVERY FACTOR", color: "text-foreground" },
    { value: "3.25", label: "SHARPE RATIO", color: "text-foreground" },
  ],
  
  // Performance metrics
  performanceMetrics: {
    primary: [
      { value: "$5,560.40", label: "TOTAL NET PROFIT", highlight: true },
      { value: "1.54", label: "PROFIT FACTOR", highlight: false },
      { value: "978", label: "TOTAL TRADES", highlight: false },
      { value: "64.8%", label: "WIN RATE", highlight: false },
    ],
    secondary: [
      { value: "$5.69", label: "EXPECTANCY", highlight: true },
      { value: "14.85", label: "RECOVERY FACTOR", highlight: false },
      { value: "3.25", label: "SHARPE RATIO", highlight: false },
      { value: "3.82", label: "SORTINO RATIO", highlight: false },
    ],
  },
  
  // Risk metrics
  riskMetrics: [
    { value: "10.5%", label: "Equity DD %" },
    { value: "9.2%", label: "Balance DD %" },
    { value: "195d", label: "Max DD Days" },
    { value: "12.15", label: "Calmar Ratio" },
  ],
  additionalMetrics: [
    { value: "1.52", label: "Risk/Reward" },
    { value: "16", label: "Max Win Streak" },
    { value: "5", label: "Max Loss Streak" },
    { value: "0.31", label: "Avg Days/Trade" },
  ],
  
  // Trading period
  tradingPeriod: {
    symbol: "XAUUSD",
    startDate: "2016-01-01",
    endDate: "2026-02-03",
    initialDeposit: "$1,000",
  },
  
  // Equity chart
  equityChartTitle: "Equity Curve in USD (2016-2026) — $1,000 → $6,560",
  
  // Data source
  dataZipPath: "/strategies-data.zip",
  htmlFileName: "DFphi_Backtest_Report.html",
};
