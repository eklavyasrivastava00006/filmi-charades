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

let gameRunning = false;


// ================================
// ROLL MOVIE
// ================================

function rollMovie() {

    if (gameRunning) {
        return;
    }

    clearInterval(revealTimer);
    clearInterval(actingTimer);

    gameRunning = true;

    round++;

    updateStats();

    // Reset screen

    document.getElementById("status").textContent =
        "MEMORIZE!";

    document.getElementById("hint").textContent =
        "YOUR MOVIE";

    document.getElementById("movieYear").style.display =
        "block";

    document.getElementById("actors").style.display =
        "block";

    document.getElementById("countdownRing").style.display =
        "flex";


    // Dice animation

    const dice = document.querySelector(".dice");

    dice.classList.remove("dice-roll");

    void dice.offsetWidth;

    dice.classList.add("dice-roll");


    // Reset used list

    if (usedMovies.length === movies.length) {
        usedMovies = [];
    }


    // Find available movies

    const availableMovies = movies.filter(
        movie => !usedMovies.includes(movie.title)
    );


    // Select random movie

    currentMovie =
        availableMovies[
            Math.floor(
                Math.random() * availableMovies.length
            )
        ];

    usedMovies.push(currentMovie.title);


    // Display movie

    const movieCard =
        document.getElementById("movieCard");

    movieCard.classList.remove("movie-reveal");

    void movieCard.offsetWidth;

    movieCard.classList.add("movie-reveal");


    document.getElementById("movieTitle").textContent =
        currentMovie.title;

    document.getElementById("movieYear").textContent =
        currentMovie.year;

    document.getElementById("actors").innerHTML =
        `👨 ${currentMovie.maleLead}<br>
         👩 ${currentMovie.femaleLead}`;


    // Start reveal

    startRevealCountdown();
}


// ================================
// REVEAL COUNTDOWN
// ================================

function startRevealCountdown() {

    let remaining = revealTime;

    updateTimer(remaining);

    revealTimer = setInterval(() => {

        remaining--;

        updateTimer(remaining);

        if (remaining <= 0) {

            clearInterval(revealTimer);

            hideMovie();

            startActingTimer();
        }

    }, 1000);
}


// ================================
// HIDE MOVIE
// ================================

function hideMovie() {

    document.getElementById("movieYear").style.display =
        "none";

    document.getElementById("actors").style.display =
        "none";

    document.getElementById("hint").textContent =
        "YOUR TURN";


    const title =
        document.getElementById("movieTitle");

    title.textContent =
        "🤫 ACT NOW!";


    const movieCard =
        document.getElementById("movieCard");

    movieCard.classList.remove("act-now");

    void movieCard.offsetWidth;

    movieCard.classList.add("act-now");


    document.getElementById("status").textContent =
        "DON'T SAY THE MOVIE!";

}


// ================================
// ACTING TIMER
// ================================

function startActingTimer() {

    let remaining = actingTime;

    updateTimer(remaining);

    actingTimer = setInterval(() => {

        remaining--;

        updateTimer(remaining);

        if (remaining <= 0) {

            clearInterval(actingTimer);

            gameRunning = false;

            streak = 0;

            updateStats();

            document.getElementById("status").textContent =
                "⏰ TIME'S UP!";

        }

    }, 1000);
}


// ================================
// CORRECT ANSWER
// ================================

function correctAnswer() {

    if (!gameRunning || !currentMovie) {
        return;
    }

    clearInterval(revealTimer);
    clearInterval(actingTimer);

    gameRunning = false;

    streak++;

    // Base score

    let points = 100;

    // Streak bonus

    points += streak * 25;

    score += points;

    updateStats();

    document.getElementById("status").textContent =
        `🎉 CORRECT! +${points}`;

    document.getElementById("timer").textContent =
        "✓";

    document.getElementById("movieYear").style.display =
        "block";

    document.getElementById("actors").style.display =
        "block";

    document.getElementById("movieTitle").textContent =
        currentMovie.title;

    document.getElementById("movieYear").textContent =
        currentMovie.year;

    document.getElementById("actors").innerHTML =
        `👨 ${currentMovie.maleLead}<br>
         👩 ${currentMovie.femaleLead}`;
}


// ================================
// SKIP
// ================================

function skipMovie() {

    if (!gameRunning || !currentMovie) {
        return;
    }

    clearInterval(revealTimer);
    clearInterval(actingTimer);

    gameRunning = false;

    streak = 0;

    updateStats();

    document.getElementById("status").textContent =
        "↻ MOVIE SKIPPED";

    document.getElementById("timer").textContent =
        "—";

}


// ================================
// UPDATE STATS
// ================================

function updateStats() {

    document.getElementById("round").textContent =
        round;

    document.getElementById("score").textContent =
        score;

    document.getElementById("streak").textContent =
        streak;
}


// ================================
// TIMER DISPLAY
// ================================

function updateTimer(value) {

    document.getElementById("timer").textContent =
        value;
}
