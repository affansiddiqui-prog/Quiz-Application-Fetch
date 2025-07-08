let i = 0;
let data = [];
let userScore = 0
let quiz = document.getElementById('quiz');
let score = document.getElementById('score');

fetch('https://the-trivia-api.com/v2/questions')
  .then(data => data.json())
  .then(res => {
    data = res;
    show();
  });

function show() {
  if (i >= data.length) {
    quiz.innerHTML = `<h2>Quiz Finished</h2>`;
    score.innerHTML = `Your score is ${userScore} / ${data.length}`
    
    return;
  }

  let q = data[i++];
  let opts = [...q.incorrectAnswers, q.correctAnswer];

  quiz.innerHTML = `<h2>Q${i}: ${q.question.text}</h2>` + opts.map(opt => `<input type ="radio" name="" id="" onclick="show()"><label for="">${opt}</label>`).join('');
}
