import React from "react";
import "./App.css";
import Game from "./components/Game";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Minesweeper</h1>
      </header>
      <main>
        <Game /> {/* Rendering the Game component */}
      </main>
    </div>
  );
}

export default App;
