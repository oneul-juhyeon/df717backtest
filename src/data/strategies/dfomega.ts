import type { StrategyConfig } from "@/types/strategy";

export const dfomegaConfig: StrategyConfig = {
  // Basic info
  id: "dfomega",
  name: "DFomega",
  namePrefix: "DF",
  nameSuffix: "omega",
  description: "Professional Gold Trading Expert Advisor",
  tagline: "Advanced algorithmic trading system designed for XAUUSD with robust risk management and consistent performance across market conditions.",
  
  // Paths
  landingPath: "/dfomega",
  reportPath: "/dfomega/backtest-report",
  
  // Trading info
  symbol: "XAUUSD",
  period: "H1",
  currency: "USD",
  backtestYears: "10 Years Backtested",
  
  // Hero section metrics
  heroMetrics: [
    { value: "$7,250", label: "NET PROFIT", color: "text-foreground" },
    { value: "1.72", label: "PROFIT FACTOR", color: "text-foreground" },
    { value: "8.8%", label: "MAX DRAWDOWN", color: "text-foreground" },
    { value: "19.80", label: "RECOVERY FACTOR", color: "text-foreground" },
    { value: "4.55", label: "SHARPE RATIO", color: "text-foreground" },
  ],
  
  // Performance metrics
  performanceMetrics: {
    primary: [
      { value: "$7,250.85", label: "TOTAL NET PROFIT", highlight: true },
      { value: "1.72", label: "PROFIT FACTOR", highlight: false },
      { value: "812", label: "TOTAL TRADES", highlight: false },
      { value: "69.5%", label: "WIN RATE", highlight: false },
    ],
    secondary: [
      { value: "$8.93", label: "EXPECTANCY", highlight: true },
      { value: "19.80", label: "RECOVERY FACTOR", highlight: false },
      { value: "4.55", label: "SHARPE RATIO", highlight: false },
      { value: "5.45", label: "SORTINO RATIO", highlight: false },
    ],
  },
  
  // Risk metrics
  riskMetrics: [
    { value: "8.8%", label: "Equity DD %" },
    { value: "7.2%", label: "Balance DD %" },
    { value: "145d", label: "Max DD Days" },
    { value: "16.45", label: "Calmar Ratio" },
  ],
  additionalMetrics: [
    { value: "1.92", label: "Risk/Reward" },
    { value: "22", label: "Max Win Streak" },
    { value: "4", label: "Max Loss Streak" },
    { value: "0.25", label: "Avg Days/Trade" },
  ],
  
  // Trading period
  tradingPeriod: {
    symbol: "XAUUSD",
    startDate: "2016-01-01",
    endDate: "2026-02-03",
    initialDeposit: "$1,000",
  },
  
  // Equity chart
  equityChartTitle: "Equity Curve in USD (2016-2026) — $1,000 → $8,250",
  
  // Data source
  dataZipPath: "/strategies-data.zip",
  htmlFileName: "DFomega_Backtest_Report.html",
};
