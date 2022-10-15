let M = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  //
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
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
    tmp.style.fontSize = "3rem";
    tmp.style.textAlign = "center";
    tmp.style.caretColor = "transparent";
    tmp.value = 0;
    cell.id = "c" + this.index;
    cell.appendChild(tmp);
    // Regulates user input into the cell
    cell.addEventListener("input", (e) => {
      if (e.data != parseInt(e.data)) tmp.value = "";
      if (tmp.value.length > 1) {
        // M[i % 9][Math.floor((i - (i % 9)) / 9)] = parseInt(e.data);
        tmp.value = e.data;
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

function isEven(n) {
  if (n % 2 == 0) {
    return True;
  }
  return False;
}

class Sudoku {
  render() {
    for (let i = 0; i < 81; i++) {
      document
        .getElementById("r" + Math.floor(i / 9).toString())
        .appendChild(new Cell(50, 50, false, i).render());
    }
  }
}

for (let i = 0; i < 9; i++) {
  document.getElementById("main").appendChild(new Row(i).render());
}

new Sudoku().render();

let BTN = document.getElementById("sub");

BTN.addEventListener("click", (e) => {
  for (let i = 0; i < 81; i++) {
    M[i % 9][Math.floor((i - (i % 9)) / 9)] = document.getElementById(
      "r" + i.toString()
    ).value;
  }
});
console.log(M);
