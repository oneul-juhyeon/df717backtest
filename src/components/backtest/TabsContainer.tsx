import { Tabs, TabsContent } from "@/components/ui/tabs";
import PerformanceMetrics from "./PerformanceMetrics";
import RiskMetrics from "./RiskMetrics";
import MethodologySection from "./MethodologySection";
import PortfolioCorrelation from "./PortfolioCorrelation";
import StrategyTabsNav from "./StrategyTabsNav";

const TabsContainer = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4 sm:px-6">
        <Tabs defaultValue="backtest" className="w-full">
          <StrategyTabsNav />

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
