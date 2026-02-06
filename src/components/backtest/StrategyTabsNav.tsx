import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, FileText, GitBranch } from "lucide-react";

const StrategyTabsNav = () => {
  return (
    <div className="mb-12">
      <TabsList className="bg-card border border-border p-1 sm:p-1.5 rounded-lg h-auto w-full grid grid-cols-3">
        <TabsTrigger 
          value="backtest" 
          className="flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 sm:py-2.5 text-[11px] sm:text-sm data-[state=active]:bg-primary/10 data-[state=active]:text-primary rounded-md transition-all"
        >
          <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
          <span>Results</span>
        </TabsTrigger>
        <TabsTrigger 
          value="methodology" 
          className="flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 sm:py-2.5 text-[11px] sm:text-sm data-[state=active]:bg-primary/10 data-[state=active]:text-primary rounded-md transition-all"
        >
          <FileText className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
          <span className="hidden sm:inline">Methodology</span>
          <span className="sm:hidden">Method</span>
        </TabsTrigger>
        <TabsTrigger 
          value="correlation" 
          className="flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 sm:py-2.5 text-[11px] sm:text-sm data-[state=active]:bg-primary/10 data-[state=active]:text-primary rounded-md transition-all"
        >
          <GitBranch className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
          <span className="hidden sm:inline">Correlation</span>
          <span className="sm:hidden">Correl</span>
        </TabsTrigger>
      </TabsList>
    </div>
  );
};

export default StrategyTabsNav;
