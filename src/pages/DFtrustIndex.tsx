import Header from "@/components/backtest/Header";
import HeroSection from "@/components/backtest/HeroSection";
import TabsContainer from "@/components/backtest/TabsContainer";

const DFtrustIndex = () => {
  const strategyId = "dftrust";
  
  return (
    <div className="min-h-screen bg-background">
      <Header currentStrategy={strategyId} />
      <main>
        <HeroSection strategyId={strategyId} />
        <TabsContainer strategyId={strategyId} />
      </main>
      
      {/* Footer */}
      <footer className="border-t border-white/10 py-8 mt-16">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm text-white/40">
            © 2025 DF717. Past performance is not indicative of future results. Trading involves substantial risk. All analytics are provided for educational purposes only.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default DFtrustIndex;
