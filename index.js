
const handleFirstTab = (e) => {
  if (e.key === 'Tab') {
    document.body.classList.add('user-is-tabbing')

    window.removeEventListener('keydown', handleFirstTab)
    window.addEventListener('mousedown', handleMouseDownOnce)
  }

}

const handleMouseDownOnce = () => {
  document.body.classList.remove('user-is-tabbing')

  window.removeEventListener('mousedown', handleMouseDownOnce)
  window.addEventListener('keydown', handleFirstTab)
}

window.addEventListener('keydown', handleFirstTab)

const backToTopButton = document.querySelector(".back-to-top");
let isBackToTopRendered = false;

let alterStyles = (isBackToTopRendered) => {
  backToTopButton.style.visibility = isBackToTopRendered ? "visible" : "hidden";
  backToTopButton.style.opacity = isBackToTopRendered ? 1 : 0;
  backToTopButton.style.transform = isBackToTopRendered
    ? "scale(1)"
    : "scale(0)";
};

window.addEventListener("scroll", () => {
  if (window.scrollY > 700) {
    isBackToTopRendered = true;
    alterStyles(isBackToTopRendered);
  } else {
    isBackToTopRendered = false;
    alterStyles(isBackToTopRendered);
  }
});

class ImageSlider {
  constructor(sliderElement) {
    this.slider = sliderElement;
    this.sliderContainer = this.slider.querySelector('.slider-container');
    this.slides = this.slider.querySelectorAll('.slide');
    this.prevBtn = this.slider.querySelector('.prev-btn');
    this.nextBtn = this.slider.querySelector('.next-btn');

    this.currentSlide = 0;
    this.totalSlides = this.slides.length;

    // Set dynamic widths
    this.sliderContainer.style.width = `${this.totalSlides * 100}%`;
    this.slides.forEach(slide => {
      slide.style.width = `${100 / this.totalSlides}%`;
    });

    this.createDots();
    this.init();
  }

  createDots() {
    this.dotsContainer = this.slider.querySelector('.slider-dots');
    if (!this.dotsContainer) return;

    // Clear existing dots
    this.dotsContainer.innerHTML = '';

    // Create new dots
    for (let i = 0; i < this.totalSlides; i++) {
      const dot = document.createElement('span');
      dot.classList.add('dot');
      if (i === 0) dot.classList.add('active');
      dot.setAttribute('data-slide', i);
      dot.addEventListener('click', () => this.goToSlide(i));
      this.dotsContainer.appendChild(dot);
    }

    this.dots = this.dotsContainer.querySelectorAll('.dot');
  }

  init() {
    this.showSlide(this.currentSlide);

    this.prevBtn.addEventListener('click', () => this.prevSlide());
    this.nextBtn.addEventListener('click', () => this.nextSlide());
  }

  showSlide(index) {
    // Update slides
    this.slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });

    // Update dots
    if (this.dots) {
      this.dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });
    }

    // Move slider container
    const translateValue = (index * 100) / this.totalSlides;
    this.sliderContainer.style.transform = `translateX(-${translateValue}%)`;
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
    this.showSlide(this.currentSlide);
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
    this.showSlide(this.currentSlide);
  }

  goToSlide(index) {
    this.currentSlide = index;
    this.showSlide(this.currentSlide);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const sliders = document.querySelectorAll('.slider');
  sliders.forEach(slider => {
    new ImageSlider(slider);
  });
});

function copyDiscord() {
  const discord = "CRUZJUAN"; // Replace with your actual Discord username
  navigator.clipboard.writeText(discord).then(() => {
  }).catch(err => {
    console.error('Failed to copy: ', err);
  });
}
