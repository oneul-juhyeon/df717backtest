export interface Strategy {
  id: string;
  name: string;
  description: string;
  landingPath: string;
  reportPath: string;
  symbol: string;
  period: string;
}

export const strategies: Strategy[] = [
  {
    id: "dfcovenant",
    name: "DFcovenant",
    description: "Professional Gold Trading EA",
    landingPath: "/",
    reportPath: "/backtest-report",
    symbol: "XAUUSD",
    period: "H1",
  },
  {
    id: "dftrust",
    name: "DFtrust",
    description: "Conservative Gold Strategy",
    landingPath: "/dftrust",
    reportPath: "/dftrust/backtest-report",
    symbol: "XAUUSD",
    period: "H1",
  },
  // 향후 추가 전략들...
  // {
  //   id: "dfpath",
  //   name: "DFpath",
  //   description: "Momentum Trading Strategy",
  //   landingPath: "/dfpath",
  //   reportPath: "/dfpath/backtest-report",
  //   symbol: "XAUUSD",
  //   period: "M15",
  // },
];

export const getStrategyById = (id: string): Strategy | undefined => {
  return strategies.find((s) => s.id === id);
};

export const getTargetPath = (
  strategy: Strategy,
  context: "landing" | "report"
): string => {
  return context === "landing" ? strategy.landingPath : strategy.reportPath;
};
