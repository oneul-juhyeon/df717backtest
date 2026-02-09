import type { StrategyConfig } from "@/types/strategy";
import { dfcovenantConfig } from "./dfcovenant";
import { dftrustConfig } from "./dftrust";

// Central registry of all strategy configurations
export const strategyConfigs: Record<string, StrategyConfig> = {
  dfcovenant: dfcovenantConfig,
  dftrust: dftrustConfig,
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
export { dfcovenantConfig, dftrustConfig };
