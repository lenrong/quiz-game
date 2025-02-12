// Load questions from JSON
fetch('../data/questions.json')
    .then(response => response.json())
    .then(data => {
        questions = data;
        // Acak urutan pertanyaan
        questions = questions.sort(() => Math.random() - 0.5);
    })
    .catch(error => console.error('Error loading questions:', error));
