document.addEventListener('DOMContentLoaded', () => {
  // Variabel game
  const startButton = document.getElementById('startButton');
  const nicknameInput = document.getElementById('nicknameInput');
  const gameContainer = document.getElementById('game');
  const questionElement = document.getElementById('question');
  const optionsElement = document.getElementById('options');
  const timerElement = document.getElementById('timer');
  let currentQuestionIndex = 0;
  let score = 0;
  let timerInterval;

  // Fungsi start game
  const startGame = async () => {
    const nickname = document.getElementById('nickname').value.trim();
    if (!nickname) {
      alert("Masukkan nickname terlebih dahulu!");
      return;
    }

    if (!window.questions || window.questions.length === 0) {
      alert("Sedang memuat pertanyaan...");
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    nicknameInput.style.display = 'none';
    gameContainer.style.display = 'block';
    loadQuestion();
  };

  // Fungsi load pertanyaan
  const loadQuestion = () => {
    const question = window.questions[currentQuestionIndex];
    if (!question) {
      alert("Pertanyaan habis! Skor Anda: " + score);
      location.reload();
      return;
    }

    questionElement.textContent = question.question;
    optionsElement.innerHTML = '';

    question.options.forEach(option => {
      const button = document.createElement('button');
      button.className = 'option';
      button.textContent = option;
      button.addEventListener('click', () => checkAnswer(option));
      optionsElement.appendChild(button);
    });

    startTimer();
  };

  // Fungsi timer
  const startTimer = () => {
    let timeLeft = 10;
    timerElement.textContent = `Waktu: ${timeLeft}`;
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      timeLeft--;
      timerElement.textContent = `Waktu: ${timeLeft}`;
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        handleTimeout();
      }
    }, 1000);
  };

  // Fungsi cek jawaban
  const checkAnswer = (selectedOption) => {
    clearInterval(timerInterval);
    const correctAnswer = window.questions[currentQuestionIndex].answer;
    if (selectedOption === correctAnswer) {
      score++;
    }
    currentQuestionIndex++;
    loadQuestion();
  };

  // Fungsi jika waktu habis
  const handleTimeout = () => {
    alert("Waktu habis! Lanjut ke pertanyaan berikutnya.");
    currentQuestionIndex++;
    loadQuestion();
  };

  // Event listener
  startButton.addEventListener('click', startGame);
});
