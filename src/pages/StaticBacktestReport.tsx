 import { useEffect, useState } from "react";
 import JSZip from "jszip";
 
 const StaticBacktestReport = () => {
   const [htmlContent, setHtmlContent] = useState<string | null>(null);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);
 
   useEffect(() => {
     const loadZip = async () => {
       try {
         const response = await fetch("/backtest-pages.zip");
         if (!response.ok) throw new Error("Failed to fetch ZIP file");
         
         const arrayBuffer = await response.arrayBuffer();
         const zip = await JSZip.loadAsync(arrayBuffer);
         
         // Find the HTML file in the zip
         const htmlFile = Object.keys(zip.files).find(
           (name) => name.endsWith(".html")
         );
         
         if (!htmlFile) throw new Error("No HTML file found in ZIP");
         
         const content = await zip.files[htmlFile].async("string");
         setHtmlContent(content);
       } catch (err) {
         setError(err instanceof Error ? err.message : "Unknown error");
       } finally {
         setLoading(false);
       }
     };
     
     loadZip();
   }, []);
 
   if (loading) {
     return (
       <div className="min-h-screen bg-background flex items-center justify-center">
         <div className="text-center">
           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
           <p className="text-muted-foreground">Loading report...</p>
         </div>
       </div>
     );
   }
 
   if (error) {
     return (
       <div className="min-h-screen bg-background flex items-center justify-center">
         <div className="text-center text-destructive">
           <p>Error: {error}</p>
         </div>
       </div>
     );
   }
 
   return (
     <iframe
       srcDoc={htmlContent || ""}
       className="w-full h-screen border-0"
       title="Backtest Report"
       sandbox="allow-scripts allow-same-origin"
     />
   );
 };
 
 export default StaticBacktestReport;