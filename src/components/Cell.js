import React from "react";

import "../App.css";

const Cell = ({ revealed, mine, flagged, adjacentMines, onReveal, onFlag }) => {
  let cellClass = "cell";
  cellClass += revealed ? " revealed" : " fresh";
  cellClass += mine && revealed ? " mine" : "";
  cellClass += flagged ? " flagged" : "";
  cellClass +=
    revealed && adjacentMines > 0 ? ` adjacent-${adjacentMines}` : "";

  return (
    <div className={cellClass} onClick={onReveal} onContextMenu={onFlag}>
      {revealed
        ? mine
          ? "💣"
          : adjacentMines === 0
          ? ""
          : adjacentMines
        : flagged
        ? "🚩"
        : ""}
    </div>
  );
};

export default Cell;
