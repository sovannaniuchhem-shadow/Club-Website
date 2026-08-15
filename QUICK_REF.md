# 📖 Quick Reference Guide

## File Structure at a Glance

```
CLUB Website/
│
├── 📄 index.html ─────────────┐
├── 📄 README.md               │
├── 📄 REFACTORING.md          ├─→ Documentation
│                              │
├── 📁 css/                    │
│   ├── home.css              ├─→ Styles (no changes)
│   ├── products.css
│   ├── about.css
│   └── contact.css
│
├── 📁 pages/
│   ├── products.html ─────────┐
│   ├── about.html            ├─→ Updated to use modules
│   └── contact.html          │
│
├── 📁 images/                 │
│   └── [image files]          ├─→ Assets (no changes)
│
└── 📁 js/                     │
    ├── main.js ──────────────┐│
    ├── modal.js              │├─→ NEW! JavaScript Modules
    └── filter.js ────────────┘│
```

---

## Script Load Path

```
📄 index.html
    ↓
<script type="module" src="./js/main.js"></script>
    ↓
📄 js/main.js (Entry Point)
    ↓
    ├─→ import { initializeModal } from './modal.js'
    │       ↓
    │       📄 js/modal.js
    │           • Set up product card clicks
    │           • Show product details in modal
    │           • Handle close actions
    │
    └─→ import { initializeFilter } from './filter.js'
            ↓
            📄 js/filter.js
                • Set up filter button clicks
                • Show/hide products by category
                • Update active states
```

---

## Feature Status

| Feature | Location | Status | Notes |
|---------|----------|--------|-------|
| **Product Modal** | `js/modal.js` | ✅ Working | Click any product card |
| **Product Filter** | `js/filter.js` | ✅ Working | Filter by category |
| **Snowfall Animation** | `css/*.css` | ✅ Working | All pages |
| **Navigation** | `css/*.css` | ✅ Working | All pages |
| **Responsive Design** | `css/*.css` | ✅ Working | All pages |

---

## Common Tasks

### 🔍 Find Code For:

| Feature | File | Function |
|---------|------|----------|
| Product details modal | `js/modal.js` | `initializeModal()` |
| Product filtering | `js/filter.js` | `initializeFilter()` |
| All features init | `js/main.js` | `DOMContentLoaded` |
| Product styles | `css/products.css` | `.product-card` |
| Modal styles | `css/products.css` | `.product-modal` |
| Home page styles | `css/home.css` | — |
| Navigation | `css/contact.css` | `.nav` |

### ✏️ Edit Code For:

| If You Want To... | Edit This File |
|------------------|-----------------|
| Change modal appearance | `css/products.css` → `.product-modal` |
| Change filter behavior | `js/filter.js` → `initializeFilter()` |
| Add new feature | Create `js/newfeature.js` |
| Change colors | `css/*.css` → `:root` variables |
| Update animations | `css/*.css` → `@keyframes` |

---

## Testing Checklist

- [ ] Load homepage - check snowfall animation
- [ ] Navigate to Products page - check all features work
- [ ] Click product card - modal appears with details
- [ ] Click filter buttons - products filter correctly
- [ ] Click modal close (X) - modal closes
- [ ] Click modal background - modal closes
- [ ] Press Escape - modal closes
- [ ] Check About page - loads correctly
- [ ] Check Contact page - loads correctly
- [ ] Test on mobile - responsive design works

---

## Quick Debug Tips

### Modal Not Opening?
- Check: `console.log()` in `js/modal.js`
- Verify: `.product-card` elements exist
- Check: `.modal-close`, `.modal-overlay` exist

### Filters Not Working?
- Check: `.filter-btn` elements exist
- Verify: `.product-card` has `data-category` attribute
- Check: `.active` class styling in `css/products.css`

### Scripts Not Loading?
- Check: Browser console for errors
- Verify: Path is correct (`./js/main.js` or `../js/main.js`)
- Check: Browser supports ES6 modules

---

## File Sizes (Approximate)

| File | Size | Type |
|------|------|------|
| `js/main.js` | 250 B | Module (Entry) |
| `js/modal.js` | 1.2 KB | Module (Logic) |
| `js/filter.js` | 800 B | Module (Logic) |
| `products.html` | ~15 KB | Page (reduced from 18 KB) |
| `css/products.css` | ~18 KB | Styles |

**Total JavaScript: ~2.2 KB** (vs ~50+ KB if duplicated on each page)

---

## Browser DevTools Tips

### Check Modules Loading:
1. Open DevTools → Network tab
2. Reload page
3. Look for `main.js`, `modal.js`, `filter.js` requests
4. Status should be 200 (success)

### Debug Module Issues:
1. Open DevTools → Console tab
2. Look for errors with file paths
3. Check file exists in `js/` folder
4. Verify import paths are correct

### Profile Performance:
1. DevTools → Performance tab
2. Record page load
3. Check module parsing time
4. Identify bottlenecks

---

## Next Steps

1. ✅ **Done**: Refactored JavaScript into modules
2. **Next**: Organize CSS into shared + page-specific
3. **Future**: Add TypeScript for type safety
4. **Future**: Create component library for reuse
5. **Future**: Add build tool (webpack, vite, etc.)

---

## Support Files

- 📖 `README.md` - Complete project documentation
- 📋 `REFACTORING.md` - What changed and why
- 📍 This file - Quick reference
- 💾 `js/` - All source code
- 🎨 `css/` - All styles

**Happy coding! 🚀**
