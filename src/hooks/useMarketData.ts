import { useState, useEffect } from "react";
import { getMarkets } from "../api/market";
import { Market } from "../types/market";

export function useMarketData(matchId: string) {
  const [markets, setMarkets] = useState<Market[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isSubscribed = true;

    const fetchMarketData = async () => {
      try {
        const data = await getMarkets(matchId);
        if (isSubscribed) {
          setMarkets(data);
          setLoading(false);
        }
      } catch (e) {
        if (isSubscribed) {
          setError(e as Error);
          setLoading(false);
        }
      }
    };

    fetchMarketData();
    const intervalId = setInterval(fetchMarketData, 5000);

    return () => {
      isSubscribed = false;
      clearInterval(intervalId);
    };
  }, [matchId]);

  return { markets, loading, error };
}
