// API endpoint to get markets for a match

import { Market } from "../types/market";

// define how many markets you want
const marketCount = 100;

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function shuffle<T>(array: T[]): T[] {
  // copied from
  // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

function createTotalPointMarket(id: number) {
  const point = Math.floor(Math.random() * 100) + 0.5;

  const prob = Math.random();

  return {
    marketId: `total-${id}`,
    groupName: "Total Points",
    sortOrder: point,
    outcomes: [
      {
        outcomeId: `total-${id}-1`,
        name: `Total Points Over ${point}`,
        odds: (0.95 / prob).toFixed(2),
      },
      {
        outcomeId: `total-${id}-2`,
        name: `Total Points Under ${point}`,
        odds: (1 / (0.95 - prob)).toFixed(2),
      },
    ],
  };
}

function createHandicapMarket(id: number) {
  const line = Math.floor(Math.random() * 100) + 0.5;
  const prob = Math.random();

  return {
    marketId: `handicap-${id}`,
    groupName: "Handicap",
    outcomes: [
      {
        outcomeId: `total-${id}-1`,
        name: `Team 1 +${line}`,
        odds: (0.95 / prob).toFixed(2),
      },
      {
        outcomeId: `total-${id}-2`,
        name: `Team 2 -${line}`,
        odds: (1 / (0.95 - prob)).toFixed(2),
      },
    ],
  };
}

// For testing purpose, you can pass in an empty string as match ID
export async function getMarkets(matchId: string): Promise<Market[]> {
  // simulate a random API delay up to 2 seconds
  const delay = Math.floor(Math.random() * 2000);
  await sleep(delay);

  const totalPointMarkets = [...Array(marketCount).keys()].map((i) =>
    createTotalPointMarket(i)
  );
  const headToHeadMarket = [...Array(marketCount).keys()].map((i) =>
    createHandicapMarket(i)
  );

  // please don't remove shuffle function. it's used to test the grouping and sorting
  return shuffle([...totalPointMarkets, ...headToHeadMarket]);
}
