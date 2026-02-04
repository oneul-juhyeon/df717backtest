import { Quote, CheckCircle, XCircle, AlertTriangle, FileCheck, ShieldCheck, Brain, Layers, BarChart3, LineChart } from "lucide-react";

const validationChecks = [
  { check: "Walk-forward temporal validation (no random splits)", method: "Structural", status: "pass" },
  { check: "Entry price uses Open (not Close) of signal bar", method: "Code audit", status: "pass" },
  { check: "All features use data with timestamp < event time (past only)", method: "Code audit", status: "pass" },
  { check: "Higher-timeframe features use completed-bar offsets", method: "Code audit", status: "pass" },
  { check: "Reference levels from completed periods only", method: "Code audit", status: "pass" },
  { check: "Feature selection computed per-window on training data only", method: "Structural", status: "pass" },
  { check: "Event deduplication prevents correlated sample inflation", method: "Structural", status: "pass" },
  { check: "Mechanically predictive features removed from pipeline", method: "Manual review", status: "pass" },
  { check: "Low-sample event categories removed (no statistical significance)", method: "Statistical", status: "pass" },
];

const regimes = [
  { period: "2016–2019", label: "Low-Volatility Pre-Pandemic" },
  { period: "Mar 2020", label: "COVID-19 Crash & Recovery" },
  { period: "2021–2022", label: "Inflation & Interest-Rate Cycle" },
  { period: "2024–2026", label: "Gold Rally & New Highs" },
];

const evidenceItems = [
  "Multiple non-overlapping OOS windows — A comprehensive sweep across a decade of market data including multiple regimes",
  "Expanding window design — The model must generalise to unseen future data at every step",
  "Per-window feature selection — No global selection that could leak test information into training",
  "Modest, realistic metrics — All performance numbers fall within plausibility thresholds for genuine edges",
  "Strict temporal boundaries — All leakage checks passed; features use only completed, past data",
  "Realistic transaction costs — Spread and commission applied on every trade in every backtest window",
];

