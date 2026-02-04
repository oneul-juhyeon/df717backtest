import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import EquityCurveChart from "@/components/backtest/charts/EquityCurveChart";
import DailyPnLChart from "@/components/backtest/charts/DailyPnLChart";
import MonthlyReturnsChart from "@/components/backtest/charts/MonthlyReturnsChart";
import DistributionChart from "@/components/backtest/charts/DistributionChart";
import { reportInfo, advancedStats, longShortData, drawdownsData, monthlyPerformanceMatrix } from "@/data/backtestData";

const formatCurrency = (value: number) => {
  const sign = value >= 0 ? '+' : '';
  return `${sign}$${Math.abs(value).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

const BacktestReport = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-border py-8">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between mb-4">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Overview
            </Link>
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold">
              <span className="text-foreground">DF</span>
              <span className="text-primary">717</span>
              <span className="text-muted-foreground ml-2">Analytics</span>
            </h1>
            <p className="text-muted-foreground mt-1">Backtest Analysis Report</p>
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
              <span className="font-medium">{reportInfo.ea}</span>
            </div>
            <div className="hidden md:block w-px h-8 bg-border" />
            <div className="text-center">
              <span className="text-muted-foreground text-xs block">Symbol</span>
              <span className="font-medium">{reportInfo.symbol}</span>
            </div>
            <div className="hidden md:block w-px h-8 bg-border" />
            <div className="text-center">
              <span className="text-muted-foreground text-xs block">Period</span>
              <span className="font-medium">{reportInfo.period}</span>
            </div>
            <div className="hidden md:block w-px h-8 bg-border" />
            <div className="text-center">
              <span className="text-muted-foreground text-xs block">Dates</span>
              <span className="font-medium">{reportInfo.dates}</span>
            </div>
            <div className="hidden md:block w-px h-8 bg-border" />
            <div className="text-center">
              <span className="text-muted-foreground text-xs block">Deposit</span>
              <span className="font-medium">{reportInfo.deposit}</span>
            </div>
            <div className="hidden md:block w-px h-8 bg-border" />
            <div className="text-center">
              <span className="text-muted-foreground text-xs block">Leverage</span>
              <span className="font-medium">{reportInfo.leverage}</span>
            </div>
            <div className="hidden md:block w-px h-8 bg-border" />
            <div className="text-center">
              <span className="text-muted-foreground text-xs block">Trades</span>
              <span className="font-medium">{reportInfo.trades}</span>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-6 py-8 max-w-7xl">
        {/* Key Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <div className="bg-card border border-border rounded-lg p-4 text-center">
            <p className="text-xs text-muted-foreground mb-1">NET PROFIT</p>
            <p className="text-xl font-bold text-success">+$722,988.07</p>
            <p className="text-xs text-muted-foreground mt-1">988 trades</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4 text-center">
            <p className="text-xs text-muted-foreground mb-1">WIN RATE</p>
            <p className="text-xl font-bold text-primary">66.0%</p>
            <p className="text-xs text-muted-foreground mt-1">652W / 336L</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4 text-center">
            <p className="text-xs text-muted-foreground mb-1">PROFIT FACTOR</p>
            <p className="text-xl font-bold text-success">3.31</p>
            <p className="text-xs text-muted-foreground mt-1">GP: $1,032,652.68</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4 text-center">
            <p className="text-xs text-muted-foreground mb-1">MAX DRAWDOWN</p>
            <p className="text-xl font-bold text-destructive">11.2%</p>
            <p className="text-xs text-muted-foreground mt-1">-$32,502.37</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4 text-center">
            <p className="text-xs text-muted-foreground mb-1">BEST TRADE</p>
            <p className="text-xl font-bold text-success">+$36,945.05</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4 text-center">
            <p className="text-xs text-muted-foreground mb-1">WORST TRADE</p>
            <p className="text-xl font-bold text-destructive">-$18,987.81</p>
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
              <div className="flex justify-between"><span className="text-muted-foreground">Profit</span><span className="text-success">+${longShortData.long.profit.toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Avg Profit</span><span className="text-success">+${longShortData.long.avgProfit.toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Best</span><span className="text-success">+${longShortData.long.best.toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Worst</span><span className="text-destructive">-${Math.abs(longShortData.long.worst).toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Volume</span><span>{longShortData.long.volume.toLocaleString()}</span></div>
            </div>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <h4 className="text-destructive font-semibold mb-3">Short (Sell)</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Trades</span><span>{longShortData.short.trades}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Win Rate</span><span>{longShortData.short.winRate}%</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Profit</span><span className="text-success">+${longShortData.short.profit.toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Avg Profit</span><span className="text-success">+${longShortData.short.avgProfit.toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Best</span><span className="text-success">+${longShortData.short.best.toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Worst</span><span className="text-destructive">-${Math.abs(longShortData.short.worst).toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Volume</span><span>{longShortData.short.volume.toLocaleString()}</span></div>
            </div>
          </div>
        </div>

        {/* Equity Curve */}
        <div className="bg-card border border-border rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Equity Curve</h3>
          <EquityCurveChart />
        </div>

        {/* Daily P&L */}
        <div className="bg-card border border-border rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Daily P&L</h3>
          <DailyPnLChart />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Monthly Returns</h3>
            <MonthlyReturnsChart />
          </div>
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Distribution</h3>
            <DistributionChart />
          </div>
        </div>

        {/* Advanced Statistics */}
        <h3 className="text-lg font-semibold mb-4">Advanced Statistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <div className="bg-card border border-border rounded-lg p-4">
            <h4 className="text-sm font-medium text-primary mb-3">Performance</h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between"><span className="text-muted-foreground">Net Profit</span><span className="text-success">+${advancedStats.performance.netProfit.toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Gross Profit</span><span className="text-success">+${advancedStats.performance.grossProfit.toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Gross Loss</span><span className="text-destructive">-${Math.abs(advancedStats.performance.grossLoss).toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Profit Factor</span><span>{advancedStats.performance.profitFactor}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Expectancy</span><span className="text-success">+${advancedStats.performance.expectancy}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Sharpe Ratio</span><span>{advancedStats.performance.sharpeRatio}</span></div>
            </div>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <h4 className="text-sm font-medium text-primary mb-3">Risk Ratios</h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between"><span className="text-muted-foreground">Sortino Ratio</span><span>{advancedStats.riskRatios.sortinoRatio}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Calmar Ratio</span><span>{advancedStats.riskRatios.calmarRatio}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Recovery Factor</span><span>{advancedStats.riskRatios.recoveryFactor}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Kelly Criterion</span><span>{advancedStats.riskRatios.kellyCriterion}%</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Risk/Reward</span><span>{advancedStats.riskRatios.riskReward}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Avg Duration</span><span>{advancedStats.riskRatios.avgDuration}</span></div>
            </div>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <h4 className="text-sm font-medium text-primary mb-3">Trade Stats</h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between"><span className="text-muted-foreground">Total Trades</span><span>{advancedStats.tradeStats.totalTrades}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Win Rate</span><span>{advancedStats.tradeStats.winRate}%</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Winning</span><span>{advancedStats.tradeStats.winning}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Losing</span><span>{advancedStats.tradeStats.losing}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Breakeven</span><span>{advancedStats.tradeStats.breakeven}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Days Traded</span><span>{advancedStats.tradeStats.daysTraded}</span></div>
            </div>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <h4 className="text-sm font-medium text-primary mb-3">Risk</h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between"><span className="text-muted-foreground">Equity DD %</span><span className="text-destructive">{advancedStats.risk.equityDDPercent}%</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Balance DD %</span><span className="text-destructive">{advancedStats.risk.balanceDDPercent}%</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Max DD Days</span><span>{advancedStats.risk.maxDDDays}d</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Max Stagnation</span><span>{advancedStats.risk.maxStagnation}d</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Best Trade</span><span className="text-success">+${advancedStats.risk.bestTrade.toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Worst Trade</span><span className="text-destructive">-${Math.abs(advancedStats.risk.worstTrade).toLocaleString()}</span></div>
            </div>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <h4 className="text-sm font-medium text-primary mb-3">Streaks & Costs</h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between"><span className="text-muted-foreground">Win Streak</span><span>{advancedStats.streaksCosts.winStreak}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Loss Streak</span><span>{advancedStats.streaksCosts.lossStreak}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Commission</span><span className="text-destructive">-${Math.abs(advancedStats.streaksCosts.commission).toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Swap</span><span className="text-destructive">-${Math.abs(advancedStats.streaksCosts.swap).toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Total Volume</span><span>{advancedStats.streaksCosts.totalVolume}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Avg Volume</span><span>{advancedStats.streaksCosts.avgVolume}</span></div>
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
                {monthlyPerformanceMatrix.map((row) => (
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
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 DF717. Professional Expert Advisors for MetaTrader 5.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default BacktestReport;
