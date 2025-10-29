
const handleFirstTab = (e) => {
  if(e.key === 'Tab') {
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
    this.dots = this.slider.querySelectorAll('.dot');
    
    this.currentSlide = 0;
    this.totalSlides = this.slides.length;
    
    this.init();
  }
  
  init() {
    this.showSlide(this.currentSlide);
    
    this.prevBtn.addEventListener('click', () => this.prevSlide());
    this.nextBtn.addEventListener('click', () => this.nextSlide());
    
    this.dots.forEach((dot, index) => {
      dot.addEventListener('click', () => this.goToSlide(index));
    });
  }
  
  showSlide(index) {
    // Update slides
    this.slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
    
    // Update dots
    this.dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
    
    // Move slider container
    this.sliderContainer.style.transform = `translateX(-${index * 20}%)`;
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
  const slider = document.querySelector('.slider');
  if (slider) {
    new ImageSlider(slider);
  }
});

function copyDiscord() {
  const discord = "CRUZJUAN"; // Replace with your actual Discord username
  navigator.clipboard.writeText(discord).then(() => {
  }).catch(err => {
    console.error('Failed to copy: ', err);
  });
}
