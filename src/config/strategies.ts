export interface Strategy {
  id: string;
  name: string;
  description: string;
  landingPath: string;
  reportPath: string;
  symbol: string;
  period: string;
}

// 기존 전략 (기존 데이터 파일 사용)
const legacyStrategies: Strategy[] = [
  {
    id: "dfcovenant",
    name: "DFcovenant",
    description: "Professional Gold Trading EA",
    landingPath: "/",
    reportPath: "/backtest-report",
    symbol: "XAUUSD",
    period: "H1",
  },
];

// 새 전략 (JSON 데이터 사용) - all_strategies_data.json에서 로드
const jsonStrategies: Strategy[] = [
  {
    id: "dfart",
    name: "DFart",
    description: "Multi-Asset Trading Strategy",
    landingPath: "/dfart",
    reportPath: "/dfart/backtest-report",
    symbol: "AUDCAD",
    period: "M15",
  },
  {
    id: "dfmate",
    name: "DFmate",
    description: "Diversified Currency Strategy",
    landingPath: "/dfmate",
    reportPath: "/dfmate/backtest-report",
    symbol: "Multi",
    period: "H1",
  },
  {
    id: "dfbeauty",
    name: "DFbeauty",
    description: "Elegant Market Strategy",
    landingPath: "/dfbeauty",
    reportPath: "/dfbeauty/backtest-report",
    symbol: "Multi",
    period: "H1",
  },
  {
    id: "dfadam",
    name: "DFadam",
    description: "Foundational Trading Strategy",
    landingPath: "/dfadam",
    reportPath: "/dfadam/backtest-report",
    symbol: "Multi",
    period: "H1",
  },
  {
    id: "dfreap",
    name: "DFreap",
    description: "Harvest Strategy",
    landingPath: "/dfreap",
    reportPath: "/dfreap/backtest-report",
    symbol: "Multi",
    period: "H1",
  },
  {
    id: "dfboaz",
    name: "DFboaz",
    description: "Strength-Based Strategy",
    landingPath: "/dfboaz",
    reportPath: "/dfboaz/backtest-report",
    symbol: "Multi",
    period: "H1",
  },
  {
    id: "dfharvest",
    name: "DFharvest",
    description: "Yield Optimization Strategy",
    landingPath: "/dfharvest",
    reportPath: "/dfharvest/backtest-report",
    symbol: "Multi",
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
    id: "dflight",
    name: "DFlight",
    description: "Agile Trading Strategy",
    landingPath: "/dflight",
    reportPath: "/dflight/backtest-report",
    symbol: "Multi",
    period: "H1",
  },
  {
    id: "dfsight",
    name: "DFsight",
    description: "Vision-Based Strategy",
    landingPath: "/dfsight",
    reportPath: "/dfsight/backtest-report",
    symbol: "Multi",
    period: "H1",
  },
  {
    id: "dfknight",
    name: "DFknight",
    description: "Strategic Defense Strategy",
    landingPath: "/dfknight",
    reportPath: "/dfknight/backtest-report",
    symbol: "Multi",
    period: "H1",
  },
  {
    id: "dfpower",
    name: "DFpower",
    description: "High-Power Trading Strategy",
    landingPath: "/dfpower",
    reportPath: "/dfpower/backtest-report",
    symbol: "Multi",
    period: "H1",
  },
  {
    id: "dfgravity",
    name: "DFgravity",
    description: "Momentum-Based Strategy",
    landingPath: "/dfgravity",
    reportPath: "/dfgravity/backtest-report",
    symbol: "XAUUSD",
    period: "H1",
  },
];

// 모든 전략 통합
export const strategies: Strategy[] = [...legacyStrategies, ...jsonStrategies];

// JSON 기반 전략 ID 목록 (UniversalStrategyReport에서 사용)
export const jsonStrategyIds = jsonStrategies.map(s => s.id);

export const getStrategyById = (id: string): Strategy | undefined => {
  return strategies.find((s) => s.id === id.toLowerCase());
};

export const getTargetPath = (
  strategy: Strategy,
  context: "landing" | "report"
): string => {
  return context === "landing" ? strategy.landingPath : strategy.reportPath;
};

// JSON 기반 전략인지 확인
export const isJsonStrategy = (id: string): boolean => {
  return jsonStrategyIds.includes(id.toLowerCase());
};
