import { cn } from "@/lib/utils";

interface MetricCardProps {
  value: string;
  label: string;
  highlight?: boolean;
  className?: string;
}

const MetricCard = ({ value, label, highlight = false, className }: MetricCardProps) => {
  return (
    <div className={cn("metric-card text-center border-white/10", className)}>
      <div className={cn(
        "text-2xl md:text-3xl font-semibold tracking-tight mb-2",
        highlight ? "text-warning" : "text-foreground"
      )}>
        {value}
      </div>
      <div className="text-xs text-white/40 tracking-widest uppercase">
        {label}
      </div>
    </div>
  );
};

export default MetricCard;
