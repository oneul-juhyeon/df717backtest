 import { useState, useEffect } from 'react';
 import JSZip from 'jszip';
 import { combinedEquityData as staticEquityData } from '@/data/correlationData';
 
 export interface DailyEquityPoint {
   date: string;
   dfcovenant: number;
   dftrust: number;
   dfpath: number;
   combined: number;
 }
 
 export interface CorrelationDataState {
   loading: boolean;
   error: string | null;
   dailyEquityData: DailyEquityPoint[];
 }
 
 // Extract JavaScript variables from HTML content
 function extractJSVariables(html: string): {
   allDates: string[];
  normalizedCurves: number[][];
  chartNames: string[];
   combinedEquity: number[];
 } | null {
   try {
     let allDates: string[] = [];
    let normalizedCurves: number[][] = [];
    let chartNames: string[] = [];
     let combinedEquity: number[] = [];
 
     // Look for allDates array - can span multiple lines, with var or const
     const datesMatch = html.match(/(?:const|var|let)\s+allDates\s*=\s*\[([\s\S]*?)\];/);
     if (datesMatch) {
       // Extract all quoted strings from the array
       const dateMatches = datesMatch[1].match(/["']([^"']+)["']/g);
       if (dateMatches) {
         allDates = dateMatches.map(d => d.replace(/["']/g, ''));
       }
     }
     
    // Look for chartNames array - maps index to strategy name
    const chartNamesMatch = html.match(/(?:const|var|let)\s+chartNames\s*=\s*\[([\s\S]*?)\];/);
    if (chartNamesMatch) {
      const nameMatches = chartNamesMatch[1].match(/["']([^"']+)["']/g);
      if (nameMatches) {
        chartNames = nameMatches.map(n => n.replace(/["']/g, ''));
      }
    }
    console.log('[useCorrelationData] Extracted chartNames:', chartNames);
    
    // Look for normalizedCurves as 2D array: [[...], [...], [...]]
    const curvesMatch = html.match(/(?:const|var|let)\s+normalizedCurves\s*=\s*\[([\s\S]*?)\];(?=\s*(?:const|var|let|function|\/\/|$))/);
     if (curvesMatch) {
      // Parse as array of arrays
      const content = curvesMatch[1];
      // Match each inner array: [numbers...]
      const innerArrayPattern = /\[([\d.,\s\n-]+)\]/g;
      let innerMatch;
      while ((innerMatch = innerArrayPattern.exec(content)) !== null) {
        const valuesStr = innerMatch[1].replace(/\s+/g, '');
        const values = valuesStr.split(',').filter(v => v && !isNaN(parseFloat(v))).map(v => parseFloat(v));
        if (values.length > 0) {
          normalizedCurves.push(values);
         }
       }
     }
    console.log('[useCorrelationData] Extracted normalizedCurves:', normalizedCurves.length, 'series');
    normalizedCurves.forEach((series, i) => {
      console.log(`[useCorrelationData] Series ${i} (${chartNames[i] || 'unknown'}): ${series.length} points, first 3:`, series.slice(0, 3));
    });

     // Look for combinedEquity array
     const combinedMatch = html.match(/(?:const|var|let)\s+combinedEquity\s*=\s*\[([\d.,\s\n-]+)\];/);
     if (combinedMatch) {
       const valuesStr = combinedMatch[1].replace(/\s+/g, '');
       combinedEquity = valuesStr.split(',').filter(v => v).map(v => parseFloat(v));
     }
    console.log('[useCorrelationData] Extracted combinedEquity:', combinedEquity.length, 'points');
 
    if (allDates.length > 0 && normalizedCurves.length > 0) {
      return { allDates, normalizedCurves, chartNames, combinedEquity };
     }
     
     return null;
   } catch (e) {
     console.error('Error extracting JS variables:', e);
     return null;
   }
 }
 
 export function useCorrelationData(): CorrelationDataState {
   const [state, setState] = useState<CorrelationDataState>({
     loading: true,
     error: null,
     dailyEquityData: [],
   });
 
   useEffect(() => {
     async function loadData() {
       try {
         // Fetch the ZIP file
         const response = await fetch('/correlation-data-2.zip');
         if (!response.ok) {
           // Fall back to static data if ZIP is not available
           console.log('ZIP not available, using static data');
           setState({
             loading: false,
             error: null,
             dailyEquityData: staticEquityData.map(d => ({
               date: d.date,
               dfcovenant: d.dfcovenant,
               dftrust: d.dftrust,
               dfpath: d.dfpath,
               combined: d.combined,
             })),
           });
           return;
         }
         
         const blob = await response.blob();
         const zip = await JSZip.loadAsync(blob);
         
        // Find correlation report HTML file in the ZIP (prioritize files with "correlation" in name)
         let htmlContent = '';
         for (const [filename, file] of Object.entries(zip.files)) {
          if (filename.toLowerCase().includes('correlation') && filename.endsWith('.html') && !file.dir) {
             htmlContent = await file.async('text');
            console.log('[useCorrelationData] Found correlation report:', filename);
             break;
           }
         }
        // Fallback to any HTML file if no correlation-specific one found
        if (!htmlContent) {
          for (const [filename, file] of Object.entries(zip.files)) {
            if (filename.endsWith('.html') && !file.dir) {
              htmlContent = await file.async('text');
              console.log('[useCorrelationData] Using HTML file:', filename);
              break;
            }
          }
        }
         
         if (!htmlContent) {
           // Fall back to static data
           setState({
             loading: false,
             error: null,
             dailyEquityData: staticEquityData.map(d => ({
               date: d.date,
               dfcovenant: d.dfcovenant,
               dftrust: d.dftrust,
               dfpath: d.dfpath,
               combined: d.combined,
             })),
           });
           return;
         }
         
         // Extract the JavaScript variables
         const extracted = extractJSVariables(htmlContent);
         if (!extracted) {
           // Fall back to static data
           setState({
             loading: false,
             error: null,
             dailyEquityData: staticEquityData.map(d => ({
               date: d.date,
               dfcovenant: d.dfcovenant,
               dftrust: d.dftrust,
               dfpath: d.dfpath,
               combined: d.combined,
             })),
           });
           return;
         }
         
        const { allDates, normalizedCurves, chartNames, combinedEquity } = extracted;
        
        // Map chartNames index to our strategy keys
        // chartNames = ["Karat_Killer (XAUUSD)", "Mad Turtle (XAUUSD)", "The Gold Phantom (XAUUSD)"]
        // Index 0 → DFcovenant (Karat Killer)
        // Index 1 → DFtrust (Mad Turtle)
        // Index 2 → DFpath (Gold Phantom)
        const strategyMapping: { key: 'dfcovenant' | 'dftrust' | 'dfpath'; patterns: string[] }[] = [
          { key: 'dfcovenant', patterns: ['karat', 'killer', 'covenant'] },
          { key: 'dftrust', patterns: ['turtle', 'mad', 'trust'] },
          { key: 'dfpath', patterns: ['phantom', 'gold', 'path'] },
        ];
        
        // Build index map from chartNames
        const indexMap: Record<'dfcovenant' | 'dftrust' | 'dfpath', number> = {
          dfcovenant: 0,
          dftrust: 1,
          dfpath: 2,
        };
        
        // Try to match chartNames to our strategies
        chartNames.forEach((name, idx) => {
          const lowerName = name.toLowerCase();
          for (const mapping of strategyMapping) {
            if (mapping.patterns.some(p => lowerName.includes(p))) {
              indexMap[mapping.key] = idx;
              break;
            }
          }
        });
        
        console.log('[useCorrelationData] Strategy index mapping:', indexMap);
         
         // Map the data to our format
         const dailyEquityData: DailyEquityPoint[] = allDates.map((date, i) => ({
           date,
          dfcovenant: normalizedCurves[indexMap.dfcovenant]?.[i] ?? 0,
          dftrust: normalizedCurves[indexMap.dftrust]?.[i] ?? 0,
          dfpath: normalizedCurves[indexMap.dfpath]?.[i] ?? 0,
           combined: combinedEquity[i] || 0,
         }));
         
        console.log('[useCorrelationData] Sample daily data point:', dailyEquityData[0]);
        console.log('[useCorrelationData] Total data points:', dailyEquityData.length);
        
         setState({
           loading: false,
           error: null,
           dailyEquityData,
         });
       } catch (error) {
         console.error('Error loading correlation data:', error);
         setState({
           loading: false,
           error: error instanceof Error ? error.message : 'Unknown error',
           dailyEquityData: [],
         });
       }
     }
     
     loadData();
   }, []);
 
   return state;
 }