// Main Application Script
import { initializeModal } from './modal.js';
import { initializeFilter } from './filter.js';

function createCartSystem() {
    const cartButton = document.querySelector('.cart-btn');
    const cartPanel = document.getElementById('cartPanel');
    const cartItems = document.getElementById('cartItems');
    const cartCount = document.getElementById('cartCount');
    const cartClose = document.querySelector('.cart-close');
    const cartBuyBtn = document.querySelector('.cart-buy-btn');

    if (!cartButton || !cartPanel || !cartItems || !cartCount) {
        return;
    }

    const getCart = () => {
        const savedCart = localStorage.getItem('blueStepCart');
        if (!savedCart) return {};

        try {
            return JSON.parse(savedCart);
        } catch {
            return {};
        }
    };

    const saveCart = (cart) => {
        localStorage.setItem('blueStepCart', JSON.stringify(cart));
    };

    const formatPrice = (value) => {
        const numericValue = Number(String(value).replace(/[^\d.]/g, '')) || 0;
        return `$${numericValue.toFixed(2)}`;
    };

    const getTotalItems = (cart) => Object.values(cart).reduce((sum, item) => sum + Number(item.quantity || 0), 0);
    const getCartTotal = (cart) => Object.values(cart).reduce((sum, item) => {
        const unitPrice = Number(String(item.price).replace(/[^\d.]/g, '')) || 0;
        return sum + unitPrice * Number(item.quantity || 0);
    }, 0);

    const renderCart = () => {
        const cart = getCart();
        const totalItems = getTotalItems(cart);
        cartCount.textContent = String(totalItems);

        if (cartBuyBtn) {
            cartBuyBtn.disabled = totalItems === 0;
            cartBuyBtn.title = totalItems === 0 ? 'Add items to cart to checkout' : 'Buy now';
        }

        if (totalItems === 0) {
            cartItems.innerHTML = '<p class="empty-cart">Your cart is empty.</p>';
            return;
        }

        const cartList = Object.values(cart)
            .map((item) => {
                const unitPrice = Number(String(item.price).replace(/[^\d.]/g, '')) || 0;
                const totalPrice = (unitPrice * Number(item.quantity || 0)).toFixed(2);

                return `
                    <div class="cart-item" data-title="${item.title}">
                        <div class="cart-item-image">
                            <img src="${item.image || '../images/shoes1.png'}" alt="${item.title}">
                        </div>
                        <div class="cart-item-info">
                            <h4>${item.title}</h4>
                            <p>${formatPrice(item.price)}</p>
                            <div class="cart-quantity">
                                <button class="qty-btn" data-action="decrease" data-title="${item.title}" type="button">-</button>
                                <span>${item.quantity}</span>
                                <button class="qty-btn" data-action="increase" data-title="${item.title}" type="button">+</button>
                            </div>
                        </div>
                        <strong class="cart-item-total">$${totalPrice}</strong>
                    </div>
                `;
            })
            .join('');

        cartItems.innerHTML = cartList;
    };

    const addItem = (product) => {
        const cart = getCart();
        const title = product.title || 'BlueSTEP Product';
        const price = product.price || '$0.00';

        if (!cart[title]) {
            cart[title] = {
                title,
                price,
                image: product.image || '../images/shoes1.png',
                category: product.category || 'General',
                quantity: 0,
            };
        }

        cart[title].quantity += 1;
        saveCart(cart);
        renderCart();
        cartPanel.classList.add('active');
    };

    const changeQuantity = (title, action) => {
        const cart = getCart();
        if (!cart[title]) return;

        if (action === 'increase') {
            cart[title].quantity += 1;
        } else if (action === 'decrease') {
            cart[title].quantity -= 1;
            if (cart[title].quantity <= 0) {
                delete cart[title];
            }
        }

        saveCart(cart);
        renderCart();
    };

    const openCheckout = () => {
        const cart = getCart();
        const items = Object.values(cart);

        if (!items.length) {
            cartPanel.classList.add('active');
            return;
        }

        const modal = document.getElementById('productModal');
        if (!modal) {
            const destination = window.location.pathname.includes('/pages/') ? 'products.html' : './pages/products.html';
            window.location.href = destination;
            return;
        }

        const firstItem = items[0];
        const subtotal = getCartTotal(cart);
        const tax = subtotal * 0.1;
        const total = subtotal + tax;
        const qrValue = `BLUESTEP|CHECKOUT|${items.map((item) => `${item.title}x${item.quantity}`).join('|')}|SUBTOTAL=${subtotal.toFixed(2)}|TAX=${tax.toFixed(2)}|TOTAL=${total.toFixed(2)}`;
        
        const modalQrCode = document.getElementById('modalQrCode');
        const modalCategory = document.getElementById('modalCategory');
        const modalTitle = document.getElementById('modalTitle');
        const modalDescription = document.getElementById('modalDescription');
        const modalPrice = document.getElementById('modalPrice');
        const modalImage = document.getElementById('modalImage');
        const productSpecs = document.getElementById('productSpecs');
        const orderSummary = document.getElementById('orderSummary');
        const productActions = document.getElementById('productActions');
        const checkoutActions = document.getElementById('checkoutActions');
        const orderItems = document.getElementById('orderItems');

        if (modalCategory) modalCategory.textContent = 'SECURE CHECKOUT';
        if (modalTitle) modalTitle.textContent = items.length > 1 ? `Order Summary (${items.length} items)` : firstItem.title;
        if (modalDescription) {
            modalDescription.textContent = items.length > 1 ? 'Review your order before payment' : items[0].title;
        }
        if (modalPrice) modalPrice.textContent = `$${total.toFixed(2)}`;
        if (modalImage) modalImage.src = firstItem.image || '../images/shoes1.png';
        if (modalQrCode) {
            modalQrCode.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrValue)}`;
        }

        if (productSpecs) productSpecs.style.display = 'none';
        if (orderSummary) {
            orderItems.innerHTML = items.map((item) => `
                <div class="order-item">
                    <span class="order-item-name">${item.title}</span>
                    <span class="order-item-qty">x${item.quantity}</span>
                    <span class="order-item-price">$${(Number(String(item.price).replace(/[^\d.]/g, '')) * item.quantity).toFixed(2)}</span>
                </div>
            `).join('');
            document.getElementById('summarySubtotal').textContent = `$${subtotal.toFixed(2)}`;
            document.getElementById('summaryTax').textContent = `$${tax.toFixed(2)}`;
            document.getElementById('summaryTotal').textContent = `$${total.toFixed(2)}`;
            orderSummary.style.display = 'block';
        }
        if (productActions) productActions.style.display = 'none';
        if (checkoutActions) checkoutActions.style.display = 'flex';

        modal.dataset.productTitle = items.length > 1 ? `${items.length} items` : firstItem.title;
        modal.dataset.productPrice = `$${total.toFixed(2)}`;
        modal.dataset.productImage = firstItem.image || '../images/shoes1.png';
        modal.dataset.productCategory = 'CHECKOUT';
        modal.dataset.mode = 'checkout';
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        cartPanel.classList.remove('active');
    };

    cartButton.addEventListener('click', () => {
        cartPanel.classList.toggle('active');
    });

    cartClose.addEventListener('click', () => {
        cartPanel.classList.remove('active');
    });

    if (cartBuyBtn) {
        cartBuyBtn.addEventListener('click', openCheckout);
    }

    cartItems.addEventListener('click', (event) => {
        const button = event.target.closest('.qty-btn');
        if (!button) return;

        const title = button.dataset.title;
        const action = button.dataset.action;
        if (!title || !action) return;

        changeQuantity(title, action);
    });

    document.addEventListener('click', (event) => {
        const clickedCartButton = event.target.closest('.cart-btn');
        const clickedCartPanel = event.target.closest('.cart-panel');
        const clickedQtyBtn = event.target.closest('.qty-btn');

        if (!clickedCartButton && !clickedCartPanel && !clickedQtyBtn) {
            cartPanel.classList.remove('active');
        }
    });

    const clearCart = () => {
        localStorage.removeItem('blueStepCart');
        renderCart();
    };

    window.blueStepCart = { addItem, changeQuantity, renderCart, clearCart };
    renderCart();
}

// Initialize all page functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    createCartSystem();

    // Initialize modal functionality if on a page with products
    initializeModal();

    // Initialize filter functionality if on products page
    initializeFilter();

    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
});
