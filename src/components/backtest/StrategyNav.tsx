import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

interface StrategyNavProps {
  currentStrategy?: string;
}

const strategies = [
  { id: "dfcovenant", name: "DFcovenant", path: "/" },
  { id: "dftrust", name: "DFtrust", path: "/dftrust" },
];

const StrategyNav = ({ currentStrategy }: StrategyNavProps) => {
  const location = useLocation();
  
  const getCurrentStrategy = () => {
    if (currentStrategy) return currentStrategy;
    if (location.pathname === "/backtest-report") return "dfcovenant";
    if (location.pathname === "/dftrust") return "dftrust";
    return "";
  };

  const active = getCurrentStrategy();

  return (
    <nav className="flex items-center gap-1 bg-muted/50 rounded-lg p-1">
      {strategies.map((strategy) => (
        <Link
          key={strategy.id}
          to={strategy.path}
          className={cn(
            "px-3 py-1.5 text-sm font-medium rounded-md transition-colors",
            active === strategy.id
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground hover:bg-muted"
          )}
        >
          {strategy.name}
        </Link>
      ))}
    </nav>
  );
};

export default StrategyNav;
