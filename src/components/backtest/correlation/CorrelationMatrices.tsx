import { correlationData, correlationScale, winLossSyncData, drawdownOverlapData } from "@/data/correlationData";

const strategyLabels = ["KARAT_KILLER", "MAD TURTLE", "THE GOLD PHANTOM"];
const strategyColors = ["text-primary", "text-warning", "text-success"];

const getCorrelationColor = (value: string) => {
  const num = parseFloat(value);
  if (num >= 0.5) return "bg-success/70";
  if (num >= 0.2) return "bg-success/30";
  if (num >= -0.2) return "bg-muted/50";
  if (num >= -0.5) return "bg-destructive/30";
  return "bg-destructive/70";
};

const getSyncColor = (value: string) => {
  const num = parseFloat(value);
  if (num >= 80) return "bg-warning/50";
  if (num >= 50) return "bg-warning/25";
  return "bg-muted/50";
};

const getOverlapColor = (value: string) => {
  const num = parseFloat(value);
  if (num >= 50) return "bg-destructive/50";
  if (num >= 25) return "bg-warning/35";
  return "bg-success/30";
};

interface MatrixTableProps {
  title: string;
  data: string[][];
  colorFn: (value: string) => string;
}

const MatrixTable = ({ title, data, colorFn }: MatrixTableProps) => (
  <div className="border border-white/10 rounded-xl overflow-hidden bg-card/30">
    <div className="px-4 py-3 border-b border-white/10 bg-card/50">
      <h4 className="font-semibold text-sm">{title}</h4>
    </div>
    <table className="w-full">
      <thead>
        <tr className="border-b border-white/10">
          <th className="w-1/4"></th>
          {strategyLabels.map((label, i) => (
            <th key={i} className="py-3 px-2 text-center">
              <span className={`text-xs font-medium ${strategyColors[i]}`}>{label}</span>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={i} className="border-b border-white/5 last:border-0">
            <td className="py-3 px-3">
              <span className={`text-xs font-medium ${strategyColors[i]}`}>{strategyLabels[i]}</span>
            </td>
            {row.slice(1).map((cell, j) => (
              <td key={j} className={`py-3 px-2 text-center ${colorFn(cell)}`}>
                <span className="text-sm font-mono font-medium">{cell}</span>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const CorrelationMatrices = () => {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">Correlation Matrices</h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        <MatrixTable
          title="Pearson Correlation"
          data={correlationData.pearson}
          colorFn={getCorrelationColor}
        />
        <MatrixTable
          title="Spearman Rank Correlation"
          data={correlationData.spearman}
          colorFn={getCorrelationColor}
        />
        <MatrixTable
          title="Win/Loss Synchronization"
          data={winLossSyncData.rows}
          colorFn={getSyncColor}
        />
        <MatrixTable
          title="Drawdown Overlap"
          data={drawdownOverlapData.rows}
          colorFn={getOverlapColor}
        />
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 justify-center mt-8">
        {correlationScale.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <span className={`w-3 h-3 rounded-sm ${item.color}`}></span>
            <span className="text-xs text-muted-foreground">{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CorrelationMatrices;