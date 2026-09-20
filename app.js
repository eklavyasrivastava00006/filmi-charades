const movies = [
    {
        title: "Sholay",
        year: 1975,
        maleLead: "Amitabh Bachchan",
        femaleLead: "Hema Malini"
    },
    {
        title: "Dilwale Dulhania Le Jayenge",
        year: 1995,
        maleLead: "Shah Rukh Khan",
        femaleLead: "Kajol"
    },
    {
        title: "3 Idiots",
        year: 2009,
        maleLead: "Aamir Khan",
        femaleLead: "Kareena Kapoor"
    },
    {
        title: "Kabhi Khushi Kabhie Gham",
        year: 2001,
        maleLead: "Shah Rukh Khan",
        femaleLead: "Kajol"
    },
    {
        title: "Lagaan",
        year: 2001,
        maleLead: "Aamir Khan",
        femaleLead: "Gracy Singh"
    }
];

let usedMovies = [];
let currentMovie = null;

let revealTime = 5;
let actingTime = 60;

let revealTimer = null;
let actingTimer = null;

let round = 0;
let score = 0;
let streak = 0;

let gameState = "idle";
// idle → reveal → acting → finished


// =====================================
// ROLL
// =====================================

function rollMovie() {

    // Don't allow another roll during a round
    if (gameState === "reveal" || gameState === "acting") {
        return;
    }

    clearInterval(revealTimer);
    clearInterval(actingTimer);

    gameState = "reveal";

    round++;

    updateStats();

    // Reset movie display

    document.getElementById("movieYear").style.display = "block";
    document.getElementById("actors").style.display = "block";
    document.getElementById("countdownRing").style.display = "flex";

    document.getElementById("hint").textContent =
        "YOUR MOVIE";

    document.getElementById("status").textContent =
        "MEMORIZE!";


    // Dice animation

    const dice = document.querySelector(".dice");

    dice.classList.remove("dice-roll");

    void dice.offsetWidth;

    dice.classList.add("dice-roll");


    // Reset movie pool

    if (usedMovies.length >= movies.length) {
        usedMovies = [];
    }


    // Find unused movies

    const availableMovies = movies.filter(
        movie => !usedMovies.includes(movie.title)
    );


    // Random movie

    currentMovie =
        availableMovies[
            Math.floor(Math.random() * availableMovies.length)
        ];

    usedMovies.push(currentMovie.title);


    // Display movie

    document.getElementById("movieTitle").textContent =
        currentMovie.title;

    document.getElementById("movieYear").textContent =
        currentMovie.year;

    document.getElementById("actors").innerHTML =
        `👨 ${currentMovie.maleLead}<br>
         👩 ${currentMovie.femaleLead}`;


    // Start countdown

    startRevealCountdown();
}


// =====================================
// REVEAL COUNTDOWN
// =====================================

function startRevealCountdown() {

    let remaining = revealTime;

    updateTimer(remaining);

    revealTimer = setInterval(function () {

        remaining--;

        updateTimer(remaining);

        if (remaining <= 0) {

            clearInterval(revealTimer);
            revealTimer = null;

            hideMovie();

            startActingTimer();
        }

    }, 1000);
}


// =====================================
// HIDE MOVIE
// =====================================

function hideMovie() {

    document.getElementById("movieYear").style.display =
        "none";

    document.getElementById("actors").style.display =
        "none";

    document.getElementById("hint").textContent =
        "YOUR TURN";

    document.getElementById("movieTitle").textContent =
        "🤫 ACT NOW!";

    document.getElementById("status").textContent =
        "DON'T SAY THE MOVIE!";

    const movieCard =
        document.getElementById("movieCard");

    movieCard.classList.remove("act-now");

    void movieCard.offsetWidth;

    movieCard.classList.add("act-now");
}


// =====================================
// ACTING TIMER
// =====================================

function startActingTimer() {

    gameState = "acting";

    let remaining = actingTime;

    updateTimer(remaining);

    actingTimer = setInterval(function () {

        remaining--;

        updateTimer(remaining);

        if (remaining <= 0) {

            clearInterval(actingTimer);
            actingTimer = null;

            finishRound("timeout");
        }

    }, 1000);
}


// =====================================
// CORRECT
// =====================================

function correctAnswer() {

    // Only works during acting phase
    if (gameState !== "acting") {
        return;
    }

    clearInterval(actingTimer);
    actingTimer = null;

    streak++;

    const points = 100 + (streak * 25);

    score += points;

    gameState = "finished";

    updateStats();

    document.getElementById("status").textContent =
        `🎉 CORRECT! +${points}`;

    document.getElementById("timer").textContent =
        "✓";


    // Show movie again

    document.getElementById("movieYear").style.display =
        "block";

    document.getElementById("actors").style.display =
        "block";

    document.getElementById("hint").textContent =
        "CORRECT ANSWER";

    document.getElementById("movieTitle").textContent =
        currentMovie.title;

    document.getElementById("movieYear").textContent =
        currentMovie.year;

    document.getElementById("actors").innerHTML =
        `👨 ${currentMovie.maleLead}<br>
         👩 ${currentMovie.femaleLead}`;
}


// =====================================
// SKIP
// =====================================

function skipMovie() {

    // Only works during an active round
    if (gameState !== "reveal" &&
        gameState !== "acting") {
        return;
    }

    clearInterval(revealTimer);
    clearInterval(actingTimer);

    revealTimer = null;
    actingTimer = null;

    streak = 0;

    gameState = "finished";

    updateStats();

    document.getElementById("hint").textContent =
        "SKIPPED";

    document.getElementById("movieTitle").textContent =
        "↻ SKIPPED";

    document.getElementById("movieYear").style.display =
        "none";

    document.getElementById("actors").style.display =
        "none";

    document.getElementById("status").textContent =
        "Ready for the next movie";

    document.getElementById("timer").textContent =
        "—";
}


// =====================================
// TIME'S UP
// =====================================

function finishRound(reason) {

    gameState = "finished";

    streak = 0;

    updateStats();

    if (reason === "timeout") {

        document.getElementById("status").textContent =
            "⏰ TIME'S UP!";

        document.getElementById("timer").textContent =
            "0";
    }
}


// =====================================
// STATS
// =====================================

function updateStats() {

    document.getElementById("round").textContent =
        round;

    document.getElementById("score").textContent =
        score;

    document.getElementById("streak").textContent =
        streak;
}


// =====================================
// TIMER
// =====================================

function updateTimer(value) {

    document.getElementById("timer").textContent =
        value;
}
