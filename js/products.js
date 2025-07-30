document.addEventListener('DOMContentLoaded', () => {
    fetch('data/products.json')
        .then(response => response.json())
        .then(products => {
            displayProducts(products);
            displayFlashSale(products);
        })
        .catch(error => console.error('Error loading products:', error));
});
function displayProducts(products) {
    const allProductsContainer = document.getElementById('all-products');
    allProductsContainer.innerHTML = '';
    products.forEach(product => {
        const card = createProductCard(product);
        allProductsContainer.appendChild(card);
    });
}
function displayFlashSale(products) {
    const flashSaleContainer = document.getElementById('flash-sale-products');
    flashSaleContainer.innerHTML = '';
    const flashItems = products.filter(product => product.flashSale);
    flashItems.forEach(product => {
        const card = createProductCard(product);
        flashSaleContainer.appendChild(card);
    });
}
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
    <img src="${product.image}" alt="${product.name}" />
    <h3>${product.name}</h3>
    <p class="price">Ksh ${product.price}</p>
    <button class="btn" data-id="${product.id}">Add to Cart</button>
  `;
    return card;
}