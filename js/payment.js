const API_BASE = window.APP_CONFIG?.API_BASE || "http://localhost:5000/api";
const movie = localStorage.getItem("movie");
const time = localStorage.getItem("time");
const seatCount = localStorage.getItem("seats") || 1;
const seatNumbers = JSON.parse(localStorage.getItem("seatNumbers") || "[]");
const total = localStorage.getItem("totalPrice");

document.getElementById("movie").innerText = movie || "";
document.getElementById("time").innerText = time || "";
document.getElementById("seats").innerText = seatCount;
document.getElementById("total").innerText = total || "0";

document.getElementById("payBtn").addEventListener("click", async function () {
    const method = document.getElementById("paymentMethod").value;
    const details = document.getElementById("paymentDetails").value.trim();
    const token = localStorage.getItem("authToken");

    if (!token) {
        alert("Please login before payment.");
        window.location.href = "index.html";
        return;
    }

    if (!movie || !time || seatNumbers.length === 0) {
        alert("Please select movie, time and seats again.");
        window.location.href = "movie.html";
        return;
    }

    if (!method) {
        alert("Please select payment method!");
        return;
    }

    if (!details) {
        alert("Please enter payment details!");
        return;
    }

    try {
        const res = await fetch(`${API_BASE}/bookings`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                movie,
                time,
                seats: seatNumbers,
                totalPrice: Number(total || 0),
                paymentMethod: method,
                paymentDetails: details
            })
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || "Payment failed");
        }

        localStorage.setItem("currentTicketId", data.ticket._id);
        localStorage.setItem("currentTicket", JSON.stringify(data.ticket));

        alert("Payment Successful");
        window.location.href = "token.html";
    } catch (err) {
        alert(err.message || "Server error");
    }
});
