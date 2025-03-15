document.addEventListener("DOMContentLoaded", function () {
  const categoryButtons = document.querySelectorAll(".category-btn");
  const productsContainer = document.querySelector(".products-container");
  const minPriceInput = document.getElementById("minPrice");
  const maxPriceInput = document.getElementById("maxPrice");
  const discountFilters = document.querySelectorAll(".discount-filter");
  const applyFiltersButton = document.getElementById("applyFilters");
  const productCards = document.querySelectorAll(".product-card");
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

  // Função para aplicar os filtros
  function applyFilters() {
    const minPrice = parseFloat(minPriceInput.value) || 0;
    const maxPrice = parseFloat(maxPriceInput.value) || Infinity;
    const selectedDiscounts = Array.from(discountFilters)
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => parseInt(checkbox.value));

    productCards.forEach((card) => {
      const priceElement = card.querySelector(".text-green-500");
      const price = parseFloat(
        priceElement.textContent.replace("R$ ", "").split("/")[0]
      );
      const discount = parseInt(card.dataset.discount) || 0;

      const meetsPrice = price >= minPrice && price <= maxPrice;
      const meetsDiscount =
        selectedDiscounts.length === 0 ||
        selectedDiscounts.some((d) => discount >= d);

      if (meetsPrice && meetsDiscount) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  }

  // Adiciona event listeners para os filtros
  applyFiltersButton.addEventListener("click", applyFilters);
});
