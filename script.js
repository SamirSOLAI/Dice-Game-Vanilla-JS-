"use strict";

let activePlayer = 0;
let playing = true;

//Capturing elements with DOM
const current0 = document.querySelector("#current--0");
const current1 = document.querySelector("#current--1");

const holdButton = document.querySelector(".btn--hold");
const dice = document.querySelector(".dice");
const rollDiceButton = document.querySelector(".btn--roll");

const score0 = document.querySelector("#score--0");
const score1 = document.querySelector("#score--1");

const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");

const newGameButton = document.querySelector(".btn--new");

let currentScore = 0;

//////for changing the player CSS effect
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");

//// trying to play with the dice image
const diceImage = document.querySelector("img");
diceImage.classList.add("hidden");

//Switching player function
const switchPlayer = function () {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;

  ///Changing player css effect
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

// Rolling the dice
rollDiceButton.addEventListener("click", function () {
  diceImage.classList.remove("hidden");
  let RandomNumber = Math.floor(Math.random() * 6) + 1;
  dice.src = `dice-${RandomNumber}.png`;

  // current player playing
  document.querySelector(`#current--${activePlayer}`).textContent =
    Number(document.querySelector(`#current--${activePlayer}`).textContent) +
    RandomNumber;
  currentScore = currentScore + RandomNumber;

  // getting "1" as a dice number

  if (RandomNumber == 1) {
    switchPlayer();
  }
});

//Pressing the hold button
holdButton.addEventListener("click", function () {
  document.querySelector(`#score--${activePlayer}`).textContent =
    Number(document.querySelector(`#score--${activePlayer}`).textContent) +
    currentScore;

  if (
    Number(document.querySelector(`#score--${activePlayer}`).textContent) >= 50
  ) {
    console.log("game finished");
    holdButton.disabled = true;
    rollDiceButton.disabled = true;

    document.querySelector(`#name--${activePlayer}`).textContent =
      document.querySelector(`#name--${activePlayer}`).textContent + " win!";
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add("player--winner");
  } else {
    diceImage.classList.add("hidden");
    switchPlayer();
  }
});

//Reseting the game (pressing the NEw game button)

const resetGame = function () {
  current0.textContent = 0;
  current1.textContent = 0;
  score0.textContent = 0;
  score1.textContent = 0;
  diceImage.classList.add("hidden");
  activePlayer = 0;
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
  currentScore = 0;
  holdButton.disabled = false;
  rollDiceButton.disabled = false;
  document.querySelector(`#name--0`).textContent = "Player 1";
  document.querySelector(`#name--1`).textContent = "Player 2";
  document.querySelector(`.player--0`).classList.remove("player--winner");
  document.querySelector(`.player--1`).classList.remove("player--winner");
};

newGameButton.addEventListener("click", function () {
  resetGame();
  console.log("game reset!");
});
