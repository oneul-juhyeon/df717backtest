import { useState } from "react";
import { TradeDataPoint } from "@/hooks/useBacktestData";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  data: TradeDataPoint[];
  totalTrades: number;
}

const formatCurrency = (value: number) => {
  const sign = value >= 0 ? '+' : '';
  return `${sign}$${Math.abs(value).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

const TradesTable = ({ data, totalTrades }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;
  const totalPages = Math.max(1, Math.ceil(data.length / itemsPerPage));

  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const displayCount = data.length;

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-border flex items-center justify-between">
        <h3 className="text-lg font-semibold">
          Trades <span className="text-muted-foreground font-normal">(Showing {displayCount} of {totalTrades})</span>
        </h3>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-1 rounded hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-1 rounded hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead className="bg-muted/50">
            <tr>
              <th className="px-3 py-2 text-left font-medium text-muted-foreground">Open Time</th>
              <th className="px-3 py-2 text-left font-medium text-muted-foreground">Type</th>
              <th className="px-3 py-2 text-right font-medium text-muted-foreground">Volume</th>
              <th className="px-3 py-2 text-left font-medium text-muted-foreground">Symbol</th>
              <th className="px-3 py-2 text-right font-medium text-muted-foreground">Open Price</th>
              <th className="px-3 py-2 text-right font-medium text-muted-foreground">S/L</th>
              <th className="px-3 py-2 text-right font-medium text-muted-foreground">T/P</th>
              <th className="px-3 py-2 text-left font-medium text-muted-foreground">Close Time</th>
              <th className="px-3 py-2 text-right font-medium text-muted-foreground">Close Price</th>
              <th className="px-3 py-2 text-right font-medium text-muted-foreground">Commission</th>
              <th className="px-3 py-2 text-right font-medium text-muted-foreground">Swap</th>
              <th className="px-3 py-2 text-right font-medium text-muted-foreground">Profit</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {paginatedData.length > 0 ? (
              paginatedData.map((trade) => (
                <tr key={trade.id} className="hover:bg-muted/30">
                  <td className="px-3 py-2 font-mono">{trade.openTime}</td>
                  <td className="px-3 py-2">
                    <span className={trade.type.toLowerCase() === 'buy' ? 'text-success' : 'text-destructive'}>
                      {trade.type}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-right font-mono">{trade.volume.toFixed(2)}</td>
                  <td className="px-3 py-2">{trade.symbol}</td>
                  <td className="px-3 py-2 text-right font-mono">{trade.openPrice.toFixed(2)}</td>
                  <td className="px-3 py-2 text-right font-mono text-muted-foreground">{trade.sl > 0 ? trade.sl.toFixed(2) : '-'}</td>
                  <td className="px-3 py-2 text-right font-mono text-muted-foreground">{trade.tp > 0 ? trade.tp.toFixed(2) : '-'}</td>
                  <td className="px-3 py-2 font-mono">{trade.closeTime}</td>
                  <td className="px-3 py-2 text-right font-mono">{trade.closePrice.toFixed(2)}</td>
                  <td className="px-3 py-2 text-right font-mono text-muted-foreground">{trade.commission.toFixed(2)}</td>
                  <td className="px-3 py-2 text-right font-mono text-muted-foreground">{trade.swap.toFixed(2)}</td>
                  <td className={`px-3 py-2 text-right font-mono ${trade.profit >= 0 ? 'text-success' : 'text-destructive'}`}>
                    {formatCurrency(trade.profit)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={12} className="px-3 py-8 text-center text-muted-foreground">
                  Loading trade data from backtest report...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TradesTable;
