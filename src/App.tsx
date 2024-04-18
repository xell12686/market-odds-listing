import React from "react";
import "./styles.css";
import MarketOddsViewer from "./components/MarketOddsViewer";

export default function App() {
  return (
    <div className="App">
      <MarketOddsViewer matchId="actual-match-id-here" />
    </div>
  );
}
