// Function to get a random number for gameOver value
function getRandomNumber(level) {
    return Math.floor(Math.random() * level) + 1;
}

const levels = {
    normal: [3, 1],
    medium: [2, 1],
    hard: [1, 2],
    impossible: [3, 1]
};
let gameMode = document.getElementById("gameModeSelect").value;
const container = document.getElementById('boxContainer');
let count = 0; // to count a row of boxes
let score = 0; // to keep track of the score
let startCounter = 0; // to track if the game has started
let currentLevel = 'normal'; 
let firsttrun = false; // to track the current game level

// Function to create game over boxes
function createGameOverBoxes(columns, bombNumber) {
    const gameOverPositions = new Set();

    // Generate unique random positions for game over boxes
    while (gameOverPositions.size < bombNumber) {
        gameOverPositions.add(Math.floor(Math.random() * columns));
    }

    return gameOverPositions;
}

// Function to create the initial container with boxes and buttons
function createContainer(columns, bombNumber) {
    const gameOverPositions = createGameOverBoxes(columns, bombNumber);

    for (let row = 1; row <= 1; row++) {
        // Create a row element
        const rowDiv = document.createElement('div');
        rowDiv.classList.add('row');
        
        // Loop to create columns (boxes) inside the row
        for (let col = 1; col <= columns; col++) {
            // Create a column element
            const colDiv = document.createElement('div');
            colDiv.classList.add('col-12', 'col-sm-6', 'col-md-3', 'box', 'button');

            // Add event listener to button (or use inline onclick)
            colDiv.onclick = function () {
                if (gameOverPositions.has(col - 1)) {
                    colDiv.classList.add('danger'); // Add a class to mark the danger box
                    colDiv.style.backgroundColor = "red"; // Change button color to red
                    setTimeout(gameOver, 300); // Delay before game over
                } else {
                    createContainer(columns, bombNumber);
                    rowDiv.style.pointerEvents = "none";
                    count++;
                    score++;
                    updateScore();
                    colDiv.style.backgroundColor = "green"; 
                    if (count >= 5) {
                        container.innerHTML = "";
                        incrementLevel();
                        alert("Level Up!");
                        count = 0;
                    }
                }
            };

            // Append button to the column
            // Append the column to the row
            rowDiv.appendChild(colDiv);
        }

        // Append the row to the container
        container.appendChild(rowDiv);
    }
}

// Function to update the score display
function updateScore() {
    const scoreElement = document.getElementById('score');
    scoreElement.textContent = 'Score: ' + score;
}

// Function to reset the game
function resetGame() {
    container.innerHTML = "";
    count = 0;
    score = 0;
    updateScore();
    startCounter = 0;
    currentLevel = 'normal';
}

// Function to handle game over
function gameOver() {
    alert('Game Over! Your score: ' + score);
    setscore(score);
    revealDangerBoxes();
    resetGame();
}

// Function to reveal only the danger (red) boxes
function revealDangerBoxes() {
    const dangerBoxes = document.querySelectorAll('.danger');
    dangerBoxes.forEach(box => {
        box.style.backgroundColor = 'yellow'; // Change to any color to indicate reveal
    });
}

// Function to start the game
function start() {
    if (startCounter === 0) {
        currentLevel = gameMode;
        const columns = levels[gameMode][0] + levels[gameMode][1];
        const bombNumber = levels[gameMode][1];
        resetGame();
        createContainer(columns, bombNumber);
        startCounter++;
    } else {
        alert("Game already started");
        container.innerHTML = "";
        startCounter = 0;
    }
}

// Function to increment the game level
function incrementLevel() {
    if (gameMode == "normal") {
        gameMode = "medium";
        createContainer(levels[gameMode][0] + levels[gameMode][1], levels[gameMode][1]);
    } else if (gameMode == "medium") {
        gameMode = "hard";
        createContainer(levels[gameMode][0] + levels[gameMode][1], levels[gameMode][1]);
    } else if (gameMode == "hard") {
        gameMode = "impossible";
        createContainer(levels[gameMode][0] + levels[gameMode][1], levels[gameMode][1]);
    } else {
        alert("Congratulations! You Won the Game! Your score: " + score);
    }
}

function getscore() {
    let score = localStorage.getItem("score");
    if (score == null) {
        score = 0;
    }
    document.getElementById("highscore").innerHTML = "HighScore: " + score;
}

function setscore(score) {
    localStorage.setItem("score", score);
}

getscore();