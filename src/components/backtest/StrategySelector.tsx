import { useNavigate } from "react-router-dom";
import { ChevronDown, Check } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { strategies, getStrategyById, getTargetPath } from "@/config/strategies";
import { cn } from "@/lib/utils";

interface StrategySelectorProps {
  currentStrategy: string;
  context: "landing" | "report";
}

const StrategySelector = ({ currentStrategy, context }: StrategySelectorProps) => {
  const navigate = useNavigate();
  const current = getStrategyById(currentStrategy);

  const handleSelect = (strategyId: string) => {
    if (strategyId === currentStrategy) return;
    
    const strategy = getStrategyById(strategyId);
    if (strategy) {
      navigate(getTargetPath(strategy, context));
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="gap-2 bg-muted/50 hover:bg-muted px-3 py-1.5 h-auto"
        >
          <span className="font-medium">{current?.name || currentStrategy}</span>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-56 bg-popover border border-border z-50"
      >
        {strategies.map((strategy) => (
          <DropdownMenuItem
            key={strategy.id}
            onClick={() => handleSelect(strategy.id)}
            className={cn(
              "flex flex-col items-start gap-1 cursor-pointer py-3",
              strategy.id === currentStrategy && "bg-accent"
            )}
          >
            <div className="flex items-center justify-between w-full">
              <span className="font-medium">{strategy.name}</span>
              {strategy.id === currentStrategy && (
                <Check className="h-4 w-4 text-primary" />
              )}
            </div>
            <span className="text-xs text-muted-foreground">
              {strategy.symbol} • {strategy.period}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default StrategySelector;
