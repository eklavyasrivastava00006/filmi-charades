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

let revealTimer;
let actingTimer;


// ------------------------------------
// ROLL MOVIE
// ------------------------------------

function rollMovie() {

    clearInterval(revealTimer);
    clearInterval(actingTimer);

    // Reset screen

    document.getElementById("status").textContent = "";
    document.getElementById("timer").textContent = "";

    // Reset used list when all movies are used

    if (usedMovies.length === movies.length) {
        usedMovies = [];
    }

    // Find unused movies

    const availableMovies = movies.filter(
        movie => !usedMovies.includes(movie.title)
    );

    // Select random movie

    currentMovie =
        availableMovies[
            Math.floor(Math.random() * availableMovies.length)
        ];

    usedMovies.push(currentMovie.title);

    // Show movie

    document.getElementById("movieTitle").textContent =
        currentMovie.title;

    document.getElementById("movieYear").textContent =
        currentMovie.year;

    document.getElementById("actors").innerHTML =
        `👨 ${currentMovie.maleLead}<br>
         👩 ${currentMovie.femaleLead}`;

    document.getElementById("status").textContent =
        "🎬 MEMORIZE!";

    // Start reveal countdown

    startRevealCountdown();
}


// ------------------------------------
// 5 SECOND REVEAL
// ------------------------------------

function startRevealCountdown() {

    let remaining = revealTime;

    document.getElementById("timer").textContent =
        remaining;

    revealTimer = setInterval(() => {

        remaining--;

        document.getElementById("timer").textContent =
            remaining;

        if (remaining <= 0) {

            clearInterval(revealTimer);

            hideMovie();

            startActingTimer();
        }

    }, 1000);
}


// ------------------------------------
// HIDE MOVIE
// ------------------------------------

function hideMovie() {

    document.getElementById("movieTitle").textContent =
        "🤫 ACT NOW!";

    document.getElementById("movieYear").textContent =
        "";

    document.getElementById("actors").innerHTML =
        "";

    document.getElementById("status").textContent =
        "DON'T SAY THE MOVIE!";

}


// ------------------------------------
// ACTING TIMER
// ------------------------------------

function startActingTimer() {

    let remaining = actingTime;

    document.getElementById("timer").textContent =
        remaining;

    actingTimer = setInterval(() => {

        remaining--;

        document.getElementById("timer").textContent =
            remaining;

        if (remaining <= 0) {

            clearInterval(actingTimer);

            document.getElementById("status").textContent =
                "⏰ TIME'S UP!";

        }

    }, 1000);
}
