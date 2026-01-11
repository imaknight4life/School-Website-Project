const slides = document.querySelectorAll('.slide');
let currentIndex = 1; // starting with second image as main

function updateSlides() {
  slides.forEach((slide) => {
    slide.classList.remove('prev-slide', 'main-slide', 'next-slide');
  });

  const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
  const nextIndex = (currentIndex + 1) % slides.length;

  slides[prevIndex].classList.add('prev-slide');
  slides[currentIndex].classList.add('main-slide');
  slides[nextIndex].classList.add('next-slide');
}

// Manual controls


// Initial setup
updateSlides();

// Timer for auto slideshow
setInterval(() => {
  currentIndex = (currentIndex + 1) % slides.length;
  updateSlides();
}, 3000); // changes every 3 seconds
