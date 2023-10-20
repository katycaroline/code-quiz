// Selecting elements and making them variables.
var quiz = document.getElementById("quiz");
var timer = document.getElementById("timer");
var questions = document.getElementById("quiz-questions");
var btnA = document.getElementById("a");
var btnB = document.getElementById("b");
var btnC = document.getElementById("c");
var btnD = document.getElementById("d");
var result = document.getElementById("result");
var endQuiz = document.getElementById("end-quiz");
var endScore = document.getElementById("end-score");
var initials = document.getElementById("initials");
var submitBtn = document.getElementById("submit");
var scorePage = document.getElementById("score-page");
var againBtn = document.getElementById("go-again");

// Declaring more global variables.
var timeLeft = 60;
var score = 0;
var isCorrect = true; 