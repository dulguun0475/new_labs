var questions = ['Biggest Mammal?', 'Fastest vehicle?'];
var answers   = ['WHALE', 'JET'];

let chosenIndex;
let chosenAnswer = "";
let displayedWord = [];
let wrongGuesses = 0;

const questionEl = document.getElementById("question");
const wordEl = document.getElementById("word");
const lettersEl = document.getElementById("letters");
const hangmanImg = document.getElementById("hangmanImg");
const startBtn = document.getElementById("startBtn");

startBtn.onclick = startGame;

function startGame() {
    wrongGuesses = 0;
    hangmanImg.src = "hang0.png";

    // random сонгох
    chosenIndex = Math.floor(Math.random() * questions.length);
    chosenAnswer = answers[chosenIndex].toUpperCase();

    questionEl.innerText = questions[chosenIndex];

    displayedWord = Array(chosenAnswer.length).fill("_");
    wordEl.innerText = displayedWord.join(" ");

    createLetterButtons();
}

function createLetterButtons() {
    lettersEl.innerHTML = "";

    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    for (let char of alphabet) {
        let btn = document.createElement("button");
        btn.innerText = char;

        btn.onclick = function () {
            checkLetter(char, btn);
        };

        lettersEl.appendChild(btn);
    }
}

function checkLetter(letter, btn) {
    btn.disabled = true;

    if (chosenAnswer.includes(letter)) {
        for (let i = 0; i < chosenAnswer.length; i++) {
            if (chosenAnswer[i] === letter) {
                displayedWord[i] = letter;
            }
        }
        wordEl.innerText = displayedWord.join(" ");

        if (!displayedWord.includes("_")) {
            alert("🎉 You Win!");
        }
    } 
    else {
        wrongGuesses++;
        hangmanImg.src = "hang" + wrongGuesses + ".png";

        if (wrongGuesses === 6) {
            alert("☠ Game Over! Correct answer: " + chosenAnswer);
        }
    }
}
