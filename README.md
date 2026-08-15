# BLUESTEP Website - File Structure Documentation

## 📁 Project Organization

```
CLUB/
├── index.html              # Homepage
├── css/
│   ├── home.css           # Homepage styles
│   ├── products.css       # Products page styles + modal
│   ├── about.css          # About page styles
│   └── contact.css        # Contact page styles
├── pages/
│   ├── products.html      # Products catalog with filter & modal
│   ├── about.html         # About us page
│   └── contact.html       # Contact form page
├── images/                # Image assets
└── js/                    # JavaScript modules (NEW)
    ├── main.js            # Main entry point - initializes all features
    ├── modal.js           # Product detail modal functionality
    └── filter.js          # Product filtering functionality
```

## 🎯 JavaScript Modules

### `main.js`
- **Purpose**: Central entry point for all page functionality
- **Exports**: None (imports and initializes other modules)
- **Uses**: Automatically runs when page loads
- **Includes**: DOM ready listener, smooth scroll behavior

### `modal.js`
- **Purpose**: Handles product detail modal popup
- **Export**: `initializeModal()` function
- **Features**:
  - Display product details when card is clicked
  - Close modal on X button, background click, or Escape key
  - Prevents page scrolling when modal is open
  - Works on all pages with `.product-card` elements

### `filter.js`
- **Purpose**: Manages product filtering by category
- **Export**: `initializeFilter()` function
- **Features**:
  - Filter products by category (all, running, sport, casual, outdoor, lifestyle, premium)
  - Smooth opacity transitions
  - Active button state management

## 🎨 CSS Organization

### Shared Across All Pages:
- Root color variables (`--dark`, `--navy`, `--blue`, etc.)
- Snowfall animations
- Header and navigation styles
- Footer styles
- Common typography

### Page-Specific Styles:
- **home.css**: Hero section, featured products grid, feature cards
- **products.css**: Product filter menu, product grid, modal styles
- **about.css**: About grid layout, values section, feature cards
- **contact.css**: Contact form layout and styling

### Modal Styles (in products.css):
- `.product-modal`: Main modal container
- `.modal-content`: Modal card with animation
- `.modal-close`: Close button
- `.modal-body`: Two-column layout (image + details)
- `.modal-specs`: Product specifications display
- `.modal-footer`: Price and action button section

## 🔄 How It Works

### Page Load Flow:
1. HTML page loads and links `<script type="module" src="../js/main.js"></script>`
2. `main.js` imports `modal.js` and `filter.js`
3. `DOMContentLoaded` event fires
4. `initializeModal()` sets up click listeners on product cards
5. `initializeFilter()` sets up filter button listeners
6. User interacts with the page

### Product Modal Flow:
1. User clicks on a product card
2. Modal extracts product data from card elements
3. Modal displays in overlay with animation
4. User can close by clicking X, background, or Escape key

### Filter Flow:
1. User clicks filter button
2. All buttons update active state
3. Products fade in/out based on filter criteria
4. Smooth transitions between filter states

## ✅ Benefits of This Structure

✓ **Modularity**: Each feature is in its own file
✓ **Reusability**: Functions can be imported anywhere
✓ **Maintainability**: Easy to find and update specific features
✓ **Performance**: Code is organized and can be optimized
✓ **Scalability**: Easy to add new modules as features grow
✓ **Reduced Duplication**: Shared code in one place
✓ **Better Organization**: Clear separation of concerns

## 🚀 Future Improvements

- Create `utils.js` for shared utility functions
- Extract common CSS to `common.css` to reduce duplication
- Add `animations.js` for complex animation logic
- Create separate CSS files for components
- Add TypeScript versions for enhanced development

## 📝 Notes

- All JavaScript uses ES6 modules with `import/export`
- Modal and filter work on all pages that have the corresponding elements
- No changes needed to HTML structure - fully backward compatible
- Smooth scroll behavior enabled globally in `main.js`
