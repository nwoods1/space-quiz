const quizData = [
    {
        question: "What is the closest planet to the sun?",
        options: ["Venus", "Mercury", "Pluto", "Mars"],
        correctAnswer: "Mercury"
    },
    {
        question: "What type of galaxy is the Milky Way?",
        options: ["Spiral Galaxy", "Elliptical Galaxy", "Irregular Galaxy", "Spinning Galaxy"],
        correctAnswer: "Spiral Galaxy"
    },
    {
        question: "Which element is the most abundant in the Milky Way?",
        options: ["Oxygen", "Helium", "Hydrogen", "Carbon"],
        correctAnswer: "Hydrogen"
    },
    {
        question: "Which of the following is not a layer in the Sun's atmosphere?",
        options: ["Photoshpere", "Mesosphere", "Chromosphere", "Corona"],
        correctAnswer: "Mesosphere"
    },
    
];

let currentQuestion = 0;
let userAnswers = [];

const questionSection = document.querySelector('.question-section');
const resultsSection = document.getElementById('resultsSection');

function displayQuestion() {
    const currentQ = quizData[currentQuestion];
    const questionNumber = currentQuestion + 1; 
    const totalQuestions = quizData.length; 

    const questionCounter = `Question ${questionNumber} of ${totalQuestions}`; 

    let optionsHtml = '';

    currentQ.options.forEach((option, index) => {
        optionsHtml += `
            <label>
                <input type="radio" name="answer" value="${option}" onclick="selectAnswer(${index})">
                ${option}
            </label>
            <br>
        `;
    });

    questionSection.innerHTML = `
        <h3>${questionCounter}</h3> <!-- Display question number out of total -->
        <h4>${currentQ.question}</h4>
        ${optionsHtml}
    `;
}


function nextQuestion() {
    if (userAnswers[currentQuestion] === undefined) {
        alert("Please select an answer before moving to the next question.");
        return;
    }

    currentQuestion++;
    if (currentQuestion === quizData.length) {
        displayResults();
    } else {
        displayQuestion();
    }
}


function prevQuestion() {
    currentQuestion = Math.max(0, currentQuestion - 1);
    displayQuestion();
}

function selectAnswer(index) {
    userAnswers[currentQuestion] = quizData[currentQuestion].options[index];
}



function displayAllQuestionsWithAnswers() {
    let allQuestionsHtml = '';

    quizData.forEach((q, index) => {
        const userAnswer = userAnswers[index];
        const isCorrect = userAnswer === q.correctAnswer;

 
        const optionsHtml = q.options.map((option, i) => {
            const isUserAnswer = userAnswer === option;
            const optionStyle = isUserAnswer && !isCorrect ? 'background-color: #e26471; width: 120px;' : ''; // Highlight wrong answer with red background
            const correctAnswerSpan = option === q.correctAnswer ? `<span style="background-color: #6cee70; padding: 2px;">${option}</span>` : option; // Highlight correct answer with green background
            return `<div style="${optionStyle}">${correctAnswerSpan}</div>`;
        }).join('');

        allQuestionsHtml += `
            <div class="question">
                <strong>Q${index + 1}:</strong> ${q.question}<br>
               <br>${optionsHtml}<br>
                Your Answer: ${userAnswer} (Correct Answer: ${q.correctAnswer})<br>
            </div>
            <br>
        `;
    });

    allQuestionsHtml += `<h2>Your Score: ${calculateScore()} out of ${quizData.length}</h2>`;

    questionSection.innerHTML = allQuestionsHtml;
    questionSection.style.display = 'block';
    resultsSection.style.display = 'none';
}



function submitQuiz() {
    if (userAnswers.includes(undefined)) {
        alert("Please answer all questions before submitting.");
        return;
    }

    displayAllQuestionsWithAnswers();
}




function calculateScore() {
    let score = 0;
    quizData.forEach((q, index) => {
        if (userAnswers[index] === q.correctAnswer) {
            score++;
        }
    });
    return score;
}


displayQuestion();
