document.addEventListener("DOMContentLoaded", function () {
    const signupForm = document.getElementById("signupForm");
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

    if (signupForm) {
        signupForm.addEventListener("submit", async function (e) {
            e.preventDefault();

            const name = document.getElementById("name").value.trim();
            const mobile = document.getElementById("mobile").value.trim();
            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value;

            const passwordRegex =
                /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

            if (!passwordRegex.test(password)) {
                alert(
                    "Password must be at least 6 characters long and include:\n" +
                    "- One uppercase letter\n" +
                    "- One number\n" +
                    "- One special character"
                );
                return;
            }
            let loginBtn = signupForm.querySelector(".btn");
            try {
                if (loginBtn) {
                    loginBtn.value = "Creating Account...";
                    loginBtn.disabled = true;
                }

                console.log(`Attempting registration at: ${API_BASE}/auth/register`);

                const res = await fetch(`${API_BASE}/auth/register`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ name, mobile, email, password })
                });

                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.message || "Signup failed");
                }

                localStorage.setItem("authToken", data.token);
                localStorage.setItem("userId", data.user._id);
                localStorage.setItem("username", data.user.name);
                localStorage.setItem("isLoggedIn", "true");

                alert("Signup successful! Welcome, " + data.user.name);
                window.location.href = "index.html";
            } catch (err) {
                console.error("Signup Error:", err);
                let errorMessage = "Server error. Please check your connection.";
                if (err.message.includes("Failed to fetch")) {
                    errorMessage = "Cannot reach the server. Ensure the backend is running and your IP is correct in config.js.";
                } else {
                    errorMessage = err.message;
                }
                alert(errorMessage);
            } finally {
                if (loginBtn) {
                    loginBtn.value = "Sign-up now";
                    loginBtn.disabled = false;
                }
            }
        });
    }

    const phoneInput = document.querySelector("#mobile");

    if (phoneInput && window.intlTelInput) {
        window.intlTelInput(phoneInput, {
            initialCountry: "in",
            preferredCountries: ["in", "us", "gb"],
            separateDialCode: true,
            utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.19/js/utils.js"
        });
    }
});
