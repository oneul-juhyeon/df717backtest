import type { StrategyConfig } from "@/types/strategy";

export const dfcovenantConfig: StrategyConfig = {
  // Basic info
  id: "dfcovenant",
  name: "DFcovenant",
  namePrefix: "DF",
  nameSuffix: "covenant",
  description: "Professional Gold Trading Expert Advisor",
  tagline: "Advanced algorithmic trading system designed for XAUUSD with robust risk management and consistent performance across market conditions.",
  
  // Paths
  landingPath: "/",
  reportPath: "/backtest-report",
  
  // Trading info
  symbol: "XAUUSD",
  period: "H1",
  currency: "EUR",
  backtestYears: "10 Years Backtested",
  
  // Hero section metrics
  heroMetrics: [
    { value: "€722,988", label: "NET PROFIT", color: "text-foreground" },
    { value: "3.31", label: "PROFIT FACTOR", color: "text-foreground" },
    { value: "11.2%", label: "MAX DRAWDOWN", color: "text-foreground" },
    { value: "22.24", label: "RECOVERY FACTOR", color: "text-foreground" },
    { value: "10.00", label: "SHARPE RATIO", color: "text-foreground" },
  ],
  
  // Performance metrics
  performanceMetrics: {
    primary: [
      { value: "€722,988.07", label: "TOTAL NET PROFIT", highlight: true },
      { value: "3.31", label: "PROFIT FACTOR", highlight: false },
      { value: "988", label: "TOTAL TRADES", highlight: false },
      { value: "66.0%", label: "WIN RATE", highlight: false },
    ],
    secondary: [
      { value: "€731.77", label: "EXPECTANCY", highlight: true },
      { value: "22.24", label: "RECOVERY FACTOR", highlight: false },
      { value: "10.00", label: "SHARPE RATIO", highlight: false },
      { value: "8.17", label: "SORTINO RATIO", highlight: false },
    ],
  },
  
  // Risk metrics
  riskMetrics: [
    { value: "11.2%", label: "Equity DD %" },
    { value: "8.7%", label: "Balance DD %" },
    { value: "217d", label: "Max DD Days" },
    { value: "9.31", label: "Calmar Ratio" },
  ],
  additionalMetrics: [
    { value: "1.72", label: "Risk/Reward" },
    { value: "18", label: "Max Win Streak" },
    { value: "5", label: "Max Loss Streak" },
    { value: "0.29", label: "Avg Days/Trade" },
  ],
  
  // Trading period
  tradingPeriod: {
    symbol: "XAUUSD",
    startDate: "2016-01-01",
    endDate: "2026-02-02",
    initialDeposit: "$10,000",
  },
  
  // Equity chart
  equityChartTitle: "Equity Curve in EUR (2016-2026) — €10,000 → €732,988",
  
  // Data source
  dataZipPath: "/backtest-data.zip",
  htmlFileName: "DFcovenant.html",
};
