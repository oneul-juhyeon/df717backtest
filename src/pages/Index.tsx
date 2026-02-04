import Header from "@/components/backtest/Header";
import HeroSection from "@/components/backtest/HeroSection";
import TabsContainer from "@/components/backtest/TabsContainer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <TabsContainer />
      </main>
      
      {/* Footer */}
      <footer className="border-t border-border py-8 mt-16">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 DF717. Professional Expert Advisors for MetaTrader 5.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
