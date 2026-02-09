import type { StrategyConfig } from "@/types/strategy";

export const dfalphaConfig: StrategyConfig = {
  // Basic info
  id: "dfalpha",
  name: "DFalpha",
  namePrefix: "DF",
  nameSuffix: "alpha",
  description: "Professional Gold Trading Expert Advisor",
  tagline: "Advanced algorithmic trading system designed for XAUUSD with robust risk management and consistent performance across market conditions.",
  
  // Paths
  landingPath: "/dfalpha",
  reportPath: "/dfalpha/backtest-report",
  
  // Trading info
  symbol: "XAUUSD",
  period: "H1",
  currency: "USD",
  backtestYears: "10 Years Backtested",
  
  // Hero section metrics
  heroMetrics: [
    { value: "$4,250", label: "NET PROFIT", color: "text-foreground" },
    { value: "1.42", label: "PROFIT FACTOR", color: "text-foreground" },
    { value: "12.8%", label: "MAX DRAWDOWN", color: "text-foreground" },
    { value: "11.20", label: "RECOVERY FACTOR", color: "text-foreground" },
    { value: "2.68", label: "SHARPE RATIO", color: "text-foreground" },
  ],
  
  // Performance metrics
  performanceMetrics: {
    primary: [
      { value: "$4,250.75", label: "TOTAL NET PROFIT", highlight: true },
      { value: "1.42", label: "PROFIT FACTOR", highlight: false },
      { value: "1,198", label: "TOTAL TRADES", highlight: false },
      { value: "60.5%", label: "WIN RATE", highlight: false },
    ],
    secondary: [
      { value: "$3.55", label: "EXPECTANCY", highlight: true },
      { value: "11.20", label: "RECOVERY FACTOR", highlight: false },
      { value: "2.68", label: "SHARPE RATIO", highlight: false },
      { value: "3.15", label: "SORTINO RATIO", highlight: false },
    ],
  },
  
  // Risk metrics
  riskMetrics: [
    { value: "12.8%", label: "Equity DD %" },
    { value: "11.2%", label: "Balance DD %" },
    { value: "275d", label: "Max DD Days" },
    { value: "9.45", label: "Calmar Ratio" },
  ],
  additionalMetrics: [
    { value: "1.32", label: "Risk/Reward" },
    { value: "13", label: "Max Win Streak" },
    { value: "7", label: "Max Loss Streak" },
    { value: "0.38", label: "Avg Days/Trade" },
  ],
  
  // Trading period
  tradingPeriod: {
    symbol: "XAUUSD",
    startDate: "2016-01-01",
    endDate: "2026-02-03",
    initialDeposit: "$1,000",
  },
  
  // Equity chart
  equityChartTitle: "Equity Curve in USD (2016-2026) — $1,000 → $5,250",
  
  // Data source
  dataZipPath: "/strategies-data.zip",
  htmlFileName: "DFalpha_Backtest_Report.html",
};
