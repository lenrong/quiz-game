// Game Logic
const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const timerElement = document.getElementById('timer');
const scoreElement = document.getElementById('score');
const startButton = document.getElementById('startButton');
const nicknameInput = document.getElementById('nicknameInput');
const gameElement = document.getElementById('game');
const rankingList = document.getElementById('rankingList');

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 10;
let timerInterval;
let nickname = '';
let questions = [];

// Data ranking
let ranking = JSON.parse(localStorage.getItem('ranking')) || [];

function displayRanking() {
    rankingList.innerHTML = ranking
        .slice(0, 10)
        .map((entry, index) => `<li>${index + 1}. ${entry.nickname} - ${entry.score}</li>`)
        .join('');
}

function startGame() {
    nickname = document.getElementById('nickname').value.trim();
    if (!nickname) {
        alert("Masukkan nickname terlebih dahulu!");
        return;
    }

    nicknameInput.style.display = 'none';
    gameElement.style.display = 'block';
    currentQuestionIndex = 0;
    score = 0;
    scoreElement.textContent = `Skor: ${score}`;
    loadQuestion();
}

// ... (seluruh fungsi game logic sebelumnya tetap sama) ...

// Event listener
startButton.addEventListener('click', startGame);
displayRanking();
