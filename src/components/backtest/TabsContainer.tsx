import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, FileText, GitBranch } from "lucide-react";
import PerformanceMetrics from "./PerformanceMetrics";
import RiskMetrics from "./RiskMetrics";
import MethodologySection from "./MethodologySection";
import PortfolioCorrelation from "./PortfolioCorrelation";

const TabsContainer = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-6">
        <Tabs defaultValue="backtest" className="w-full">
          <div className="flex justify-center mb-12 overflow-x-auto">
             <TabsList className="bg-card border border-border p-1.5 rounded-lg h-auto flex-shrink-0">
              <TabsTrigger 
                value="backtest" 
                 className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm data-[state=active]:bg-primary/10 data-[state=active]:text-primary rounded-md transition-all whitespace-nowrap"
              >
                <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="hidden xs:inline">Backtest</span>
                <span className="xs:hidden">Results</span>
                <span className="hidden sm:inline"> Results</span>
              </TabsTrigger>
              <TabsTrigger 
                value="methodology" 
                 className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm data-[state=active]:bg-primary/10 data-[state=active]:text-primary rounded-md transition-all whitespace-nowrap"
              >
                <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                Methodology
              </TabsTrigger>
              <TabsTrigger 
                value="correlation" 
                 className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm data-[state=active]:bg-primary/10 data-[state=active]:text-primary rounded-md transition-all whitespace-nowrap"
              >
                <GitBranch className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                Correlation
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="max-w-5xl mx-auto">
            <TabsContent value="backtest" className="mt-0 animate-fade-in">
              <div className="space-y-12">
                <PerformanceMetrics />
                <RiskMetrics />
              </div>
            </TabsContent>

            <TabsContent value="methodology" className="mt-0 animate-fade-in">
              <MethodologySection />
            </TabsContent>

            <TabsContent value="correlation" className="mt-0 animate-fade-in">
              <PortfolioCorrelation />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </section>
  );
};

export default TabsContainer;
