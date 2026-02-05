import { BarChart3 } from "lucide-react";
import { diversificationMetrics } from "@/data/correlationData";

const DiversificationMetrics = () => {
  return (
    <section>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="border border-white/10 rounded-xl p-6 bg-card/30 text-center">
          <div className="text-xs text-muted-foreground mb-2 uppercase tracking-wide">Strategies Compared</div>
          <div className="text-3xl font-bold text-primary">{diversificationMetrics.strategiesCompared}</div>
          <div className="text-xs text-muted-foreground mt-1">Expert Advisors</div>
        </div>
        <div className="border border-white/10 rounded-xl p-6 bg-card/30 text-center">
          <div className="text-xs text-muted-foreground mb-2 uppercase tracking-wide">Diversification Benefit</div>
          <div className="text-3xl font-bold text-success">0%</div>
          <div className="text-xs text-muted-foreground mt-1">DD reduction vs Avg</div>
        </div>
        <div className="border border-white/10 rounded-xl p-6 bg-card/30 text-center">
          <div className="text-xs text-muted-foreground mb-2 uppercase tracking-wide">Combined Max DD</div>
          <div className="text-3xl font-bold text-warning">8.9%</div>
          <div className="text-xs text-muted-foreground mt-1">Equal-weight portfolio</div>
        </div>
        <div className="border border-white/10 rounded-xl p-6 bg-card/30 text-center">
          <div className="text-xs text-muted-foreground mb-2 uppercase tracking-wide">Avg Individual DD</div>
          <div className="text-3xl font-bold text-muted-foreground">0%</div>
          <div className="text-xs text-muted-foreground mt-1">Average of all EAs</div>
        </div>
      </div>
    </section>
  );
};

export default DiversificationMetrics;