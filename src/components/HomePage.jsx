import React from "react";

export default function HomePage({ onPlay, onLeaderboard }) {
  return (
    <div className="w-full h-screen bg-sky-300 flex flex-col justify-between relative overflow-hidden">
      <img
        src="src/assets/cloud-removebg-preview.png"
        alt="Cloud"
        className="absolute top-10 left-10 w-32"
      />
      <img
        src="src/assets/cloud-removebg-preview.png"
        alt="Cloud"
        className="absolute top-20 right-20 w-40"
      />
      <img
        src="src/assets/cloud-removebg-preview.png"
        alt="Cloud"
        className="absolute top-32 left-1/2 w-36"
      />

      <img
        src="src/assets/coin-removebg-preview.png"
        alt="coin"
        className="absolute top-8 right-8 w-20"
      />

      <div className="flex flex-col items-center mt-60 z-10">
        <h1 className="text-6xl font-bold text-yellow-400 drop-shadow-[4px_4px_0px_rgba(0,0,0,0.7)]">
          SKYLEAP
        </h1>
      </div>

      <div className="flex flex-col items-center gap-6 mb-50 z-10">
        <button
          onClick={onPlay}
          className="bg-green-500 hover:bg-green-600 text-white px-12 py-4 text-xl font-bold rounded-full shadow-lg"
        >
          PLAY
        </button>
        <button
          onClick={onLeaderboard}
          className="bg-orange-400 hover:bg-orange-500 text-white px-12 py-4 text-xl font-bold rounded-full shadow-lg"
        >
          LEADERBOARD
        </button>
      </div>

      <div className="w-full h-24 bg-green-500 absolute bottom-0"></div>

      <img
        src="src/assets/standdd-removebg-preview.png"
        alt="Player"
        className="absolute bottom-24 left-8 w-16"
      />

      
      <img
        src="src/assets/ROCK.png"
        alt="Rock"
        className="absolute bottom-19 right-20 w-20"
      />
    </div>
  );
}