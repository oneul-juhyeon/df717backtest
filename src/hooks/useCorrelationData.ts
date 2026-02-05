 import { useState, useEffect } from 'react';
 import JSZip from 'jszip';
 
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
   normalizedCurves: Record<string, number[]>;
   combinedEquity: number[];
 } | null {
   try {
     let allDates: string[] = [];
     let normalizedCurves: Record<string, number[]> = {};
     let combinedEquity: number[] = [];
 
     // Look for allDates array - can span multiple lines
     const datesMatch = html.match(/const\s+allDates\s*=\s*\[([\s\S]*?)\];/);
     if (datesMatch) {
       // Extract all quoted strings from the array
       const dateMatches = datesMatch[1].match(/["']([^"']+)["']/g);
       if (dateMatches) {
         allDates = dateMatches.map(d => d.replace(/["']/g, ''));
       }
     }
     
     // Look for normalizedCurves object - complex multi-line format
     const curvesMatch = html.match(/const\s+normalizedCurves\s*=\s*\{([\s\S]*?)\};/);
     if (curvesMatch) {
       const curvesContent = curvesMatch[1];
       // Match each strategy: "StrategyName": [numbers...]
       const strategyPattern = /["']?(\w+)["']?\s*:\s*\[([\d.,\s\n]+)\]/g;
       let match;
       while ((match = strategyPattern.exec(curvesContent)) !== null) {
         const strategyName = match[1];
         const valuesStr = match[2].replace(/\s+/g, '');
         const values = valuesStr.split(',').filter(v => v).map(v => parseFloat(v));
         normalizedCurves[strategyName] = values;
       }
     }
     
     // Look for combinedEquity array
     const combinedMatch = html.match(/const\s+combinedEquity\s*=\s*\[([\d.,\s\n]+)\];/);
     if (combinedMatch) {
       const valuesStr = combinedMatch[1].replace(/\s+/g, '');
       combinedEquity = valuesStr.split(',').filter(v => v).map(v => parseFloat(v));
     }
 
     console.log('Extracted data:', {
       datesCount: allDates.length,
       curves: Object.keys(normalizedCurves),
       curveLengths: Object.entries(normalizedCurves).map(([k,v]) => `${k}:${v.length}`),
       combinedLength: combinedEquity.length,
       sampleDates: allDates.slice(0, 5),
     });
 
     if (allDates.length > 0 && Object.keys(normalizedCurves).length > 0) {
       return { allDates, normalizedCurves, combinedEquity };
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
           throw new Error('Failed to fetch correlation data ZIP');
         }
         
         const blob = await response.blob();
         const zip = await JSZip.loadAsync(blob);
         
         // Find HTML file in the ZIP
         let htmlContent = '';
         for (const [filename, file] of Object.entries(zip.files)) {
           if (filename.endsWith('.html') && !file.dir) {
             htmlContent = await file.async('text');
         console.log('HTML file found:', filename, 'length:', htmlContent.length);
         console.log('HTML preview (first 2000 chars):', htmlContent.substring(0, 2000));
             break;
           }
         }
         
         if (!htmlContent) {
           throw new Error('No HTML file found in ZIP');
         }
         
     // Also log a sample around "allDates" if it exists
     const allDatesIndex = htmlContent.indexOf('allDates');
     if (allDatesIndex !== -1) {
       console.log('Found allDates at index:', allDatesIndex);
       console.log('Context around allDates:', htmlContent.substring(allDatesIndex, allDatesIndex + 500));
     } else {
       console.log('allDates not found in HTML');
       // Try to find other common data variable names
       const possibleVars = ['equityData', 'chartData', 'dates', 'equity', 'const data'];
       for (const varName of possibleVars) {
         const idx = htmlContent.indexOf(varName);
         if (idx !== -1) {
           console.log(`Found "${varName}" at index:`, idx);
           console.log(`Context:`, htmlContent.substring(idx, idx + 300));
         }
       }
     }
 
         // Extract the JavaScript variables
         const extracted = extractJSVariables(htmlContent);
         if (!extracted) {
           throw new Error('Could not extract data from HTML');
         }
         
         const { allDates, normalizedCurves, combinedEquity } = extracted;
         
         // Map the data to our format
         const dailyEquityData: DailyEquityPoint[] = allDates.map((date, i) => ({
           date,
           dfcovenant: normalizedCurves['DFcovenant']?.[i] || normalizedCurves['dfcovenant']?.[i] || 0,
           dftrust: normalizedCurves['DFtrust']?.[i] || normalizedCurves['dftrust']?.[i] || 0,
           dfpath: normalizedCurves['DFpath']?.[i] || normalizedCurves['dfpath']?.[i] || 0,
           combined: combinedEquity[i] || 0,
         }));
         
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