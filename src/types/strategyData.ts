// Types for strategy JSON data structure

export interface RawTrade {
  close_time: string;
  close_date: string;
  close_hour: number;
  close_dow: number;
  type: string;
  symbol: string;
  volume: number;
  close_price: number;
  commission: number;
  swap: number;
  profit: number;
  net_profit: number;
  balance: number;
  comment: string;
}

export interface RawStrategyData {
  ea_name: string;
  symbol: string;
  period: string;
  start_date: string;
  end_date: string;
  currency: string;
  deposit: number;
  leverage: string;
  total_trades: number;
  net_profit: number;
  gross_profit: number;
  gross_loss: number;
  win_rate: number;
  profit_factor: number;
  max_dd_equity_pct: number;
  max_dd_equity_abs: number;
  max_dd_balance_pct: number;
  max_dd_balance_abs: number;
  sharpe_ratio: number;
  sortino_ratio: number;
  calmar_ratio: number;
  recovery_factor: number;
  kelly: number;
  risk_reward: number;
  expectancy: number;
  win_trades: number;
  loss_trades: number;
  long_trades: number;
  short_trades: number;
  long_won: number;
  short_won: number;
  long_profit: number;
  short_profit: number;
  best_trade: number;
  worst_trade: number;
  avg_win: number;
  avg_loss: number;
  total_volume: number;
  total_commission: number;
  total_swap: number;
  trades: RawTrade[];
  daily_balance?: Record<string, number>;
  hourly_profit?: Record<string, number>;
  dow_profit?: Record<string, number>;
  duration_buckets?: Record<string, { count: number; profit: number }>;
  profit_distribution?: Record<string, number>;
  yearly_monthly_profit?: Record<string, Record<string, number>>;
  yearly_monthly_trades?: Record<string, Record<string, number>>;
}

export interface AllStrategiesJson {
  strategies: Record<string, RawStrategyData>;
  metadata: {
    generated_at: string;
    total_strategies: number;
    version: string;
    strategy_list: string[];
  };
}

// Transformed data types for charts
export interface EquityDataPoint {
  date: string;
  equity: number;
  pnl: number;
  change: number;
}

export interface DailyPnLDataPoint {
  date: string;
  pnl: number;
}

export interface MonthlyReturnDataPoint {
  date: string;
  return: number;
}

export interface DistributionDataPoint {
  range: string;
  count: number;
}

export interface HourProfitDataPoint {
  hour: number;
  profit: number;
}

export interface DayProfitDataPoint {
  day: string;
  profit: number;
}

export interface DurationDistDataPoint {
  range: string;
  count: number;
  profit: number;
}

export interface DurationVsProfitPoint {
  durationHours: number;
  profit: number;
}

export interface TradeDataPoint {
  id: number;
  openTime: string;
  type: string;
  volume: number;
  symbol: string;
  openPrice: number;
  sl: number;
  tp: number;
  closeTime: string;
  closePrice: number;
  commission: number;
  swap: number;
  profit: number;
}

export interface ReportInfo {
  ea: string;
  symbol: string;
  period: string;
  dates: string;
  deposit: string;
  leverage: string;
  trades: number;
  generatedDate: string;
}

export interface KeyStats {
  netProfit: number;
  totalTrades: number;
  winTrades: number;
  lossTrades: number;
  winRate: number;
  profitFactor: number;
  maxDDPercent: number;
  maxDDAbs: number;
  bestTrade: number;
  worstTrade: number;
  grossProfit: number;
}

export interface LongShortData {
  long: {
    trades: number;
    winRate: number;
    profit: number;
    avgProfit: number;
    best: number;
    worst: number;
    volume: number;
  };
  short: {
    trades: number;
    winRate: number;
    profit: number;
    avgProfit: number;
    best: number;
    worst: number;
    volume: number;
  };
}

export interface AdvancedStats {
  performance: {
    netProfit: number;
    grossProfit: number;
    grossLoss: number;
    profitFactor: number;
    expectancy: number;
    sharpeRatio: number;
  };
  riskRatios: {
    sortinoRatio: number;
    calmarRatio: number;
    recoveryFactor: number;
    kellyCriterion: number;
    riskReward: number;
    avgDuration: string;
  };
  tradeStats: {
    totalTrades: number;
    winRate: number;
    avgWin: number;
    avgLoss: number;
    maxWinStreak: number;
    maxLossStreak: number;
  };
  drawdown: {
    maxDDEquity: number;
    maxDDBalance: number;
    equityDDValue: number;
    balanceDDValue: number;
  };
  costs: {
    totalVolume: number;
    totalCommission: number;
    totalSwap: number;
  };
}

export interface MonthlyPerformanceRow {
  year: number;
  months: Record<number, number>;
  total: number;
  tradesPerMonth?: Record<number, number>;
}

export interface TransformedStrategyData {
  reportInfo: ReportInfo;
  keyStats: KeyStats;
  longShortData: LongShortData;
  advancedStats: AdvancedStats;
  equityData: EquityDataPoint[];
  dailyPnLData: DailyPnLDataPoint[];
  monthlyReturnsData: MonthlyReturnDataPoint[];
  distributionData: DistributionDataPoint[];
  hourProfitData: HourProfitDataPoint[];
  dayProfitData: DayProfitDataPoint[];
  durationDistData: DurationDistDataPoint[];
  durationVsProfitData: DurationVsProfitPoint[];
  tradesData: TradeDataPoint[];
  monthlyPerformanceMatrix: MonthlyPerformanceRow[];
  currency: string;
}
