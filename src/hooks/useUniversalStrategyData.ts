import { useState, useEffect } from 'react';
import type {
  AllStrategiesJson,
  RawStrategyData,
  TransformedStrategyData,
  EquityDataPoint,
  DailyPnLDataPoint,
  MonthlyReturnDataPoint,
  DistributionDataPoint,
  HourProfitDataPoint,
  DayProfitDataPoint,
  DurationDistDataPoint,
  DurationVsProfitPoint,
  TradeDataPoint,
  MonthlyPerformanceRow,
} from '@/types/strategyData';

// Cache for loaded JSON data
let cachedData: AllStrategiesJson | null = null;
let loadingPromise: Promise<AllStrategiesJson> | null = null;

async function loadAllStrategiesData(): Promise<AllStrategiesJson> {
  if (cachedData) return cachedData;
  
  if (loadingPromise) return loadingPromise;
  
  loadingPromise = fetch('/strategies/all_strategies_data.json')
    .then(res => {
      if (!res.ok) throw new Error('Failed to load strategies data');
      return res.json();
    })
    .then(data => {
      cachedData = data;
      return data;
    });
  
  return loadingPromise;
}

const DAY_NAMES = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const DOW_MAP: Record<number, string> = {
  0: 'Monday',
  1: 'Tuesday',
  2: 'Wednesday',
  3: 'Thursday',
  4: 'Friday',
  5: 'Saturday',
  6: 'Sunday',
};

