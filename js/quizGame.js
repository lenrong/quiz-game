document.addEventListener('DOMContentLoaded', () => {
  // Variabel game
  const startButton = document.getElementById('startButton');
  const nicknameInput = document.getElementById('nicknameInput');
  const gameContainer = document.getElementById('game');
  let currentQuestionIndex = 0;
  let score = 0;
  let timerInterval;

  // Fungsi start game
  const startGame = async () => {
    // Validasi nickname
    const nickname = document.getElementById('nickname').value.trim();
    if (!nickname) {
      alert("Masukkan nickname terlebih dahulu!");
      return;
    }

    // Pastikan pertanyaan sudah terload
    if (window.questions.length === 0) {
      alert("Sedang memuat pertanyaan...");
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    // Tampilkan game
    nicknameInput.style.display = 'none';
    gameContainer.style.display = 'block';
    
    loadQuestion();
  };

  // Fungsi load pertanyaan
  const loadQuestion = () => {
    const question = window.questions[currentQuestionIndex];
    const questionElement = document.getElementById('question');
    const optionsElement = document.getElementById('options');

    // Set pertanyaan
    questionElement.textContent = question.question;
    optionsElement.innerHTML = '';

    // Buat opsi jawaban
    question.options.forEach(option => {
      const button = document.createElement('div');
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
    const timerElement = document.getElementById('timer');
    
    timerInterval = setInterval(() => {
      timeLeft--;
      timerElement.textContent = `Waktu: ${timeLeft}`;
      
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        handleTimeout();
      }
    }, 1000);
  };

  // Event listener
  startButton.addEventListener('click', startGame);
});
