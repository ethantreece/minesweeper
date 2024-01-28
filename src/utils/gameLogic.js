const generateMines = (width, height, mines) => {
  // Step 1: Create an empty board
  const board = Array.from({ length: height }, () =>
    Array.from({ length: width }, () => ({
      mine: false,
      revealed: false,
      flagged: false,
      adjacentMines: 0,
      adjacentFlags: 0,
    }))
  );

  // Step 2: Randomly place mines
  let minePlaced = 0;
  while (minePlaced < mines) {
    const randomRow = Math.floor(Math.random() * height);
    const randomCol = Math.floor(Math.random() * width);
    if (!board[randomRow][randomCol].mine) {
      board[randomRow][randomCol].mine = true;
      minePlaced++;
    }
  }

  // Step 3: Calculate adjacent mines for each cell
  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      if (board[row][col].mine) continue;
      let count = 0;
      // Check all adjacent cells
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          const newRow = row + i;
          const newCol = col + j;
          // Check if the adjacent cell is within bounds and has a mine
          if (
            newRow >= 0 &&
            newRow < height &&
            newCol >= 0 &&
            newCol < width &&
            board[newRow][newCol].mine
          ) {
            count++;
          }
        }
      }
      board[row][col].adjacentMines = count;
    }
  }

  return board;
};

export { generateMines };
