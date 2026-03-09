# 🌿 FreshMart — Angular Grocery App

A BigBasket-style product catalog built with **Angular 17** (standalone components).

## 📁 Project Structure

```
src/
├── app/
│   ├── models/
│   │   └── product.model.ts          ← Interfaces: Product, CartItem, Category
│   ├── data/
│   │   └── products.data.ts          ← 40 products across 10 categories
│   ├── services/
│   │   └── product.service.ts        ← Injectable service (BehaviorSubject + Observable)
│   ├── components/
│   │   ├── header/                   ← Search, cart count, location
│   │   ├── hero-banner/              ← Landing banners
│   │   ├── category-bar/             ← Sticky category pills
│   │   ├── product-card/             ← Individual product card
│   │   ├── product-grid/             ← Grid with filters + sort + skeleton
│   │   └── cart-sidebar/             ← Sliding cart drawer
│   ├── app.component.ts              ← Root component
│   └── app.component.html
├── styles.scss                       ← Global styles + animations
├── main.ts                           ← Bootstrap entry point
└── index.html
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** v18 or higher → https://nodejs.org
- **npm** v9+

### Steps

```bash
# 1. Install Angular CLI globally
npm install -g @angular/cli

# 2. Go into the project
cd freshmart

# 3. Install all dependencies
npm install

# 4. Start the dev server
ng serve

# 5. Open your browser
# → http://localhost:4200
```

## ✅ Features

| Feature | Details |
|---|---|
| 🛒 Product Catalog | 40 products across 10 categories |
| 🔍 Search | Real-time search across name, brand, tags |
| 📂 Categories | Fruits, Vegetables, Dairy, Grains, Snacks, Beverages, Bakery, Personal Care, Cleaning |
| ⚡ Service Layer | `ProductService` with Observable + 150–300ms simulated delay |
| 🎛 Filters | Best Sellers, Organic, New, On Offer, In Stock |
| 🔃 Sort | Price, Rating, Discount, Name |
| 🛍 Cart | Add/remove/qty — live badge + total in header |
| ❤️ Wishlist | Toggle per product |
| 💀 Skeleton | Shimmer loading cards |
| 📱 Responsive | Works on tablet and desktop |
| 🎨 SCSS | BEM naming, component-scoped styles |

## 🏗️ Architecture

- **Standalone Components** (Angular 17)
- **BehaviorSubject** for reactive cart/wishlist state
- **Observable** pattern for all data fetching
- **SCSS** with BEM naming convention
- **OnChanges** lifecycle hook for reactive grid updates

## 📦 Build for Production

```bash
ng build
# Output in dist/freshmart/
```
