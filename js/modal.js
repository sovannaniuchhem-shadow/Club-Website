// Product Detail Modal Functionality
function sanitizeProductData(value) {
    return String(value || '').trim();
}

function getProductFromCard(card) {
    const category = sanitizeProductData(card.querySelector('.category')?.textContent);
    const title = sanitizeProductData(card.querySelector('h3')?.textContent);
    const description = sanitizeProductData(card.querySelector('.description')?.textContent);
    const price = sanitizeProductData(card.querySelector('.product-bottom strong')?.textContent);
    const image = card.querySelector('.product-image img')?.src || '';

    return { category, title, description, price, image };
}

export function initializeModal() {
    const productModal = document.getElementById('productModal');
    const modalClose = document.querySelector('.modal-close');
    const modalOverlay = document.querySelector('.modal-overlay');
    const productCards = document.querySelectorAll('.product-card');
    const productBuyButtons = document.querySelectorAll('.product-bottom button');
    const modalBuyBtn = document.querySelector('.modal-buy-btn');
    const modalQrBtn = document.querySelector('.modal-qr-btn');
    const modalQrCode = document.getElementById('modalQrCode');

    if (!productModal) return;

    const setModalContent = (product) => {
        const modalCategory = document.getElementById('modalCategory');
        const modalTitle = document.getElementById('modalTitle');
        const modalDescription = document.getElementById('modalDescription');
        const modalPrice = document.getElementById('modalPrice');
        const modalImage = document.getElementById('modalImage');

        if (modalCategory) modalCategory.textContent = product.category;
        if (modalTitle) modalTitle.textContent = product.title;
        if (modalDescription) modalDescription.textContent = product.description;
        if (modalPrice) modalPrice.textContent = product.price;
        if (modalImage) modalImage.src = product.image;

        const qrValue = `BLUESTEP|${product.title}|${product.price}|${product.category}`;
        if (modalQrCode) {
            modalQrCode.src = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(qrValue)}`;
        }

        productModal.dataset.productTitle = product.title;
        productModal.dataset.productPrice = product.price;
        productModal.dataset.productImage = product.image;
        productModal.dataset.productCategory = product.category;
    };

    const openPaymentModal = (product) => {
        setModalContent(product);
        productModal.dataset.mode = 'payment';
        productModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    // Product detail modal functionality
    productCards.forEach(card => {
        card.addEventListener('click', (event) => {
            const buyButton = event.target.closest('.product-bottom button');
            if (buyButton) {
                event.stopPropagation();
                return;
            }

            const product = getProductFromCard(card);
            setModalContent(product);
            productModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    const addCurrentProductToCart = () => {
        const product = {
            title: productModal.dataset.productTitle || 'BlueSTEP Product',
            price: productModal.dataset.productPrice || '$0.00',
            image: productModal.dataset.productImage || '../images/shoes1.png',
            category: productModal.dataset.productCategory || 'General'
        };

        const cartApi = window.blueStepCart;
        if (cartApi && typeof cartApi.addItem === 'function') {
            cartApi.addItem(product);
        }

        productModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    };

    productBuyButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.stopPropagation();

            const card = button.closest('.product-card');
            const product = getProductFromCard(card);
            openPaymentModal(product);
        });
    });

    // Add to cart from modal
    if (modalBuyBtn) {
        modalBuyBtn.addEventListener('click', addCurrentProductToCart);
    }

    if (modalQrBtn) {
        modalQrBtn.addEventListener('click', () => {
            const product = {
                title: productModal.dataset.productTitle || 'BlueSTEP Product',
                price: productModal.dataset.productPrice || '$0.00',
                image: productModal.dataset.productImage || '../images/shoes1.png',
                category: productModal.dataset.productCategory || 'General'
            };

            setModalContent(product);
            productModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    const backBtn = document.querySelector('.modal-back-btn');
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            const productSpecs = document.getElementById('productSpecs');
            const orderSummary = document.getElementById('orderSummary');
            const productActions = document.getElementById('productActions');
            const checkoutActions = document.getElementById('checkoutActions');
            
            if (productSpecs) productSpecs.style.display = 'flex';
            if (orderSummary) orderSummary.style.display = 'none';
            if (productActions) productActions.style.display = 'flex';
            if (checkoutActions) checkoutActions.style.display = 'none';
            
            productModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }

    const confirmBtn = document.querySelector('.modal-checkout-btn');
    if (confirmBtn) {
        confirmBtn.addEventListener('click', () => {
            const cartApi = window.blueStepCart;
            if (cartApi && typeof cartApi.clearCart === 'function') {
                cartApi.clearCart();
            }
            productModal.classList.remove('active');
            document.body.style.overflow = 'auto';
            
            const successMsg = document.createElement('div');
            successMsg.style.cssText = 'position: fixed; top: 20px; right: 20px; background: #10b981; color: white; padding: 16px 24px; border-radius: 8px; z-index: 9999; font-weight: 700;';
            successMsg.textContent = '✓ Payment successful! Order confirmed.';
            document.body.appendChild(successMsg);
            setTimeout(() => successMsg.remove(), 3000);
        });
    }

    // Close modal
    function closeModal() {
        productModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modalOverlay) modalOverlay.addEventListener('click', closeModal);

    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && productModal.classList.contains('active')) {
            closeModal();
        }
    });
}
