// Selecting elements from the HTML
const startButton = document.getElementById("startButton");
const scoreDisplay = document.getElementById("score");
const timeDisplay = document.getElementById("timer");
const holes = document.querySelectorAll(".hole");

// Select audio elements for sounds
const bompSound = document.getElementById("bomp-sound");
const endSound = document.getElementById("end-sound");
const highSound = document.getElementById("high-sound");
const bgmSound = document.getElementById("bgm-sound");

let score = 0;
let time = 60;
let isPlaying = false;
let countdown;

// Function to generate a random time interval
function randomTime(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to display images in holes
function displayImage() {
    // Clear any active images
    holes.forEach(hole => hole.classList.remove("active"));

    // Select a random hole
    const randomHole = holes[Math.floor(Math.random() * holes.length)];
    
    // Display the image in the selected hole
    randomHole.classList.add("active");

    // Set a random time for the image to be displayed
    const time = randomTime(500, 1500);
    
    // After the set time, hide the image
    setTimeout(() => {
        randomHole.classList.remove("active");
        
        // Continue the game loop if still playing
        if (isPlaying) {
            displayImage();
        }
    }, time);
}

// Function to start the game
function startGame() {
    score = 0;
    time = 60;
    isPlaying = true;
    startButton.disabled = true;
    startButton.textContent = "Playing...";
    bgmSound.currentTime = 0;
    bgmSound.play();
    bgmSound.volume = 0.65;

    // Display the initial score and time
    scoreDisplay.textContent = `Score: ${score}`;
    timeDisplay.textContent = `Time left: ${time}`;

    // Start the countdown timer
    countdown = setInterval(() => {
        time--;
        timeDisplay.textContent = `Time left: ${time}`;
        

        // End the game when time is up
        if (time === 0) {
            clearInterval(countdown);
            isPlaying = false;
            startButton.disabled = false;
            startButton.textContent = "Start Game";
            timeDisplay.textContent = getMessage();
            score > 40 ? highSound.play() : endSound.play();
            bgmSound.pause();
        }
    }, 1000);

    // Start displaying images
    displayImage();
}

// Event listener for the start button
startButton.addEventListener("click", startGame);

// Event listener for clicking on images
holes.forEach(hole => {
    hole.addEventListener("click", () => {
        if (hole.classList.contains("active")) {
            hole.classList.remove("active");
            score++;
            scoreDisplay.textContent = `Score: ${score}`;
            
            // Play bomp sound
            bompSound.currentTime = 0;
            bompSound.play();
            
            // Add a red border to the clicked image
            const image = hole.querySelector("img");
            image.classList.add("clicked");
            
            // Remove the red border after a short delay
            setTimeout(() => {
                image.classList.remove("clicked");
            }, 300);
        }
    });
});

// Function to get a fun message based on the score
function getMessage() {
    if (score === 0) {
        return "You blinked, didn't you?";
    } else if (score < 20) {
        return "Nice effort! Keep practicing!";
    } else if (score < 40) {
        return "You're getting good at this!";
    } else {
        return "Wow, you're a Face Frenzy champion!";
    }
}
