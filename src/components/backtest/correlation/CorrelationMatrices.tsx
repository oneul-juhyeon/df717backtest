import { correlationData, correlationScale, winLossSyncData, drawdownOverlapData } from "@/data/correlationData";

const getCorrelationColor = (value: string) => {
  const num = parseFloat(value);
  if (num >= 0.5) return "bg-success/80 text-success-foreground";
  if (num >= 0.2) return "bg-success/40 text-foreground";
  if (num >= -0.2) return "bg-muted text-foreground";
  if (num >= -0.5) return "bg-destructive/40 text-foreground";
  return "bg-destructive/80 text-destructive-foreground";
};

const getSyncColor = (value: string) => {
  const num = parseFloat(value);
  if (num >= 80) return "bg-warning/60 text-foreground";
  if (num >= 50) return "bg-warning/30 text-foreground";
  return "bg-muted text-foreground";
};

const getOverlapColor = (value: string) => {
  const num = parseFloat(value);
  if (num >= 50) return "bg-destructive/60 text-foreground";
  if (num >= 25) return "bg-warning/40 text-foreground";
  return "bg-success/40 text-foreground";
};

interface MatrixTableProps {
  title: string;
  average: string;
  headers: string[];
  rows: string[][];
  colorFn: (value: string) => string;
  showIndicator?: boolean;
}

const MatrixTable = ({ title, average, headers, rows, colorFn, showIndicator = false }: MatrixTableProps) => (
  <div className="border border-white/10 rounded-xl p-6 bg-card/30">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        <h4 className="font-semibold">{title}</h4>
        {showIndicator && <span className="text-muted-foreground">▼</span>}
      </div>
      <span className="text-sm text-muted-foreground">Avg: {average}</span>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left py-2 px-3 text-muted-foreground font-medium text-sm"></th>
            {headers.map((h, i) => (
              <th key={i} className="text-center py-2 px-3 text-muted-foreground font-medium text-xs">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-white/5">
              <td className="py-2 px-3 text-foreground font-medium text-sm">{row[0]}</td>
              {row.slice(1).map((cell, j) => (
                <td key={j} className="py-2 px-3 text-center">
                  <span className={`inline-block px-2 py-1 rounded text-xs font-mono ${colorFn(cell)}`}>
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
);

const CorrelationMatrices = () => {
  const correlationHeaders = ["KARAT_KILLER ...", "MAD TURTLE (X...", "THE GOLD PHAN..."];
  
  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">Correlation Matrices</h2>
      
      {/* Pearson & Spearman */}
      <div className="grid md:grid-cols-2 gap-8">
        <MatrixTable
          title="Pearson Correlation"
          average="0.20"
          headers={correlationHeaders}
          rows={correlationData.pearson.map(row => [
            row[0].replace("DFcovenant", "Karat_Killer ...").replace("DFtrust", "Mad Turtle (X...").replace("DFpath", "The Gold Phan..."),
            ...row.slice(1)
          ])}
          colorFn={getCorrelationColor}
          showIndicator
        />
        <MatrixTable
          title="Spearman Rank Correlation"
          average="0.20"
          headers={correlationHeaders}
          rows={correlationData.spearman.map(row => [
            row[0].replace("DFcovenant", "Karat_Killer ...").replace("DFtrust", "Mad Turtle (X...").replace("DFpath", "The Gold Phan..."),
            ...row.slice(1)
          ])}
          colorFn={getCorrelationColor}
          showIndicator
        />
      </div>

      {/* Win/Loss Synchronization & Drawdown Overlap */}
      <div className="grid md:grid-cols-2 gap-8 mt-8">
        <MatrixTable
          title="Win/Loss Synchronization"
          average={winLossSyncData.average}
          headers={winLossSyncData.headers}
          rows={winLossSyncData.rows}
          colorFn={getSyncColor}
          showIndicator
        />
        <MatrixTable
          title="Drawdown Overlap"
          average={drawdownOverlapData.average}
          headers={drawdownOverlapData.headers}
          rows={drawdownOverlapData.rows}
          colorFn={getOverlapColor}
          showIndicator
        />
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
  );
};

export default CorrelationMatrices;