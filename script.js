// variable
let boxes = document.querySelectorAll(".box");
let playerResult = document.querySelector(".player-result");
let player1Light = document.querySelector(".player1-light").style;
let player2Light = document.querySelector(".player2-light").style;
let btnReset = document.querySelector(".btn-reset");
let player1Score = document.querySelector(".player1-score-total");
let player2Score = document.querySelector(".player2-score-total");
let player1Symbol = "X";
let player2Symbol = "O";
let startPlayer = true;
let player1Total = 1;
let player2Total = 1;
let result = ["", "", "", "", "", "", "", "", ""];

// events
boxes.forEach((element) => {
  element.addEventListener("click", changeBox);
});
btnReset.addEventListener("click", newGame);
player1Light.visibility = "visible";

// methods
function changeBox(event) {
  let index = 0;
  let element = 0;

  if (startPlayer) {
    event.target.textContent = player1Symbol;
    startPlayer = false;
    player1Light.visibility = "hidden";
    player2Light.visibility = "visible";
  } else {
    event.target.textContent = player2Symbol;
    startPlayer = true;
    player2Light.visibility = "hidden";
    player1Light.visibility = "visible";
  }

  index = event.target.dataset.value;
  element = event.target.textContent;
  result.splice(index, 1, element);

  checkColumns(element);
  checkRows(element);
  checkDiagonal(element);
  checkDraw();
}

function checkColumns(player) {
  if (result[0] == player && result[6] == player && result[3] == player) {
    drawLine(0, 6, 3);
    winner(player);
  }
  if (result[1] == player && result[7] == player && result[4] == player) {
    drawLine(1, 7, 4);
    winner(player);
  }
  if (result[2] == player && result[8] == player && result[5] == player) {
    drawLine(2, 8, 5);
    winner(player);
  }
}

function checkRows(player) {
  if (result[0] == player && result[1] == player && result[2] == player) {
    drawLine(0, 1, 2);
    winner(player);
  }
  if (result[3] == player && result[4] == player && result[5] == player) {
    drawLine(3, 4, 5);
    winner(player);
  }
  if (result[6] == player && result[7] == player && result[8] == player) {
    drawLine(6, 7, 8);
    winner(player);
  }
}

function checkDiagonal(player) {
  if (result[0] == player && result[4] == player && result[8] == player) {
    drawLine(0, 4, 8);
    winner(player);
  }
  if (result[2] == player && result[4] == player && result[6] == player) {
    drawLine(2, 4, 6);
    winner(player);
  }
}

function checkDraw() {
  if (result.indexOf("") == -1) {
    playerResult.textContent = `DRAW`;
    player1Light.visibility = "hidden";
    player2Light.visibility = "hidden";
    startPlayer = true;
    btnReset.style.visibility = "visible";
    boxes.forEach((element) => {
      element.textContent = "";
      result[element.dataset.value] = "";
    });
  }
}

function winner(player) {
  if (player == "X") {
    playerResult.textContent = `PLAYER 1 WON`;
    player1Score.textContent = player1Total++;
    player1Light.visibility = "visible";
    player2Light.visibility = "hidden";
    btnReset.style.visibility = "visible";
  } else {
    playerResult.textContent = `PLAYER 2 WON`;
    player2Score.textContent = player2Total++;
    player1Light.visibility = "hidden";
    player2Light.visibility = "visible";
    btnReset.style.visibility = "visible";
  }
}

function drawLine(...args) {
  args.forEach((elem) => {
    boxes[elem].style.color = "green";
  });
}

function newGame() {
  boxes.forEach((element) => {
    element.textContent = "";
    element.style.color = "white";
    result[element.dataset.value] = "";
  });
  playerResult.textContent = "";
  startPlayer = true;
  btnReset.style.visibility = "hidden";
}
