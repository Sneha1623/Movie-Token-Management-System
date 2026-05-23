document.getElementById("login-open").addEventListener("click", () => {
    document.getElementById("login-box").style.display = "flex";
});

document.getElementById("close-login").addEventListener("click", () => {
    document.getElementById("login-box").style.display = "none";
});

window.addEventListener("click", (e) => {
    const box = document.getElementById("login-box");
    if (e.target === box) box.style.display = "none";
});

function clearLoggedInUser() {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("authToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
}

document.addEventListener("DOMContentLoaded", function () {
    const loginBtn = document.getElementById("login-open");
    const logoutBtn = document.getElementById("logout-btn");

    if (localStorage.getItem("isLoggedIn") === "true") {
        if (loginBtn) loginBtn.style.display = "none";
        if (logoutBtn) logoutBtn.style.display = "inline-block";
    }

    if (logoutBtn) {
        logoutBtn.addEventListener("click", function () {
            clearLoggedInUser();
            alert("Logged out successfully!");
            window.location.reload();
        });
    }
});

let index = 0;

function slideMovies() {
    const track = document.querySelector(".slider-track");
    const cards = document.querySelectorAll(".movie-card");

    if (!track || cards.length === 0) return;

    const cardWidth = cards[0].offsetWidth + 20;
    index++;

    if (index > cards.length - 3) {
        index = 0;
    }

    track.style.transform = `translateX(-${index * cardWidth}px)`;
}

setInterval(slideMovies, 5000);
