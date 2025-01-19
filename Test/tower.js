// Game State Variables
let balance = 10;
let currentFloor = 1;
let autoPlayMode = false;
let difficulty = "normal";

const towerElement = document.getElementById("tower");
const balanceElement = document.getElementById("balance");
const currentFloorElement = document.getElementById("currentFloor");
const difficultySelect = document.getElementById("difficulty");

// Difficulty Settings
const difficultyConfig = {
    normal: { gems: 3, bombs: 1, boxes: 4 },
    medium: { gems: 2, bombs: 1, boxes: 3 },
    hard: { gems: 1, bombs: 2, boxes: 3 },
    impossible: { gems: 1, bombs: 3, boxes: 4 },
};

// Initialize Game
function startGame() {
    resetGame();
    difficulty = difficultySelect.value;
    renderTower();
    highlightActiveFloor();
}

// Reset Game
function resetGame() {
    towerElement.innerHTML = "";
    currentFloor = 1;
    balance = 10;
    autoPlayMode = false;
    updateInfo();
}

// Render Tower
function renderTower() {
    for (let floor = 1; floor <= 8; floor++) {
        const floorElement = document.createElement("div");
        floorElement.classList.add("floor");

        const config = difficultyConfig[difficulty];
        const boxes = generateBoxes(config.gems, config.bombs, config.boxes);

        boxes.forEach((boxType, index) => {
            const box = document.createElement("div");
            box.classList.add("box");
            box.dataset.floor = floor;
            box.dataset.index = index;
            box.dataset.type = boxType;
            box.textContent = "?"; // Hide content initially

            box.addEventListener("click", () => handleBoxClick(box));

            floorElement.appendChild(box);
        });

        towerElement.appendChild(floorElement);
    }
}

// Highlight Active Floor
function highlightActiveFloor() {
    document.querySelectorAll(".floor").forEach((floor, index) => {
        if (8 - index === currentFloor) {
            floor.classList.add("active");
        } else {
            floor.classList.remove("active");
        }
    });
}

// Generate Boxes
function generateBoxes(gems, bombs, total) {
    const boxes = Array(gems).fill("gem").concat(Array(bombs).fill("bomb"));
    while (boxes.length < total) {
        boxes.push("empty");
    }
    return shuffleArray(boxes);
}

// Shuffle Array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Handle Box Click
// function handleBoxClick(box) {
//     if (box.dataset.type === "bomb") {
//         revealAllBoxes();
//         gameOver();
//     } else if (box.dataset.type === "gem") {
//         box.textContent = "💎"; // Reveal the gem
//         box.classList.add("gem");
//         currentFloor++;
//         if (currentFloor > 8) {
//             winGame();
//         } else {
//             highlightActiveFloor();
//         }
//     }
//     updateInfo();
// }



function handleBoxClick(box) {
    // Check if the clicked box is on the active floor
    const activeFloor = document.querySelector(".floor.active");
    if (!activeFloor.contains(box)) {
        alert("You can only click boxes on the active floor!");
        return;
    }

    if (box.dataset.type === "bomb") {
        revealAllBoxes();
        gameOver();
    } else if (box.dataset.type === "gem") {
        
        box.textContent = "💎"; // Reveal the gem
        box.classList.add("gem");
        revealActiveRowBoxes();
        currentFloor++;
       
        if (currentFloor > 8) {
            winGame();
        } else {
            highlightActiveFloor();
        }
    }
    updateInfo();
}


// Game Over
function gameOver() {
    alert("Game Over! You hit a bomb.");
    revealAllBoxes();
    stopAutoPlay();
    // setTimeout(resetGame(),1000);
}

// Win Game
function winGame() {
    alert("Congratulations! You've reached the top of the tower!");
    resetGame();
}

// Reveal All Boxe

// Update Info
function updateInfo() {
    balanceElement.textContent = balance;
    currentFloorElement.textContent = currentFloor;
}

// Auto Play
function autoPlay() {
    autoPlayMode = true;
    let rounds = 5; // Set number of rounds or infinite
    const interval = setInterval(() => {
        if (!autoPlayMode || rounds <= 0) {
            clearInterval(interval);
            return;
        }
        const activeFloor = document.querySelector(".floor.active");
        const randomBox = activeFloor.children[Math.floor(Math.random() * activeFloor.children.length)];
        randomBox.click();
        rounds--;
    }, 1000);
}


function revealAllBoxes() {
    document.querySelectorAll(".box").forEach((box) => {
        if (!box.classList.contains("gem") && !box.classList.contains("bomb")) {
            // Reveal hidden boxes
            box.textContent = box.dataset.type === "gem" ? "💎" : box.dataset.type === "bomb" ? "💣" : "?";
            box.classList.add(box.dataset.type);
        }
    });
}


// Function to reveal one row of boxes after a turn
function revealActiveRowBoxes() {
    const activeFloor = document.querySelector(".floor.active");
    if (!activeFloor) return;

    activeFloor.querySelectorAll(".box").forEach((box) => {
        if (!box.classList.contains("gem") && !box.classList.contains("bomb")) {
            // Reveal hidden boxes
            box.textContent = box.dataset.type === "gem" ? "💎" : box.dataset.type === "bomb" ? "💣" : "?";
            box.classList.add(box.dataset.type);
        }
    });
}


function autoPlay() {
    if (autoPlayMode) {
        alert("Auto-play is already active!");
        return;
    }

    autoPlayMode = true;

    // let rounds = parseInt(prompt("Enter the number of rounds for auto-play (Enter 0 for infinite):"), 10);
    let rounds = 0; // Set number of rounds or infinite
    if (isNaN(rounds)) {
        alert("Invalid input! Auto-play canceled.");
        autoPlayMode = false;
        return;
    }

    const interval = setInterval(() => {
        // Stop auto-play if rounds are exhausted or balance is zero
        if (!autoPlayMode || (rounds === 0 && balance <= 0) || (rounds > 0 && rounds <= 0)) {
            clearInterval(interval);
            autoPlayMode = false;
            return;
        }

        const activeFloor = document.querySelector(".floor.active");
        if (!activeFloor) {
            clearInterval(interval);
            autoPlayMode = false;
            return;
        }

        // Automatically click a random box on the active floor
        const randomBox = activeFloor.children[Math.floor(Math.random() * activeFloor.children.length)];
         setInterval(randomBox.click(),1000);

        // Reduce rounds if it's not infinite
        if (rounds > 0) {
            rounds--;
        }
    }, 1000); // 1-second delay between moves
}


function stopAutoPlay() {
    autoPlayMode = false;
    alert("Auto-play stopped.");
}



