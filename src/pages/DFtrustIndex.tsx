import Header from "@/components/backtest/Header";
import DFtrustHeroSection from "@/components/backtest/DFtrustHeroSection";
import DFtrustTabsContainer from "@/components/backtest/DFtrustTabsContainer";

const DFtrustIndex = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header currentStrategy="dftrust" />
      <main>
        <DFtrustHeroSection />
        <DFtrustTabsContainer />
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
