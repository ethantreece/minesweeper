import React, { useState, useEffect } from "react";
import Cell from "./Cell";
import { generateMines } from "../utils/gameLogic";

const Board = ({ width, height, mines }) => {
  const [board, setBoard] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    setBoard(generateMines(width, height, mines));
  }, [width, height, mines]);

  const handleMiddleClick = (e) => {
    // Middle mouse has button code of 1
    if (e.button === 1) {
      e.preventDefault();
      resetGame();
    }
  };

  const resetGame = () => {
    setBoard(generateMines(width, height, mines));
    setGameOver(false);
  };

  const revealCell = (board, x, y, width, height) => {
    // Base case: If the cell is already revealed or is flagged, stop.
    if (board[x][y].revealed || board[x][y].flagged) {
      return;
    }

    // Reveal this cell
    board[x][y].revealed = true;

    // If the cell does not have adjacent mines, reveal its neighbors
    if (board[x][y].adjacentMines === 0) {
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          const newX = x + i;
          const newY = y + j;
          // Check if the new coordinates are inside the board
          if (newX >= 0 && newX < height && newY >= 0 && newY < width) {
            revealCell(board, newX, newY, width, height);
          }
        }
      }
    }
  };

  const handleReveal = (x, y) => {
    if (gameOver) return; // Ignore clicks if the game is over

    // Create a copy of the board to mutate
    const newBoard = [...board];

    console.log("CLICKED:" + x + "," + y);
    console.log("\t" + newBoard[x][y].revealed);
    console.log("\tAMINES:" + newBoard[x][y].adjacentMines);
    console.log("\tAFLAGS:" + newBoard[x][y].adjacentFlags);

    // Check if revealed cell has correct number of adjacent flags
    if (
      newBoard[x][y].revealed &&
      newBoard[x][y].adjacentMines === newBoard[x][y].adjacentFlags
    ) {
      // Reveal all non-flagged neighbors
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          const newX = x + i;
          const newY = y + j;
          if (
            newX >= 0 &&
            newX < height &&
            newY >= 0 &&
            newY < width &&
            !newBoard[newX][newY].flagged
          ) {
            revealCell(newBoard, newX, newY, width, height);
          }
        }
      }
      setBoard(newBoard);
      console.log("AH");
      return;
    }

    if (newBoard[x][y].mine) {
      setGameOver(true);
      for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
          if (newBoard[i][j].mine) newBoard[i][j].revealed = true;
        }
      }
    } else {
      // Reveal the cell and potentially cascade
      revealCell(newBoard, x, y, width, height);
    }

    // Update the state with the new board
    setBoard(newBoard);
  };

  const updateAdjacentFlags = (board, x, y, width, height, increment) => {
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        const newX = x + i;
        const newY = y + j;
        if (newX >= 0 && newX < height && newY >= 0 && newY < width) {
          board[newX][newY].adjacentFlags += increment ? -1 : 1;
        }
      }
    }
  };

  const handleFlag = (e, x, y) => {
    console.log("FLAGGED:" + x + "," + y);
    e.preventDefault();
    // If cell is revealed, it cannot be flagged
    if (board[x][y].revealed) return;

    // Create a copy of the board to mutate
    const newBoard = [...board];

    // Update adjacent flags count for neighbors
    updateAdjacentFlags(newBoard, x, y, width, height, newBoard[x][y].flagged);

    // Toggle the flagged state of the cell
    newBoard[x][y].flagged = !newBoard[x][y].flagged;

    // Update the state with the new board
    setBoard(newBoard);
  };

  return (
    <div
      className="board"
      onAuxClick={handleMiddleClick}
      style={{ gridTemplateColumns: `repeat(${width}, 1fr)` }}
    >
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <Cell
            key={`${rowIndex}-${colIndex}`}
            revealed={cell.revealed}
            mine={cell.mine}
            flagged={cell.flagged}
            adjacentMines={cell.adjacentMines}
            onReveal={() => handleReveal(rowIndex, colIndex)}
            onFlag={(e) => handleFlag(e, rowIndex, colIndex)}
          />
        ))
      )}
    </div>
  );
};

export default Board;
