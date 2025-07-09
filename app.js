let i = 0;
let data = [];
let userScore = 0;
let quiz = document.getElementById('quiz');
let score = document.getElementById('score');
let nextBtn = document.getElementById('nextBtn');
let correctAnswer = '';

fetch('https://the-trivia-api.com/v2/questions')
  .then(data => data.json())
  .then(res => {
    data = res;
    show();
  });

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function show() {
  nextBtn.disabled = true;

  if (i >= data.length) {
    quiz.innerHTML = `<h2>Quiz Finished</h2>`;
    score.innerHTML = `<center>Your score is ${userScore} / ${data.length}</center>`;
    nextBtn.style.display = "none";
    return;
  }

  let q = data[i];
  correctAnswer = q.correctAnswer;
  let opts = shuffle([...q.incorrectAnswers, q.correctAnswer]);

  quiz.innerHTML = `
    <h2>Q${i + 1}: ${q.question.text}</h2>
    <div class="options">
      ${opts.map(opt => `
        <label>
          <input type="radio" name="option" value="${opt}" onclick="enableNext('${opt}')">
          ${opt}
        </label>`).join('')}
    </div>
  `;
}

function enableNext(selected) {
  nextBtn.disabled = false;
  nextBtn.dataset.selected = selected;
}

function nextQuestion() {
  let selected = nextBtn.dataset.selected;

  if (selected === correctAnswer) {
    userScore++;
  }

  i++;
  show();
}
