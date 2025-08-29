import React, { useState } from "react";
import HomePage from "./components/HomePage";
import GamePage from "./components/GamePage"

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

      {page === "game" && <GamePage onBack={() => setPage("home")} />}
      {page === "leaderboard" && (
        <div className="text-center mt-20">Leaderboard Page</div>
      )}
    </>
  );
}