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
  // 새 전략 추가 시:
  // 1. 여기에 메타데이터 추가
  // 2. src/data/strategies/[id].ts 에 데이터 파일 생성
  // 3. src/data/strategies/index.ts 에서 import 및 등록
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
