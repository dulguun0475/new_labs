var questions = [
    'Гринч ямар өнгөтэй вэ?',
    'Гринч ямар амьтан тэжээдэг вэ?',
    'Сантагийн хэлдэг хамгийн алдартай үг?',
    'Улаан хамартай бугыг хэн гэдэг вэ?',
    'Цасан хүнийг юугаар хийдэг вэ?',
    'Монгол улсын ерөнхийлөгч хэн бэ?'
];
var answers = [
    'НОГООН',
    'НОХОЙ',
    'ХОХОХО',
    'РУДОЛЬФ',
    'ЦАС',
    'Хүрэлсүх'
];
let remainingQuestions = [];
let remainingAnswers = [];
let chosenIndex;
let chosenAnswer = "";
let displayedWord = [];
let wrongGuesses = 0;
let letterIndexes = {};

const questionEl = document.getElementById("question");
const wordEl = document.getElementById("word");
const lettersEl = document.getElementById("letters");
const hangmanImg = document.getElementById("hangmanImg");
const startBtn = document.getElementById("startBtn");
startBtn.onclick = function () {
    remainingQuestions = [...questions];
    remainingAnswers = [...answers];
    startGame();
};
function startGame() {
    if (remainingQuestions.length === 0) {
        alert("Бүх асуулт дууслаа 🎉");
        return;
    }
    wrongGuesses = 0;
    hangmanImg.src = "images/hang0.png";
    chosenIndex = Math.floor(Math.random() * remainingQuestions.length);
    chosenAnswer = remainingAnswers[chosenIndex].toUpperCase();
    questionEl.innerText = remainingQuestions[chosenIndex];
    displayedWord = Array(chosenAnswer.length).fill("_");
    wordEl.innerText = displayedWord.join(" ");
    letterIndexes = {};
    remainingQuestions.splice(chosenIndex, 1);
    remainingAnswers.splice(chosenIndex, 1);
    createLetterButtons();
}
function createLetterButtons() {
    lettersEl.innerHTML = "";
    const alphabet = "АБВГДЕЁЖЗИЙКЛМНОӨПРСТУФХЦЧШЩЪЫЬЭЮЯ";
    for (let char of alphabet) {
        let btn = document.createElement("button");
        btn.innerText = char;
        btn.onclick = function () {
            checkLetter(char);
        };
        lettersEl.appendChild(btn);
    }
}
function checkLetter(letter) {
    if (!letterIndexes[letter]) {
        letterIndexes[letter] = [];
        for (let i = 0; i < chosenAnswer.length; i++) {
            if (chosenAnswer[i] === letter) {
                letterIndexes[letter].push(i);
            }
        }
    }
    let indexes = letterIndexes[letter];
    let added = false;
    for (let i = 0; i < indexes.length; i++) {
        let idx = indexes[i];
        if (displayedWord[idx] === "_") {
            displayedWord[idx] = letter;
            added = true;
            break;
        }
    }
    wordEl.innerText = displayedWord.join(" ");
    if (!displayedWord.includes("_")) {
        wordEl.innerText = displayedWord.join(" ");
        setTimeout(() => {
            alert("Та зөв хариулж түүнийг аварлаа! Зөв хариулт: " + chosenAnswer);
            startGame();
        }, 150);

        return;
    }
    if (!added) {
        wrongGuesses++;
        hangmanImg.src = "images/hang" + wrongGuesses + ".png";

        if (wrongGuesses === 6) {
            setTimeout(() => {
                alert("Тоглоом дууслаа! Зөв хариулт: " + chosenAnswer);
                startGame();
            }, 150);
        }
    }
}




