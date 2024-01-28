import React, { useState } from "react";
import "./App.css";
import Board from "./components/Board";

// Constants for game levels
const LEVELS = {
  beginner: { width: 9, height: 9, mines: 10 },
  intermediate: { width: 16, height: 16, mines: 40 },
  expert: { width: 30, height: 16, mines: 99 },
};

function App() {
  // Default to beginner level
  const [config, setConfig] = useState(LEVELS.expert);

  return (
    <div className="board">
      <Board width={config.width} height={config.height} mines={config.mines} />
      {/* Additional UI elements for difficulty selection and custom config */}
    </div>
  );
}

export default App;
