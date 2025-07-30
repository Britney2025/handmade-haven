function getCartItems() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}
function saveCartItems(items) {
    localStorage.setItem('cart', JSON.stringify(items));
}
function addToCart(product) {
    const cart = getCartItems();
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    saveCartItems(cart);
    updateCartCount();
}
function updateCartCount() {
    const cart = getCartItems();
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelectorAll('#cart-count').forEach(el => el.textContent = count);
}
// ---- Attach Add to Cart Button Events ----
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn') && e.target.textContent === 'Add to Cart') {
        const card = e.target.closest('.product-card');
        const product = {
            id: e.target.dataset.id,
            name: card.querySelector('h3').textContent,
            price: parseInt(card.querySelector('.price').textContent.replace('Ksh', '').trim()),
            image: card.querySelector('img').src
        };
        addToCart(product);
        showToast(`${product.name} added to cart!`);
    }
});

if (window.location.pathname.includes('cart.html')) {
    renderCart();
}
function renderCart() {
    const cart = getCartItems();
    const container = document.getElementById('cart-container');
    const totalDisplay = document.getElementById('cart-total');
    container.innerHTML = '';
    if (cart.length === 0) {
        container.innerHTML = '<p>Your cart is empty</p>';
        totalDisplay.textContent = 'Ksh 0';
        return;
    }
    let total = 0;
    cart.forEach(item => {
        total += item.price * item.quantity;
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
      <img src="${item.image}" alt="${item.name}" />
      <h3>${item.name}</h3>
      <p>Price: Ksh ${item.price}</p>
      <p>Quantity:
        <button class="qty-btn" data-id="${item.id}" data-action="decrease">-</button>
        ${item.quantity}
        <button class="qty-btn" data-id="${item.id}" data-action="increase">+</button>
      </p>
      <button class="btn remove-btn" data-id="${item.id}">Remove</button>
    `;
        container.appendChild(div);
    });
    totalDisplay.textContent = `Ksh ${total}`;
}
// ---- Quantity and Remove Controls ----
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('qty-btn')) {
        const id = e.target.dataset.id;
        const action = e.target.dataset.action;
        const cart = getCartItems();
        const item = cart.find(i => i.id === id);
        if (item) {
            if (action === 'increase') item.quantity += 1;
            if (action === 'decrease') item.quantity = Math.max(1, item.quantity - 1);
        }
        saveCartItems(cart);
        renderCart();
    }
    if (e.target.classList.contains('remove-btn')) {
        let cart = getCartItems();
        cart = cart.filter(i => i.id !== e.target.dataset.id);
        saveCartItems(cart);
        renderCart();
    }
    if (e.target.id === 'clear-cart') {
        localStorage.removeItem('cart');
        renderCart();
    }
});

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}