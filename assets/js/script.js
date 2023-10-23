// Selecting elements and making them variables.
var startPage = document.getElementById("start-page");
var startBtn = document.getElementById("start-btn");
var scoreBtn = document.getElementById("high-score-btn");
var quiz = document.getElementById("quiz");
var timer = document.getElementById("timer");
var questionContainer = document.getElementById("question-container");
var btnA = document.getElementById("a");
var btnB = document.getElementById("b");
var btnC = document.getElementById("c");
var btnD = document.getElementById("d");
var result = document.getElementById("result");
var endQuiz = document.getElementById("end-quiz");
var endScore = document.getElementById("end-score");
var initials = document.getElementById("initials");
var submitBtn = document.getElementById("submit");
var scorePage = document.getElementById("score-container");
var againBtn = document.getElementById("go-again");
var savedUserInitials = document.getElementById("user-initials");
var savedUserScore = document.getElementById("user-score");
var clearScoresBtn = document.getElementById("clear-scores");

// Declaring global variables.
var timeLeft = 60;
var timerInterval;
var userScore = 0; 

// Declaring object for the quiz questions
var quizQuestions = [{
    question: "If you want to link a stylesheet in your HTML file, where should you put it?",
    a: "At the end of the head tag",
    b: "At the beginning of the body tag",
    c: "At the end of the body tag",
    d: "You can't link a stylesheet",
    correctAnswer: "a"},
    {
    question: "In CSS, which of these is the correct way to call the start-page class?",
    a: "start-page",
    b: "#start-page",
    c: ".start-page",
    d: "startPage",
    correctAnswer: "c"},
    {
    question: "How many primitive data types are there in Javascript?",
    a: "4",
    b: "5",
    c: "6",
    d: "7",
    correctAnswer: "b"},
    {
    question: "Which of these is not a data type in Javascript?",
    a: "Char",
    b: "String",
    c: "Number",
    d: "Boolean",
    correctAnswer: "a"},
    {
    question: "If you wanted to check if both the value and data type of two variables were the same, which of these should you use?",
    a: "=",
    b: "!=",
    c: "==",
    d: "===",
    correctAnswer: "d"}
];

// Declaring more global variables
var lastQuestionIndex = quizQuestions.length;
var currentQuestionIndex = 0;

// Generates questions and answer choices
function generateQA(){
    endQuiz.style.display = "none";
    if (currentQuestionIndex === lastQuestionIndex){
        return score();
    }
    var currentQuestion = quizQuestions[currentQuestionIndex];
    questionContainer.innerHTML = "<p>" + currentQuestion.question + "</p>";
    btnA.innerHTML = currentQuestion.a;
    btnB.innerHTML = currentQuestion.b;
    btnC.innerHTML = currentQuestion.c;
    btnD.innerHTML = currentQuestion.d;
};

// Starts the quiz and timer, changing the display to show the quiz questions until the quiz is over 
function quizStart(){
    endQuiz.style.display = "none";
    startPage.style.display = "none";
    quiz.style.display = "block";
    generateQA();
    timerInterval = setInterval(function(){
        timeLeft--;
        timer.textContent = timeLeft + " seconds left.";
        if (timeLeft <= 0){
            clearInterval(timerInterval);
            score();
        }
    }, 1000);
};

// Displays user's score and prompts the user to enter their initials.
function score(){
    startPage.style.display = "none";
    quiz.style.display = "none";

    // CSS Styling for this page. 
    endQuiz.style.display = "block";
    endQuiz.style.textAlign = "center";
    endQuiz.style.marginTop = "100px";
    endQuiz.style.fontWeight = "bolder";
    endQuiz.style.fontSize = "40px";
    initials.style.marginTop = "100px";

    clearInterval(timerInterval);
    initials.value = "";
    endScore.innerHTML = "Your score is " + userScore + " out of " + quizQuestions.length + "."; 
}

// Creates a loop where new scores and initials are added to a list.
function generateScores(){
   savedUserInitials.innerHTML = "";
   savedUserScore.innerHTML = "";
   var allScores = JSON.parse(localStorage.getItem("savedScores")) || [];
   for (i=0; i < allScores.length; i++){
    var newName = document.createElement("li");
    var newScore = document.createElement("li");
    newName.textContent = allScores[i].name;
    newScore.textContent = allScores[i].score;
    savedUserInitials.appendChild(newName);
    savedUserScore.appendChild(newScore);
   }
}

// Shows the score page and calls the generateScores function
function showScores(){
    startPage.style.display = "none";
    endQuiz.style.display = "none";
    scorePage.style.display = "block";
    scorePage.style.textAlign = "center";

    generateScores();
}

// Evaluates if the button selected is correct. If it is, the score and currentQuestionIndex are incremented. If not, then only the currentQuestionIndex is incremented. If the currentQuestionIndex is the same as the lastQuestionIndex, it will call the score function.
function isCorrect (input){
   var correct = quizQuestions[currentQuestionIndex].correctAnswer;
   if (input === correct && currentQuestionIndex !== lastQuestionIndex){
    userScore++;
    currentQuestionIndex++;
    generateQA();
   }else if(input !== correct && currentQuestionIndex !== lastQuestionIndex){
    timeLeft = timeLeft - 10;
    currentQuestionIndex++;
    generateQA();
   }else{
    score();
   }
}

// Clears all scores and text from local storage
function clearScores(){
    window.localStorage.clear();
    savedUserInitials.textContent = "";
    savedUserScore.textContent = "";
}

// Resets multiple variables and makes the starting page display
function redo(){
    endQuiz.style.display = "none";
    scorePage.style.display = "none";
    startPage.style.display = "flex";
    timeLeft = 60;
    currentQuestionIndex = 0;
    userScore = 0;
    
}

// Event listener buttons, on click it executes their specified functions.
startBtn.addEventListener("click", quizStart);
scoreBtn.addEventListener("click", showScores);
clearScoresBtn.addEventListener("click", clearScores);
againBtn.addEventListener("click", redo);

// Makes it so when the user clicks the submit button, it displays the prompt to input initials. Then, it saves the users score and initials and calls the function to generate the page of scores. 
submitBtn.addEventListener("click", function submitScore(){
    if(initials.value === ""){
        window.alert("Please input your initials.");
        return;
    }else{
        var currentUser = initials.value.trim();
        var savedScores = JSON.parse(localStorage.getItem("savedScores")) || [];
        var currentScore = {
            name: currentUser,
            score: userScore
        };

        // CSS styling
        startPage.style.display = "none";
        endQuiz.style.display = "none";
        scorePage.style.display = "block";
        scorePage.style.textAlign = "center";

        savedScores.push(currentScore);
        localStorage.setItem("savedScores", JSON.stringify(savedScores));
        generateScores();
    }
});