import { Link } from "react-router-dom";
import { Info, TrendingDown, TrendingUp, ArrowRight } from "lucide-react";
import CorrelationEquityChart from "./charts/CorrelationEquityChart";
import { correlationData, strategyComparison, correlationScale, diversificationMetrics } from "@/data/correlationData";

const getCorrelationColor = (value: string) => {
  const num = parseFloat(value);
  if (num >= 0.5) return "bg-success/80 text-success-foreground";
  if (num >= 0.2) return "bg-success/40 text-foreground";
  if (num >= -0.2) return "bg-muted text-foreground";
  if (num >= -0.5) return "bg-destructive/40 text-foreground";
  return "bg-destructive/80 text-destructive-foreground";
};

const PortfolioCorrelation = () => {
  return (
    <div className="space-y-12">
      {/* About This Analysis */}
      <div className="border border-white/10 rounded-xl p-6 bg-card/50">
        <div className="flex items-start gap-3 mb-4">
          <Info className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
          <h4 className="font-semibold text-foreground">About This Analysis</h4>
        </div>
        <p className="text-muted-foreground text-sm mb-4">
          <strong>Why this matters:</strong> Many of our clients already trade with popular XAUUSD Expert 
           Advisors like DFpath or DFtrust. A common concern is whether adding DFcovenant 
          to their setup would create overlapping trades, correlated drawdowns, or redundant exposure 
          to the same market conditions.
        </p>
        <p className="text-muted-foreground text-sm mb-4">
          This correlation analysis is provided <strong>for informational purposes only</strong>. Its sole 
          objective is to demonstrate that <strong>DFcovenant can be deployed alongside two of the most 
           popular XAUUSD Expert Advisors on the MQL5 marketplace</strong> — DFpath and DFtrust — 
          within the same trading account or multi-strategy setup, without significant overlap in trading 
          signals or equity curve behavior.
        </p>
        <p className="text-muted-foreground text-sm">
          The low correlation coefficients (avg. 0.20) indicate that these strategies operate on different 
          market mechanics and timeframes, making them <strong>technically compatible for simultaneous 
          execution</strong>. This analysis does not constitute investment advice, portfolio allocation 
          recommendations, or any guarantee of future diversification benefits.
        </p>
        <p className="text-muted-foreground text-sm mt-4">
          <strong>Data source:</strong> All equity curves were obtained from backtests conducted on 
          <strong> IC Trading</strong> broker data. Each strategy was configured with comparable risk 
          parameters to ensure a fair comparison across similar exposure levels.
        </p>
      </div>

      {/* Portfolio Diversification Analysis */}
      <div>
        <h3 className="text-xl font-semibold mb-6">Portfolio Diversification Analysis</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="metric-card text-center">
            <div className="text-sm text-muted-foreground mb-1">Strategies Compared</div>
            <div className="text-2xl font-bold text-primary">{diversificationMetrics.strategiesCompared}</div>
            <div className="text-xs text-muted-foreground">Expert Advisors</div>
          </div>
          <div className="metric-card text-center">
            <div className="text-sm text-muted-foreground mb-1">Avg Individual DD</div>
            <div className="text-2xl font-bold text-warning">{diversificationMetrics.avgIndividualDD}%</div>
            <div className="text-xs text-muted-foreground">Average of all EAs</div>
          </div>
          <div className="metric-card text-center">
            <div className="text-sm text-muted-foreground mb-1">Combined Max DD</div>
            <div className="text-2xl font-bold text-success">{diversificationMetrics.combinedMaxDD}%</div>
            <div className="text-xs text-muted-foreground">Equal-weight portfolio</div>
          </div>
          <div className="metric-card text-center">
            <div className="text-sm text-muted-foreground mb-1">Diversification Benefit</div>
            <div className="text-2xl font-bold text-success">{diversificationMetrics.diversificationBenefit}%</div>
            <div className="text-xs text-muted-foreground">DD reduction vs avg</div>
          </div>
        </div>
      </div>

      {/* Correlation Matrices */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Pearson Correlation */}
        <div className="border border-white/10 rounded-xl overflow-hidden bg-card/30">
          <div className="px-4 py-3 border-b border-white/10 bg-card/50">
            <h4 className="font-semibold text-sm">Pearson Correlation</h4>
          </div>
          <table className="w-full table-fixed">
            <thead>
              <tr className="border-b border-white/10">
                <th className="w-1/4 py-3 px-2"></th>
                <th className="w-1/4 py-3 px-2 text-center">
                  <span className="text-xs font-medium text-primary">DFcovenant</span>
                </th>
                <th className="w-1/4 py-3 px-2 text-center">
                  <span className="text-xs font-medium text-warning">DFtrust</span>
                </th>
                <th className="w-1/4 py-3 px-2 text-center">
                  <span className="text-xs font-medium text-success">DFpath</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {correlationData.pearson.map((row, i) => {
                const colors = ["text-primary", "text-warning", "text-success"];
                return (
                  <tr key={i} className="border-b border-white/5 last:border-0">
                    <td className="w-1/4 py-4 px-3">
                      <span className={`text-xs font-medium ${colors[i]}`}>{row[0]}</span>
                    </td>
                    {row.slice(1).map((cell, j) => (
                      <td key={j} className={`w-1/4 py-4 px-2 text-center ${getCorrelationColor(cell)}`}>
                        <span className="text-sm font-mono font-medium">{cell}</span>
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Spearman Correlation */}
        <div className="border border-white/10 rounded-xl overflow-hidden bg-card/30">
          <div className="px-4 py-3 border-b border-white/10 bg-card/50">
            <h4 className="font-semibold text-sm">Spearman Correlation</h4>
          </div>
          <table className="w-full table-fixed">
            <thead>
              <tr className="border-b border-white/10">
                <th className="w-1/4 py-3 px-2"></th>
                <th className="w-1/4 py-3 px-2 text-center">
                  <span className="text-xs font-medium text-primary">DFcovenant</span>
                </th>
                <th className="w-1/4 py-3 px-2 text-center">
                  <span className="text-xs font-medium text-warning">DFtrust</span>
                </th>
                <th className="w-1/4 py-3 px-2 text-center">
                  <span className="text-xs font-medium text-success">DFpath</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {correlationData.spearman.map((row, i) => {
                const colors = ["text-primary", "text-warning", "text-success"];
                return (
                  <tr key={i} className="border-b border-white/5 last:border-0">
                    <td className="w-1/4 py-4 px-3">
                      <span className={`text-xs font-medium ${colors[i]}`}>{row[0]}</span>
                    </td>
                    {row.slice(1).map((cell, j) => (
                      <td key={j} className={`w-1/4 py-4 px-2 text-center ${getCorrelationColor(cell)}`}>
                        <span className="text-sm font-mono font-medium">{cell}</span>
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Correlation Scale Legend */}
      <div className="flex flex-wrap items-center gap-4 justify-center">
        {correlationScale.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <span className={`w-4 h-4 rounded ${item.color}`}></span>
            <span className="text-xs text-muted-foreground">{item.label}</span>
          </div>
        ))}
      </div>

      {/* Interactive Equity Curves */}
      <div className="space-y-6">
        <div className="border border-white/10 rounded-xl p-6 bg-card/30">
          <h4 className="text-sm text-muted-foreground mb-4">
            Equity Curves in EUR (€10,000 Initial per Strategy)
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

      {/* Strategy Comparison Table */}
      <div>
        <h3 className="text-xl font-semibold mb-6">Strategy Comparison</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">Metric</th>
                <th className="text-center py-3 px-4 text-primary font-medium">DFcovenant (XAUUSD)</th>
                 <th className="text-center py-3 px-4 text-muted-foreground font-medium">DFtrust (XAUUSD)</th>
                 <th className="text-center py-3 px-4 text-muted-foreground font-medium">DFpath (XAUUSD)</th>
              </tr>
            </thead>
            <tbody>
              {strategyComparison.map((row, index) => (
                <tr key={index} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-3 px-4 text-muted-foreground font-medium">{row.metric}</td>
                  <td className="py-3 px-4 text-center text-foreground font-mono">{row.dfcovenant}</td>
                   <td className="py-3 px-4 text-center text-foreground font-mono">{row.dftrust}</td>
                   <td className="py-3 px-4 text-center text-foreground font-mono">{row.dfpath}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Full Report Button */}
      <div className="flex justify-center pt-4">
        <Link 
          to="/correlation-report"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 border border-primary/30 rounded-lg text-primary hover:bg-primary/20 transition-colors"
        >
          View Full Correlation Report
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};

export default PortfolioCorrelation;
