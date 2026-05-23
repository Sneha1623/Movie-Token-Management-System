const API_BASE = window.APP_CONFIG?.API_BASE || "http://localhost:5000/api";
const container = document.getElementById("seats");
const count = document.getElementById("count");
const total = document.getElementById("total");
const seatParams = new URLSearchParams(window.location.search);
const currentMovie = seatParams.get("movie") || localStorage.getItem("movie");
const currentTime = seatParams.get("time") || localStorage.getItem("time");

let maxSeats = 1;
let selectedCount = 1;

const sections = [
    { name: "RECLINER", price: 450, rows: ["J"], seats: 6 },
    { name: "PRIME", price: 210, rows: ["H", "G", "F", "E", "D", "C"], seats: 10 },
    { name: "CLASSIC", price: 190, rows: ["B", "A"], seats: 10 }
];

async function loadBookedSeats() {
    if (!currentMovie || !currentTime) {
        return [];
    }

    try {
        const url = `${API_BASE}/seats?movie=${encodeURIComponent(currentMovie)}&time=${encodeURIComponent(currentTime)}`;
        const res = await fetch(url);
        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || "Could not load booked seats");
        }

        return data.bookedSeats || [];
    } catch (err) {
        console.log(err);
        alert("Could not load booked seats from database. Showing all seats as available.");
        return [];
    }
}

function createSeats(bookedSeats) {
    const bookedSeatSet = new Set(bookedSeats);
    container.innerHTML = "";

    sections.forEach(section => {
        const title = document.createElement("h3");
        title.innerText = `Rs ${section.price} ${section.name}`;
        title.classList.add("section-title");
        container.appendChild(title);

        const grid = document.createElement("div");
        grid.classList.add("seat-grid");

        section.rows.forEach(row => {
            for (let i = 1; i <= section.seats; i++) {
                const seatNumber = row + i;
                const seat = document.createElement("div");
                seat.classList.add("seat", section.name.toLowerCase());
                seat.innerText = seatNumber;

                if (bookedSeatSet.has(seatNumber)) {
                    seat.classList.add("booked");
                }

                seat.addEventListener("click", () => {
                    if (seat.classList.contains("booked")) return;

                    const selected = document.querySelectorAll(".seat.selected");

                    if (seat.classList.contains("selected")) {
                        seat.classList.remove("selected");
                    } else {
                        if (selected.length >= maxSeats) {
                            alert("Only " + maxSeats + " seats allowed");
                            return;
                        }
                        seat.classList.add("selected");
                    }

                    updateTotal();
                });

                grid.appendChild(seat);
            }
        });

        container.appendChild(grid);
    });
}

function updateTotal() {
    const selectedSeats = document.querySelectorAll(".seat.selected");
    let totalPrice = 0;

    selectedSeats.forEach(seat => {
        if (seat.classList.contains("recliner")) totalPrice += 450;
        else if (seat.classList.contains("prime")) totalPrice += 210;
        else totalPrice += 190;
    });

    count.innerText = selectedSeats.length;
    total.innerText = totalPrice;
}

function bookSeats() {
    const selected = document.querySelectorAll(".seat.selected");

    if (localStorage.getItem("isLoggedIn") !== "true" || !localStorage.getItem("authToken")) {
        alert("Please login before booking seats.");
        window.location.href = "index.html";
        return;
    }

    if (selected.length === 0) {
        alert("Please select at least one seat");
        return;
    }

    const seats = Array.from(selected).map(s => s.innerText);

    localStorage.setItem("movie", currentMovie);
    localStorage.setItem("time", currentTime);
    localStorage.setItem("seats", seats.length);
    localStorage.setItem("seatNumbers", JSON.stringify(seats));
    localStorage.setItem("totalPrice", document.getElementById("total").innerText);

    window.location.href = "payment.html";
}

function selectSeatCount(num, event) {
    selectedCount = num;

    document.querySelectorAll(".seat-numbers span").forEach(el => {
        el.classList.remove("active");
    });

    event.target.classList.add("active");

    const icon = document.getElementById("vehicleIcon");

    icon.innerText = num;
}

function confirmSeats() {
    maxSeats = selectedCount;
    document.getElementById("seatModal").style.display = "none";
}

function goBack() {
    window.history.back();
}

window.onload = async () => {
    document.getElementById("seatModal").style.display = "flex";
    const bookedSeats = await loadBookedSeats();
    createSeats(bookedSeats);
};
