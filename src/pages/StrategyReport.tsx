import { useLocation, Navigate, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useBacktestData } from "@/hooks/useBacktestData";
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
import { strategyExists, getStrategyConfig } from "@/data/strategies";
import { reportInfo, advancedStats, longShortData, drawdownsData, monthlyPerformanceMatrix } from "@/data/backtestData";

const StrategyReport = () => {
  const location = useLocation();
  
  // Extract strategyId from path (e.g., "/dfadam/backtest-report" -> "dfadam")
  const pathParts = location.pathname.split('/').filter(Boolean);
  const strategyId = pathParts[0] || "";
  
  // Validate strategy exists
  if (!strategyId || !strategyExists(strategyId)) {
    return <Navigate to="/" replace />;
  }
  
  const config = getStrategyConfig(strategyId);
  
  // Use backtest data hook (for now using DFcovenant data as fallback)
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
  } = useBacktestData();

  const currency = config.currency === "EUR" ? "€" : "$";

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-border py-8">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between mb-4">
            <Link 
              to={config.landingPath} 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to {config.name}
            </Link>
            <StrategySelector currentStrategy={strategyId} context="report" />
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold">
              <span className="text-foreground">DF</span>
              <span className="text-primary">717</span>
              <span className="text-muted-foreground ml-2">Analytics</span>
            </h1>
            <p className="text-muted-foreground mt-1">Backtest Analysis Report - {config.name}</p>
            <p className="text-xs text-muted-foreground font-mono mt-2">
              Generated: {reportInfo.generatedDate}
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
              <span className="font-medium">{config.name}</span>
            </div>
            <div className="hidden md:block w-px h-8 bg-border" />
            <div className="text-center">
              <span className="text-muted-foreground text-xs block">Symbol</span>
              <span className="font-medium">{config.symbol}</span>
            </div>
            <div className="hidden md:block w-px h-8 bg-border" />
            <div className="text-center">
              <span className="text-muted-foreground text-xs block">Period</span>
              <span className="font-medium">{config.period}</span>
            </div>
            <div className="hidden md:block w-px h-8 bg-border" />
            <div className="text-center">
              <span className="text-muted-foreground text-xs block">Dates</span>
              <span className="font-medium">{config.tradingPeriod.startDate} — {config.tradingPeriod.endDate}</span>
            </div>
            <div className="hidden md:block w-px h-8 bg-border" />
            <div className="text-center">
              <span className="text-muted-foreground text-xs block">Deposit</span>
              <span className="font-medium">{config.tradingPeriod.initialDeposit}</span>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-6 py-8 max-w-7xl">
        {/* Key Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <div className="bg-card border border-border rounded-lg p-4 text-center">
            <p className="text-xs text-muted-foreground mb-1">NET PROFIT</p>
            <p className="text-xl font-bold text-success">+{config.performanceMetrics.primary[0].value}</p>
            <p className="text-xs text-muted-foreground mt-1">{config.performanceMetrics.primary[2].value} trades</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4 text-center">
            <p className="text-xs text-muted-foreground mb-1">WIN RATE</p>
            <p className="text-xl font-bold text-primary">{config.performanceMetrics.primary[3].value}</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4 text-center">
            <p className="text-xs text-muted-foreground mb-1">PROFIT FACTOR</p>
            <p className="text-xl font-bold text-success">{config.performanceMetrics.primary[1].value}</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4 text-center">
            <p className="text-xs text-muted-foreground mb-1">MAX DRAWDOWN</p>
            <p className="text-xl font-bold text-destructive">{config.riskMetrics[0].value}</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4 text-center">
            <p className="text-xs text-muted-foreground mb-1">RECOVERY FACTOR</p>
            <p className="text-xl font-bold text-success">{config.performanceMetrics.secondary[1].value}</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4 text-center">
            <p className="text-xs text-muted-foreground mb-1">SHARPE RATIO</p>
            <p className="text-xl font-bold text-success">{config.performanceMetrics.secondary[2].value}</p>
          </div>
        </div>

        {/* Long vs Short */}
        <h3 className="text-lg font-semibold mb-4">Long vs Short</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-card border border-border rounded-lg p-4">
            <h4 className="text-success font-semibold mb-3">Long (Buy)</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Trades</span><span>{longShortData.long.trades}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Win Rate</span><span>{longShortData.long.winRate}%</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Profit</span><span className="text-success">+{currency}{longShortData.long.profit.toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Avg Profit</span><span className="text-success">+{currency}{longShortData.long.avgProfit.toLocaleString()}</span></div>
            </div>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <h4 className="text-destructive font-semibold mb-3">Short (Sell)</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Trades</span><span>{longShortData.short.trades}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Win Rate</span><span>{longShortData.short.winRate}%</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Profit</span><span className="text-success">+{currency}{longShortData.short.profit.toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Avg Profit</span><span className="text-success">+{currency}{longShortData.short.avgProfit.toLocaleString()}</span></div>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-card border border-border rounded-lg p-4">
            <h4 className="text-sm font-medium text-primary mb-3">Performance</h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between"><span className="text-muted-foreground">Net Profit</span><span className="text-success">{config.performanceMetrics.primary[0].value}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Profit Factor</span><span>{config.performanceMetrics.primary[1].value}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Expectancy</span><span className="text-success">{config.performanceMetrics.secondary[0].value}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Sharpe Ratio</span><span>{config.performanceMetrics.secondary[2].value}</span></div>
            </div>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <h4 className="text-sm font-medium text-primary mb-3">Risk Ratios</h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between"><span className="text-muted-foreground">Sortino Ratio</span><span>{config.performanceMetrics.secondary[3].value}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Calmar Ratio</span><span>{config.riskMetrics[3].value}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Recovery Factor</span><span>{config.performanceMetrics.secondary[1].value}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Risk/Reward</span><span>{config.additionalMetrics[0].value}</span></div>
            </div>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <h4 className="text-sm font-medium text-primary mb-3">Trade Stats</h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between"><span className="text-muted-foreground">Total Trades</span><span>{config.performanceMetrics.primary[2].value}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Win Rate</span><span>{config.performanceMetrics.primary[3].value}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Max Win Streak</span><span>{config.additionalMetrics[1].value}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Max Loss Streak</span><span>{config.additionalMetrics[2].value}</span></div>
            </div>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <h4 className="text-sm font-medium text-primary mb-3">Risk</h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between"><span className="text-muted-foreground">Equity DD %</span><span className="text-destructive">{config.riskMetrics[0].value}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Balance DD %</span><span className="text-destructive">{config.riskMetrics[1].value}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Max DD Days</span><span>{config.riskMetrics[2].value}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Avg Days/Trade</span><span>{config.additionalMetrics[3].value}</span></div>
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
                {drawdownsData.map((dd) => (
                  <tr key={dd.rank} className="hover:bg-muted/30">
                    <td className="px-4 py-3">{dd.rank}</td>
                    <td className="px-4 py-3">{dd.start}</td>
                    <td className="px-4 py-3">{dd.bottom}</td>
                    <td className="px-4 py-3">{dd.recovery}</td>
                    <td className="px-4 py-3 text-right text-destructive">-{currency}{Math.abs(dd.depth).toLocaleString()}</td>
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
                {monthlyPerformanceMatrix.map((row) => (
                  <tr key={row.year} className="hover:bg-muted/30">
                    <td className="px-3 py-2 font-medium">{row.year}</td>
                    {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(month => {
                      const value = row[month as keyof typeof row] as number | null;
                      return (
                        <td key={month} className={`px-2 py-2 text-right ${value === null ? 'text-muted-foreground' : value >= 0 ? 'text-success' : 'text-destructive'}`}>
                          {value === null ? '-' : `${value >= 0 ? '+' : ''}{currency}${Math.abs(value).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`}
                        </td>
                      );
                    })}
                    <td className={`px-3 py-2 text-right font-medium ${row.total >= 0 ? 'text-success' : 'text-destructive'}`}>
                      {row.total >= 0 ? '+' : ''}{currency}{Math.abs(row.total).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
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

export default StrategyReport;
