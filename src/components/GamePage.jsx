import React, { useState, useEffect, useRef } from "react";

export default function GamePage({ onBack }) {
  const [score, setScore] = useState(0);
  const [coins, setCoins] = useState(0);
  const [obstacles, setObstacles] = useState([]);
  const [coinItems, setCoinItems] = useState([]);
  const [playerY, setPlayerY] = useState(0);
  const [isJumping, setIsJumping] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const gameLoopRef = useRef();

  // Start the game loop
  useEffect(() => {
    if (gameOver) return;

    gameLoopRef.current = setInterval(() => {
      setScore((s) => s + 1);

      // Move obstacles
      setObstacles((obs) =>
        obs
          .map((o) => ({ ...o, x: o.x - 5 }))
          .filter((o) => o.x > -50)
      );

      // Move coins
      setCoinItems((cs) =>
        cs
          .map((c) => ({ ...c, x: c.x - 5 }))
          .filter((c) => c.x > -30)
      );

      // Spawn obstacles
      if (Math.random() < 0.02) {
        setObstacles((obs) => [
          ...obs,
          { id: Date.now(), x: window.innerWidth, y: 0 },
        ]);
      }

      // Spawn coins
      if (Math.random() < 0.015) {
        setCoinItems((cs) => [
          ...cs,
          {
            id: Date.now(),
            x: window.innerWidth,
            y: Math.random() > 0.5 ? 50 : 120,
          },
        ]);
      }

      // Collision with coins
      setCoinItems((cs) => {
        return cs.filter((c) => {
          const playerX = 80;
          const playerYPos = playerY + 96;
          const playerW = 50;
          const playerH = 50;

          const coinW = 30;
          const coinH = 30;

          if (
            playerX < c.x + coinW &&
            playerX + playerW > c.x &&
            playerYPos < c.y + coinH &&
            playerYPos + playerH > c.y
          ) {
            setCoins((coins) => coins + 1);
            return false;
          }
          return true;
        });
      });

      // Collision with obstacles (game over)
      obstacles.forEach((o) => {
        const playerX = 80;
        const playerYPos = playerY + 96;
        const playerW = 50;
        const playerH = 50;

        const rockW = 50;
        const rockH = 50;
        const rockYPos = 96;

        if (
          playerX < o.x + rockW &&
          playerX + playerW > o.x &&
          playerYPos < rockYPos + rockH &&
          playerYPos + playerH > rockYPos
        ) {
          setGameOver(true);
          clearInterval(gameLoopRef.current);
        }
      });
    }, 30);

    return () => clearInterval(gameLoopRef.current);
  }, [playerY, obstacles, gameOver]);

  // Jump logic
  useEffect(() => {
    if (isJumping) {
      let jumpUp = true;
      let jumpInterval = setInterval(() => {
        setPlayerY((y) => {
          if (jumpUp && y < 100) return y + 10;
          jumpUp = false;
          if (!jumpUp && y > 0) return y - 10;
          clearInterval(jumpInterval);
          setIsJumping(false);
          return 0;
        });
      }, 30);
    }
  }, [isJumping]);

  // Reset game
  const restartGame = () => {
    setScore(0);
    setCoins(0);
    setObstacles([]);
    setCoinItems([]);
    setPlayerY(0);
    setIsJumping(false);
    setGameOver(false);
  };

  return (
    <div className="w-full h-screen bg-sky-300 overflow-hidden relative">
      {/* HUD */}
      {!gameOver && (
        <>
          <div className="absolute top-4 left-4 text-xl font-bold text-white">
            Score: {score}
          </div>
          <div className="absolute top-4 right-4 flex items-center gap-2 text-xl font-bold text-white">
            <img src="src/assets/coin-removebg-preview.png" alt="coin" className="w-6 h-6" />
            {coins}
          </div>
          <button
            onClick={onBack}
            className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white px-4 py-2 rounded"
          >
            Exit
          </button>
        </>
      )}

      {/* Ground */}
      <div className="absolute bottom-0 w-full h-24 bg-green-500"></div>

      {/* Player */}
      <img
        src="src/assets/RUN.png"
        alt="player"
        className="absolute left-12"
        style={{ bottom: `${playerY + 100}px`, width: "150px" }}
      />

      {/* Obstacles */}
      {obstacles.map((o) => (
        <img
          key={o.id}
          src="src/assets/ROCK.png"
          alt="rock"
          className="absolute bottom-21"
          style={{ left: o.x, width: "50px" }}
        />
      ))}

      {/* Coins */}
      {coinItems.map((c) => (
        <img
          key={c.id}
          src="src/assets/coin-removebg-preview.png"
          alt="coin"
          className="absolute"
          style={{
            left: c.x,
            bottom: `${c.y + 96}px`,
            width: "30px",
          }}
        />
      ))}

      {/* Jump area */}
      {!gameOver && (
        <div
          onClick={() => !isJumping && setIsJumping(true)}
          className="absolute inset-0 cursor-pointer"
        ></div>
      )}

      {/* Game Over Screen */}
      {gameOver && (
        <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white">
          <h1 className="text-4xl font-bold mb-4">Game Over</h1>
          <p className="mb-2">Score: {score}</p>
          <p className="mb-6">Coins: {coins}</p>
          <button
            onClick={restartGame}
            className="bg-green-500 px-6 py-3 rounded mb-4"
          >
            Retry
          </button>
          <button
            onClick={onBack}
            className="bg-red-500 px-6 py-3 rounded"
          >
            Exit
          </button>
        </div>
      )}
    </div>
  );
}