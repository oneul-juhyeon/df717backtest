import type { StrategyConfig } from "@/types/strategy";

export const dfkappaConfig: StrategyConfig = {
  // Basic info
  id: "dfkappa",
  name: "DFkappa",
  namePrefix: "DF",
  nameSuffix: "kappa",
  description: "Professional Gold Trading Expert Advisor",
  tagline: "Advanced algorithmic trading system designed for XAUUSD with robust risk management and consistent performance across market conditions.",
  
  // Paths
  landingPath: "/dfkappa",
  reportPath: "/dfkappa/backtest-report",
  
  // Trading info
  symbol: "XAUUSD",
  period: "H1",
  currency: "USD",
  backtestYears: "10 Years Backtested",
  
  // Hero section metrics
  heroMetrics: [
    { value: "$4,120", label: "NET PROFIT", color: "text-foreground" },
    { value: "1.40", label: "PROFIT FACTOR", color: "text-foreground" },
    { value: "13.2%", label: "MAX DRAWDOWN", color: "text-foreground" },
    { value: "10.45", label: "RECOVERY FACTOR", color: "text-foreground" },
    { value: "2.52", label: "SHARPE RATIO", color: "text-foreground" },
  ],
  
  // Performance metrics
  performanceMetrics: {
    primary: [
      { value: "$4,120.55", label: "TOTAL NET PROFIT", highlight: true },
      { value: "1.40", label: "PROFIT FACTOR", highlight: false },
      { value: "1,215", label: "TOTAL TRADES", highlight: false },
      { value: "59.8%", label: "WIN RATE", highlight: false },
    ],
    secondary: [
      { value: "$3.39", label: "EXPECTANCY", highlight: true },
      { value: "10.45", label: "RECOVERY FACTOR", highlight: false },
      { value: "2.52", label: "SHARPE RATIO", highlight: false },
      { value: "2.98", label: "SORTINO RATIO", highlight: false },
    ],
  },
  
  // Risk metrics
  riskMetrics: [
    { value: "13.2%", label: "Equity DD %" },
    { value: "11.8%", label: "Balance DD %" },
    { value: "295d", label: "Max DD Days" },
    { value: "8.95", label: "Calmar Ratio" },
  ],
  additionalMetrics: [
    { value: "1.28", label: "Risk/Reward" },
    { value: "12", label: "Max Win Streak" },
    { value: "7", label: "Max Loss Streak" },
    { value: "0.40", label: "Avg Days/Trade" },
  ],
  
  // Trading period
  tradingPeriod: {
    symbol: "XAUUSD",
    startDate: "2016-01-01",
    endDate: "2026-02-03",
    initialDeposit: "$1,000",
  },
  
  // Equity chart
  equityChartTitle: "Equity Curve in USD (2016-2026) — $1,000 → $5,120",
  
  // Data source
  dataZipPath: "/strategies-data.zip",
  htmlFileName: "DFkappa_Backtest_Report.html",
};
