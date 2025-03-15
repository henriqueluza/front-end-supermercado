// Funções para gerenciar o carrinho de compras
const Cart = {
  items: [],

  // Inicializa o carrinho
  init() {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      this.items = JSON.parse(savedCart);
    }
    this.updateCartCount();
  },

  // Adiciona um item ao carrinho
  addItem(product) {
    const existingItem = this.items.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += product.quantity || 1;
    } else {
      this.items.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: product.quantity || 1,
      });
    }

    this.saveCart();
    this.updateCartCount();
    this.showAddedToCartMessage();
  },

  // Remove um item do carrinho
  removeItem(productId) {
    this.items = this.items.filter((item) => item.id !== productId);
    this.saveCart();
    this.updateCartCount();
  },

  // Atualiza a quantidade de um item
  updateQuantity(productId, quantity) {
    const item = this.items.find((item) => item.id === productId);
    if (item) {
      item.quantity = quantity;
      if (quantity <= 0) {
        this.removeItem(productId);
      }
    }
    this.saveCart();
    this.updateCartCount();
  },

  // Salva o carrinho no localStorage
  saveCart() {
    localStorage.setItem("cart", JSON.stringify(this.items));
  },

  // Atualiza o contador de itens no ícone do carrinho
  updateCartCount() {
    const cartCount = this.items.reduce(
      (total, item) => total + item.quantity,
      0
    );
    const cartCountElement = document.getElementById("cart-count");
    if (cartCountElement) {
      cartCountElement.textContent = cartCount;
      cartCountElement.style.display = cartCount > 0 ? "flex" : "none";
    }
  },

  // Mostra mensagem de item adicionado ao carrinho
  showAddedToCartMessage() {
    const message = document.createElement("div");
    message.className =
      "fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50";
    message.textContent = "Item adicionado ao carrinho!";
    document.body.appendChild(message);

    setTimeout(() => {
      message.remove();
    }, 2000);
  },
};

// Inicializa o carrinho quando o documento carregar
document.addEventListener("DOMContentLoaded", () => {
  Cart.init();
});
