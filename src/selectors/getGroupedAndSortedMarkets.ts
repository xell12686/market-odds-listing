import { Market } from "../types/market";
import { sortMarkets } from "../utils/sortMarkets";

export const getGroupedAndSortedMarkets = (markets: Market[]) => {
  const grouped = markets.reduce((acc: Record<string, Market[]>, market) => {
    const { groupName } = market;
    if (!acc[groupName]) {
      acc[groupName] = [];
    }
    acc[groupName].push(market);
    return acc;
  }, {});

  Object.values(grouped).forEach((marketsInGroup) => {
    sortMarkets(marketsInGroup);
  });

  const sortedGroupNames = Object.keys(grouped).sort();

  return { grouped, sortedGroupNames };
};
