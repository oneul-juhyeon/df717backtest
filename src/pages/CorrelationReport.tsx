import { Link } from "react-router-dom";
import { ArrowLeft, Info, TrendingUp, TrendingDown, BarChart3 } from "lucide-react";
import Header from "@/components/backtest/Header";
import CorrelationEquityChart from "@/components/backtest/charts/CorrelationEquityChart";
import DrawdownComparisonChart from "@/components/backtest/charts/DrawdownComparisonChart";
import MonthlyReturnsComparisonChart from "@/components/backtest/charts/MonthlyReturnsComparisonChart";
import { correlationData, strategyComparison, correlationScale, diversificationMetrics } from "@/data/correlationData";

const getCorrelationColor = (value: string) => {
  const num = parseFloat(value);
  if (num >= 0.5) return "bg-success/80 text-success-foreground";
  if (num >= 0.2) return "bg-success/40 text-foreground";
  if (num >= -0.2) return "bg-muted text-foreground";
  if (num >= -0.5) return "bg-destructive/40 text-foreground";
  return "bg-destructive/80 text-destructive-foreground";
};

const CorrelationReport = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      
      {/* Back Navigation */}
      <div className="container mx-auto px-6 py-6">
        <Link 
          to="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Backtest Report
        </Link>
      </div>

      {/* Hero Section */}
      <section className="py-8 border-b border-white/10">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-primary/10 border border-primary/30 rounded-full text-xs text-primary">
                Correlation Analysis
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Portfolio Correlation Report
            </h1>
            <p className="text-muted-foreground text-lg">
              Detailed correlation analysis between DFcovenant and popular XAUUSD Expert Advisors
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12 max-w-6xl">
        <div className="space-y-16">
          
          {/* About This Analysis */}
          <section>
            <div className="border border-white/10 rounded-xl p-6 bg-card/50">
              <div className="flex items-start gap-3 mb-4">
                <Info className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <h4 className="font-semibold text-foreground">About This Analysis</h4>
              </div>
              <div className="space-y-4 text-muted-foreground text-sm">
                <p>
                  <strong className="text-foreground">Why this matters:</strong> Many of our clients already trade with popular XAUUSD Expert 
                  Advisors like The Gold Phantom or Mad Turtle. A common concern is whether adding DFcovenant 
                  to their setup would create overlapping trades, correlated drawdowns, or redundant exposure 
                  to the same market conditions.
                </p>
                <p>
                  This correlation analysis is provided <strong className="text-foreground">for informational purposes only</strong>. Its sole 
                  objective is to demonstrate that <strong className="text-foreground">DFcovenant can be deployed alongside two of the most 
                  popular XAUUSD Expert Advisors on the MQL5 marketplace</strong> — The Gold Phantom and Mad Turtle — 
                  within the same trading account or multi-strategy setup, without significant overlap in trading 
                  signals or equity curve behavior.
                </p>
                <p>
                  The low correlation coefficients (avg. 0.20) indicate that these strategies operate on different 
                  market mechanics and timeframes, making them <strong className="text-foreground">technically compatible for simultaneous 
                  execution</strong>.
                </p>
                <p>
                  <strong className="text-foreground">Data source:</strong> All equity curves were obtained from backtests conducted on 
                  <strong className="text-foreground"> IC Trading</strong> broker data. Each strategy was configured with comparable risk 
                  parameters to ensure a fair comparison across similar exposure levels.
                </p>
              </div>
            </div>
          </section>

          {/* Diversification Metrics */}
          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <BarChart3 className="w-6 h-6 text-primary" />
              Portfolio Diversification Analysis
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="border border-white/10 rounded-xl p-6 bg-card/30 text-center">
                <div className="text-sm text-muted-foreground mb-2">Strategies Compared</div>
                <div className="text-3xl font-bold text-primary">{diversificationMetrics.strategiesCompared}</div>
                <div className="text-xs text-muted-foreground mt-1">Expert Advisors</div>
              </div>
              <div className="border border-white/10 rounded-xl p-6 bg-card/30 text-center">
                <div className="text-sm text-muted-foreground mb-2">Avg Individual DD</div>
                <div className="text-3xl font-bold text-warning">{diversificationMetrics.avgIndividualDD}%</div>
                <div className="text-xs text-muted-foreground mt-1">Average of all EAs</div>
              </div>
              <div className="border border-white/10 rounded-xl p-6 bg-card/30 text-center">
                <div className="text-sm text-muted-foreground mb-2">Combined Max DD</div>
                <div className="text-3xl font-bold text-success">{diversificationMetrics.combinedMaxDD}%</div>
                <div className="text-xs text-muted-foreground mt-1">Equal-weight portfolio</div>
              </div>
              <div className="border border-white/10 rounded-xl p-6 bg-card/30 text-center">
                <div className="text-sm text-muted-foreground mb-2">Diversification Benefit</div>
                <div className="text-3xl font-bold text-success">{diversificationMetrics.diversificationBenefit}%</div>
                <div className="text-xs text-muted-foreground mt-1">DD reduction vs avg</div>
              </div>
            </div>
          </section>

          {/* Correlation Matrices */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Correlation Matrices</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Pearson */}
              <div className="border border-white/10 rounded-xl p-6 bg-card/30">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold">Pearson Correlation</h4>
                  <span className="text-sm text-muted-foreground">Avg: 0.20</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left py-2 px-3 text-muted-foreground font-medium text-sm"></th>
                        <th className="text-center py-2 px-3 text-muted-foreground font-medium text-xs">DFcovenant</th>
                        <th className="text-center py-2 px-3 text-muted-foreground font-medium text-xs">Mad Turtle</th>
                        <th className="text-center py-2 px-3 text-muted-foreground font-medium text-xs">Gold Phantom</th>
                      </tr>
                    </thead>
                    <tbody>
                      {correlationData.pearson.map((row, i) => (
                        <tr key={i} className="border-b border-white/5">
                          <td className="py-2 px-3 text-foreground font-medium text-sm">{row[0]}</td>
                          {row.slice(1).map((cell, j) => (
                            <td key={j} className="py-2 px-3 text-center">
                              <span className={`inline-block px-2 py-1 rounded text-xs font-mono ${getCorrelationColor(cell)}`}>
                                {cell}
                              </span>
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Spearman */}
              <div className="border border-white/10 rounded-xl p-6 bg-card/30">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold">Spearman Correlation</h4>
                  <span className="text-sm text-muted-foreground">Avg: 0.20</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left py-2 px-3 text-muted-foreground font-medium text-sm"></th>
                        <th className="text-center py-2 px-3 text-muted-foreground font-medium text-xs">DFcovenant</th>
                        <th className="text-center py-2 px-3 text-muted-foreground font-medium text-xs">Mad Turtle</th>
                        <th className="text-center py-2 px-3 text-muted-foreground font-medium text-xs">Gold Phantom</th>
                      </tr>
                    </thead>
                    <tbody>
                      {correlationData.spearman.map((row, i) => (
                        <tr key={i} className="border-b border-white/5">
                          <td className="py-2 px-3 text-foreground font-medium text-sm">{row[0]}</td>
                          {row.slice(1).map((cell, j) => (
                            <td key={j} className="py-2 px-3 text-center">
                              <span className={`inline-block px-2 py-1 rounded text-xs font-mono ${getCorrelationColor(cell)}`}>
                                {cell}
                              </span>
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap items-center gap-4 justify-center mt-6">
              {correlationScale.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className={`w-4 h-4 rounded ${item.color}`}></span>
                  <span className="text-xs text-muted-foreground">{item.label}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Equity Curves */}
          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-primary" />
              Equity Curve Comparison
            </h2>
            <div className="space-y-6">
              <div className="border border-white/10 rounded-xl p-6 bg-card/30">
                <h4 className="text-sm text-muted-foreground mb-4">
                  Individual Strategy Equity Curves (€10,000 Initial per Strategy)
                </h4>
                <CorrelationEquityChart showCombined={false} />
              </div>
              <div className="border border-white/10 rounded-xl p-6 bg-card/30">
                <h4 className="text-sm text-muted-foreground mb-4">
                  Combined Portfolio Equity (€30,000 Initial = €10K × 3 Strategies)
                </h4>
                <CorrelationEquityChart showCombined={true} />
              </div>
            </div>
          </section>

          {/* Drawdown Comparison */}
          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <TrendingDown className="w-6 h-6 text-destructive" />
              Drawdown Comparison
            </h2>
            <div className="border border-white/10 rounded-xl p-6 bg-card/30">
              <h4 className="text-sm text-muted-foreground mb-4">
                Maximum Drawdown % Over Time
              </h4>
              <DrawdownComparisonChart />
            </div>
          </section>

          {/* Monthly Returns Comparison */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Monthly Returns Comparison (2024)</h2>
            <div className="border border-white/10 rounded-xl p-6 bg-card/30">
              <h4 className="text-sm text-muted-foreground mb-4">
                Monthly P&L by Strategy
              </h4>
              <MonthlyReturnsComparisonChart />
            </div>
          </section>

          {/* Strategy Comparison Table */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Full Strategy Comparison</h2>
            <div className="border border-white/10 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-white/10 bg-card/50">
                      <th className="text-left py-4 px-4 text-muted-foreground font-medium">Metric</th>
                      <th className="text-center py-4 px-4 text-primary font-medium">DFcovenant</th>
                      <th className="text-center py-4 px-4 text-muted-foreground font-medium">Mad Turtle</th>
                      <th className="text-center py-4 px-4 text-muted-foreground font-medium">Gold Phantom</th>
                    </tr>
                  </thead>
                  <tbody>
                    {strategyComparison.map((row, index) => (
                      <tr key={index} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="py-3 px-4 text-muted-foreground font-medium">{row.metric}</td>
                        <td className="py-3 px-4 text-center text-foreground font-mono">{row.dfcovenant}</td>
                        <td className="py-3 px-4 text-center text-foreground font-mono">{row.madTurtle}</td>
                        <td className="py-3 px-4 text-center text-foreground font-mono">{row.goldPhantom}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Key Insights */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Key Insights</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="border border-white/10 rounded-xl p-6 bg-card/30">
                <h4 className="font-semibold mb-3 text-success">Low Correlation</h4>
                <p className="text-sm text-muted-foreground">
                  Average correlation of 0.20 between strategies indicates minimal overlap in trading signals and equity movements.
                </p>
              </div>
              <div className="border border-white/10 rounded-xl p-6 bg-card/30">
                <h4 className="font-semibold mb-3 text-warning">Diversification</h4>
                <p className="text-sm text-muted-foreground">
                  Combined portfolio achieves 41% reduction in maximum drawdown compared to individual strategy averages.
                </p>
              </div>
              <div className="border border-white/10 rounded-xl p-6 bg-card/30">
                <h4 className="font-semibold mb-3 text-primary">Compatibility</h4>
                <p className="text-sm text-muted-foreground">
                  DFcovenant can be safely deployed alongside Mad Turtle and Gold Phantom without significant overlap.
                </p>
              </div>
            </div>
          </section>

        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 border-t border-white/10 mt-16">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm text-muted-foreground">
            Generated by <span className="text-foreground font-medium">DF717</span> Analytics
          </p>
        </div>
      </footer>
    </div>
  );
};

export default CorrelationReport;
