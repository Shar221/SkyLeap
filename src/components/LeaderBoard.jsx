// src/components/LeaderboardPage.jsx
import React, { useEffect, useState } from "react";

export default function LeaderboardPage({ onBack }) {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("skyleap_leaderboard") || "[]");
    setScores(data);
  }, []);

  return (
    <div className="w-full h-screen bg-sky-300 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-6">
        <h1 className="text-4xl font-extrabold text-center mb-6 text-red-500 text-underline">
         <u>Leaderboard</u> 
        </h1>

        {scores.length === 0 ? (
          <p className="text-center text-lg text-gray-600">No scores yet!</p>
        ) : (
          <div className="overflow-y-auto max-h-[60vh]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-green-400 text-white text-lg">
                  <th className="px-4 py-2">#</th>
                  <th className="px-4 py-2">Player</th>
                  <th className="px-4 py-2">Score</th>
                  <th className="px-4 py-2">Coins</th>
                  <th className="px-4 py-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {scores.map((entry, index) => {
                  let rowStyle = "bg-sky-100";
                  if (index === 0) rowStyle = "bg-yellow-300 font-bold";
                  if (index === 1) rowStyle = "bg-gray-300 font-bold";
                  if (index === 2) rowStyle = "bg-orange-300 font-bold";

                  return (
                    <tr key={entry.id} className={rowStyle}>
                      <td className="px-4 py-2">{index + 1}</td>
                      <td className="px-4 py-2">{entry.name || "Unknown"}</td>
                      <td className="px-4 py-2">{entry.score}</td>
                      <td className="px-4 py-2">{entry.coins}</td>
                      <td className="px-4 py-2 text-sm">{entry.date}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        <div className="flex justify-center mt-6">
          <button
            onClick={onBack}
            className="bg-blue-600 hover:bg-blue-400 text-white px-6 py-2 rounded-lg text-lg font-semibold transition"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}