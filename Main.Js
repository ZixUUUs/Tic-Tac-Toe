const gameBoard = {
  Grid: ["", "", "", "", "", "", "", "", ""],

  getBoard: function () {
    const gridDiv = document.querySelector(".gameBoard");
    this.Grid.forEach((_, index) => {
      const GridCard = document.createElement("div");
      GridCard.id = `Card-${index}`;
      GridCard.className = "GridCard";
      GridCard.addEventListener("click", () => {
        GameController.makeMove(index);
      });
      gridDiv.appendChild(GridCard);
    });
  },
  updateGrid: function (position, Mark) {
    let Card = document.getElementById(`Card-${position}`);
    if (this.Grid[position] !== "") {
      alert("we already played here !!");
      return;
    }
    this.Grid[position] = Mark;

    if (Card) {
      Card.textContent = Mark;
    }
  },
};

gameBoard.getBoard();

const Player = function (Player, Mark) {
  this.Player = Player;
  this.Mark = Mark;
};

const GameController = {
  currentPlayer: null,

  Players: [],

  P1: document.querySelector("#P1"),
  P2: document.querySelector("#P2"),

  makeMove: function (position) {
    if (!this.currentPlayer) return;
    gameBoard.updateGrid(position, this.currentPlayer.Mark);
    this.switchTurn();
  },

  start: document
    .querySelector("#starting")
    .addEventListener("click", function () {
      if (GameController.P1.value === "" || GameController.P2.value === "") {
        return alert("Please enter Name !!");
      } else {
        const player1 = new Player(P1.value, "X");
        const player2 = new Player(P2.value, "O");
        console.log(
          `Player 1: ${player1.Player} with ${player1.Mark}, Player 2: ${player2.Player} with ${player2.Mark}`
        );
        GameController.Players.push(player1, player2);
      }

      GameController.currentPlayer = GameController.Players[0];
    }),
  checkWinner: function () {
    const win = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    let roundWon = false;
    for (i = 0; i < win.length; i++) {
      const condition = win[i];
      const cardA = gameBoard.Grid[condition[0]];
      const cardB = gameBoard.Grid[condition[1]];
      const cardC = gameBoard.Grid[condition[2]];
      if (cardA == "" || cardB == "" || cardC == "") {
        continue;
      }
      if (cardA == cardB && cardB == cardC) {
        roundWon = true;
        break;
      }
    }
    if (roundWon) {
      alert(
        `${this.currentPlayer.Player}, IS A LOOSEEEER!!!!!! HAHAHAHAHAHAHAHAHAHAHAHAHAHAHA`
      );
    } else if (!gameBoard.Grid.includes("")) {
      alert("DRAW!!");
    } else;
  },

  switchTurn: function () {
    this.currentPlayer =
      this.currentPlayer === this.Players[0]
        ? this.Players[1]
        : this.Players[0];
    this.checkWinner();
  },

  restart: document
    .querySelector(".restart")
    .addEventListener("click", function () {
      gameBoard.Grid = ["", "", "", "", "", "", "", "", ""];
      document.querySelectorAll(".GridCard").forEach((card) => {
        card.textContent = "";
      });
      GameController.Players = [];
      GameController.currentPlayer = null;
      GameController.P1.value = "";
      GameController.P2.value = "";
      alert("start again!?");
    }),
};
