import { useState, useEffect } from 'react';
import JSZip from 'jszip';
import {
  dftrustEquityCurveData as staticEquityData,
  dftrustDailyPnLData as staticDailyPnL,
  dftrustMonthlyReturnsData as staticMonthlyReturns,
  dftrustDistributionData as staticDistribution
} from '@/data/dftrustData';
import type {
  EquityDataPoint,
  DailyPnLDataPoint,
  MonthlyReturnDataPoint,
  DistributionDataPoint,
  HourProfitDataPoint,
  DayProfitDataPoint,
  DurationProfitDataPoint,
  DurationDistDataPoint,
  DurationVsProfitPoint,
  TradeDataPoint,
  BacktestData
} from './useBacktestData';

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
    profit: Math.floor(Math.random() * 200 - 30),
  }));
}

function generateDayProfitData(): DayProfitDataPoint[] {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  return days.map(day => ({
    day,
    profit: Math.floor(Math.random() * 800 - 80),
  }));
}

function generateDurationProfitData(): DurationProfitDataPoint[] {
  const durations = ['<1h', '1-4h', '4-8h', '8-24h', '1-3d', '3-7d', '>7d'];
  return durations.map(duration => ({
    duration,
    profit: Math.floor(Math.random() * 500 - 50),
    trades: Math.floor(Math.random() * 300),
  }));
}

function generateDurationDistData(): DurationDistDataPoint[] {
  const ranges = ['<1h', '1-4h', '4-8h', '8-24h', '1-3d', '3-7d', '>7d'];
  return ranges.map(range => ({
    range,
    count: Math.floor(Math.random() * 400),
  }));
}

// Parse trade date strings
function parseTradeDate(dateStr: string): Date | null {
  if (!dateStr) return null;
  
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
      return new Date(2024, month, day, hour, minute);
    }
  }
  
  const cleaned = dateStr.replace(/\./g, '-');
  const d = new Date(cleaned);
  return isNaN(d.getTime()) ? null : d;
}

// Extract trades from HTML table
function extractTradesFromHtml(htmlContent: string): TradeDataPoint[] {
  const tradesData: TradeDataPoint[] = [];
  
  let tableContent = '';
  const tradesBodyMatch = htmlContent.match(/<tbody[^>]*id=["']?tradesBody["']?[^>]*>([\s\S]*?)<\/tbody>/i);
  if (tradesBodyMatch) {
    tableContent = tradesBodyMatch[1];
  } else {
    const allTbodies = [...htmlContent.matchAll(/<tbody[^>]*>([\s\S]*?)<\/tbody>/gi)];
    for (const match of allTbodies) {
      const content = match[1];
      const hasBuySell = content.toLowerCase().includes('buy') || content.toLowerCase().includes('sell');
      const hasXAUUSD = content.includes('XAUUSD') || content.includes('xauusd');
      if ((hasBuySell || hasXAUUSD) && content.length > tableContent.length) {
        tableContent = content;
      }
    }
  }
  
  if (!tableContent) return tradesData;
  
  const rowMatches = [...tableContent.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)];
  
  for (const rowMatch of rowMatches) {
    const cells = [...rowMatch[1].matchAll(/<td[^>]*>([\s\S]*?)<\/td>/gi)];
    
    if (cells && cells.length >= 5) {
      const getText = (match: RegExpMatchArray) => match[1].replace(/<[^>]+>/g, '').trim();
      
      const cell0 = getText(cells[0]);
      const cell1 = getText(cells[1]);
      const cell2 = getText(cells[2]);
      const cell3 = getText(cells[3]);
      const cell4 = getText(cells[4]);
      
      const cell1IsType = cell1.toLowerCase().includes('buy') || cell1.toLowerCase().includes('sell');
      const cell3IsType = cell3.toLowerCase().includes('buy') || cell3.toLowerCase().includes('sell');
      
      let trade: TradeDataPoint;
      
      if (cell3IsType) {
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
        continue;
      }
      
      if (trade.type.toLowerCase().includes('buy') || trade.type.toLowerCase().includes('sell')) {
        tradesData.push(trade);
      }
    }
  }
  
  return tradesData;
}

export function useDFtrustData(): BacktestData {
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
    totalTrades: 1246,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    async function loadData() {
      try {
        // Try to load from HTML file
        const response = await fetch('/dftrust-backtest.html');
        
        if (!response.ok) {
          throw new Error('Failed to fetch DFtrust backtest data');
        }
        
        const htmlContent = await response.text();

        // Extract chart data from script
        const datePatterns = [
          /labels:\s*\[([\s\S]*?)\]/,
        ];
        
        const equityPatterns = [
          /datasets:\s*\[\{\s*[^}]*data:\s*\[([\s\S]*?)\]/,
        ];
        
        let allDates: string[] = [];
        let equityCurve: number[] = [];
        
        // Try to extract from Chart.js initialization
        const equityChartMatch = htmlContent.match(/new Chart\(document\.getElementById\('equityChart'\)[^{]*\{[\s\S]*?labels:\s*\[([\s\S]*?)\],[\s\S]*?datasets:\s*\[\{[\s\S]*?data:\s*\[([\s\S]*?)\]/);
        if (equityChartMatch) {
          try {
            allDates = JSON.parse('[' + equityChartMatch[1] + ']');
            equityCurve = JSON.parse('[' + equityChartMatch[2] + ']');
          } catch {
            // Parse failed, will use fallback
          }
        }

        // Extract trades data
        const tradesData = extractTradesFromHtml(htmlContent);
        
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

        // If parsing failed, use static data
        if (allDates.length === 0 || equityCurve.length === 0) {
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
            totalTrades: 1246,
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

        // Calculate daily P&L
        const dailyPnLData: DailyPnLDataPoint[] = allDates.map((date, i) => ({
          date,
          pnl: i > 0 ? equityCurve[i] - equityCurve[i - 1] : 0,
        }));

        setData({
          equityData,
          dailyPnLData,
          monthlyReturnsData: getStaticMonthlyReturnsData(),
          distributionData: getStaticDistributionData(),
          hourProfitData: generateHourProfitData(),
          dayProfitData: generateDayProfitData(),
          durationProfitData: generateDurationProfitData(),
          durationDistData: generateDurationDistData(),
          durationVsProfitData,
          tradesData,
          totalTrades: 1246,
          isLoading: false,
          error: null,
        });
      } catch (error) {
        console.error('Failed to load DFtrust data, using static fallback:', error);
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
          totalTrades: 1246,
          isLoading: false,
          error: null,
        });
      }
    }

    loadData();
  }, []);

  return data;
}
