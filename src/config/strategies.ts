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
  {
    id: "dfadam",
    name: "DFadam",
    description: "Adaptive Gold Strategy",
    landingPath: "/dfadam",
    reportPath: "/dfadam/backtest-report",
    symbol: "XAUUSD",
    period: "H1",
  },
  {
    id: "dfpath",
    name: "DFpath",
    description: "Path-Following Gold EA",
    landingPath: "/dfpath",
    reportPath: "/dfpath/backtest-report",
    symbol: "XAUUSD",
    period: "H1",
  },
  {
    id: "df717",
    name: "DF717",
    description: "High-Performance Gold EA",
    landingPath: "/df717",
    reportPath: "/df717/backtest-report",
    symbol: "XAUUSD",
    period: "H1",
  },
  {
    id: "dfalpha",
    name: "DFalpha",
    description: "Alpha Gold Strategy",
    landingPath: "/dfalpha",
    reportPath: "/dfalpha/backtest-report",
    symbol: "XAUUSD",
    period: "H1",
  },
  {
    id: "dfbeta",
    name: "DFbeta",
    description: "Beta Gold Strategy",
    landingPath: "/dfbeta",
    reportPath: "/dfbeta/backtest-report",
    symbol: "XAUUSD",
    period: "H1",
  },
  {
    id: "dfgamma",
    name: "DFgamma",
    description: "Gamma Gold Strategy",
    landingPath: "/dfgamma",
    reportPath: "/dfgamma/backtest-report",
    symbol: "XAUUSD",
    period: "H1",
  },
  {
    id: "dfdelta",
    name: "DFdelta",
    description: "Delta Gold Strategy",
    landingPath: "/dfdelta",
    reportPath: "/dfdelta/backtest-report",
    symbol: "XAUUSD",
    period: "H1",
  },
  {
    id: "dfomega",
    name: "DFomega",
    description: "Omega Gold Strategy",
    landingPath: "/dfomega",
    reportPath: "/dfomega/backtest-report",
    symbol: "XAUUSD",
    period: "H1",
  },
  {
    id: "dfsigma",
    name: "DFsigma",
    description: "Sigma Gold Strategy",
    landingPath: "/dfsigma",
    reportPath: "/dfsigma/backtest-report",
    symbol: "XAUUSD",
    period: "H1",
  },
  {
    id: "dftheta",
    name: "DFtheta",
    description: "Theta Gold Strategy",
    landingPath: "/dftheta",
    reportPath: "/dftheta/backtest-report",
    symbol: "XAUUSD",
    period: "H1",
  },
  {
    id: "dfkappa",
    name: "DFkappa",
    description: "Kappa Gold Strategy",
    landingPath: "/dfkappa",
    reportPath: "/dfkappa/backtest-report",
    symbol: "XAUUSD",
    period: "H1",
  },
  {
    id: "dflambda",
    name: "DFlambda",
    description: "Lambda Gold Strategy",
    landingPath: "/dflambda",
    reportPath: "/dflambda/backtest-report",
    symbol: "XAUUSD",
    period: "H1",
  },
  {
    id: "dfphi",
    name: "DFphi",
    description: "Phi Gold Strategy",
    landingPath: "/dfphi",
    reportPath: "/dfphi/backtest-report",
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
