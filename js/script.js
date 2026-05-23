const API_BASE = window.APP_CONFIG?.API_BASE || "http://localhost:5002/api";

document.querySelectorAll(".toggle-password").forEach(button => {
    button.addEventListener("click", () => {
        const input = document.getElementById(button.dataset.target);

        if (!input) return;

        const isHidden = input.type === "password";
        input.type = isHidden ? "text" : "password";
        button.innerText = isHidden ? "Hide" : "Show";
        button.setAttribute("aria-label", isHidden ? "Hide password" : "Show password");
    });
});

// Seat selection system used by older static pages.
document.querySelectorAll(".seat").forEach(seat => {
    seat.addEventListener("click", () => {
        seat.classList.toggle("selected");
    });
});

// Admin next token system.
let adminToken = localStorage.getItem("adminToken") || 25;

function nextToken() {
    adminToken++;
    localStorage.setItem("adminToken", adminToken);
    document.getElementById("token-number").innerText = "#" + adminToken;
}

// Movie search system.
function searchMovie() {
    let input = document.getElementById("search").value.toLowerCase();
    let movies = document.querySelectorAll(".movie-card");

    movies.forEach(movie => {
        let title = movie.querySelector("h3").innerText.toLowerCase();
        movie.style.display = title.includes(input) ? "block" : "none";
    });
}

// Side menu system.
function openMenu() {
    document.getElementById("sideMenu").classList.add("active");
}

function closeMenu() {
    document.getElementById("sideMenu").classList.remove("active");
}

// Login success + save user session.
const loginFormContainer = document.querySelector(".login-form");

if (loginFormContainer) {
    const loginBtn = loginFormContainer.querySelector(".btn");
    
    loginBtn.addEventListener("click", async function (e) {
        e.preventDefault(); // Prevent accidental form submission if it's ever wrapped in a form tag

        const emailInput = loginFormContainer.querySelector("input[type='email']");
        const passwordInput = loginFormContainer.querySelector("input[type='password']");

        const email = emailInput?.value.trim();
        const password = passwordInput?.value;

        if (!email || !password) {
            alert("Please enter both email and password!");
            return;
        }

        loginBtn.innerText = "Logging in...";
        loginBtn.disabled = true;

        try {
            console.log(`Attempting login at: ${API_BASE}/auth/login`);
            
            const res = await fetch(`${API_BASE}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();
            
            if (!res.ok) {
                throw new Error(data.message || "Invalid credentials. Please check your email/password.");
            }

            localStorage.setItem("authToken", data.token);
            localStorage.setItem("userId", data.user._id);
            localStorage.setItem("username", data.user.name);
            localStorage.setItem("isLoggedIn", "true");

            alert("Login Successful! Welcome back, " + data.user.name);
            window.location.reload();
        } catch (err) {
            console.error("Login Error:", err);
            
            let errorMessage = "Server error. Please ensure the backend is running.";
            if (err.message.includes("Failed to fetch")) {
                errorMessage = "Cannot reach the server. Are you on the same Wi-Fi as your PC? Is the IP " + API_BASE + " correct?";
            } else {
                errorMessage = err.message;
            }
            
            alert(errorMessage);
        } finally {
            loginBtn.innerText = "Login";
            loginBtn.disabled = false;
        }
    });
}
