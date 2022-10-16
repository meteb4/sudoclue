let M = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  //
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 0, 0, 0],
  //
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
];

class Cell {
  constructor(width, height, isAlternated, index) {
    this.width = width ? `${width}px` : "20px";
    this.height = height ? `${height}px` : "20px";
    this.isAlternated = isAlternated;
    this.index = index;
  }
  render() {
    // Create a div#cell, wrapping an input#tmp
    let cell = document.createElement("div");
    cell.style.width = this.width;
    cell.style.height = this.height;
    let tmp = document.createElement("input");
    tmp.style.width = "100%";
    tmp.style.height = "100%";
    tmp.style.boxSizing = "border-box";
    if (this.isAlternated) tmp.style.background = "#ffffff";
    else tmp.style.background = "#dddddd";
    tmp.style.fontSize = "1rem";
    tmp.style.textAlign = "center";
    tmp.style.caretColor = "transparent";
    tmp.value = 0;
    cell.id = "c" + this.index;
    cell.appendChild(tmp);
    // Regulates user input into the cell
    cell.addEventListener("input", (e) => {
      if (e.data != parseInt(e.data)) tmp.value = 0;
      else {
        tmp.value = parseInt(e.data);
        let i = this.index % 9;
        let j = parseInt((this.index - i) / 9);
        M[j][i] = parseInt(tmp.value);
      }
    });
    return cell;
  }
}

class Row {
  constructor(index) {
    this.index = index;
  }
  render() {
    let tmp = document.createElement("div");
    tmp.style.display = "flex";
    tmp.id = "r" + this.index.toString();
    return tmp;
  }
}

// The Sudoku board requires (3x3)*3*3 cells

class Sudoku {
  render() {
    for (let i = 0; i < 81; i++) {
      document
        .getElementById("r" + parseInt(i / 9).toString())
        .appendChild(new Cell(50, 50, false, i).render());
    }
  }
}

for (let i = 0; i < 9; i++) {
  document.getElementById("main").appendChild(new Row(i).render());
}

let c = 0;

new Sudoku().render();

class Solver {
  constructor(board) {
    this.board = board;
  }
  checkRow(v, i) {
    for (let j = 0; j < 9; j++) {
      if (this.board[i][j] == v) return false;
    }
    return true;
  }
  checkColumn(v, j) {
    for (let i = 0; i < 9; i++) {
      if (this.board[i][j] == v) return false;
    }
    return true;
  }
  checkSquare(v, i, j) {
    for (let m = parseInt(i / 3) * 3; i < parseInt(i / 3) * 3 + 3; i++) {
      for (let n = parseInt(j / 3) * 3; i < parseInt(j / 3) * 3 + 3; i++) {
        if (this.board[m][n] == v) return false;
      }
    }
    return true;
  }
  solve(pos) {
    c++;
    let i = pos % 9;
    let j = parseInt((pos - i) / 9);
    if (c > 100) {
      console.log(c);
      return;
    }
    if (pos == 81) {
      console.log(this.board);
      return true;
    } else if (this.board[i][j] != 0) {
      if (this.solve(pos + 1)) return true;
      else return False;
    } else if (this.board[i][j] == 0) {
      for (let k = 1; k < 10; k++) {
        if (
          this.checkRow(k, i) &&
          this.checkColumn(k, j) &&
          this.checkSquare(k, i, j)
        ) {
          this.board[i][j] = k;
          if (this.solve(pos + 1)) return true;
          else this.board[i][j] = 0;
        }
      }
    }
    return false;
  }
}

function handleSolver() {
  let button = document.getElementById("sub");
  let x = new Solver(M);
  button.addEventListener("click", (e) => {
    x.solve(0);
  });
}
// handleSolver();
