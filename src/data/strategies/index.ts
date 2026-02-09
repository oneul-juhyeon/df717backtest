import type { StrategyConfig } from "@/types/strategy";
import { dfcovenantConfig } from "./dfcovenant";
import { dftrustConfig } from "./dftrust";
import { dfadamConfig } from "./dfadam";
import { dfpathConfig } from "./dfpath";
import { df717Config } from "./df717";
import { dfalphaConfig } from "./dfalpha";
import { dfbetaConfig } from "./dfbeta";
import { dfgammaConfig } from "./dfgamma";
import { dfdeltaConfig } from "./dfdelta";
import { dfomegaConfig } from "./dfomega";
import { dfsigmaConfig } from "./dfsigma";
import { dfthetaConfig } from "./dftheta";
import { dfkappaConfig } from "./dfkappa";
import { dflambdaConfig } from "./dflambda";
import { dfphiConfig } from "./dfphi";

// Central registry of all strategy configurations
export const strategyConfigs: Record<string, StrategyConfig> = {
  dfcovenant: dfcovenantConfig,
  dftrust: dftrustConfig,
  dfadam: dfadamConfig,
  dfpath: dfpathConfig,
  df717: df717Config,
  dfalpha: dfalphaConfig,
  dfbeta: dfbetaConfig,
  dfgamma: dfgammaConfig,
  dfdelta: dfdeltaConfig,
  dfomega: dfomegaConfig,
  dfsigma: dfsigmaConfig,
  dftheta: dfthetaConfig,
  dfkappa: dfkappaConfig,
  dflambda: dflambdaConfig,
  dfphi: dfphiConfig,
};

// Get strategy config by ID
export const getStrategyConfig = (strategyId: string): StrategyConfig => {
  const config = strategyConfigs[strategyId];
  if (!config) {
    // Fallback to dfcovenant if not found
    return dfcovenantConfig;
  }
  return config;
};

// Get all strategy IDs
export const getAllStrategyIds = (): string[] => {
  return Object.keys(strategyConfigs);
};

// Check if strategy exists
export const strategyExists = (strategyId: string): boolean => {
  return strategyId in strategyConfigs;
};

// Re-export individual configs for direct import if needed
export { 
  dfcovenantConfig, 
  dftrustConfig, 
  dfadamConfig, 
  dfpathConfig, 
  df717Config,
  dfalphaConfig,
  dfbetaConfig,
  dfgammaConfig,
  dfdeltaConfig,
  dfomegaConfig,
  dfsigmaConfig,
  dfthetaConfig,
  dfkappaConfig,
  dflambdaConfig,
  dfphiConfig,
};
