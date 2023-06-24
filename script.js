const slider = document.querySelector(".slider");
const slides = document.querySelectorAll(".slide");
const nextNav = document.querySelector(".next");
const prevNav = document.querySelector(".prev");
const dotsNav = document.querySelector(".dots");

let currentIndex = 0;
let intervalId;

slides.forEach((slide, index) => {
  // set the initial position of each slide
  slide.style.transform = `translateX(${index * 100}%)`;

  // create the dot nav buttons
  const btn = document.createElement("button");

  btn.classList.add("dot");

  if (index === currentIndex) {
    btn.classList.add("active");
  }

  // handle dot nav click event
  btn.addEventListener("click", () => {
    setCurrentSlide(index);
    stopSlider();
  });

  dotsNav.appendChild(btn);
});

// start the slider when the page is loaded
document.addEventListener("DOMContentLoaded", startSlider);

// stop the slider when pointer is over the slides
slider.addEventListener("mouseenter", stopSlider);

// start the slider when pointer leaves the slides
slider.addEventListener("mouseleave", startSlider);

// handle next nav click event
nextNav.addEventListener("click", () => {
  showNextSlide();
  stopSlider();
});

// handle previous nav click event
prevNav.addEventListener("click", () => {
  showPreviousSlide();
  stopSlider();
});

function startSlider() {
  intervalId = setInterval(showNextSlide, 2000); // 2secs
}

function stopSlider() {
  clearInterval(intervalId);
}

function showNextSlide() {
  currentIndex = (currentIndex + 1) % slides.length;

  updateSlides();
  updateDots();
}

function showPreviousSlide() {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;

  updateSlides();
  updateDots();
}

function setCurrentSlide(index) {
  currentIndex = index;

  updateSlides();
  updateDots();
}

function updateSlides() {
  slides.forEach((slide, index) => {
    const offset = (index - currentIndex) * 100;
    slide.style.transform = `translateX(${offset}%)`;

    slide.classList.remove("active");
  });

  slides[currentIndex].classList.add("active");
}

function updateDots() {
  const dots = document.querySelectorAll(".dot");
  [...dots].map((dot) => dot.classList.remove("active"));

  dots[currentIndex].classList.add("active");
}
