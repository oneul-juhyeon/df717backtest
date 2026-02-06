import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useDFtrustData } from "@/hooks/useDFtrustData";
import BacktestEquityCurveChart from "@/components/backtest/charts/BacktestEquityCurveChart";
import BacktestDailyPnLChart from "@/components/backtest/charts/BacktestDailyPnLChart";
import BacktestMonthlyReturnsChart from "@/components/backtest/charts/BacktestMonthlyReturnsChart";
import BacktestDistributionChart from "@/components/backtest/charts/BacktestDistributionChart";
import ProfitByHourChart from "@/components/backtest/charts/ProfitByHourChart";
import ProfitByDayChart from "@/components/backtest/charts/ProfitByDayChart";
import DurationVsProfitScatter from "@/components/backtest/charts/DurationVsProfitScatter";
import DurationDistributionChart from "@/components/backtest/charts/DurationDistributionChart";
import TradesTable from "@/components/backtest/TradesTable";
import { 
  dftrustReportInfo, 
  dftrustAdvancedStats, 
  dftrustLongShortData, 
  dftrustDrawdownsData, 
  dftrustMonthlyPerformanceMatrix 
} from "@/data/dftrustData";
import StrategyNav from "@/components/backtest/StrategyNav";

const DFtrustReport = () => {
  const { 
    equityData, 
    dailyPnLData, 
    monthlyReturnsData, 
    distributionData,
    hourProfitData,
    dayProfitData,
    durationVsProfitData,
    durationDistData,
    tradesData,
    totalTrades,
    isLoading 
  } = useDFtrustData();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-border py-8">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between mb-4">
            <Link 
              to="/dftrust" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to DFtrust
            </Link>
            <StrategyNav currentStrategy="dftrust" />
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold">
              <span className="text-foreground">DF</span>
              <span className="text-primary">717</span>
              <span className="text-muted-foreground ml-2">Analytics</span>
            </h1>
            <p className="text-muted-foreground mt-1">Backtest Analysis Report - DFtrust</p>
            <p className="text-xs text-muted-foreground font-mono mt-2">
              Generated: {dftrustReportInfo.generatedDate}
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
              <span className="font-medium">{dftrustReportInfo.ea}</span>
            </div>
            <div className="hidden md:block w-px h-8 bg-border" />
            <div className="text-center">
              <span className="text-muted-foreground text-xs block">Symbol</span>
              <span className="font-medium">{dftrustReportInfo.symbol}</span>
            </div>
            <div className="hidden md:block w-px h-8 bg-border" />
            <div className="text-center">
              <span className="text-muted-foreground text-xs block">Period</span>
              <span className="font-medium">{dftrustReportInfo.period}</span>
            </div>
            <div className="hidden md:block w-px h-8 bg-border" />
            <div className="text-center">
              <span className="text-muted-foreground text-xs block">Dates</span>
              <span className="font-medium">{dftrustReportInfo.dates}</span>
            </div>
            <div className="hidden md:block w-px h-8 bg-border" />
            <div className="text-center">
              <span className="text-muted-foreground text-xs block">Deposit</span>
              <span className="font-medium">{dftrustReportInfo.deposit}</span>
            </div>
            <div className="hidden md:block w-px h-8 bg-border" />
            <div className="text-center">
              <span className="text-muted-foreground text-xs block">Leverage</span>
              <span className="font-medium">{dftrustReportInfo.leverage}</span>
            </div>
            <div className="hidden md:block w-px h-8 bg-border" />
            <div className="text-center">
              <span className="text-muted-foreground text-xs block">Trades</span>
              <span className="font-medium">{dftrustReportInfo.trades}</span>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-6 py-8 max-w-7xl">
        {/* Key Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <div className="bg-card border border-border rounded-lg p-4 text-center">
            <p className="text-xs text-muted-foreground mb-1">NET PROFIT</p>
            <p className="text-xl font-bold text-success">+$3,306.36</p>
            <p className="text-xs text-muted-foreground mt-1">1246 trades</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4 text-center">
            <p className="text-xs text-muted-foreground mb-1">WIN RATE</p>
            <p className="text-xl font-bold text-primary">61.8%</p>
            <p className="text-xs text-muted-foreground mt-1">770W / 476L</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4 text-center">
            <p className="text-xs text-muted-foreground mb-1">PROFIT FACTOR</p>
            <p className="text-xl font-bold text-success">1.44</p>
            <p className="text-xs text-muted-foreground mt-1">GP: $8,427.39</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4 text-center">
            <p className="text-xs text-muted-foreground mb-1">MAX DRAWDOWN</p>
            <p className="text-xl font-bold text-destructive">12.2%</p>
            <p className="text-xs text-muted-foreground mt-1">-$257.34</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4 text-center">
            <p className="text-xs text-muted-foreground mb-1">BEST TRADE</p>
            <p className="text-xl font-bold text-success">+$91.60</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4 text-center">
            <p className="text-xs text-muted-foreground mb-1">WORST TRADE</p>
            <p className="text-xl font-bold text-destructive">-$61.20</p>
          </div>
        </div>

        {/* Long vs Short */}
        <h3 className="text-lg font-semibold mb-4">Long vs Short</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-card border border-border rounded-lg p-4">
            <h4 className="text-success font-semibold mb-3">Long (Buy)</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Trades</span><span>{dftrustLongShortData.long.trades}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Win Rate</span><span>{dftrustLongShortData.long.winRate}%</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Profit</span><span className="text-success">+${dftrustLongShortData.long.profit.toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Avg Profit</span><span className="text-success">+${dftrustLongShortData.long.avgProfit.toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Best</span><span className="text-success">+${dftrustLongShortData.long.best.toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Worst</span><span className="text-destructive">-${Math.abs(dftrustLongShortData.long.worst).toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Volume</span><span>{dftrustLongShortData.long.volume.toLocaleString()}</span></div>
            </div>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <h4 className="text-destructive font-semibold mb-3">Short (Sell)</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Trades</span><span>{dftrustLongShortData.short.trades}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Win Rate</span><span>{dftrustLongShortData.short.winRate}%</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Profit</span><span className="text-success">+${dftrustLongShortData.short.profit.toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Avg Profit</span><span className="text-success">+${dftrustLongShortData.short.avgProfit.toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Best</span><span className="text-success">+${dftrustLongShortData.short.best.toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Worst</span><span className="text-destructive">-${Math.abs(dftrustLongShortData.short.worst).toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Volume</span><span>{dftrustLongShortData.short.volume.toLocaleString()}</span></div>
            </div>
          </div>
        </div>

        {/* Equity Curve */}
        <div className="bg-card border border-border rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Equity Curve</h3>
          {isLoading ? (
            <div className="h-[380px] flex items-center justify-center text-muted-foreground">Loading chart data...</div>
          ) : equityData.length > 0 ? (
            <BacktestEquityCurveChart data={equityData} />
          ) : (
            <div className="h-[380px] flex items-center justify-center text-muted-foreground">No equity data available</div>
          )}
        </div>

        {/* Daily P&L */}
        <div className="bg-card border border-border rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Daily P&L</h3>
          {isLoading ? (
            <div className="h-[300px] flex items-center justify-center text-muted-foreground">Loading chart data...</div>
          ) : dailyPnLData.length > 0 ? (
            <BacktestDailyPnLChart data={dailyPnLData} />
          ) : (
            <div className="h-[300px] flex items-center justify-center text-muted-foreground">No daily P&L data available</div>
          )}
        </div>

        {/* Charts Row - Monthly Returns & Distribution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Monthly Returns</h3>
            {isLoading ? (
              <div className="h-[274px] flex items-center justify-center text-muted-foreground">Loading...</div>
            ) : monthlyReturnsData.length > 0 ? (
              <BacktestMonthlyReturnsChart data={monthlyReturnsData} />
            ) : (
              <div className="h-[274px] flex items-center justify-center text-muted-foreground">No data available</div>
            )}
          </div>
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Distribution</h3>
            {isLoading ? (
              <div className="h-[274px] flex items-center justify-center text-muted-foreground">Loading...</div>
            ) : distributionData.length > 0 ? (
              <BacktestDistributionChart data={distributionData} />
            ) : (
              <div className="h-[274px] flex items-center justify-center text-muted-foreground">No data available</div>
            )}
          </div>
        </div>

        {/* Charts Row - Profit by Hour & Profit by Day */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Profit by Hour</h3>
            {isLoading ? (
              <div className="h-[274px] flex items-center justify-center text-muted-foreground">Loading...</div>
            ) : hourProfitData.length > 0 ? (
              <ProfitByHourChart data={hourProfitData} />
            ) : (
              <div className="h-[274px] flex items-center justify-center text-muted-foreground">No data available</div>
            )}
          </div>
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Profit by Day of Week</h3>
            {isLoading ? (
              <div className="h-[274px] flex items-center justify-center text-muted-foreground">Loading...</div>
            ) : dayProfitData.length > 0 ? (
              <ProfitByDayChart data={dayProfitData} />
            ) : (
              <div className="h-[274px] flex items-center justify-center text-muted-foreground">No data available</div>
            )}
          </div>
        </div>

        {/* Charts Row - Duration vs Profit & Duration Distribution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Duration vs Profit</h3>
            {isLoading ? (
              <div className="h-[320px] flex items-center justify-center text-muted-foreground">Loading...</div>
            ) : durationVsProfitData.length > 0 ? (
              <DurationVsProfitScatter data={durationVsProfitData} />
            ) : (
              <div className="h-[320px] flex items-center justify-center text-muted-foreground">No data available</div>
            )}
          </div>
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Duration Distribution</h3>
            {isLoading ? (
              <div className="h-[274px] flex items-center justify-center text-muted-foreground">Loading...</div>
            ) : durationDistData.length > 0 ? (
              <DurationDistributionChart data={durationDistData} />
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
              <div className="flex justify-between"><span className="text-muted-foreground">Net Profit</span><span className="text-success">+${dftrustAdvancedStats.performance.netProfit.toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Gross Profit</span><span className="text-success">+${dftrustAdvancedStats.performance.grossProfit.toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Gross Loss</span><span className="text-destructive">-${Math.abs(dftrustAdvancedStats.performance.grossLoss).toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Profit Factor</span><span>{dftrustAdvancedStats.performance.profitFactor}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Expectancy</span><span className="text-success">+${dftrustAdvancedStats.performance.expectancy}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Sharpe Ratio</span><span>{dftrustAdvancedStats.performance.sharpeRatio}</span></div>
            </div>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <h4 className="text-sm font-medium text-primary mb-3">Risk Ratios</h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between"><span className="text-muted-foreground">Sortino Ratio</span><span>{dftrustAdvancedStats.riskRatios.sortinoRatio}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Calmar Ratio</span><span>{dftrustAdvancedStats.riskRatios.calmarRatio}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Recovery Factor</span><span>{dftrustAdvancedStats.riskRatios.recoveryFactor}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Kelly Criterion</span><span>{dftrustAdvancedStats.riskRatios.kellyCriterion}%</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Risk/Reward</span><span>{dftrustAdvancedStats.riskRatios.riskReward}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Avg Duration</span><span>{dftrustAdvancedStats.riskRatios.avgDuration}</span></div>
            </div>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <h4 className="text-sm font-medium text-primary mb-3">Trade Stats</h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between"><span className="text-muted-foreground">Total Trades</span><span>{dftrustAdvancedStats.tradeStats.totalTrades}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Win Rate</span><span>{dftrustAdvancedStats.tradeStats.winRate}%</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Winning</span><span>{dftrustAdvancedStats.tradeStats.winning}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Losing</span><span>{dftrustAdvancedStats.tradeStats.losing}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Breakeven</span><span>{dftrustAdvancedStats.tradeStats.breakeven}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Days Traded</span><span>{dftrustAdvancedStats.tradeStats.daysTraded}</span></div>
            </div>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <h4 className="text-sm font-medium text-primary mb-3">Risk</h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between"><span className="text-muted-foreground">Equity DD %</span><span className="text-destructive">{dftrustAdvancedStats.risk.equityDDPercent}%</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Balance DD %</span><span className="text-destructive">{dftrustAdvancedStats.risk.balanceDDPercent}%</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Max DD Days</span><span>{dftrustAdvancedStats.risk.maxDDDays}d</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Max Stagnation</span><span>{dftrustAdvancedStats.risk.maxStagnation}d</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Best Trade</span><span className="text-success">+${dftrustAdvancedStats.risk.bestTrade.toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Worst Trade</span><span className="text-destructive">-${Math.abs(dftrustAdvancedStats.risk.worstTrade).toLocaleString()}</span></div>
            </div>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <h4 className="text-sm font-medium text-primary mb-3">Streaks & Costs</h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between"><span className="text-muted-foreground">Win Streak</span><span>{dftrustAdvancedStats.streaksCosts.winStreak}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Loss Streak</span><span>{dftrustAdvancedStats.streaksCosts.lossStreak}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Commission</span><span className="text-destructive">-${Math.abs(dftrustAdvancedStats.streaksCosts.commission).toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Swap</span><span className="text-destructive">-${Math.abs(dftrustAdvancedStats.streaksCosts.swap).toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Total Volume</span><span>{dftrustAdvancedStats.streaksCosts.totalVolume}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Avg Volume</span><span>{dftrustAdvancedStats.streaksCosts.avgVolume}</span></div>
            </div>
          </div>
        </div>

        {/* Top 5 Drawdowns */}
        <h3 className="text-lg font-semibold mb-4">Top 5 Drawdowns</h3>
        <div className="bg-card border border-border rounded-lg overflow-hidden mb-8">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">#</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Start</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Bottom</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Recovery</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground">Depth</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground">Depth %</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground">Duration</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {dftrustDrawdownsData.map((dd) => (
                  <tr key={dd.rank} className="hover:bg-muted/30">
                    <td className="px-4 py-3">{dd.rank}</td>
                    <td className="px-4 py-3">{dd.start}</td>
                    <td className="px-4 py-3">{dd.bottom}</td>
                    <td className="px-4 py-3">{dd.recovery}</td>
                    <td className="px-4 py-3 text-right text-destructive">-${Math.abs(dd.depth).toLocaleString()}</td>
                    <td className="px-4 py-3 text-right text-destructive">{dd.depthPercent}%</td>
                    <td className="px-4 py-3 text-right">{dd.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Monthly Performance Matrix */}
        <h3 className="text-lg font-semibold mb-4">Monthly Performance Matrix</h3>
        <div className="bg-card border border-border rounded-lg overflow-hidden mb-8">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-3 py-2 text-left font-medium text-muted-foreground">Year</th>
                  {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(month => (
                    <th key={month} className="px-2 py-2 text-right font-medium text-muted-foreground">{month}</th>
                  ))}
                  <th className="px-3 py-2 text-right font-medium text-muted-foreground">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {dftrustMonthlyPerformanceMatrix.map((row) => (
                  <tr key={row.year} className="hover:bg-muted/30">
                    <td className="px-3 py-2 font-medium">{row.year}</td>
                    {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(month => {
                      const value = row[month as keyof typeof row] as number | null;
                      return (
                        <td key={month} className={`px-2 py-2 text-right ${value === null ? 'text-muted-foreground' : value >= 0 ? 'text-success' : 'text-destructive'}`}>
                          {value === null ? '-' : `${value >= 0 ? '+' : ''}$${Math.abs(value).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`}
                        </td>
                      );
                    })}
                    <td className={`px-3 py-2 text-right font-medium ${row.total >= 0 ? 'text-success' : 'text-destructive'}`}>
                      {row.total >= 0 ? '+' : ''}${Math.abs(row.total).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Trades Table */}
        <div className="mb-8">
          <TradesTable data={tradesData.slice(0, 200)} totalTrades={totalTrades} />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm text-muted-foreground">
            © 2025 DF717. Past performance is not indicative of future results. Trading involves substantial risk. All analytics are provided for educational purposes only.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default DFtrustReport;
