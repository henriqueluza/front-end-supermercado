// Banco de dados simulado de produtos
const produtos = {
  "tomate-organico": {
    nome: "Tomate Orgânico",
    categoria: "Vegetais e Frutas",
    preco: 8.99,
    precoOriginal: 11.24,
    desconto: 20,
    unidade: "kg",
    imagem: "../assets/Tomate.webp",
    descricao:
      "Tomates orgânicos frescos, cultivados sem pesticidas. Ideais para saladas e molhos.",
  },
  "file-mignon": {
    nome: "Filé Mignon",
    categoria: "Carnes",
    preco: 89.99,
    precoOriginal: 128.56,
    desconto: 30,
    unidade: "kg",
    imagem: "../assets/file-mignon.webp",
    descricao:
      "Corte nobre e macio, perfeito para ocasiões especiais. Carne de alta qualidade.",
  },
  "energetico-monster": {
    nome: "Energético Monster",
    categoria: "Comidas e Bebidas",
    preco: 15.99,
    precoOriginal: 17.77,
    desconto: 10,
    unidade: "500ml",
    imagem: "../assets/Monster.webp",
    descricao:
      "Bebida energética Monster Energy. Ideal para momentos que precisam de energia extra.",
  },
  alface: {
    nome: "Alface Crespa",
    categoria: "Vegetais e Frutas",
    preco: 4.99,
    unidade: "un",
    imagem: "../assets/Alface.webp",
    descricao:
      "Alface crespa fresca e crocante, cultivada com cuidado para manter o máximo de nutrientes.",
  },
  granola: {
    nome: "Granola",
    categoria: "Alimentos e Bebidas",
    preco: 24.99,
    unidade: "500g",
    imagem: "../assets/Granola.webp",
    descricao:
      "Granola com sementes e frutas, ideal para café da manhã ou como sobremesa.",
  },
  "pao-de-queijo": {
    nome: "Pão de Queijo",
    categoria: "Alimentos e Bebidas",
    preco: 25.99,
    unidade: "kg",
    imagem: "../assets/Pao-de-queijo.webp",
    descricao:
      "Pão de queijo fresco e crocante, ideal para sanduíches e torradas.",
  },
  "pao-frances": {
    nome: "Pão Francês",
    categoria: "Alimentos e Bebidas",
    unidade: "unidade",
    preco: 2.99,
    imagem: "../assets/Pao-frances.webp",
    descricao:
      "Pão francês fresco e crocante, ideal para sanduíches e torradas.",
  },
};

// Função para obter parâmetros da URL
function getUrlParams() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

// Função para atualizar a quantidade
function updateQuantity(value) {
  const quantityInput = document.getElementById("quantity");
  const currentValue = parseInt(quantityInput.value);
  const newValue = currentValue + value;

  if (newValue >= 1) {
    quantityInput.value = newValue;
  }
}

// Funções para incrementar e decrementar quantidade
function incrementQuantity() {
  updateQuantity(1);
}

function decrementQuantity() {
  updateQuantity(-1);
}

// Função para carregar os detalhes do produto
function carregarProduto() {
  const produtoId = getUrlParams();
  const produto = produtos[produtoId];

  if (!produto) {
    window.location.href = "shop.html";
    return;
  }

  // Atualiza os elementos da página com as informações do produto
  document.getElementById("productImage").src = produto.imagem;
  document.getElementById("productImage").alt = produto.nome;
  document.getElementById("productName").textContent = produto.nome;
  document.getElementById("productCategory").textContent = produto.categoria;
  document.getElementById(
    "productPrice"
  ).textContent = `R$ ${produto.preco.toFixed(2)}`;
  document.getElementById("productUnit").textContent = `por ${produto.unidade}`;
  document.getElementById("productDescription").textContent = produto.descricao;

  // Mostra o desconto se existir
  if (produto.desconto) {
    document.getElementById(
      "discountBadge"
    ).textContent = `-${produto.desconto}%`;
    document.getElementById("discountBadge").classList.remove("hidden");
    document.getElementById(
      "originalPrice"
    ).textContent = `R$ ${produto.precoOriginal.toFixed(2)}`;
    document.getElementById("originalPrice").classList.remove("hidden");
  }

  // Atualiza o título da página
  document.title = `${produto.nome} - Supermercado Orgânico`;
}

// Função para adicionar o produto ao carrinho
function addToCart() {
  const produtoId = getUrlParams();
  const produto = produtos[produtoId];
  const quantidade = parseInt(document.getElementById("quantity").value);

  if (produto && quantidade > 0) {
    Cart.addItem({
      id: produtoId,
      name: produto.nome,
      price: produto.preco,
      image: produto.imagem,
      quantity: quantidade,
    });
  }
}

// Carrega os detalhes do produto quando a página é carregada
document.addEventListener("DOMContentLoaded", () => {
  carregarProduto();

  // Adiciona o event listener para o botão de adicionar ao carrinho
  const addToCartButton = document.getElementById("addToCartButton");
  if (addToCartButton) {
    addToCartButton.addEventListener("click", addToCart);
  }
});