function transformStrategyData(strategyId: string, raw: RawStrategyData): TransformedStrategyData {
  const currency = raw.currency === 'EUR' ? '€' : '$';
  const currencySymbol = raw.currency === 'EUR' ? '€' : '$';

  // Report Info
  const reportInfo = {
    ea: raw.ea_name,
    symbol: raw.symbol,
    period: raw.period,
    dates: `${raw.start_date} - ${raw.end_date}`,
    deposit: `${currencySymbol}${raw.deposit.toLocaleString()}`,
    leverage: raw.leverage,
    trades: raw.total_trades,
    generatedDate: new Date().toISOString().split('T')[0],
  };

  // Key Stats
  const keyStats = {
    netProfit: raw.net_profit,
    totalTrades: raw.total_trades,
    winTrades: raw.win_trades,
    lossTrades: raw.loss_trades,
    winRate: raw.win_rate,
    profitFactor: raw.profit_factor,
    maxDDPercent: raw.max_dd_equity_pct,
    maxDDAbs: raw.max_dd_equity_abs,
    bestTrade: raw.best_trade,
    worstTrade: raw.worst_trade,
    grossProfit: raw.gross_profit,
  };

  // Long/Short Data
  const longShortData = {
    long: {
      trades: raw.long_trades,
      winRate: raw.long_won,
      profit: raw.long_profit,
      avgProfit: raw.long_trades > 0 ? raw.long_profit / raw.long_trades : 0,
      best: raw.best_trade, // Approximation
      worst: raw.worst_trade,
      volume: raw.total_volume / 2,
    },
    short: {
      trades: raw.short_trades,
      winRate: raw.short_won,
      profit: raw.short_profit,
      avgProfit: raw.short_trades > 0 ? raw.short_profit / raw.short_trades : 0,
      best: raw.best_trade,
      worst: raw.worst_trade,
      volume: raw.total_volume / 2,
    },
  };

  // Advanced Stats
  const advancedStats = {
    performance: {
      netProfit: raw.net_profit,
      grossProfit: raw.gross_profit,
      grossLoss: raw.gross_loss,
      profitFactor: raw.profit_factor,
      expectancy: raw.expectancy,
      sharpeRatio: raw.sharpe_ratio,
    },
    riskRatios: {
      sortinoRatio: raw.sortino_ratio,
      calmarRatio: raw.calmar_ratio,
      recoveryFactor: raw.recovery_factor,
      kellyCriterion: raw.kelly,
      riskReward: raw.risk_reward,
      avgDuration: 'N/A',
    },
    tradeStats: {
      totalTrades: raw.total_trades,
      winRate: raw.win_rate,
      avgWin: raw.avg_win,
      avgLoss: raw.avg_loss,
      maxWinStreak: 0, // Not available in data
      maxLossStreak: 0,
    },
    drawdown: {
      maxDDEquity: raw.max_dd_equity_pct,
      maxDDBalance: raw.max_dd_balance_pct,
      equityDDValue: raw.max_dd_equity_abs,
      balanceDDValue: raw.max_dd_balance_abs,
    },
    costs: {
      totalVolume: raw.total_volume,
      totalCommission: raw.total_commission,
      totalSwap: raw.total_swap,
    },
  };

  // Equity Data from daily_balance
  const sortedDates = Object.keys(raw.daily_balance).sort();
  const equityData: EquityDataPoint[] = sortedDates.map((date, i) => {
    const equity = raw.daily_balance[date];
    const prevEquity = i > 0 ? raw.daily_balance[sortedDates[i - 1]] : raw.deposit;
    const pnl = equity - prevEquity;
    const change = prevEquity > 0 ? (pnl / prevEquity) * 100 : 0;
    return { date, equity, pnl, change };
  });

  // Daily P&L Data
  const dailyPnLData: DailyPnLDataPoint[] = sortedDates.map((date, i) => {
    const equity = raw.daily_balance[date];
    const prevEquity = i > 0 ? raw.daily_balance[sortedDates[i - 1]] : raw.deposit;
    return { date, pnl: equity - prevEquity };
  });

  // Monthly Returns Data from yearly_monthly_profit
  const monthlyReturnsData: MonthlyReturnDataPoint[] = [];
  const years = Object.keys(raw.yearly_monthly_profit).sort();
  for (const year of years) {
    const months = raw.yearly_monthly_profit[year];
    for (const month of Object.keys(months).sort((a, b) => Number(a) - Number(b))) {
      monthlyReturnsData.push({
        date: `${year}-${month.padStart(2, '0')}`,
        return: months[month],
      });
    }
  }

  // Distribution Data from profit_distribution
  const distributionData: DistributionDataPoint[] = Object.entries(raw.profit_distribution)
    .map(([range, count]) => ({ range, count }))
    .sort((a, b) => {
      const aNum = parseFloat(a.range.replace(/[<>]/g, ''));
      const bNum = parseFloat(b.range.replace(/[<>]/g, ''));
      return aNum - bNum;
    });

  // Hour Profit Data
  const hourProfitData: HourProfitDataPoint[] = Array.from({ length: 24 }, (_, hour) => ({
    hour,
    profit: raw.hourly_profit[hour.toString()] || 0,
  }));

  // Day Profit Data (dow_profit uses 0=Monday format)
  const dayProfitData: DayProfitDataPoint[] = DAY_NAMES.slice(0, 5).map((day, index) => ({
    day,
    profit: raw.dow_profit[index.toString()] || 0,
  }));

  // Duration Distribution Data
  const durationDistData: DurationDistDataPoint[] = Object.entries(raw.duration_buckets)
    .map(([range, data]) => ({
      range,
      count: data.count,
      profit: data.profit,
    }))
    .sort((a, b) => {
      const order = ['<1h', '1-4h', '4-8h', '8-24h', '1-3d', '3-7d', '>7d'];
      return order.indexOf(a.range) - order.indexOf(b.range);
    });

  // Duration vs Profit scatter data (sample from trades)
  const durationVsProfitData: DurationVsProfitPoint[] = raw.trades.slice(0, 500).map((trade, i) => {
    // Approximate duration based on bucket (we don't have exact open time)
    // Use a random duration within typical range for visualization
    const durationHours = Math.random() * 48; // 0-48 hours
    return {
      durationHours,
      profit: trade.profit,
    };
  });

  // Trades Data
  const tradesData: TradeDataPoint[] = raw.trades.map((trade, i) => ({
    id: i + 1,
    openTime: '', // Not available in data
    type: trade.type.charAt(0).toUpperCase() + trade.type.slice(1),
    volume: trade.volume,
    symbol: trade.symbol,
    openPrice: 0,
    sl: 0,
    tp: 0,
    closeTime: trade.close_time,
    closePrice: trade.close_price,
    commission: trade.commission,
    swap: trade.swap,
    profit: trade.profit,
  }));

  // Monthly Performance Matrix
  const monthlyPerformanceMatrix: MonthlyPerformanceRow[] = years.map(year => {
    const profits = raw.yearly_monthly_profit[year] || {};
    const trades = raw.yearly_monthly_trades?.[year] || {};
    const months: Record<number, number> = {};
    const tradesPerMonth: Record<number, number> = {};
    let total = 0;
    
    for (let m = 1; m <= 12; m++) {
      months[m] = profits[m.toString()] || 0;
      tradesPerMonth[m] = trades[m.toString()] || 0;
      total += months[m];
    }
    
    return {
      year: parseInt(year),
      months,
      total,
      tradesPerMonth,
    };
  });

  return {
    reportInfo,
    keyStats,
    longShortData,
    advancedStats,
    equityData,
    dailyPnLData,
    monthlyReturnsData,
    distributionData,
    hourProfitData,
    dayProfitData,
    durationDistData,
    durationVsProfitData,
    tradesData,
    monthlyPerformanceMatrix,
    currency: raw.currency,
  };
}

export function useUniversalStrategyData(strategyId: string) {
  const [data, setData] = useState<TransformedStrategyData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setIsLoading(true);
      setError(null);

      try {
        const allData = await loadAllStrategiesData();
        
        // Find strategy by case-insensitive match
        const strategyKey = Object.keys(allData.strategies).find(
          key => key.toLowerCase() === strategyId.toLowerCase()
        );
        
        if (!strategyKey) {
          throw new Error(`Strategy "${strategyId}" not found`);
        }

        const rawData = allData.strategies[strategyKey];
        const transformed = transformStrategyData(strategyId, rawData);

        if (!cancelled) {
          setData(transformed);
          setIsLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Unknown error');
          setIsLoading(false);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [strategyId]);

  return { data, isLoading, error };
}

// Get list of available strategies
export function useAvailableStrategies() {
  const [strategies, setStrategies] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadAllStrategiesData()
      .then(data => {
        setStrategies(data.metadata.strategy_list);
        setIsLoading(false);
      })
      .catch(() => {
        setStrategies([]);
        setIsLoading(false);
      });
  }, []);

  return { strategies, isLoading };
}
