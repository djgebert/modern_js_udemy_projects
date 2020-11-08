const guessNode = document.querySelector("#guess");
const submitNode = document.querySelector("#submit");
const messageNode = document.querySelector("#message");
const formNode = document.querySelector("#guessForm");

let guessesRemaining;
let randomNumber;

initialiseGame();

function initialiseGame(e) {
  if(e) {e.preventDefault();}
  formNode.removeEventListener("submit", initialiseGame);
  formNode.addEventListener("submit", processGuess);
  guessesRemaining = 3;
  messageNode.style.display = "none";
  messageNode.textContent = "Waiting for guess.";
  submitNode.value = "Guess!";
  randomNumber = Math.floor(Math.random()*10) + 1;
}

function processGuess(e) {
  let guess = parseInt(guessNode.value);

  if(guess === randomNumber) {
    processWin();
  }
  else {
    guessesRemaining--;
    if(guessesRemaining === 0) {
      processLoss();
    }
    else {
      displayMessage(`Sorry, ${guess} is incorrect. You have ${guessesRemaining} guess(es) left.`, "darkred");
    }
  }
  e.preventDefault();
}

function processWin() {
  displayMessage(`${randomNumber} is correct. You win!`, "green");
  submitNode.value = "Play again";
  formNode.removeEventListener("submit", processGuess);
  formNode.addEventListener("submit", initialiseGame);
}

function processLoss() {
  displayMessage(`Sorry, you lose. The number was ${randomNumber}.`, "darkred");
  submitNode.value = "Play again";
  formNode.removeEventListener("submit", processGuess);
  formNode.addEventListener("submit", initialiseGame);
}

function displayMessage(message, color="") {
  messageNode.textContent = message;
  messageNode.style.display = "block";
  messageNode.style.color = color;
}

