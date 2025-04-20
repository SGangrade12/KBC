const questions = [
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Venus"],
        correctAnswer: "Mars",
        worth: 1000
    },
    {
        question: "Who wrote the play 'Romeo and Juliet'?",
        options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
        correctAnswer: "William Shakespeare",
        worth: 2000
    },
    {
        question: "What is the chemical symbol for gold?",
        options: ["Go", "Gl", "Au", "Ag"],
        correctAnswer: "Au",
        worth: 5000
    },
    {
        question: "Which country is home to the Taj Mahal?",
        options: ["India", "Egypt", "China", "Italy"],
        correctAnswer: "India",
        worth: 10000
    },
    {
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        correctAnswer: "Pacific Ocean",
        worth: 25000
    },
    {
        question: "Who painted the Mona Lisa?",
        options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
        correctAnswer: "Leonardo da Vinci",
        worth: 50000
    },
    {
        question: "What is the hardest natural substance on Earth?",
        options: ["Gold", "Diamond", "Platinum", "Iron"],
        correctAnswer: "Diamond",
        worth: 100000
    },
    {
        question: "Which is the smallest prime number?",
        options: ["0", "1", "2", "3"],
        correctAnswer: "2",
        worth: 250000
    },
    {
        question: "Which element has the chemical symbol 'O'?",
        options: ["Osmium", "Oxygen", "Oganesson", "Otassium"],
        correctAnswer: "Oxygen",
        worth: 500000
    },
    {
        question: "Who was the first person to step on the moon?",
        options: ["Buzz Aldrin", "Yuri Gagarin", "Neil Armstrong", "John Glenn"],
        correctAnswer: "Neil Armstrong",
        worth: 1000000
    }
];

let currentQuestionIndex = 0;
let totalScore = 0;
let gameStarted = false;

const startGameButton = document.getElementById('StGm');
const quitButton = document.getElementById('Quit');
const questionBox = document.getElementById('QBox');
const currentScoreBox = document.getElementById('CScore');
const totalScoreBox = document.getElementById('TScore');
const optionButtons = [
    document.getElementById('optionA'),
    document.getElementById('optionB'),
    document.getElementById('optionC'),
    document.getElementById('optionD')
];

function initializeGame() {
    document.querySelector('.game-area').style.display = 'none';
    hideOptions();
    quitButton.style.display = 'none';
    totalScoreBox.textContent = "₹0";
    currentScoreBox.textContent = "₹0";
}

function showOptions() {
    optionButtons.forEach(button => {
        button.style.display = 'block';
    });
}

function hideOptions() {
    optionButtons.forEach(button => {
        button.style.display = 'none';
    });
}

function startGame() {
    gameStarted = true;
    currentQuestionIndex = 0;
    totalScore = 0;
    startGameButton.style.display = 'none';
    document.querySelector('.game-area').style.display = 'block';
    quitButton.style.display = 'block';
    showOptions();
    loadQuestion();
    totalScoreBox.textContent = "₹" + totalScore;
}

function loadQuestion() {
    if (currentQuestionIndex < questions.length) {
        const currentQuestion = questions[currentQuestionIndex];

        questionBox.textContent = currentQuestion.question;

        currentScoreBox.textContent = "₹" + currentQuestion.worth;

        for (let i = 0; i < 4; i++) {
            optionButtons[i].textContent = String.fromCharCode(65 + i) + ": " + currentQuestion.options[i];
            optionButtons[i].style.backgroundColor = '#7022ca';
        }
    } else {
        endGame(true);
    }
}

function selectOption(optionIndex) {
    if (!gameStarted) return;

    const currentQuestion = questions[currentQuestionIndex];
    const selectedOption = currentQuestion.options[optionIndex];

    optionButtons.forEach(button => {
        button.disabled = true;
    });
    optionButtons[optionIndex].style.backgroundColor = '#FFA500';
    setTimeout(() => {
        if (selectedOption === currentQuestion.correctAnswer) {
            optionButtons[optionIndex].style.backgroundColor = '#28a745';
            totalScore += currentQuestion.worth;
            totalScoreBox.textContent = "₹" + totalScore;

            setTimeout(() => {
                currentQuestionIndex++;

                optionButtons.forEach(button => {
                    button.disabled = false;
                });

                loadQuestion();
            }, 1500);
        } else {
            optionButtons[optionIndex].style.backgroundColor = '#dc3545';
            const correctIndex = currentQuestion.options.indexOf(currentQuestion.correctAnswer);
            optionButtons[correctIndex].style.backgroundColor = '#28a745';

            setTimeout(() => {
                endGame(false);
            }, 2000);
        }
    }, 1000);
}

function endGame(completed) {
    gameStarted = false;

    if (completed) {
        questionBox.textContent = "Congratulations! You've completed the game and won ₹" + totalScore + "!";
    } else {
        questionBox.textContent = "Game Over! You won ₹" + totalScore;
    }

    currentScoreBox.textContent = "₹0";
    hideOptions();
    startGameButton.style.display = 'block';
    startGameButton.textContent = "Play Again";
}

function quitGame() {
    if (gameStarted) {
        questionBox.textContent = "You quit the game. Your final score: ₹" + totalScore;
        currentScoreBox.textContent = "₹0";
        hideOptions();
        gameStarted = false;
        startGameButton.style.display = 'block';
        startGameButton.textContent = "Play Again";
    }
}

startGameButton.addEventListener('click', startGame);
quitButton.addEventListener('click', quitGame);

optionButtons.forEach((button, index) => {
    button.addEventListener('click', () => selectOption(index));
});

document.addEventListener('DOMContentLoaded', initializeGame);