import type { StrategyConfig } from "@/types/strategy";

export const dfsigmaConfig: StrategyConfig = {
  // Basic info
  id: "dfsigma",
  name: "DFsigma",
  namePrefix: "DF",
  nameSuffix: "sigma",
  description: "Professional Gold Trading Expert Advisor",
  tagline: "Advanced algorithmic trading system designed for XAUUSD with robust risk management and consistent performance across market conditions.",
  
  // Paths
  landingPath: "/dfsigma",
  reportPath: "/dfsigma/backtest-report",
  
  // Trading info
  symbol: "XAUUSD",
  period: "H1",
  currency: "USD",
  backtestYears: "10 Years Backtested",
  
  // Hero section metrics
  heroMetrics: [
    { value: "$4,680", label: "NET PROFIT", color: "text-foreground" },
    { value: "1.46", label: "PROFIT FACTOR", color: "text-foreground" },
    { value: "11.8%", label: "MAX DRAWDOWN", color: "text-foreground" },
    { value: "12.45", label: "RECOVERY FACTOR", color: "text-foreground" },
    { value: "2.88", label: "SHARPE RATIO", color: "text-foreground" },
  ],
  
  // Performance metrics
  performanceMetrics: {
    primary: [
      { value: "$4,680.45", label: "TOTAL NET PROFIT", highlight: true },
      { value: "1.46", label: "PROFIT FACTOR", highlight: false },
      { value: "1,098", label: "TOTAL TRADES", highlight: false },
      { value: "62.0%", label: "WIN RATE", highlight: false },
    ],
    secondary: [
      { value: "$4.26", label: "EXPECTANCY", highlight: true },
      { value: "12.45", label: "RECOVERY FACTOR", highlight: false },
      { value: "2.88", label: "SHARPE RATIO", highlight: false },
      { value: "3.35", label: "SORTINO RATIO", highlight: false },
    ],
  },
  
  // Risk metrics
  riskMetrics: [
    { value: "11.8%", label: "Equity DD %" },
    { value: "10.5%", label: "Balance DD %" },
    { value: "255d", label: "Max DD Days" },
    { value: "10.55", label: "Calmar Ratio" },
  ],
  additionalMetrics: [
    { value: "1.38", label: "Risk/Reward" },
    { value: "14", label: "Max Win Streak" },
    { value: "6", label: "Max Loss Streak" },
    { value: "0.36", label: "Avg Days/Trade" },
  ],
  
  // Trading period
  tradingPeriod: {
    symbol: "XAUUSD",
    startDate: "2016-01-01",
    endDate: "2026-02-03",
    initialDeposit: "$1,000",
  },
  
  // Equity chart
  equityChartTitle: "Equity Curve in USD (2016-2026) — $1,000 → $5,680",
  
  // Data source
  dataZipPath: "/strategies-data.zip",
  htmlFileName: "DFsigma_Backtest_Report.html",
};
