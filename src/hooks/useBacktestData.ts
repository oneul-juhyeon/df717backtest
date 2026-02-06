import { useState, useEffect } from 'react';
import JSZip from 'jszip';
import { 
  equityCurveData as staticEquityData, 
  dailyPnLData as staticDailyPnL, 
  monthlyReturnsData as staticMonthlyReturns,
  distributionData as staticDistribution
} from '@/data/backtestData';

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

// Convert static data to the new format
function getStaticEquityData(): EquityDataPoint[] {
  return staticEquityData.map((item, i) => {
    const prevEquity = i > 0 ? staticEquityData[i - 1].equity : item.equity;
    const pnl = item.equity - prevEquity;
    const change = prevEquity > 0 ? ((pnl / prevEquity) * 100) : 0;
    return {
      date: item.date,
      equity: item.equity,
      pnl,
      change,
    };
  });
}

function getStaticDailyPnLData(): DailyPnLDataPoint[] {
  return staticDailyPnL.map(item => ({
    date: item.date,
    pnl: item.pnl,
  }));
}

function getStaticMonthlyReturnsData(): MonthlyReturnDataPoint[] {
  return staticMonthlyReturns.map(item => ({
    date: `${item.year}-${String(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].indexOf(item.month) + 1).padStart(2, '0')}`,
    return: item.return,
  }));
}

function getStaticDistributionData(): DistributionDataPoint[] {
  return staticDistribution.map(item => ({
    range: item.range,
    count: item.count,
  }));
}

// Generate sample data for new sections
function generateHourProfitData(): HourProfitDataPoint[] {
  return Array.from({ length: 24 }, (_, i) => ({
    hour: i,
    profit: Math.floor(Math.random() * 60000 - 10000),
  }));
}

function generateDayProfitData(): DayProfitDataPoint[] {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  return days.map(day => ({
    day,
    profit: Math.floor(Math.random() * 200000 - 20000),
  }));
}

function generateDurationProfitData(): DurationProfitDataPoint[] {
  const durations = ['<1h', '1-4h', '4-8h', '8-24h', '1-3d', '3-7d', '>7d'];
  return durations.map(duration => ({
    duration,
    profit: Math.floor(Math.random() * 150000 - 20000),
    trades: Math.floor(Math.random() * 200),
  }));
}

