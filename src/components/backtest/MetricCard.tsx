import { cn } from "@/lib/utils";

interface MetricCardProps {
  value: string;
  label: string;
  highlight?: boolean;
  className?: string;
}

const MetricCard = ({ value, label, highlight = false, className }: MetricCardProps) => {
  return (
    <div className={cn("metric-card text-center", className)}>
      <div className={cn(
        "text-2xl md:text-3xl font-bold font-mono mb-2",
        highlight ? "text-warning" : "text-primary"
      )}>
        {value}
      </div>
      <div className="text-xs text-muted-foreground tracking-wider uppercase">
        {label}
      </div>
    </div>
  );
};

export default MetricCard;
