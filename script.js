// variable
let boxes = document.querySelectorAll(".box");
let player1Result = document.querySelector(".player1-result");
let player2Result = document.querySelector(".player2-result");
let player1Symbol = "X";
let player2Symbol = "O";
let startPlayer = true;
let result = ["", "", "", "", "", "", "", "", ""];
let player1Light = document.querySelector(".player1-light").style;
let player2Light = document.querySelector(".player2-light").style;

// events
boxes.forEach((element) => {
  element.addEventListener("click", changeBox);
});
player1Light.visibility = "visible";
// methods
function changeBox(event) {
  let index = 0;
  let element = 0;

  player1Result.textContent = "";
  player2Result.textContent = "";

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
    winner(player);
  }
  if (result[1] == player && result[7] == player && result[4] == player) {
    winner(player);
  }
  if (result[2] == player && result[8] == player && result[5] == player) {
    winner(player);
  }
}

function checkRows(player) {
  if (result[0] == player && result[1] == player && result[2] == player) {
    winner(player);
  }
  if (result[3] == player && result[4] == player && result[5] == player) {
    winner(player);
  }
  if (result[6] == player && result[7] == player && result[8] == player) {
    winner(player);
  }
}

function checkDiagonal(player) {
  if (result[0] == player && result[4] == player && result[8] == player) {
    winner(player);
  }
  if (result[2] == player && result[4] == player && result[6] == player) {
    winner(player);
  }
}

function checkDraw() {
  if (result.indexOf("") == -1) {
    player1Result.textContent = `DRAW`;
    player2Result.textContent = `DRAW`;
    player1Light.visibility = "hidden";
    player2Light.visibility = "hidden";
    startPlayer = true;
    boxes.forEach((element) => {
      element.textContent = "";
      result[element.dataset.value] = "";
    });
  }
}

function winner(player) {
  boxes.forEach((element) => {
    element.textContent = "";
    result[element.dataset.value] = "";
  });
  startPlayer = true;
  if (player == "X") {
    player1Result.textContent = `PLAYER 1 WON`;
    player1Light.visibility = "visible";
    player2Light.visibility = "hidden";
  } else {
    player2Result.textContent = `PLAYER 2 WON`;
    player1Light.visibility = "hidden";
    player2Light.visibility = "visible";
  }
}
