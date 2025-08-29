import React, { useState } from "react";
import HomePage from "./components/HomePage";
import GamePage from "./components/GamePage"
import LeaderboardPage from "./components/LeaderBoard";

export default function App() {
  const [page, setPage] = useState("home");

  return (
    <>
      {page === "home" && (
        <HomePage
          onPlay={() => setPage("game")}
          onLeaderboard={() => setPage("leaderboard")}
        />
      )}

      {page === "leaderboard" && (
        <LeaderboardPage onBack={() => setPage("home")} />
      )}
    </>
  );
}