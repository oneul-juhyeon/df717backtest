import { useState, useEffect } from 'react';
import JSZip from 'jszip';

export interface EquityDataPoint {
  date: string;
  equity: number;
  pnl: number;
  change: number;
}

export interface DailyPnLDataPoint {
  date: string;
  pnl: number;
}

export interface MonthlyReturnDataPoint {
  date: string;
  return: number;
}

export interface DistributionDataPoint {
  range: string;
  count: number;
}

export interface HourProfitDataPoint {
  hour: number;
  profit: number;
}

export interface DayProfitDataPoint {
  day: string;
  profit: number;
}

export interface DurationProfitDataPoint {
  duration: string;
  profit: number;
  trades: number;
}

export interface DurationDistDataPoint {
  range: string;
  count: number;
}

export interface TradeDataPoint {
  id: number;
  openTime: string;
  type: string;
  volume: number;
  symbol: string;
  openPrice: number;
  sl: number;
  tp: number;
  closeTime: string;
  closePrice: number;
  commission: number;
  swap: number;
  profit: number;
}

export interface BacktestData {
  equityData: EquityDataPoint[];
  dailyPnLData: DailyPnLDataPoint[];
  monthlyReturnsData: MonthlyReturnDataPoint[];
  distributionData: DistributionDataPoint[];
  hourProfitData: HourProfitDataPoint[];
  dayProfitData: DayProfitDataPoint[];
  durationProfitData: DurationProfitDataPoint[];
  durationDistData: DurationDistDataPoint[];
  tradesData: TradeDataPoint[];
  isLoading: boolean;
  error: string | null;
}

// Helper function to extract JavaScript array from HTML script
function extractArrayFromScript(html: string, varName: string): any[] {
  const regex = new RegExp(`(?:const|let|var)\\s+${varName}\\s*=\\s*(\\[.*?\\]);`, 's');
  const match = html.match(regex);
  if (match) {
    try {
      // Clean and parse the array
      return eval(match[1]);
    } catch {
      return [];
    }
  }
  return [];
}

function extractObjectFromScript(html: string, varName: string): any {
  const regex = new RegExp(`(?:const|let|var)\\s+${varName}\\s*=\\s*(\\{.*?\\});`, 's');
  const match = html.match(regex);
  if (match) {
    try {
      return eval(`(${match[1]})`);
    } catch {
      return {};
    }
  }
  return {};
}