function generateDurationDistData(): DurationDistDataPoint[] {
  const ranges = ['<1h', '1-4h', '4-8h', '8-24h', '1-3d', '3-7d', '>7d'];
  return ranges.map(range => ({
    range,
    count: Math.floor(Math.random() * 300),
  }));
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
        
        if (!response.ok) {
          throw new Error('Failed to fetch backtest data');
        }
        
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
        const allDatesMatch = htmlContent.match(/const allDates\s*=\s*(\[[\s\S]*?\]);/);
        const equityCurveMatch = htmlContent.match(/const equityCurve\s*=\s*(\[[\s\S]*?\]);/);
        
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

        // If ZIP parsing failed, use static data
        if (allDates.length === 0 || equityCurve.length === 0) {
          console.log('Using static fallback data');
          setData({
            equityData: getStaticEquityData(),
            dailyPnLData: getStaticDailyPnLData(),
            monthlyReturnsData: getStaticMonthlyReturnsData(),
            distributionData: getStaticDistributionData(),
            hourProfitData: generateHourProfitData(),
            dayProfitData: generateDayProfitData(),
            durationProfitData: generateDurationProfitData(),
            durationDistData: generateDurationDistData(),
            tradesData: [],
            isLoading: false,
            error: null,
          });
          return;
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
        const dailyPnLMatch = htmlContent.match(/const dailyPnL\s*=\s*(\[[\s\S]*?\]);/);
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
        const monthlyLabelsMatch = htmlContent.match(/const monthlyLabels\s*=\s*(\[[\s\S]*?\]);/);
        const monthlyProfitsMatch = htmlContent.match(/const monthlyProfits\s*=\s*(\[[\s\S]*?\]);/);
        
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

        const monthlyReturnsData: MonthlyReturnDataPoint[] = monthlyLabels.length > 0 
          ? monthlyLabels.map((date, i) => ({
              date,
              return: monthlyProfits[i] || 0,
            }))
          : getStaticMonthlyReturnsData();

        // Extract distribution data
        const distLabelsMatch = htmlContent.match(/const distLabels\s*=\s*(\[[\s\S]*?\]);/);
        const distCountsMatch = htmlContent.match(/const distCounts\s*=\s*(\[[\s\S]*?\]);/);
        
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

        const distributionData: DistributionDataPoint[] = distLabels.length > 0
          ? distLabels.map((range, i) => ({
              range,
              count: distCounts[i] || 0,
            }))
          : getStaticDistributionData();

        // Extract hourly profit data
        const hourLabelsMatch = htmlContent.match(/const hourLabels\s*=\s*(\[[\s\S]*?\]);/);
        const hourProfitsMatch = htmlContent.match(/const hourProfits\s*=\s*(\[[\s\S]*?\]);/);
        
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

        const hourProfitData: HourProfitDataPoint[] = hourLabels.length > 0
          ? hourLabels.map((hour, i) => ({
              hour,
              profit: hourProfits[i] || 0,
            }))
          : generateHourProfitData();

        // Extract day of week profit data
        const dayLabelsMatch = htmlContent.match(/const dayLabels\s*=\s*(\[[\s\S]*?\]);/);
        const dayProfitsMatch = htmlContent.match(/const dayProfits\s*=\s*(\[[\s\S]*?\]);/);
        
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

        const dayProfitData: DayProfitDataPoint[] = dayLabels.length > 0
          ? dayLabels.map((day, i) => ({
              day,
              profit: dayProfits[i] || 0,
            }))
          : generateDayProfitData();

        // Extract duration vs profit data
        const durationLabelsMatch = htmlContent.match(/const durationLabels\s*=\s*(\[[\s\S]*?\]);/);
        const durationProfitsMatch = htmlContent.match(/const durationProfits\s*=\s*(\[[\s\S]*?\]);/);
        const durationTradesMatch = htmlContent.match(/const durationTrades\s*=\s*(\[[\s\S]*?\]);/);
        
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

        const durationProfitData: DurationProfitDataPoint[] = durationLabels.length > 0
          ? durationLabels.map((duration, i) => ({
              duration,
              profit: durationProfits[i] || 0,
              trades: durationTrades[i] || 0,
            }))
          : generateDurationProfitData();

        // Extract duration distribution
        const durationDistLabelsMatch = htmlContent.match(/const durationDistLabels\s*=\s*(\[[\s\S]*?\]);/);
        const durationDistCountsMatch = htmlContent.match(/const durationDistCounts\s*=\s*(\[[\s\S]*?\]);/);
        
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

        const durationDistData: DurationDistDataPoint[] = durationDistLabels.length > 0
          ? durationDistLabels.map((range, i) => ({
              range,
              count: durationDistCounts[i] || 0,
            }))
          : generateDurationDistData();

        // Extract trades data from HTML table
        const tradesData: TradeDataPoint[] = [];
        const tradeRowsMatch = htmlContent.match(/<tbody[^>]*id="tradesBody"[^>]*>([\s\S]*?)<\/tbody>/);
        if (tradeRowsMatch) {
          const rowMatches = tradeRowsMatch[1].matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/g);
          let id = 1;
          for (const rowMatch of rowMatches) {
            const cells = rowMatch[1].match(/<td[^>]*>(.*?)<\/td>/g);
            if (cells && cells.length >= 12) {
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
        console.error('Failed to load backtest data from ZIP, using static fallback:', error);
        // Use static fallback data
        setData({
          equityData: getStaticEquityData(),
          dailyPnLData: getStaticDailyPnLData(),
          monthlyReturnsData: getStaticMonthlyReturnsData(),
          distributionData: getStaticDistributionData(),
          hourProfitData: generateHourProfitData(),
          dayProfitData: generateDayProfitData(),
          durationProfitData: generateDurationProfitData(),
          durationDistData: generateDurationDistData(),
          tradesData: [],
          isLoading: false,
          error: null,
        });
      }
    }

    loadData();
  }, []);

  return data;
}
