import { TrendingUp, Activity, ShieldCheck, BarChart3, Sparkles } from "lucide-react";
const metrics = [{
  value: "€722,988",
  label: "NET PROFIT",
  color: "text-warning"
}, {
  value: "3.31",
  label: "PROFIT FACTOR",
  color: "text-foreground"
}, {
  value: "11.2%",
  label: "MAX DRAWDOWN",
  color: "text-foreground"
}, {
  value: "22.24",
  label: "RECOVERY FACTOR",
  color: "text-foreground"
}, {
  value: "10.00",
  label: "SHARPE RATIO",
  color: "text-foreground"
}];
const HeroSection = () => {
  return <section className="relative pt-32 pb-16 overflow-hidden">
      {/* Minimal background */}
      <div className="absolute inset-0 bg-hero-pattern opacity-30" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Badge */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span className="text-sm tracking-wider text-white/70">
              XAUUSD • H1 • 10 Years Backtested
            </span>
          </div>
        </div>
        
        {/* Title */}
        <div className="text-center mb-6">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4">
            <span className="text-gradient-primary text-primary">DF</span>
            <span className="text-foreground">covenant</span>
          </h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto font-light">
            Professional Gold Trading Expert Advisor
          </p>
        </div>
        
        {/* Description */}
        <p className="text-center text-white/50 max-w-3xl mx-auto mb-12 font-light leading-relaxed">
          Advanced algorithmic trading system designed for XAUUSD with robust risk management 
          and consistent performance across market conditions.
        </p>
        
        {/* Key metrics */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 max-w-5xl mx-auto">
          {metrics.map((metric, index) => <div key={index} className="metric-card text-center group border-white/10">
              <div className={`text-2xl md:text-3xl font-semibold tracking-tight ${metric.color} mb-2`}>
                {metric.value}
              </div>
              <div className="text-xs text-white/40 tracking-widest uppercase">
                {metric.label}
              </div>
            </div>)}
        </div>
      </div>
    </section>;
};
export default HeroSection;