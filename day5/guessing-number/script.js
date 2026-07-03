let secretNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;

const guessInput = document.getElementById("guessInput");
const message = document.getElementById("message");
const attemptsText = document.getElementById("attempts");
const checkBtn = document.getElementById("checkBtn");
const resetBtn = document.getElementById("resetBtn");

function checkGuess() {
  const guess = Number(guessInput.value);

  if (!guess || guess < 1 || guess > 100) {
    message.textContent = "Please enter a number from 1 to 100";
    return;
  }

  attempts++;
  attemptsText.textContent = attempts;

  if (guess === secretNumber) {
    message.textContent = `Correct! You guessed it in ${attempts} attempts`;
  } else if (guess < secretNumber) {
    message.textContent = "Too low! Try again";
  } else {
    message.textContent = "Too high! Try again";
  }

  guessInput.value = "";
  guessInput.focus();
}

function resetGame() {
  secretNumber = Math.floor(Math.random() * 100) + 1;
  attempts = 0;
  attemptsText.textContent = attempts;
  message.textContent = "Guess a number between 1 and 100";
  guessInput.value = "";
  guessInput.focus();
}

checkBtn.addEventListener("click", checkGuess);
resetBtn.addEventListener("click", resetGame);

guessInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    checkGuess();
  }
});
