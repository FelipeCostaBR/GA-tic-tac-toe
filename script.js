// variable
let boxes = document.querySelectorAll(".box");
let btnReset = document.querySelector(".reset");
let container = document.querySelector(".game-board");
let player1Light = document.querySelector(".player1-light").style;
let player2Light = document.querySelector(".player2-light").style;
let player1 = document.querySelector(".player1");
let player2 = document.querySelector(".player2");
let player1Score = document.querySelector(".player1-score-total");
let player2Score = document.querySelector(".player2-score-total");
let player1Symbol = "X";
let player2Symbol = "O";
let player1Total = 0;
let player2Total = 0;
let startPlayer = true; // to start with O set to false
let result = ["", "", "", "", "", "", "", "", ""];
let doDraw = true;
let fixDoubleScore = false;

// events
boxes.forEach((element) => {
  element.addEventListener("click", changeBox);
});
btnReset.addEventListener("click", function () {
  localStorage.clear();
  player1Score.textContent = "0";
  player2Score.textContent = "0";
  player1Total = 1;
  player2Total = 1;
  player1.textContent = "";
  player2.textContent = "";
  selectNames();
});
VanillaTilt.init(document.querySelector(".js-tilt"));

// methods
function changeBox(event) {
  let arrayIndex = 0;
  let symbol = 0;
  arrayIndex = event.target.dataset.value;

  if (result[arrayIndex] == "") {
    if (startPlayer) {
      event.target.textContent = player1Symbol;
      event.target.classList.add("flip-horizontal-bottom");
      startPlayer = false;
      player1Light.visibility = "hidden";
      player2Light.visibility = "visible";
    } else {
      event.target.textContent = player2Symbol;
      event.target.classList.add("flip-horizontal-bottom");
      startPlayer = true;
      player2Light.visibility = "hidden";
      player1Light.visibility = "visible";
    }

    symbol = event.target.textContent;
    result.splice(arrayIndex, 1, symbol);

    checkColumns(symbol);
    checkRows(symbol);
    checkDiagonal(symbol);
    checkDraw();
  }
}

function checkColumns(player) {
  if (result[0] == player && result[6] == player && result[3] == player) {
    winner(player, fixDoubleScore);
    fixDoubleScore = drawLine(0, 6, 3);
  } else if (
    result[1] == player &&
    result[7] == player &&
    result[4] == player
  ) {
    winner(player, fixDoubleScore);
    fixDoubleScore = drawLine(1, 7, 4);
  } else if (
    result[2] == player &&
    result[8] == player &&
    result[5] == player
  ) {
    winner(player, fixDoubleScore);
    fixDoubleScore = drawLine(2, 8, 5);
  }
}

function checkRows(player) {
  if (result[0] == player && result[1] == player && result[2] == player) {
    winner(player, fixDoubleScore);
    fixDoubleScore = drawLine(0, 1, 2);
  } else if (
    result[3] == player &&
    result[4] == player &&
    result[5] == player
  ) {
    winner(player, fixDoubleScore);
    fixDoubleScore = drawLine(3, 4, 5);
  } else if (
    result[6] == player &&
    result[7] == player &&
    result[8] == player
  ) {
    winner(player, fixDoubleScore);
    fixDoubleScore = drawLine(6, 7, 8);
  }
}

function checkDiagonal(player) {
  if (result[0] == player && result[4] == player && result[8] == player) {
    winner(player, fixDoubleScore);
    fixDoubleScore = drawLine(0, 4, 8);
  } else if (
    result[2] == player &&
    result[4] == player &&
    result[6] == player
  ) {
    winner(player, fixDoubleScore);
    fixDoubleScore = drawLine(2, 4, 6);
  }
}

function checkDraw() {
  boxes.forEach((elem) => {
    if (elem.style.color == "green") {
      doDraw = false;
    } else if (result.indexOf("") == -1 && doDraw) {
      player1Light.visibility = "hidden";
      player2Light.visibility = "hidden";
      startPlayer = true;
      container.classList.add("game-board-size");
      swal(`DRAW`, `lets play again`).then(() => {
        newGame();
      });
    }
  });
}

function drawLine(...args) {
  args.forEach((elem) => {
    boxes[elem].style.color = "green";
  });
  return true;
}

function winner(player, fixDoubleScore) {
  player1Light.visibility = "hidden";
  player2Light.visibility = "hidden";
  container.classList.add("game-board-size");

  if (player == "X" && !fixDoubleScore) {
    player1Score.textContent = player1Total++;
    localStorage.setItem("scorePlayer1", player1Score.textContent);

    swal(`${player1.textContent.toUpperCase()} WON`, `lets play again`).then(
      () => {
        newGame();
      }
    );
  } else if (!fixDoubleScore) {
    player2Score.textContent = player2Total++;
    localStorage.setItem("scorePlayer2", player2Score.textContent);

    swal(`${player2.textContent.toUpperCase()} WON`, `lets play again`).then(
      () => {
        newGame();
      }
    );
  }
}

function newGame() {
  boxes.forEach((element) => {
    element.textContent = "";
    element.style.color = "";
    result[element.dataset.value] = "";
    element.classList.remove("flip-horizontal-bottom");
  });
  startPlayer = true;
  player1Light.visibility = "visible";
  player2Light.visibility = "hidden";
  doDraw = true;
  fixDoubleScore = false;
  container.classList.remove("game-board-size");
}

function selectNames() {
  swal({
    title: "CHOSE A NICE NAME",
    text: "Write the name of the first player:",
    buttons: true,
    closeModal: true,
    content: {
      element: "input",
      attributes: {
        placeholder: "type your name",
      },
    },
  }).then(function (value) {
    player1.textContent = value;
    localStorage.setItem("namePlayer1", player1.textContent);
    swal({
      title: "CHOSE A NICE NAME",
      text: "Write the name of the second player:",
      buttons: true,
      closeModal: true,
      content: {
        element: "input",
        attributes: {
          placeholder: "type your name",
        },
      },
    }).then(function (value) {
      player2.textContent = value;
      localStorage.setItem("namePlayer2", player2.textContent);
      swal("Nice!", "let's play", "success");
      player1Light.visibility = "visible";
    });
  });
}

function storageData() {
  if (
    localStorage.getItem("scorePlayer1") ||
    localStorage.getItem("scorePlayer2")
  ) {
    player1Total = Number(localStorage.getItem("scorePlayer1")) + 1;
    player1Score.textContent = localStorage.getItem("scorePlayer1");
    player1.textContent = localStorage.getItem("namePlayer1");
    player2Total = Number(localStorage.getItem("scorePlayer2")) + 1;
    player2Score.textContent = localStorage.getItem("scorePlayer2");
    player2.textContent = localStorage.getItem("namePlayer2");
    player1Light.visibility = "visible";
  } else {
    player1Total = Number(localStorage.getItem("scorePlayer1")) + 1;
    player2Total = Number(localStorage.getItem("scorePlayer2")) + 1;
    selectNames();
  }
}

storageData();
