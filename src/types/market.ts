export interface Outcome {
  outcomeId: string;
  name: string;
  odds: string;
}

export interface Market {
  marketId: string;
  groupName: string;
  sortOrder?: number;
  outcomes: Outcome[];
}
