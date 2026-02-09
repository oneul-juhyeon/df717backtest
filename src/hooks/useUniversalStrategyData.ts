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
      best: raw.best_trade,
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
      maxWinStreak: 0,
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

  // === Derive all chart data from trades array ===
  const trades = raw.trades || [];

  // Build daily_balance from trades (last balance per close_date)
  const dailyBalanceMap: Record<string, number> = {};
  for (const t of trades) {
    dailyBalanceMap[t.close_date] = t.balance;
  }
  const sortedDates = Object.keys(dailyBalanceMap).sort();

  // Equity Data
  const equityData: EquityDataPoint[] = sortedDates.map((date, i) => {
    const equity = dailyBalanceMap[date];
    const prevEquity = i > 0 ? dailyBalanceMap[sortedDates[i - 1]] : raw.deposit;
    const pnl = equity - prevEquity;
    const change = prevEquity > 0 ? (pnl / prevEquity) * 100 : 0;
    return { date, equity, pnl, change };
  });

  // Daily P&L Data
  const dailyPnLData: DailyPnLDataPoint[] = sortedDates.map((date, i) => {
    const equity = dailyBalanceMap[date];
    const prevEquity = i > 0 ? dailyBalanceMap[sortedDates[i - 1]] : raw.deposit;
    return { date, pnl: equity - prevEquity };
  });

  // Hourly profit from trades
  const hourlyProfitMap: Record<number, number> = {};
  for (const t of trades) {
    hourlyProfitMap[t.close_hour] = (hourlyProfitMap[t.close_hour] || 0) + t.profit;
  }
  const hourProfitData: HourProfitDataPoint[] = Array.from({ length: 24 }, (_, hour) => ({
    hour,
    profit: hourlyProfitMap[hour] || 0,
  }));

  // Day of week profit from trades
  const dowProfitMap: Record<number, number> = {};
  for (const t of trades) {
    dowProfitMap[t.close_dow] = (dowProfitMap[t.close_dow] || 0) + t.profit;
  }
  const dayProfitData: DayProfitDataPoint[] = DAY_NAMES.slice(0, 5).map((day, index) => ({
    day,
    profit: dowProfitMap[index] || 0,
  }));

  // Monthly profit from trades
  const yearlyMonthlyProfit: Record<string, Record<string, number>> = {};
  const yearlyMonthlyTrades: Record<string, Record<string, number>> = {};
  for (const t of trades) {
    const [year, month] = t.close_date.split('-');
    if (!yearlyMonthlyProfit[year]) yearlyMonthlyProfit[year] = {};
    if (!yearlyMonthlyTrades[year]) yearlyMonthlyTrades[year] = {};
    yearlyMonthlyProfit[year][month] = (yearlyMonthlyProfit[year][month] || 0) + t.profit;
    yearlyMonthlyTrades[year][month] = (yearlyMonthlyTrades[year][month] || 0) + 1;
  }

  // Monthly Returns Data
  const monthlyReturnsData: MonthlyReturnDataPoint[] = [];
  const years = Object.keys(yearlyMonthlyProfit).sort();
  for (const year of years) {
    const months = yearlyMonthlyProfit[year];
    for (const month of Object.keys(months).sort()) {
      monthlyReturnsData.push({
        date: `${year}-${month}`,
        return: months[month],
      });
    }
  }

  // Profit distribution from trades
  const profitDistMap: Record<string, number> = {};
  const bucketSize = 50;
  for (const t of trades) {
    const bucket = Math.floor(t.profit / bucketSize) * bucketSize;
    const label = `${bucket}`;
    profitDistMap[label] = (profitDistMap[label] || 0) + 1;
  }
  const distributionData: DistributionDataPoint[] = Object.entries(profitDistMap)
    .map(([range, count]) => ({ range, count }))
    .sort((a, b) => parseFloat(a.range) - parseFloat(b.range));

  // Duration distribution - derive from trade-level duration_hours
  let durationDistData: DurationDistDataPoint[] = [];
  const durationVsProfitData: DurationVsProfitPoint[] = [];

  const tradesWithDuration = trades.filter(t => t.duration_hours != null);
  if (tradesWithDuration.length > 0) {
    // Build duration buckets from actual trade data
    const buckets: Record<string, { count: number; profit: number }> = {};
    for (const t of tradesWithDuration) {
      const hours = t.duration_hours!;
      let label: string;
      if (hours < 1) label = '0-1h';
      else if (hours < 2) label = '1-2h';
      else if (hours < 4) label = '2-4h';
      else if (hours < 8) label = '4-8h';
      else if (hours < 16) label = '8-16h';
      else if (hours < 24) label = '16-24h';
      else if (hours < 48) label = '24-48h';
      else if (hours < 72) label = '48-72h';
      else label = '72h+';

      if (!buckets[label]) buckets[label] = { count: 0, profit: 0 };
      buckets[label].count++;
      buckets[label].profit += t.profit;

      // Scatter data
      durationVsProfitData.push({ durationHours: hours, profit: t.profit });
    }

    const order = ['0-1h','1-2h','2-4h','4-8h','8-16h','16-24h','24-48h','48-72h','72h+'];
    durationDistData = order
      .filter(k => buckets[k])
      .map(k => ({ range: k, count: buckets[k].count, profit: buckets[k].profit }));
  } else if (raw.duration_buckets && Object.keys(raw.duration_buckets).length > 0) {
    // Fallback to pre-calculated buckets
    durationDistData = Object.entries(raw.duration_buckets)
      .map(([range, { count, profit }]) => ({ range, count, profit }))
      .sort((a, b) => parseFloat(a.range.replace(/[^0-9.-]/g, '')) - parseFloat(b.range.replace(/[^0-9.-]/g, '')));
  }

  // Trades Data
  const tradesData: TradeDataPoint[] = trades.map((trade, i) => ({
    id: i + 1,
    openTime: trade.open_time || '',
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
    const profits = yearlyMonthlyProfit[year] || {};
    const tradesCounts = yearlyMonthlyTrades[year] || {};
    const months: Record<number, number> = {};
    const tradesPerMonth: Record<number, number> = {};
    let total = 0;
    
    for (let m = 1; m <= 12; m++) {
      const mStr = m.toString().padStart(2, '0');
      months[m] = profits[mStr] || 0;
      tradesPerMonth[m] = tradesCounts[mStr] || 0;
      total += months[m];
    }
    
    return { year: parseInt(year), months, total, tradesPerMonth };
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
