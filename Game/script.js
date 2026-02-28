//Dom Elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currectQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-question");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const resultButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

const quizQuestions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "London", correct: false },
      { text: "Berlin", correct: false },
      { text: "Paris", correct: true },
      { text: "Madrid", correct: false },
    ],
  },
  {
    question: "What is the largest ocean on Earth?",
    answers: [
      { text: "Atlantic", correct: true },
      { text: "Indian", correct: false },
      { text: "Arctic", correct: false },
      { text: "Pacific", correct: false },
    ],
  },
  {
    question: "What is the chemical symbol for gold",
    answers: [
      { text: "Go", correct: false },
      { text: "Gd", correct: false },
      { text: "Au", correct: true },
      { text: "Ag", correct: false },
    ],
  },
  {
    question: "Which is not a programic language?",
    answers: [
      { text: "Java", correct: false },
      { text: "Python", correct: false },
      { text: "Banana", correct: true },
      { text: "C#", correct: false },
    ],
  },
];

//Quiz STATE VARS
let currectQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

// event listeners

startButton.addEventListener("click", startQuiz);
resultButton.addEventListener("click", restartQuiz);

function startQuiz() {
  //console.log(Array.from(answersContainer.children.forEach((el)=> console.log(el))));
  //reset vars
  currectQuestionIndex = 0;
  score = 0;
  scoreSpan.textContent = 0;

  startScreen.classList.remove("active");
  quizScreen.classList.add("active");

  showQuestion();
}

function showQuestion() {
  //reset state
  answersDisabled = false;

  const currectQuestion = quizQuestions[currectQuestionIndex];

  currectQuestionSpan.textContent = currectQuestionIndex + 1;

  const progressPercent = (currectQuestionIndex / quizQuestions.length) * 100;
  progressBar.style.width = progressPercent + "%";

  questionText.textContent = currectQuestion.question;

  // todo: explain this in a second
  answersContainer.innerHTML = "";

  currectQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("answer-btn");

    // what is dataset?
    button.dataset.correct = answer.correct;

    button.addEventListener("click", selectAnswer);

    answersContainer.appendChild(button);
  });
}

function selectAnswer(event) {
  //optimization cleck
  if (answersDisabled) return;

  answersDisabled = true;

  const selectedButton = event.target;
  const isCorrect = selectedButton.dataset.correct == "true";

  // todo: explain this in a sec
  Array.from(answersContainer.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    } else if (button === selectedButton) {
      button.classList.add("incorrect");
    }
  });

  if (isCorrect) {
    score++;
    scoreSpan.textContent = score;
  }

  setTimeout(() => {
    currectQuestionIndex++;

    //check if there are more question of if the quiz is over
    if (currectQuestionIndex < quizQuestions.length) {
      showQuestion();
    } else {
      showResults();
    }
  }, 1000);
}

function showResults() {
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  finalScoreSpan.textContent = score;

  const percentage = (score / quizQuestions.length) * 100;

  if (percentage === 100) {
    resultMessage.textContent = "Perfect! You're a genious!";
  } else if (percentage >= 80) {
    resultMessage.textContent = "Great job!";
  } else if (percentage >= 60) {
    resultMessage.textContent = "Good Effort!";
  } else if (percentage >= 40) {
    resultMessage.textContent = "Not bad!";
  } else {
    resultMessage.textContent = "Keep studying!";
  }
}

function restartQuiz() {
  resultScreen.classList.remove("active");

  startQuiz();
}
