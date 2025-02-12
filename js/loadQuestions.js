// Pastikan variable questions global
window.questions = [];

// Load questions dengan async/await
async function loadQuestions() {
  try {
    const response = await fetch('data/questions.json');
    const data = await response.json();
    window.questions = data.sort(() => Math.random() - 0.5); // Acak pertanyaan
  } catch (error) {
    console.error('Gagal memuat pertanyaan:', error);
  }
}

// Panggil fungsi load
loadQuestions();
