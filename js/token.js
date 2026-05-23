const API_BASE = window.APP_CONFIG?.API_BASE || "http://localhost:5000/api";

function getTicketPayload(ticket) {
    const name = localStorage.getItem("username") || "Guest";

    return {
        name,
        movie: ticket.movie || "",
        time: ticket.time || "",
        seats: ticket.seats || [],
        token: ticket.token || ""
    };
}

function createQr(ticket) {
    const qrContainer = document.getElementById("qrCode");
    const payload = getTicketPayload(ticket);
    const qrText = JSON.stringify(payload);

    qrContainer.innerHTML = "";

    if (window.QRCode) {
        new QRCode(qrContainer, {
            text: qrText,
            width: 150,
            height: 150
        });
        return;
    }

    const image = document.createElement("img");
    image.alt = "Ticket QR Code";
    image.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(qrText)}`;
    qrContainer.appendChild(image);
}

function showTicket(ticket) {
    const payload = getTicketPayload(ticket);

    document.getElementById("name").innerText = payload.name;
    document.getElementById("movie").innerText = payload.movie;
    document.getElementById("time").innerText = payload.time;
    document.getElementById("seats").innerText = payload.seats.join(", ");
    document.getElementById("token").innerText = payload.token;
    createQr(ticket);
}

async function loadTicket() {
    const savedTicket = localStorage.getItem("currentTicket");
    const ticketId = localStorage.getItem("currentTicketId");
    const authToken = localStorage.getItem("authToken");

    if (savedTicket) {
        const ticket = JSON.parse(savedTicket);
        showTicket(ticket);
        return ticket;
    }

    if (ticketId && authToken) {
        const res = await fetch(`${API_BASE}/tickets/${ticketId}`, {
            headers: {
                "Authorization": `Bearer ${authToken}`
            }
        });
        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || "Ticket not found");
        }

        showTicket(data.ticket);
        return data.ticket;
    }

    throw new Error("No ticket found. Please complete a booking first.");
}

function getQrDataUrl() {
    const qrContainer = document.getElementById("qrCode");
    const canvas = qrContainer.querySelector("canvas");
    const image = qrContainer.querySelector("img");

    if (canvas) {
        return canvas.toDataURL("image/png");
    }

    if (image && image.src.startsWith("data:")) {
        return image.src;
    }

    return null;
}

function downloadTextTicket(ticket) {
    const payload = getTicketPayload(ticket);
    const content = `
MOVIE TICKET

Name: ${payload.name}
Movie: ${payload.movie}
Time: ${payload.time}
Seats: ${payload.seats.join(", ")}
Token: ${payload.token}
`;

    const blob = new Blob([content], { type: "text/plain" });
    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);
    link.download = "Movie_Ticket.txt";
    link.click();
}

function downloadPdfTicket(ticket) {
    const jsPDF = window.jspdf && window.jspdf.jsPDF;

    if (!jsPDF) {
        alert("PDF library is not loaded. Use the browser print dialog and choose Save as PDF.");
        window.print();
        return;
    }

    const payload = getTicketPayload(ticket);
    const doc = new jsPDF();
    const qrDataUrl = getQrDataUrl();

    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("Movie Ticket", 20, 25);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text(`Name: ${payload.name}`, 20, 45);
    doc.text(`Movie: ${payload.movie}`, 20, 55);
    doc.text(`Time: ${payload.time}`, 20, 65);
    doc.text(`Seats: ${payload.seats.join(", ")}`, 20, 75);
    doc.text(`Token: ${payload.token}`, 20, 85);

    if (qrDataUrl) {
        doc.addImage(qrDataUrl, "PNG", 20, 100, 55, 55);
        doc.text("Scan for ticket details", 20, 165);
    }

    doc.save("Movie_Ticket.pdf");
}

let activeTicket = null;

loadTicket()
    .then(ticket => {
        activeTicket = ticket;
    })
    .catch(err => {
        alert(err.message);
        window.location.href = "index.html";
    });

document.getElementById("downloadBtn").addEventListener("click", function () {
    if (!activeTicket) {
        alert("Ticket is still loading.");
        return;
    }

    downloadTextTicket(activeTicket);
});

document.getElementById("downloadPdfBtn").addEventListener("click", function () {
    if (!activeTicket) {
        alert("Ticket is still loading.");
        return;
    }

    downloadPdfTicket(activeTicket);
});
