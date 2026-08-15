// Product Detail Modal Functionality
export function initializeModal() {
    const productModal = document.getElementById('productModal');
    const modalClose = document.querySelector('.modal-close');
    const modalOverlay = document.querySelector('.modal-overlay');
    const productCards = document.querySelectorAll('.product-card');

    if (!productModal) return;

    // Product detail modal functionality
    productCards.forEach(card => {
        card.addEventListener('click', () => {
            const category = card.querySelector('.category')?.textContent || '';
            const title = card.querySelector('h3')?.textContent || '';
            const description = card.querySelector('.description')?.textContent || '';
            const price = card.querySelector('.product-bottom strong')?.textContent || '';
            const image = card.querySelector('.product-image img')?.src || '';

            const modalCategory = document.getElementById('modalCategory');
            const modalTitle = document.getElementById('modalTitle');
            const modalDescription = document.getElementById('modalDescription');
            const modalPrice = document.getElementById('modalPrice');
            const modalImage = document.getElementById('modalImage');

            if (modalCategory) modalCategory.textContent = category;
            if (modalTitle) modalTitle.textContent = title;
            if (modalDescription) modalDescription.textContent = description;
            if (modalPrice) modalPrice.textContent = price;
            if (modalImage) modalImage.src = image;

            productModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

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
