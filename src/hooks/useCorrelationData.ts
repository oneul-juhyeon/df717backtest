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
 
     // If no allDates/normalizedCurves found, try to extract Chart.js data
     if (allDates.length === 0) {
       // Look for labels array in Chart.js format
       const labelsMatch = html.match(/labels\s*:\s*\[([\s\S]*?)\]/);
       if (labelsMatch) {
         const labelMatches = labelsMatch[1].match(/["']([^"']+)["']/g);
         if (labelMatches) {
           allDates = labelMatches.map(d => d.replace(/["']/g, ''));
         }
       }
       
       // Look for Balance data in Chart.js datasets format
       const balanceMatch = html.match(/label\s*:\s*['"]Balance['"][\s\S]*?data\s*:\s*\[([\d.,\s\n]+)\]/);
       if (balanceMatch) {
         const valuesStr = balanceMatch[1].replace(/\s+/g, '');
         const values = valuesStr.split(',').filter(v => v).map(v => parseFloat(v));
         normalizedCurves['DFcovenant'] = values;
         combinedEquity = values;
       }
       
       // Look for Equity data too
       const equityMatch = html.match(/label\s*:\s*['"]Equity['"][\s\S]*?data\s*:\s*\[([\d.,\s\n]+)\]/);
       if (equityMatch) {
         const valuesStr = equityMatch[1].replace(/\s+/g, '');
         const values = valuesStr.split(',').filter(v => v).map(v => parseFloat(v));
         // Use Equity data as additional strategy
         normalizedCurves['Equity'] = values;
       }
     }
 
     if (allDates.length > 0 && Object.keys(normalizedCurves).length > 0) {
       return { allDates, normalizedCurves, combinedEquity };
     }
     
     // If we have curve data but no dates, generate index-based dates
     if (Object.keys(normalizedCurves).length > 0) {
       const curveLength = Object.values(normalizedCurves)[0].length;
       allDates = Array.from({ length: curveLength }, (_, i) => `Day ${i + 1}`);
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
         
         // Find HTML file in the ZIP
         let htmlContent = '';
         for (const [filename, file] of Object.entries(zip.files)) {
           if (filename.endsWith('.html') && !file.dir) {
             htmlContent = await file.async('text');
             break;
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