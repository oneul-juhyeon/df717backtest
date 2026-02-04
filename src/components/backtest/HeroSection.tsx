import { TrendingUp, Activity, ShieldCheck, BarChart3, Sparkles } from "lucide-react";

const metrics = [
  { value: "€722,988", label: "NET PROFIT", color: "text-warning" },
  { value: "3.31", label: "PROFIT FACTOR", color: "text-primary" },
  { value: "11.2%", label: "MAX DRAWDOWN", color: "text-primary" },
  { value: "22.24", label: "RECOVERY FACTOR", color: "text-primary" },
  { value: "10.00", label: "SHARPE RATIO", color: "text-primary" },
];

const HeroSection = () => {
  return (
    <section className="relative pt-32 pb-16 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-hero-pattern opacity-50" />
      
      {/* Floating particles */}
      <div className="absolute top-40 left-20 w-2 h-2 rounded-full bg-primary/40 animate-float" style={{ animationDelay: "0s" }} />
      <div className="absolute top-60 right-32 w-1.5 h-1.5 rounded-full bg-warning/40 animate-float" style={{ animationDelay: "1s" }} />
      <div className="absolute bottom-40 left-1/3 w-1 h-1 rounded-full bg-primary/30 animate-float" style={{ animationDelay: "2s" }} />
      <div className="absolute top-32 right-1/4 w-2 h-2 rounded-full bg-success/30 animate-float" style={{ animationDelay: "0.5s" }} />
      <div className="absolute bottom-20 right-20 w-1.5 h-1.5 rounded-full bg-primary/40 animate-float" style={{ animationDelay: "1.5s" }} />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Badge */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card/50 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span className="text-sm font-mono text-muted-foreground">
              XAUUSD • H1 • 10 Years Backtested
            </span>
          </div>
        </div>
        
        {/* Title */}
        <div className="text-center mb-6">
          <h1 className="text-6xl md:text-7xl font-bold tracking-tight mb-4">
            <span className="text-gradient-primary italic">DF</span>
            <span className="text-foreground">covenant</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Professional Gold Trading Expert Advisor
          </p>
        </div>
        
        {/* Description */}
        <p className="text-center text-muted-foreground max-w-3xl mx-auto mb-12">
          Advanced algorithmic trading system designed for XAUUSD with robust risk management 
          and consistent performance across market conditions.
        </p>
        
        {/* Key metrics */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-5xl mx-auto">
          {metrics.map((metric, index) => (
            <div 
              key={index}
              className="metric-card text-center group"
            >
              <div className={`text-2xl md:text-3xl font-bold font-mono ${metric.color} mb-2`}>
                {metric.value}
              </div>
              <div className="text-xs text-muted-foreground tracking-wider uppercase">
                {metric.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
