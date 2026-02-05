import { strategyComparison } from "@/data/correlationData";

const StrategyComparisonTable = () => {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">Strategy Comparison</h2>
      <div className="border border-white/10 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-white/10 bg-card/50">
                <th className="text-left py-4 px-4 text-muted-foreground font-medium">METRIC</th>
                <th className="text-center py-4 px-4 font-medium">
                  <span className="text-primary">● </span>
                  <span className="text-muted-foreground">KARAT_KILLER (XAUUSD)</span>
                </th>
                <th className="text-center py-4 px-4 font-medium">
                  <span className="text-warning">● </span>
                  <span className="text-muted-foreground">MAD TURTLE (XAUUSD)</span>
                </th>
                <th className="text-center py-4 px-4 font-medium">
                  <span className="text-success">● </span>
                  <span className="text-muted-foreground">THE GOLD PHANTOM (XAUUSD)</span>
                </th>
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
    </section>
  );
};

export default StrategyComparisonTable;