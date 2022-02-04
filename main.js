/**
 * Generador de numero aleatorio entre 1 - 100
 * @param {Number} randomNumber Obtiene un numero aleatorio
 */
let randomNumber = Math.floor(Math.random() * 100) + 1;

const guesses = document.querySelector(".guesses");
const lastResult = document.querySelector(".lastResult");
const lowOrHi = document.querySelector(".lowOrHi");

const guessSubmit = document.querySelector(".guessSubmit");
const guessField = document.querySelector(".guessField");

const card = document.querySelector(".alert");

let guessCount = 1;
let resetButton;

function checkGuess() {
  // Obtenemos el valor que ha ingresado el usuario y lo
  // convertimos a numerico por medio de 'Number()'
  let userGuess = Number(guessField.value);

  if (guessCount === 1) {
    guesses.textContent = "Intentos anteriores: ";
  }

  guesses.textContent += userGuess + " ";

  if (userGuess === randomNumber) {
    lastResult.textContent = "¡Felicidades! ¡Lo adivinaste!";
    card.classList.remove("no-show");
    card.classList.remove("alert-warning");
    card.classList.add("alert-success");
    lowOrHi.textContent = "Realmente eres bueno para esto. 😎";

    setGameOver();
  } else if (guessCount === 3) {
    lastResult.textContent = "¡Fin del juego!";
    card.classList.remove("no-show");
    card.classList.add("alert-danger");
    lowOrHi.textContent = "Has agotado tus intentos. 😢";

    setGameOver();
  } else {
    lastResult.textContent = "¡Incorrecto!";
    card.classList.remove("no-show");
    card.classList.add("alert-warning");

    if (userGuess < randomNumber) {
      lowOrHi.textContent = "¡El número es muy bajo!";
    } else if (userGuess > randomNumber) {
      lowOrHi.textContent = "¡El número es muy grande!";
    }
  }

  guessCount++;
  guessField.value = "";
  guessField.focus();
}

function setGameOver() {
  guessField.disabled = true;
  guessSubmit.disabled = true;

  resetButton = document.createElement("button");
  resetButton.textContent = "Iniciar nuevo juego";
  resetButton.className = "btn btn-primary";

  const container = document.querySelector(".container");
  container.append(resetButton);

  resetButton.addEventListener("click", resetGame);
}

function resetGame() {
  guessCount = 1;

  const resetParas = document.querySelectorAll(".resultParas p");
  for (let i = 0; i < resetParas.length; i++) {
    resetParas[i].textContent = "";
  }

  resetButton.parentNode.removeChild(resetButton);

  guessField.disabled = false;
  guessSubmit.disabled = false;
  guessField.value = "";
  card.classList.remove("alert-danger");
  card.classList.add("no-show");
  guessField.focus();

  randomNumber = Math.floor(Math.random() * 100) + 1;
}

guessSubmit.addEventListener("click", checkGuess);
