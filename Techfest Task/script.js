// ---------------- PUZZLES ----------------
const puzzles = [
  [
    [5,3,0,0,7,0,0,0,0],
    [6,0,0,1,9,5,0,0,0],
    [0,9,8,0,0,0,0,6,0],
    [8,0,0,0,6,0,0,0,3],
    [4,0,0,8,0,3,0,0,1],
    [7,0,0,0,2,0,0,0,6],
    [0,6,0,0,0,0,2,8,0],
    [0,0,0,4,1,9,0,0,5],
    [0,0,0,0,8,0,0,7,9]
  ],
  [
    [0,0,0,2,6,0,7,0,1],
    [6,8,0,0,7,0,0,9,0],
    [1,9,0,0,0,4,5,0,0],
    [8,2,0,1,0,0,0,4,0],
    [0,0,4,6,0,2,9,0,0],
    [0,5,0,0,0,3,0,2,8],
    [0,0,9,3,0,0,0,7,4],
    [0,4,0,0,5,0,0,3,6],
    [7,0,3,0,1,8,0,0,0]
  ]
];

// ---------------- GAME STATE ----------------
let originalBoard = [];
let board = [];

// ---------------- CREATE BOARD ----------------
function createBoard() {
  const sudokuBoard = document.getElementById("sudoku-board");
  sudokuBoard.innerHTML = "";

  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      const input = document.createElement("input");
      input.maxLength = 1;

      // 🔥 Add bold borders for 3x3 blocks
      if (c % 3 === 0) input.classList.add("block-left");
      if (r % 3 === 0) input.classList.add("block-top");
      if (c === 8) input.classList.add("block-right");
      if (r === 8) input.classList.add("block-bottom");

      if (board[r][c] !== 0) {
        input.value = board[r][c];
        input.disabled = true;
      }

      input.addEventListener("input", () => {
        const value = input.value;

        if (!/^[1-9]$/.test(value)) {
          input.value = "";
          input.classList.remove("correct", "wrong");
          board[r][c] = 0;
          return;
        }

        board[r][c] = value;

        if (isValid(r, c, value)) {
          input.classList.add("correct");
          input.classList.remove("wrong");
        } else {
          input.classList.add("wrong");
          input.classList.remove("correct");
        }
      });

      sudokuBoard.appendChild(input);
    }
  }
}

// ---------------- VALIDATION ----------------
function isValid(row, col, num) {
  for (let c = 0; c < 9; c++)
    if (c !== col && board[row][c] == num) return false;

  for (let r = 0; r < 9; r++)
    if (r !== row && board[r][col] == num) return false;

  const sr = Math.floor(row / 3) * 3;
  const sc = Math.floor(col / 3) * 3;

  for (let r = sr; r < sr + 3; r++)
    for (let c = sc; c < sc + 3; c++)
      if ((r !== row || c !== col) && board[r][c] == num) return false;

  return true;
}

// ---------------- BUTTON FUNCTIONS ----------------
function newGame() {
  const index = Math.floor(Math.random() * puzzles.length);
  originalBoard = JSON.parse(JSON.stringify(puzzles[index]));
  board = JSON.parse(JSON.stringify(originalBoard));
  document.getElementById("result").innerText = "";
  createBoard();
}

function resetGame() {
  board = JSON.parse(JSON.stringify(originalBoard));
  document.getElementById("result").innerText = "";
  createBoard();
}

function checkResult() {
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (board[r][c] === 0 || !isValid(r, c, board[r][c])) {
        document.getElementById("result").innerText =
          "❌ Sudoku is NOT correct";
        return;
      }
    }
  }
  document.getElementById("result").innerText =
    "🎉 Congratulations! Sudoku is correct";
}

// ---------------- EVENT LISTENERS ----------------
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("newGameBtn").addEventListener("click", newGame);
  document.getElementById("resetGameBtn").addEventListener("click", resetGame);
  document.getElementById("checkBtn").addEventListener("click", checkResult);
  newGame();
});
