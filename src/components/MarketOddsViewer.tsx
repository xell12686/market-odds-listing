import React from "react";
import { useMarketData } from "../hooks/useMarketData";
import { getGroupedAndSortedMarkets } from "../selectors/getGroupedAndSortedMarkets";

interface MarketOddsViewerProps {
  matchId: string;
}

const MarketOddsViewer: React.FC<MarketOddsViewerProps> = ({ matchId }) => {
  const { markets, loading, error } = useMarketData(matchId);

  const { grouped, sortedGroupNames } = React.useMemo(
    () => getGroupedAndSortedMarkets(markets),
    [markets]
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {sortedGroupNames.map((groupName) => (
        <div className="group" key={groupName}>
          <h3 className="group-name">{groupName}</h3>
          {grouped[groupName].map((market) => (
            <div className="market" key={market.marketId}>
              <h4 className="market-id">marketId: {market.marketId}</h4>
              {market.sortOrder !== undefined && (
                <p className="sort-order">sortOrder: {market.sortOrder}</p>
              )}
              <div className="outcomes">
                {market.outcomes.map((outcome) => (
                  <div className="outcome" key={outcome.outcomeId}>
                    <div className="value-pill">{outcome.name}</div>
                    <span className="value-text">{outcome.odds}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MarketOddsViewer;
