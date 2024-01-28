import React from "react";

import "../App.css";

const Cell = ({
  revealed,
  mine,
  flagged,
  adjacentMines,
  adjacentFlags,
  onReveal,
  onFlag,
}) => {
  let cellClass = "cell";
  cellClass += revealed ? " revealed" : "";
  cellClass += mine && revealed ? " mine" : "";
  cellClass += flagged ? " flagged" : "";
  cellClass +=
    revealed && adjacentMines > 0 ? ` adjacent-${adjacentMines}` : "";

  return (
    <div className={cellClass} onClick={onReveal} onContextMenu={onFlag}>
      {revealed ? (mine ? "💣" : adjacentMines == 0 ? "" : adjacentMines) : ""}
    </div>
  );
};

export default Cell;
