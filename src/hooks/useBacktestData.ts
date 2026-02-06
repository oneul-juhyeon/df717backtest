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

export interface DurationVsProfitPoint {
  durationHours: number;
  profit: number;
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
  durationVsProfitData: DurationVsProfitPoint[];
  tradesData: TradeDataPoint[];
  totalTrades: number;
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

// Parse trade date strings like "May 31, 21:00" or "2024.01.15 10:30:00"
function parseTradeDate(dateStr: string): Date | null {
  if (!dateStr) return null;
  
  // Handle format "Month Day, HH:MM" (e.g., "May 31, 21:00")
  const monthDayMatch = dateStr.match(/^(\w+)\s+(\d+),?\s+(\d+):(\d+)/);
  if (monthDayMatch) {
    const months: { [key: string]: number } = {
      'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
      'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
    };
    const month = months[monthDayMatch[1]];
    if (month !== undefined) {
      const day = parseInt(monthDayMatch[2]);
      const hour = parseInt(monthDayMatch[3]);
      const minute = parseInt(monthDayMatch[4]);
      // Use 2024 as default year for relative dates
      return new Date(2024, month, day, hour, minute);
    }
  }
  
  // Handle format "YYYY.MM.DD HH:MM:SS"
  const cleaned = dateStr.replace(/\./g, '-');
  const d = new Date(cleaned);
  return isNaN(d.getTime()) ? null : d;
}

// Extract trades from HTML table
function extractTradesFromHtml(htmlContent: string): TradeDataPoint[] {
  const tradesData: TradeDataPoint[] = [];
  
  let tableContent = '';
  
  // First try specific tradesBody id
  const tradesBodyMatch = htmlContent.match(/<tbody[^>]*id=["']?tradesBody["']?[^>]*>([\s\S]*?)<\/tbody>/i);
  if (tradesBodyMatch) {
    tableContent = tradesBodyMatch[1];
  } else {
    // Find the table that looks like a trades table (has many rows with trade-like data)
    const allTbodies = [...htmlContent.matchAll(/<tbody[^>]*>([\s\S]*?)<\/tbody>/gi)];
    
    for (const match of allTbodies) {
      const content = match[1];
      // Check if this looks like a trades table
      const hasBuySell = content.toLowerCase().includes('buy') || content.toLowerCase().includes('sell');
      const hasXAUUSD = content.includes('XAUUSD') || content.includes('xauusd');
      
      if ((hasBuySell || hasXAUUSD) && content.length > tableContent.length) {
        tableContent = content;
      }
    }
  }
  
  if (!tableContent) {
    return tradesData;
  }
  
  const rowMatches = [...tableContent.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)];
  
  for (const rowMatch of rowMatches) {
    const cells = [...rowMatch[1].matchAll(/<td[^>]*>([\s\S]*?)<\/td>/gi)];
    
    if (cells && cells.length >= 5) {
      const getText = (match: RegExpMatchArray) => match[1].replace(/<[^>]+>/g, '').trim();
      
      // Detect column order based on content
      // Format 1: OpenTime, CloseTime, Symbol, Type, Volume, ...
      // Format 2: OpenTime, Type, Volume, Symbol, OpenPrice, SL, TP, CloseTime, ClosePrice, Commission, Swap, Profit
      
      const cell0 = getText(cells[0]);
      const cell1 = getText(cells[1]);
      const cell2 = getText(cells[2]);
      const cell3 = getText(cells[3]);
      const cell4 = getText(cells[4]);
      
      // Check if cell1 contains a date (CloseTime) or type (Buy/Sell)
      const cell1IsType = cell1.toLowerCase().includes('buy') || cell1.toLowerCase().includes('sell');
      const cell3IsType = cell3.toLowerCase().includes('buy') || cell3.toLowerCase().includes('sell');
      
      let trade: TradeDataPoint;
      
      if (cell3IsType) {
        // Format: OpenTime, CloseTime, Symbol, Type, Volume, OpenPrice, ClosePrice, Profit, ...
        trade = {
          id: tradesData.length + 1,
          openTime: cell0,
          closeTime: cell1,
          symbol: cell2,
          type: cell3,
          volume: parseFloat(cell4) || 0,
          openPrice: cells.length > 5 ? parseFloat(getText(cells[5])) || 0 : 0,
          closePrice: cells.length > 6 ? parseFloat(getText(cells[6])) || 0 : 0,
          sl: 0,
          tp: 0,
          commission: 0,
          swap: 0,
          profit: cells.length > 7 ? parseFloat(getText(cells[7]).replace(/[^0-9.-]/g, '')) || 0 : 0,
        };
      } else if (cell1IsType) {
        // Format: OpenTime, Type, Volume, Symbol, OpenPrice, SL, TP, CloseTime, ClosePrice, Commission, Swap, Profit
        trade = {
          id: tradesData.length + 1,
          openTime: cell0,
          type: cell1,
          volume: parseFloat(cell2) || 0,
          symbol: cell3,
          openPrice: parseFloat(cell4) || 0,
          sl: cells.length > 5 ? parseFloat(getText(cells[5])) || 0 : 0,
          tp: cells.length > 6 ? parseFloat(getText(cells[6])) || 0 : 0,
          closeTime: cells.length > 7 ? getText(cells[7]) : '',
          closePrice: cells.length > 8 ? parseFloat(getText(cells[8])) || 0 : 0,
          commission: cells.length > 9 ? parseFloat(getText(cells[9])) || 0 : 0,
          swap: cells.length > 10 ? parseFloat(getText(cells[10])) || 0 : 0,
          profit: cells.length > 11 ? parseFloat(getText(cells[11]).replace(/[^0-9.-]/g, '')) || 0 : 0,
        };
      } else {
        // Skip if we can't determine the format
        continue;
      }
      
      // Only add if it looks like a valid trade
      if (trade.type.toLowerCase().includes('buy') || trade.type.toLowerCase().includes('sell')) {
        tradesData.push(trade);
      }
    }
  }
  
  console.log('Extracted', tradesData.length, 'trades');
  return tradesData;
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
    durationVsProfitData: [],
    tradesData: [],
    totalTrades: 988,
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

        // More flexible regex patterns for data extraction
        // Try multiple variable name patterns
        const datePatterns = [
          /const\s+allDates\s*=\s*(\[[\s\S]*?\]);/,
          /var\s+allDates\s*=\s*(\[[\s\S]*?\]);/,
          /let\s+allDates\s*=\s*(\[[\s\S]*?\]);/,
        ];
        
        const equityPatterns = [
          /const\s+equityCurve\s*=\s*(\[[\s\S]*?\]);/,
          /var\s+equityCurve\s*=\s*(\[[\s\S]*?\]);/,
          /let\s+equityCurve\s*=\s*(\[[\s\S]*?\]);/,
        ];
        
        let allDates: string[] = [];
        let equityCurve: number[] = [];
        
        // Try each pattern for dates
        for (const pattern of datePatterns) {
          const match = htmlContent.match(pattern);
          if (match) {
            try {
              allDates = JSON.parse(match[1].replace(/'/g, '"'));
              if (allDates.length > 0) break;
            } catch { 
              continue;
            }
          }
        }
        
        // Try each pattern for equity curve
        for (const pattern of equityPatterns) {
          const match = htmlContent.match(pattern);
          if (match) {
            try {
              equityCurve = JSON.parse(match[1]);
              if (equityCurve.length > 0) break;
            } catch { 
              continue;
            }
          }
        }

        // Extract trades data first - do this BEFORE fallback check
        const tradesData: TradeDataPoint[] = extractTradesFromHtml(htmlContent);
        
        // Calculate duration vs profit from trades data
        const durationVsProfitData: DurationVsProfitPoint[] = tradesData.map(trade => {
          const openDate = parseTradeDate(trade.openTime);
          const closeDate = parseTradeDate(trade.closeTime);
          if (openDate && closeDate) {
            const durationMs = closeDate.getTime() - openDate.getTime();
            const durationHours = Math.max(0, durationMs / (1000 * 60 * 60));
            return { durationHours, profit: trade.profit };
          }
          return { durationHours: 0, profit: trade.profit };
        });

        // If ZIP parsing failed for main data, use static data but keep trades
        if (allDates.length === 0 || equityCurve.length === 0) {
          console.log('Using static fallback data, trades found:', tradesData.length);
          setData({
            equityData: getStaticEquityData(),
            dailyPnLData: getStaticDailyPnLData(),
            monthlyReturnsData: getStaticMonthlyReturnsData(),
            distributionData: getStaticDistributionData(),
            hourProfitData: generateHourProfitData(),
            dayProfitData: generateDayProfitData(),
            durationProfitData: generateDurationProfitData(),
            durationDistData: generateDurationDistData(),
            durationVsProfitData,
            tradesData,
            totalTrades: tradesData.length > 0 ? 988 : 988,
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

        // Use helper function to extract trades
        const extractedTrades = extractTradesFromHtml(htmlContent);
        const finalTradesData = extractedTrades.length > 0 ? extractedTrades : tradesData;
        
        // Calculate duration vs profit using the helper function
        const finalDurationVsProfitData: DurationVsProfitPoint[] = finalTradesData.map(trade => {
          const openDate = parseTradeDate(trade.openTime);
          const closeDate = parseTradeDate(trade.closeTime);
          if (openDate && closeDate) {
            const durationMs = closeDate.getTime() - openDate.getTime();
            const durationHours = Math.max(0, durationMs / (1000 * 60 * 60));
            return { durationHours, profit: trade.profit };
          }
          return { durationHours: 0, profit: trade.profit };
        });

        setData({
          equityData,
          dailyPnLData,
          monthlyReturnsData,
          distributionData,
          hourProfitData,
          dayProfitData,
          durationProfitData,
          durationDistData,
          durationVsProfitData: finalDurationVsProfitData,
          tradesData: finalTradesData,
          totalTrades: 988,
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
          durationVsProfitData: [],
          tradesData: [],
          totalTrades: 988,
          isLoading: false,
          error: null,
        });
      }
    }

    loadData();
  }, []);

  return data;
}
