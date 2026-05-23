const openBtn = document.getElementById("login-open");

if (openBtn) {
    openBtn.addEventListener("click", () => {
        document.getElementById("login-box").style.display = "flex";
    });
}

document.getElementById("close-login").addEventListener("click", () => {
    document.getElementById("login-box").style.display = "none";
});

window.addEventListener("click", (e) => {
    const box = document.getElementById("login-box");
    if (e.target === box) box.style.display = "none";
});

document.addEventListener("DOMContentLoaded", function () {
    const loginBtn = document.getElementById("login-open");
    const logoutBtn = document.getElementById("logout-btn");

    if (localStorage.getItem("isLoggedIn") === "true") {
        if (loginBtn) loginBtn.style.display = "none";
        if (logoutBtn) logoutBtn.style.display = "inline-block";
    }

    if (logoutBtn) {
        logoutBtn.addEventListener("click", function () {
            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("authToken");
            localStorage.removeItem("userId");
            localStorage.removeItem("username");
            alert("Logged out successfully!");
            window.location.reload();
        });
    }
});
