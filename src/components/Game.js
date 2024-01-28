import React, { useState } from "react";
import Board from "./Board"; // import the Board component
import "../App.css";

// Constants for game levels
const LEVELS = {
  beginner: { width: 9, height: 9, mines: 10 },
  intermediate: { width: 16, height: 16, mines: 40 },
  expert: { width: 30, height: 16, mines: 99 },
};

const Game = () => {
  const [config, setConfig] = useState(LEVELS.beginner);

  return (
    // <div>
    //   <GameStatusIndicator gameOver={gameOver} onReset={resetGame} />
    //   <Board
    //     board={board}
    //     setBoard={setBoard}
    //     gameOver={gameOver}
    //     handleReveal={handleReveal}
    //     // ... other props you might need to pass
    //   />
    //   {/* ... other components if any */}
    // </div>
    <div>
      {/* <button onClick={setConfig(LEVELS.beginner)}>Beginner</button>
      <button onClick={setConfig(LEVELS.intermediate)}>Intermediate</button>
      <button onClick={setConfig(LEVELS.expert)}>Expert</button> */}
      <div className="game">
        <Board
          width={config.width}
          height={config.height}
          mines={config.mines}
        />
        {/* Additional UI elements for difficulty selection and custom config */}
      </div>
    </div>
  );
};

export default Game;
