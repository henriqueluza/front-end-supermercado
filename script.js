document.addEventListener("DOMContentLoaded", function () {
  const productsContainer = document.getElementById("productsContainer");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const shopBtnContainer = document.getElementById("shopBtnContainer");

  // Array com todos os produtos
  const allProducts = [
    // Produtos iniciais (0-3)
    {
      img: "assets/Mango.webp",
      name: "Manga",
      price: "R$8.00",
    },
    {
      img: "assets/Berries.webp",
      name: "Frutas Silvestres",
      price: "R$7.00",
      oldPrice: "$8.50",
    },
    {
      img: "assets/Oranges.webp",
      name: "Laranja Bahia",
      price: "R$3.90",
      oldPrice: "$6.00",
    },
    {
      img: "assets/Brocoli.webp",
      name: "Brócolis Japonês",
      price: "R$3.00",
    },
    // Produtos adicionais (4-6)
    {
      img: "assets/Abacate.webp",
      name: "Abacate",
      price: "R$5.50",
    },
    {
      img: "assets/Maçã.webp",
      name: "Maçã Fuji",
      price: "R$4.20",
      oldPrice: "$5.00",
    },
    {
      img: "assets/Pera.webp",
      name: "Pêra Williams",
      price: "R$6.90",
    },
  ];

  let currentStartIndex = 0;
  const totalProducts = allProducts.length;

  function createProductCard(product) {
    return `
                <div class="bg-white p-4 shadow-md text-center product-card">
                    <img src="${
                      product.img
                    }" alt="${product.name}" class="mx-auto">
                    <p class="font-semibold">${product.name}</p>
                    <p class="text-green-500">${
                      product.price
                    } ${product.oldPrice ? `<span class="line-through text-gray-400">${product.oldPrice}</span>` : ""}</p>
                </div>
            `;
  }

  function updateProducts() {
    const currentProducts = allProducts.slice(
      currentStartIndex,
      currentStartIndex + 4
    );
    productsContainer.innerHTML = currentProducts
      .map((product) => createProductCard(product))
      .join("");
  }

  function updateNavigation() {
    prevBtn.classList.toggle("hidden", currentStartIndex === 0);
    nextBtn.classList.toggle("hidden", currentStartIndex >= totalProducts - 4);

    if (currentStartIndex === totalProducts - 4) {
      shopBtnContainer.classList.remove("hidden");
    } else {
      shopBtnContainer.classList.add("hidden");
    }
  }

  nextBtn.addEventListener("click", () => {
    if (currentStartIndex < totalProducts - 4) {
      currentStartIndex++;
      updateProducts();
      updateNavigation();
    }
  });

  prevBtn.addEventListener("click", () => {
    if (currentStartIndex > 0) {
      currentStartIndex--;
      updateProducts();
      updateNavigation();
    }
  });

  // Inicializar estado dos botões
  updateNavigation();
});

// Hero Slider Functionality
const slides = document.querySelectorAll(".hero-slide");
const dots = document.querySelectorAll(".hero-dot");
const prevBtn = document.getElementById("prevHeroBtn");
const nextBtn = document.getElementById("nextHeroBtn");
let currentSlide = 0;

function showSlide(index) {
  console.log("Showing slide:", index); // Debug log
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
  console.log("Next slide clicked"); // Debug log
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

function prevSlide() {
  console.log("Prev slide clicked"); // Debug log
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
}

// Event Listeners
document.addEventListener("DOMContentLoaded", function () {
  // Products Slider
  const productsContainer = document.getElementById("productsContainer");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const shopBtnContainer = document.getElementById("shopBtnContainer");

  // ... rest of the products slider code ...
});

// Hero Slider Event Listeners
nextBtn.addEventListener("click", nextSlide);
prevBtn.addEventListener("click", prevSlide);

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    currentSlide = index;
    showSlide(currentSlide);
  });
});

// Auto slide every 5 seconds
setInterval(nextSlide, 10000);
