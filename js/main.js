// Main Application Script
import { initializeModal } from './modal.js';
import { initializeFilter } from './filter.js';

// Initialize all page functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize modal functionality if on a page with products
    initializeModal();

    // Initialize filter functionality if on products page
    initializeFilter();

    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
});
