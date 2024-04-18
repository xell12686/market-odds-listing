import { Market } from "../types/market";

export const sortMarkets = (markets: Market[]): Market[] => {
  return markets.sort((a, b) => {
    const orderA = a.sortOrder !== undefined ? a.sortOrder : Number.MAX_VALUE;
    const orderB = b.sortOrder !== undefined ? b.sortOrder : Number.MAX_VALUE;
    return orderA - orderB;
  });
};
