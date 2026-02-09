// Strategy configuration types for dynamic rendering

export interface HeroMetric {
  value: string;
  label: string;
  color?: string;
}

export interface PerformanceMetric {
  value: string;
  label: string;
  highlight: boolean;
}

export interface RiskMetric {
  value: string;
  label: string;
}

export interface TradingPeriodInfo {
  symbol: string;
  startDate: string;
  endDate: string;
  initialDeposit: string;
}

export interface StrategyConfig {
  // Basic info
  id: string;
  name: string;
  namePrefix: string;
  nameSuffix: string;
  description: string;
  tagline: string;
  
  // Paths
  landingPath: string;
  reportPath: string;
  
  // Trading info
  symbol: string;
  period: string;
  currency: string;
  backtestYears: string;
  
  // Hero section metrics (5 key metrics)
  heroMetrics: HeroMetric[];
  
  // Performance metrics
  performanceMetrics: {
    primary: PerformanceMetric[];
    secondary: PerformanceMetric[];
  };
  
  // Risk metrics
  riskMetrics: RiskMetric[];
  additionalMetrics: RiskMetric[];
  
  // Trading period info
  tradingPeriod: TradingPeriodInfo;
  
  // Equity chart config
  equityChartTitle: string;
  
  // Data source
  dataZipPath: string;
  htmlFileName: string;
}

// Helper to get strategy display name parts
export const getStrategyDisplayName = (config: StrategyConfig) => ({
  prefix: config.namePrefix,
  suffix: config.nameSuffix,
  full: config.name,
});