const MethodologySection = () => {
  return (
    <div className="space-y-12">
      {/* Validation Philosophy */}
      <div className="border border-border rounded-xl p-8 bg-card/50">
        <div className="flex items-start gap-4 mb-6">
          <Quote className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
          <div>
            <p className="text-xl italic text-foreground mb-2">
              "A model that looks too good on historical data is almost certainly wrong."
            </p>
            <p className="text-muted-foreground">
              In quantitative finance, genuine edges are small. Our methodology is designed to detect and 
              eliminate any artificial inflation of performance metrics, accepting modest but real 
              predictive power over spectacular but illusory results.
            </p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <div>
            <h4 className="text-lg font-semibold text-success mb-3 flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              What We Optimise For
            </h4>
            <p className="text-muted-foreground text-sm">
              Consistency across market regimes, realistic out-of-sample metrics, and robustness 
              under transaction costs. Every design decision prioritises real-world viability over 
              backtest aesthetics.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-destructive mb-3 flex items-center gap-2">
              <XCircle className="w-5 h-5" />
              What We Reject
            </h4>
            <p className="text-muted-foreground text-sm">
              Any result that exceeds established plausibility thresholds is automatically flagged 
              for review. Features without economic rationale are excluded regardless of their 
              in-sample predictive power.
            </p>
          </div>
        </div>
      </div>

      {/* Walk-Forward Validation */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-primary/10">
            <BarChart3 className="w-5 h-5 text-primary" />
          </div>
          <h3 className="text-xl font-semibold">Walk-Forward Validation</h3>
        </div>
        
        <p className="text-muted-foreground mb-6">
          Traditional train/test splits or k-fold cross-validation randomly shuffle temporal data, 
          allowing the model to "peek" at future information. Walk-forward validation respects the 
          arrow of time: the model is always trained on past data and tested on strictly future, 
          unseen data — exactly as it would operate in live trading.
        </p>

        {/* Validation stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="metric-card text-center">
            <div className="text-sm text-muted-foreground mb-1">Test Period</div>
            <div className="text-lg font-bold text-primary">Multiple Windows</div>
            <div className="text-xs text-muted-foreground">Non-overlapping test sets</div>
          </div>
          <div className="metric-card text-center">
            <div className="text-sm text-muted-foreground mb-1">Data Span</div>
            <div className="text-lg font-bold text-primary">10+ Years</div>
            <div className="text-xs text-muted-foreground">2016–2026 validation</div>
          </div>
          <div className="metric-card text-center">
            <div className="text-sm text-muted-foreground mb-1">Design</div>
            <div className="text-lg font-bold text-primary">Expanding Window</div>
            <div className="text-xs text-muted-foreground">Training grows each window</div>
          </div>
        </div>

        {/* Window visualization */}
        <div className="bg-card border border-border rounded-lg p-6 font-mono text-sm">
          <div className="text-muted-foreground mb-4">Expanding Window Design</div>
          <div className="space-y-2 overflow-x-auto">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground w-24">Window 1:</span>
              <span className="bg-primary/20 text-primary px-4 py-1 rounded">[====== TRAIN ======]</span>
              <span className="bg-success/20 text-success px-2 py-1 rounded">[TEST]</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground w-24">Window 2:</span>
              <span className="bg-primary/20 text-primary px-6 py-1 rounded">[========= TRAIN =========]</span>
              <span className="bg-success/20 text-success px-2 py-1 rounded">[TEST]</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground w-24">Window 3:</span>
              <span className="bg-primary/20 text-primary px-8 py-1 rounded">[============ TRAIN ============]</span>
              <span className="bg-success/20 text-success px-2 py-1 rounded">[TEST]</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground w-24">...</span>
              <span className="text-muted-foreground">...</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground w-24">Window N:</span>
              <span className="bg-primary/20 text-primary px-12 py-1 rounded">[==================== TRAIN ====================]</span>
              <span className="bg-success/20 text-success px-2 py-1 rounded">[TEST]</span>
            </div>
          </div>
          <div className="text-xs text-muted-foreground mt-4">
            Each [TEST] = strictly unseen future data. No shuffling. No overlap.
          </div>
        </div>
      </div>

      {/* Per-Window Isolation */}
      <div>
        <h4 className="text-lg font-semibold mb-4">Per-Window Isolation</h4>
        <p className="text-muted-foreground mb-4">
          Within each walk-forward window, the following operations are performed <strong>independently</strong>, 
          using only that window's training data:
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { title: "Feature selection", desc: "Statistical relevance computed exclusively on training samples" },
            { title: "Model training", desc: "All models fitted only on the current window's training set" },
            { title: "Threshold calibration", desc: "Decision threshold optimised on temporal holdout from training data" },
            { title: "Performance evaluation", desc: "Metrics computed on the out-of-sample test set only" },
          ].map((item, index) => (
            <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-card border border-border">
              <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-medium text-foreground">{item.title}</div>
                <div className="text-sm text-muted-foreground">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Data Leakage Prevention */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-primary/10">
            <ShieldCheck className="w-5 h-5 text-primary" />
          </div>
          <h3 className="text-xl font-semibold">Data Leakage Prevention</h3>
        </div>
        
        <p className="text-muted-foreground mb-6">
          Data leakage occurs when information from the future inadvertently contaminates the training 
          process. Even subtle forms — a feature computed from an unclosed candle, a cross-timeframe 
          alignment error — can produce dramatically inflated backtest results that collapse in live trading.
        </p>

        <div className="space-y-4">
          {[
            { num: 1, title: "Temporal Integrity of Entry Points", desc: "Trade entries use prices available at the moment of the signal, never prices that would only be known after the fact." },
            { num: 2, title: "Past-Only Feature Computation", desc: "Every feature is computed using data with timestamps strictly before the event timestamp. Multi-timeframe features use dedicated offsets ensuring only completed bars are used." },
            { num: 3, title: "Completed Periods Only", desc: "All reference levels are derived from fully completed periods. No intra-period data is used for level calculation." },
            { num: 4, title: "Mechanically Predictive Features Removed", desc: "Features mechanically correlated with the target variable — not because they capture market dynamics, but because they encode trade outcome information — are permanently removed." },
            { num: 5, title: "Event Deduplication", desc: "Strict deduplication rules ensure no market event generates multiple correlated training samples, which would artificially inflate apparent model performance." },
          ].map((item) => (
            <div key={item.num} className="flex gap-4 p-4 rounded-lg bg-card border border-border">
              <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold flex-shrink-0">
                {item.num}
              </div>
              <div>
                <div className="font-semibold text-foreground mb-1">{item.title}</div>
                <div className="text-sm text-muted-foreground">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Leakage Audit Results */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-primary/10">
            <FileCheck className="w-5 h-5 text-primary" />
          </div>
          <h3 className="text-xl font-semibold">Leakage Audit Results</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">#</th>
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">Check</th>
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">Method</th>
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {validationChecks.map((item, index) => (
                <tr key={index} className="border-b border-border/50 hover:bg-card/50 transition-colors">
                  <td className="py-3 px-4 text-muted-foreground">{index + 1}</td>
                  <td className="py-3 px-4 text-foreground">{item.check}</td>
                  <td className="py-3 px-4 text-muted-foreground">{item.method}</td>
                  <td className="py-3 px-4">
                    <span className="status-badge status-pass">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      PASS
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Anti-Overfitting Measures */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-primary/10">
            <Brain className="w-5 h-5 text-primary" />
          </div>
          <h3 className="text-xl font-semibold">Anti-Overfitting Measures</h3>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { title: "Model Regularisation", desc: "Multiple regularisation techniques constrain model complexity, preventing memorisation of noise and forcing generalisable patterns." },
            { title: "Feature Space Control", desc: "From dozens of candidates, only top-ranked features are selected per window using statistical relevance computed exclusively on training data." },
            { title: "Economic Rationale Filter", desc: "Every feature must have a plausible economic explanation. Features with statistical significance but no logical mechanism are excluded." },
            { title: "Gradual Learning", desc: "Models learn slowly and incrementally, reducing sensitivity to individual training examples and improving generalisation." },
          ].map((item, index) => (
            <div key={index} className="p-6 rounded-lg bg-card border border-border">
              <h4 className="font-semibold text-foreground mb-2">{item.title}</h4>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Cross-Regime Robustness */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-primary/10">
            <Layers className="w-5 h-5 text-primary" />
          </div>
          <h3 className="text-xl font-semibold">Cross-Regime Robustness</h3>
        </div>
        
        <p className="text-muted-foreground mb-6">
          The 2016–2026 validation period spans fundamentally different market environments. 
          The model is evaluated across all of these regimes, ensuring it does not rely on a single 
          market condition.
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {regimes.map((regime, index) => (
            <div key={index} className="metric-card text-center">
              <div className="text-lg font-bold text-primary mb-1">{regime.period}</div>
              <div className="text-xs text-muted-foreground">{regime.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary of Evidence */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-success/10">
            <CheckCircle className="w-5 h-5 text-success" />
          </div>
          <h3 className="text-xl font-semibold">Summary of Evidence</h3>
        </div>
        
        <p className="text-muted-foreground mb-4">Why we believe this is not overfitted:</p>
        
        <div className="space-y-3">
          {evidenceItems.map((item, index) => (
            <div key={index} className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
              <span className="text-foreground">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MethodologySection;