export function useBacktestData(): BacktestData {
  const [data, setData] = useState<BacktestData>({
    equityData: [],
    dailyPnLData: [],
    monthlyReturnsData: [],
    distributionData: [],
    hourProfitData: [],
    dayProfitData: [],
    durationProfitData: [],
    durationDistData: [],
    tradesData: [],
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    async function loadData() {
      try {
        const response = await fetch('/backtest-data.zip');
        const blob = await response.blob();
        const zip = await JSZip.loadAsync(blob);

        // Find the HTML file
        let htmlContent = '';
        for (const filename of Object.keys(zip.files)) {
          if (filename.endsWith('.html')) {
            htmlContent = await zip.files[filename].async('string');
            break;
          }
        }

        if (!htmlContent) {
          throw new Error('No HTML file found in ZIP');
        }

        // Parse data from HTML script blocks
        // Extract allDates and equityCurve data
        const allDatesMatch = htmlContent.match(/const allDates\s*=\s*(\[.*?\]);/s);
        const equityCurveMatch = htmlContent.match(/const equityCurve\s*=\s*(\[.*?\]);/s);
        
        let allDates: string[] = [];
        let equityCurve: number[] = [];
        
        if (allDatesMatch) {
          try {
            allDates = JSON.parse(allDatesMatch[1].replace(/'/g, '"'));
          } catch {
            allDates = [];
          }
        }
        
        if (equityCurveMatch) {
          try {
            equityCurve = JSON.parse(equityCurveMatch[1]);
          } catch {
            equityCurve = [];
          }
        }

        // Build equity data with P&L calculations
        const equityData: EquityDataPoint[] = allDates.map((date, i) => {
          const equity = equityCurve[i] || 0;
          const prevEquity = i > 0 ? equityCurve[i - 1] : equity;
          const pnl = equity - prevEquity;
          const change = prevEquity > 0 ? ((pnl / prevEquity) * 100) : 0;
          return { date, equity, pnl, change };
        });

        // Extract daily P&L data
        const dailyPnLMatch = htmlContent.match(/const dailyPnL\s*=\s*(\[.*?\]);/s);
        let dailyPnLRaw: number[] = [];
        if (dailyPnLMatch) {
          try {
            dailyPnLRaw = JSON.parse(dailyPnLMatch[1]);
          } catch {
            dailyPnLRaw = [];
          }
        }
        
        const dailyPnLData: DailyPnLDataPoint[] = allDates.map((date, i) => ({
          date,
          pnl: dailyPnLRaw[i] || 0,
        }));

        // Extract monthly returns
        const monthlyLabelsMatch = htmlContent.match(/const monthlyLabels\s*=\s*(\[.*?\]);/s);
        const monthlyProfitsMatch = htmlContent.match(/const monthlyProfits\s*=\s*(\[.*?\]);/s);
        
        let monthlyLabels: string[] = [];
        let monthlyProfits: number[] = [];
        
        if (monthlyLabelsMatch) {
          try {
            monthlyLabels = JSON.parse(monthlyLabelsMatch[1].replace(/'/g, '"'));
          } catch {
            monthlyLabels = [];
          }
        }
        
        if (monthlyProfitsMatch) {
          try {
            monthlyProfits = JSON.parse(monthlyProfitsMatch[1]);
          } catch {
            monthlyProfits = [];
          }
        }

        const monthlyReturnsData: MonthlyReturnDataPoint[] = monthlyLabels.map((date, i) => ({
          date,
          return: monthlyProfits[i] || 0,
        }));

        // Extract distribution data
        const distLabelsMatch = htmlContent.match(/const distLabels\s*=\s*(\[.*?\]);/s);
        const distCountsMatch = htmlContent.match(/const distCounts\s*=\s*(\[.*?\]);/s);
        
        let distLabels: string[] = [];
        let distCounts: number[] = [];
        
        if (distLabelsMatch) {
          try {
            distLabels = JSON.parse(distLabelsMatch[1].replace(/'/g, '"'));
          } catch {
            distLabels = [];
          }
        }
        
        if (distCountsMatch) {
          try {
            distCounts = JSON.parse(distCountsMatch[1]);
          } catch {
            distCounts = [];
          }
        }

        const distributionData: DistributionDataPoint[] = distLabels.map((range, i) => ({
          range,
          count: distCounts[i] || 0,
        }));

        // Extract hourly profit data
        const hourLabelsMatch = htmlContent.match(/const hourLabels\s*=\s*(\[.*?\]);/s);
        const hourProfitsMatch = htmlContent.match(/const hourProfits\s*=\s*(\[.*?\]);/s);
        
        let hourLabels: number[] = [];
        let hourProfits: number[] = [];
        
        if (hourLabelsMatch) {
          try {
            hourLabels = JSON.parse(hourLabelsMatch[1]);
          } catch {
            hourLabels = [];
          }
        }
        
        if (hourProfitsMatch) {
          try {
            hourProfits = JSON.parse(hourProfitsMatch[1]);
          } catch {
            hourProfits = [];
          }
        }

        const hourProfitData: HourProfitDataPoint[] = hourLabels.map((hour, i) => ({
          hour,
          profit: hourProfits[i] || 0,
        }));

        // Extract day of week profit data
        const dayLabelsMatch = htmlContent.match(/const dayLabels\s*=\s*(\[.*?\]);/s);
        const dayProfitsMatch = htmlContent.match(/const dayProfits\s*=\s*(\[.*?\]);/s);
        
        let dayLabels: string[] = [];
        let dayProfits: number[] = [];
        
        if (dayLabelsMatch) {
          try {
            dayLabels = JSON.parse(dayLabelsMatch[1].replace(/'/g, '"'));
          } catch {
            dayLabels = [];
          }
        }
        
        if (dayProfitsMatch) {
          try {
            dayProfits = JSON.parse(dayProfitsMatch[1]);
          } catch {
            dayProfits = [];
          }
        }

        const dayProfitData: DayProfitDataPoint[] = dayLabels.map((day, i) => ({
          day,
          profit: dayProfits[i] || 0,
        }));

        // Extract duration vs profit data
        const durationLabelsMatch = htmlContent.match(/const durationLabels\s*=\s*(\[.*?\]);/s);
        const durationProfitsMatch = htmlContent.match(/const durationProfits\s*=\s*(\[.*?\]);/s);
        const durationTradesMatch = htmlContent.match(/const durationTrades\s*=\s*(\[.*?\]);/s);
        
        let durationLabels: string[] = [];
        let durationProfits: number[] = [];
        let durationTrades: number[] = [];
        
        if (durationLabelsMatch) {
          try {
            durationLabels = JSON.parse(durationLabelsMatch[1].replace(/'/g, '"'));
          } catch {
            durationLabels = [];
          }
        }
        
        if (durationProfitsMatch) {
          try {
            durationProfits = JSON.parse(durationProfitsMatch[1]);
          } catch {
            durationProfits = [];
          }
        }
        
        if (durationTradesMatch) {
          try {
            durationTrades = JSON.parse(durationTradesMatch[1]);
          } catch {
            durationTrades = [];
          }
        }

        const durationProfitData: DurationProfitDataPoint[] = durationLabels.map((duration, i) => ({
          duration,
          profit: durationProfits[i] || 0,
          trades: durationTrades[i] || 0,
        }));

        // Extract duration distribution
        const durationDistLabelsMatch = htmlContent.match(/const durationDistLabels\s*=\s*(\[.*?\]);/s);
        const durationDistCountsMatch = htmlContent.match(/const durationDistCounts\s*=\s*(\[.*?\]);/s);
        
        let durationDistLabels: string[] = [];
        let durationDistCounts: number[] = [];
        
        if (durationDistLabelsMatch) {
          try {
            durationDistLabels = JSON.parse(durationDistLabelsMatch[1].replace(/'/g, '"'));
          } catch {
            durationDistLabels = [];
          }
        }
        
        if (durationDistCountsMatch) {
          try {
            durationDistCounts = JSON.parse(durationDistCountsMatch[1]);
          } catch {
            durationDistCounts = [];
          }
        }

        const durationDistData: DurationDistDataPoint[] = durationDistLabels.map((range, i) => ({
          range,
          count: durationDistCounts[i] || 0,
        }));

        // Extract trades data from HTML table
        const tradesData: TradeDataPoint[] = [];
        const tradeRowsMatch = htmlContent.match(/<tbody[^>]*id="tradesBody"[^>]*>([\s\S]*?)<\/tbody>/);
        if (tradeRowsMatch) {
          const rowMatches = tradeRowsMatch[1].matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/g);
          let id = 1;
          for (const rowMatch of rowMatches) {
            const cells = rowMatch[1].match(/<td[^>]*>(.*?)<\/td>/g);
            if (cells && cells.length >= 13) {
              const getText = (cell: string) => cell.replace(/<[^>]+>/g, '').trim();
              tradesData.push({
                id: id++,
                openTime: getText(cells[0]),
                type: getText(cells[1]),
                volume: parseFloat(getText(cells[2])) || 0,
                symbol: getText(cells[3]),
                openPrice: parseFloat(getText(cells[4])) || 0,
                sl: parseFloat(getText(cells[5])) || 0,
                tp: parseFloat(getText(cells[6])) || 0,
                closeTime: getText(cells[7]),
                closePrice: parseFloat(getText(cells[8])) || 0,
                commission: parseFloat(getText(cells[9])) || 0,
                swap: parseFloat(getText(cells[10])) || 0,
                profit: parseFloat(getText(cells[11])) || 0,
              });
            }
          }
        }

        setData({
          equityData,
          dailyPnLData,
          monthlyReturnsData,
          distributionData,
          hourProfitData,
          dayProfitData,
          durationProfitData,
          durationDistData,
          tradesData,
          isLoading: false,
          error: null,
        });
      } catch (error) {
        console.error('Failed to load backtest data:', error);
        setData(prev => ({
          ...prev,
          isLoading: false,
          error: error instanceof Error ? error.message : 'Failed to load data',
        }));
      }
    }

    loadData();
  }, []);

  return data;
}
