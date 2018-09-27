module.exports = function solveSudoku(matrix) {
  let arr = matrix;
  //Start from cell (0,0)
  if (solveCell(0, 0))
    return arr;

  /**
   * If the cell is empty then we select the number and check for correctness.
   * If the cell is full then we recursively go to the next row or column
   */
  function solveCell(row, column) {
    if (arr[row][column] === 0) {
      for (var value = 0; value < arr.length; value++) {
        let aim = value + 1;
        if (isSuitable(row, column, aim)) {
          arr[row][column] = aim;
          if (solveCell(row, column)) {
            return true;
          }
        }
      }
      arr[row][column] = 0;
      return false;
    } else {
      row++;
      if (row === 9) {
        row = 0; 
        column++;
        if (column === 9)
          return true;
      }
      if (solveCell(row, column))
        return true;
    }
  };

  /**
   * Checking for correctness for: row, column and section.
   */
  function isSuitable(row, column, aim) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[row][i] === aim) {
        return false;
      }
    }
    for (var i = 0; i < arr.length; i++) {
      if (arr[i][column] === aim) {
        return false;
      }
    }

    let blockRow = Math.floor(row / 3);
    let blockCol = Math.floor(column / 3);
    for (var r = 0; r < arr.length / 3; r++) {
      for (var c = 0; c < arr.length / 3; c++) {
        let newRow = 3 * blockRow + r % 3;
        let newCol = 3 * blockCol + c % 3;
        if (arr[newRow][newCol] === aim) {
          return false;
        }
      }
    }
    return true;
  }
}