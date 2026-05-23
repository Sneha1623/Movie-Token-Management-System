let slides = document.querySelectorAll(".movie-slide");
let current = 0;

function changeSlide() {
    slides[current].classList.remove("active");

    current++;
    if (current >= slides.length) {
        current = 0;
    }

    slides[current].classList.add("active");
}

setInterval(changeSlide, 5000);