import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useUniversalStrategyData } from "@/hooks/useUniversalStrategyData";
import BacktestEquityCurveChart from "@/components/backtest/charts/BacktestEquityCurveChart";
import BacktestDailyPnLChart from "@/components/backtest/charts/BacktestDailyPnLChart";
import BacktestMonthlyReturnsChart from "@/components/backtest/charts/BacktestMonthlyReturnsChart";
import BacktestDistributionChart from "@/components/backtest/charts/BacktestDistributionChart";
import ProfitByHourChart from "@/components/backtest/charts/ProfitByHourChart";
import ProfitByDayChart from "@/components/backtest/charts/ProfitByDayChart";
import DurationVsProfitScatter from "@/components/backtest/charts/DurationVsProfitScatter";
import DurationDistributionChart from "@/components/backtest/charts/DurationDistributionChart";
import TradesTable from "@/components/backtest/TradesTable";
import StrategySelector from "@/components/backtest/StrategySelector";

const UniversalStrategyReport = () => {
  const { strategyId } = useParams<{ strategyId: string }>();
  const normalizedId = strategyId?.toLowerCase() || '';
  const { data, isLoading, error } = useUniversalStrategyData(normalizedId);

  if (error) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-destructive mb-2">Strategy Not Found</h1>
          <p className="text-muted-foreground">{error}</p>
          <Link to="/" className="text-primary hover:underline mt-4 inline-block">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  if (isLoading || !data) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-muted-foreground">Loading strategy data...</p>
        </div>
      </div>
    );
  }

  const currencySymbol = data.currency === 'EUR' ? '€' : '$';
  const formatCurrency = (value: number) => {
    const sign = value >= 0 ? '+' : '';
    return `${sign}${currencySymbol}${Math.abs(value).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-border py-8">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between mb-4">
            <Link 
              to={`/${normalizedId}`}
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to {strategyId}
            </Link>
            <StrategySelector currentStrategy={normalizedId} context="report" />
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold">
              <span className="text-foreground">DF</span>
              <span className="text-primary">717</span>
              <span className="text-muted-foreground ml-2">Analytics</span>
            </h1>
            <p className="text-muted-foreground mt-1">Backtest Analysis Report - {strategyId}</p>
            <p className="text-xs text-muted-foreground font-mono mt-2">
              Generated: {data.reportInfo.generatedDate}
            </p>
          </div>
        </div>
      </div>

      {/* Info Bar */}
      <div className="bg-card/50 border-b border-border py-4">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-sm">
            <div className="text-center">
              <span className="text-muted-foreground text-xs block">EA</span>
              <span className="font-medium">{data.reportInfo.ea}</span>
            </div>
            <div className="hidden md:block w-px h-8 bg-border" />
            <div className="text-center">
              <span className="text-muted-foreground text-xs block">Symbol</span>
              <span className="font-medium">{data.reportInfo.symbol}</span>
            </div>
            <div className="hidden md:block w-px h-8 bg-border" />
            <div className="text-center">
              <span className="text-muted-foreground text-xs block">Period</span>
              <span className="font-medium">{data.reportInfo.period}</span>
            </div>
            <div className="hidden md:block w-px h-8 bg-border" />
            <div className="text-center">
              <span className="text-muted-foreground text-xs block">Dates</span>
              <span className="font-medium">{data.reportInfo.dates}</span>
            </div>
            <div className="hidden md:block w-px h-8 bg-border" />
            <div className="text-center">
              <span className="text-muted-foreground text-xs block">Deposit</span>
              <span className="font-medium">{data.reportInfo.deposit}</span>
            </div>
            <div className="hidden md:block w-px h-8 bg-border" />
            <div className="text-center">
              <span className="text-muted-foreground text-xs block">Leverage</span>
              <span className="font-medium">{data.reportInfo.leverage}</span>
            </div>
            <div className="hidden md:block w-px h-8 bg-border" />
            <div className="text-center">
              <span className="text-muted-foreground text-xs block">Trades</span>
              <span className="font-medium">{data.reportInfo.trades}</span>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-6 py-8 max-w-7xl">
        {/* Key Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <div className="bg-card border border-border rounded-lg p-4 text-center">
            <p className="text-xs text-muted-foreground mb-1">NET PROFIT</p>
            <p className={`text-xl font-bold ${data.keyStats.netProfit >= 0 ? 'text-success' : 'text-destructive'}`}>
              {formatCurrency(data.keyStats.netProfit)}
            </p>
            <p className="text-xs text-muted-foreground mt-1">{data.keyStats.totalTrades} trades</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4 text-center">
            <p className="text-xs text-muted-foreground mb-1">WIN RATE</p>
            <p className="text-xl font-bold text-primary">{data.keyStats.winRate.toFixed(1)}%</p>
            <p className="text-xs text-muted-foreground mt-1">{data.keyStats.winTrades}W / {data.keyStats.lossTrades}L</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4 text-center">
            <p className="text-xs text-muted-foreground mb-1">PROFIT FACTOR</p>
            <p className="text-xl font-bold text-success">{data.keyStats.profitFactor.toFixed(2)}</p>
            <p className="text-xs text-muted-foreground mt-1">GP: {currencySymbol}{data.keyStats.grossProfit.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4 text-center">
            <p className="text-xs text-muted-foreground mb-1">MAX DRAWDOWN</p>
            <p className="text-xl font-bold text-destructive">{data.keyStats.maxDDPercent.toFixed(1)}%</p>
            <p className="text-xs text-muted-foreground mt-1">-{currencySymbol}{Math.abs(data.keyStats.maxDDAbs).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4 text-center">
            <p className="text-xs text-muted-foreground mb-1">BEST TRADE</p>
            <p className="text-xl font-bold text-success">{formatCurrency(data.keyStats.bestTrade)}</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4 text-center">
            <p className="text-xs text-muted-foreground mb-1">WORST TRADE</p>
            <p className="text-xl font-bold text-destructive">{formatCurrency(data.keyStats.worstTrade)}</p>
          </div>
        </div>

        {/* Long vs Short */}
        <h3 className="text-lg font-semibold mb-4">Long vs Short</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-card border border-border rounded-lg p-4">
            <h4 className="text-success font-semibold mb-3">Long (Buy)</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Trades</span><span>{data.longShortData.long.trades}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Win Rate</span><span>{data.longShortData.long.winRate.toFixed(1)}%</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Profit</span><span className="text-success">{formatCurrency(data.longShortData.long.profit)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Avg Profit</span><span className="text-success">{formatCurrency(data.longShortData.long.avgProfit)}</span></div>
            </div>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <h4 className="text-destructive font-semibold mb-3">Short (Sell)</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Trades</span><span>{data.longShortData.short.trades}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Win Rate</span><span>{data.longShortData.short.winRate.toFixed(1)}%</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Profit</span><span className="text-success">{formatCurrency(data.longShortData.short.profit)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Avg Profit</span><span className="text-success">{formatCurrency(data.longShortData.short.avgProfit)}</span></div>
            </div>
          </div>
        </div>

        {/* Equity Curve */}
        <div className="bg-card border border-border rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Equity Curve</h3>
          {data.equityData.length > 0 ? (
            <BacktestEquityCurveChart data={data.equityData} />
          ) : (
            <div className="h-[380px] flex items-center justify-center text-muted-foreground">No equity data available</div>
          )}
        </div>

        {/* Daily P&L */}
        <div className="bg-card border border-border rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Daily P&L</h3>
          {data.dailyPnLData.length > 0 ? (
            <BacktestDailyPnLChart data={data.dailyPnLData} />
          ) : (
            <div className="h-[300px] flex items-center justify-center text-muted-foreground">No daily P&L data available</div>
          )}
        </div>

        {/* Charts Row - Monthly Returns & Distribution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Monthly Returns</h3>
            {data.monthlyReturnsData.length > 0 ? (
              <BacktestMonthlyReturnsChart data={data.monthlyReturnsData} />
            ) : (
              <div className="h-[274px] flex items-center justify-center text-muted-foreground">No data available</div>
            )}
          </div>
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Distribution</h3>
            {data.distributionData.length > 0 ? (
              <BacktestDistributionChart data={data.distributionData} />
            ) : (
              <div className="h-[274px] flex items-center justify-center text-muted-foreground">No data available</div>
            )}
          </div>
        </div>

        {/* Charts Row - Profit by Hour & Profit by Day */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Profit by Hour</h3>
            {data.hourProfitData.length > 0 ? (
              <ProfitByHourChart data={data.hourProfitData} />
            ) : (
              <div className="h-[274px] flex items-center justify-center text-muted-foreground">No data available</div>
            )}
          </div>
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Profit by Day of Week</h3>
            {data.dayProfitData.length > 0 ? (
              <ProfitByDayChart data={data.dayProfitData} />
            ) : (
              <div className="h-[274px] flex items-center justify-center text-muted-foreground">No data available</div>
            )}
          </div>
        </div>

        {/* Charts Row - Duration vs Profit & Duration Distribution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Duration vs Profit</h3>
            {data.durationVsProfitData.length > 0 ? (
              <DurationVsProfitScatter data={data.durationVsProfitData} />
            ) : (
              <div className="h-[320px] flex items-center justify-center text-muted-foreground">No data available</div>
            )}
          </div>
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Duration Distribution</h3>
            {data.durationDistData.length > 0 ? (
              <DurationDistributionChart data={data.durationDistData} />
            ) : (
              <div className="h-[274px] flex items-center justify-center text-muted-foreground">No data available</div>
            )}
          </div>
        </div>

        {/* Advanced Statistics */}
        <h3 className="text-lg font-semibold mb-4">Advanced Statistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <div className="bg-card border border-border rounded-lg p-4">
            <h4 className="text-sm font-medium text-primary mb-3">Performance</h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between"><span className="text-muted-foreground">Net Profit</span><span className="text-success">{formatCurrency(data.advancedStats.performance.netProfit)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Gross Profit</span><span className="text-success">{formatCurrency(data.advancedStats.performance.grossProfit)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Gross Loss</span><span className="text-destructive">{formatCurrency(data.advancedStats.performance.grossLoss)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Profit Factor</span><span>{data.advancedStats.performance.profitFactor.toFixed(2)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Expectancy</span><span className="text-success">{formatCurrency(data.advancedStats.performance.expectancy)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Sharpe Ratio</span><span>{data.advancedStats.performance.sharpeRatio.toFixed(2)}</span></div>
            </div>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <h4 className="text-sm font-medium text-primary mb-3">Risk Ratios</h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between"><span className="text-muted-foreground">Sortino Ratio</span><span>{data.advancedStats.riskRatios.sortinoRatio.toFixed(2)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Calmar Ratio</span><span>{data.advancedStats.riskRatios.calmarRatio.toFixed(2)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Recovery Factor</span><span>{data.advancedStats.riskRatios.recoveryFactor.toFixed(2)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Kelly Criterion</span><span>{data.advancedStats.riskRatios.kellyCriterion.toFixed(1)}%</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Risk/Reward</span><span>{data.advancedStats.riskRatios.riskReward.toFixed(2)}</span></div>
            </div>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <h4 className="text-sm font-medium text-primary mb-3">Trade Stats</h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between"><span className="text-muted-foreground">Total Trades</span><span>{data.advancedStats.tradeStats.totalTrades}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Win Rate</span><span>{data.advancedStats.tradeStats.winRate.toFixed(1)}%</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Avg Win</span><span className="text-success">{formatCurrency(data.advancedStats.tradeStats.avgWin)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Avg Loss</span><span className="text-destructive">{formatCurrency(data.advancedStats.tradeStats.avgLoss)}</span></div>
            </div>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <h4 className="text-sm font-medium text-primary mb-3">Drawdown</h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between"><span className="text-muted-foreground">Max DD (Equity)</span><span className="text-destructive">{data.advancedStats.drawdown.maxDDEquity.toFixed(2)}%</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Max DD (Balance)</span><span className="text-destructive">{data.advancedStats.drawdown.maxDDBalance.toFixed(2)}%</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Equity DD Value</span><span className="text-destructive">-{currencySymbol}{Math.abs(data.advancedStats.drawdown.equityDDValue).toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Balance DD Value</span><span className="text-destructive">-{currencySymbol}{Math.abs(data.advancedStats.drawdown.balanceDDValue).toLocaleString()}</span></div>
            </div>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <h4 className="text-sm font-medium text-primary mb-3">Costs</h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between"><span className="text-muted-foreground">Total Volume</span><span>{data.advancedStats.costs.totalVolume.toFixed(2)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Total Commission</span><span>{currencySymbol}{data.advancedStats.costs.totalCommission.toFixed(2)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Total Swap</span><span>{currencySymbol}{data.advancedStats.costs.totalSwap.toFixed(2)}</span></div>
            </div>
          </div>
        </div>

        {/* Monthly Performance Matrix */}
        <h3 className="text-lg font-semibold mb-4">Monthly Performance</h3>
        <div className="bg-card border border-border rounded-lg overflow-hidden mb-8">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-3 py-2 text-left font-medium text-muted-foreground">Year</th>
                  {Array.from({ length: 12 }, (_, i) => (
                    <th key={i} className="px-3 py-2 text-right font-medium text-muted-foreground">
                      {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i]}
                    </th>
                  ))}
                  <th className="px-3 py-2 text-right font-medium text-muted-foreground">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {data.monthlyPerformanceMatrix.map((row) => (
                  <tr key={row.year} className="hover:bg-muted/30">
                    <td className="px-3 py-2 font-medium">{row.year}</td>
                    {Array.from({ length: 12 }, (_, i) => {
                      const value = row.months[i + 1] || 0;
                      return (
                        <td key={i} className={`px-3 py-2 text-right font-mono ${value >= 0 ? 'text-success' : 'text-destructive'}`}>
                          {value !== 0 ? `${value >= 0 ? '+' : ''}${currencySymbol}${Math.abs(value).toFixed(0)}` : '-'}
                        </td>
                      );
                    })}
                    <td className={`px-3 py-2 text-right font-mono font-medium ${row.total >= 0 ? 'text-success' : 'text-destructive'}`}>
                      {row.total >= 0 ? '+' : ''}{currencySymbol}{Math.abs(row.total).toFixed(0)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Trades Table */}
        <TradesTable data={data.tradesData} totalTrades={data.keyStats.totalTrades} />
      </main>
    </div>
  );
};

export default UniversalStrategyReport;
