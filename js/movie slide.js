const track = document.querySelector(".slider-track");
const cards = document.querySelectorAll(".movie-card");

let index = 0;
const visibleCards = 3;
const cardWidth = 400;

function slideNext() {
    if (window.innerWidth <= 768 || !track || cards.length === 0) {
        return;
    }

    index++;

    track.style.transform = `translateX(-${index * cardWidth}px)`;

    // reset at end
    if (index >= cards.length - visibleCards) {
        setTimeout(() => {
            track.style.transition = "none";
            index = 0;
            track.style.transform = `translateX(0px)`;

            setTimeout(() => {
                track.style.transition = "transform 0.5s ease-in-out";
            }, 50);
        }, 500);
    }
}

setInterval(slideNext, 3000);
