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
