class BasicHangman {
  constructor() {
    this.words = ["MUSIC", "DANCE", "MARK", "FEIT", "MUGS", "TULIP", "GLOBE", "HANDS", "KEYS", "ROSE"];
    this.word = "";
    this.guessedLetters = new Set();
    this.remainingGuesses = 5;
    this.novo();
  }

  novo() {
    this.guessedLetters.clear();
    this.remainingGuesses = 5;
    this.word = this.words[Math.floor(Math.random() * this.words.length)];

    this.revealTwoLetters(); 
    this.updateDisplay();
    document.getElementById("guess-input").value = "";
  }

  revealTwoLetters() {
    const uniqueLetters = Array.from(new Set(this.word));

    if (uniqueLetters.length > 1) {
      while (this.guessedLetters.size < 2) {
        const randomLetter =
          uniqueLetters[Math.floor(Math.random() * uniqueLetters.length)];
        this.guessedLetters.add(randomLetter);
      }
    }
  }

  makeGuess() {
    const input = document.getElementById("guess-input");
    const letter = input.value.toUpperCase();
    input.value = "";

    if (letter && !this.guessedLetters.has(letter)) {
      this.guessedLetters.add(letter);
      if (!this.word.includes(letter)) {
        this.remainingGuesses--;
      }
      this.updateDisplay();
      this.checkGameEnd();
    }
  }

  updateDisplay() {
    const wordDisplay = document.getElementById("word-display");
    wordDisplay.innerHTML = "";

    [...this.word].forEach((letter) => {
      const box = document.createElement("span");
      box.className = "letter-box";
      box.textContent = this.guessedLetters.has(letter) ? letter : "";
      wordDisplay.appendChild(box);
    });

    document.getElementById(
      "guesses"
    ).textContent = `Remaining guesses: ${this.remainingGuesses}`;

    document.getElementById(
      "guessed-letters"
    ).textContent = `Guessed letters: ${[...this.guessedLetters].join(", ")}`;
  }

  checkGameEnd() {
    const won = [...this.word].every((letter) =>
      this.guessedLetters.has(letter)
    );

    if (won) {
      alert(`Congratulations! You won! The word was ${this.word}`);
      this.novo();
    } else if (this.remainingGuesses <= 0) {
      alert(`Game Over! The word was ${this.word}`);
      this.novo();
    }
  }
}
//nova igra
window.onload = function () {
  window.basicGame = new BasicHangman();
};
