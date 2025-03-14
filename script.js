// Hero Slider Functionality
const slides = document.querySelectorAll(".hero-slide");
const dots = document.querySelectorAll(".hero-dot");
const prevBtn = document.getElementById("prevHeroBtn");
const nextBtn = document.getElementById("nextHeroBtn");
let currentSlide = 0;

function showSlide(index) {
  slides.forEach((slide) => {
    slide.classList.remove("active");
  });

  dots.forEach((dot) => {
    dot.classList.remove("bg-white");
    dot.classList.add("bg-white/50");
  });

  slides[index].classList.add("active");
  dots[index].classList.remove("bg-white/50");
  dots[index].classList.add("bg-white");
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
}

// Hero Slider Event Listeners
nextBtn.addEventListener("click", nextSlide);
prevBtn.addEventListener("click", prevSlide);

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    currentSlide = index;
    showSlide(currentSlide);
  });
});

// Auto slide every 10 seconds
setInterval(nextSlide, 10000);

document.addEventListener("DOMContentLoaded", function () {
  const categoryButtons = document.querySelectorAll(".category-btn");
  const productsContainer = document.querySelector(".products-container");
  const categories = {
    vegetais: 0,
    padaria: 1,
    carnes: 2,
    comidas: 3,
  };

  categoryButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons
      categoryButtons.forEach((btn) => {
        btn.classList.remove(
          "text-green-600",
          "font-semibold",
          "border-b-2",
          "border-green-600"
        );
        btn.classList.add("hover:text-green-500", "hover-underline");
      });

      // Add active class to clicked button
      this.classList.add(
        "text-green-600",
        "font-semibold",
        "border-b-2",
        "border-green-600"
      );
      this.classList.remove("hover:text-green-500", "hover-underline");

      // Move the grid
      const category = this.dataset.category;
      const position = categories[category];
      productsContainer.style.transform = `translateX(-${position * 100}%)`;
    });
  });
});
