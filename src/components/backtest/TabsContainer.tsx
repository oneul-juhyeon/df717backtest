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
          <div className="flex justify-center mb-12">
            <TabsList className="bg-card border border-border p-1 rounded-lg">
              <TabsTrigger 
                value="backtest" 
                className="flex items-center gap-2 px-6 py-3 data-[state=active]:bg-primary/10 data-[state=active]:text-primary rounded-md transition-all"
              >
                <TrendingUp className="w-4 h-4" />
                Backtest Results
              </TabsTrigger>
              <TabsTrigger 
                value="methodology" 
                className="flex items-center gap-2 px-6 py-3 data-[state=active]:bg-primary/10 data-[state=active]:text-primary rounded-md transition-all"
              >
                <FileText className="w-4 h-4" />
                Methodology
              </TabsTrigger>
              <TabsTrigger 
                value="correlation" 
                className="flex items-center gap-2 px-6 py-3 data-[state=active]:bg-primary/10 data-[state=active]:text-primary rounded-md transition-all"
              >
                <GitBranch className="w-4 h-4" />
                Portfolio Correlation
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
