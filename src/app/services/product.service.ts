// services/product.service.ts
// ─── Injectable service — simulates HTTP calls via Observable + delay ──────

import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, delay } from 'rxjs/operators';
import { Product, CartItem, Category } from '../models/product.model';
import { PRODUCTS, CATEGORIES } from '../data/products.data';

@Injectable({ providedIn: 'root' })
export class ProductService {

  // ── Cart State (BehaviorSubject — like a store) ──────────────────────────
  private cartItems$ = new BehaviorSubject<CartItem[]>([]);
  private wishlist$  = new BehaviorSubject<number[]>([]);

  // ── Product API Methods ──────────────────────────────────────────────────

  /** GET /api/products */
  getAllProducts(): Observable<Product[]> {
    return of([...PRODUCTS]).pipe(delay(300));
  }

  /** GET /api/products?category=:id */
  getProductsByCategory(categoryId: string): Observable<Product[]> {
    if (categoryId === 'all') return of([...PRODUCTS]).pipe(delay(250));
    return of(PRODUCTS.filter(p => p.category === categoryId)).pipe(delay(250));
  }

  /** GET /api/products/search?q=:query */
  searchProducts(query: string): Observable<Product[]> {
    const q = query.toLowerCase().trim();
    if (!q) return of([...PRODUCTS]).pipe(delay(150));
    return of(
      PRODUCTS.filter(p =>
        p.name.toLowerCase().includes(q)        ||
        p.brand.toLowerCase().includes(q)       ||
        p.category.toLowerCase().includes(q)    ||
        p.subcategory.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q)) ||
        p.description.toLowerCase().includes(q)
      )
    ).pipe(delay(150));
  }

  /** GET /api/products/:id */
  getProductById(id: number): Observable<Product | undefined> {
    return of(PRODUCTS.find(p => p.id === id)).pipe(delay(100));
  }

  /** GET /api/products/bestsellers */
  getBestSellers(): Observable<Product[]> {
    return of(PRODUCTS.filter(p => p.isBestSeller)).pipe(delay(200));
  }

  /** GET /api/products/new-arrivals */
  getNewArrivals(): Observable<Product[]> {
    return of(PRODUCTS.filter(p => p.isNew)).pipe(delay(200));
  }

  /** GET /api/products/organic */
  getOrganicProducts(): Observable<Product[]> {
    return of(PRODUCTS.filter(p => p.isOrganic)).pipe(delay(200));
  }

  /** GET /api/categories */
  getCategories(): Observable<Category[]> {
    return of([...CATEGORIES]).pipe(delay(100));
  }

  /** Client-side sort utility */
  sortProducts(products: Product[], sortBy: string): Product[] {
    const arr = [...products];
    switch (sortBy) {
      case 'price-asc':  return arr.sort((a, b) => a.price - b.price);
      case 'price-desc': return arr.sort((a, b) => b.price - a.price);
      case 'rating':     return arr.sort((a, b) => b.rating - a.rating);
      case 'discount':   return arr.sort((a, b) => b.discount - a.discount);
      case 'name':       return arr.sort((a, b) => a.name.localeCompare(b.name));
      default:           return arr;
    }
  }

  // ── Cart Methods ─────────────────────────────────────────────────────────

  getCart(): Observable<CartItem[]> {
    return this.cartItems$.asObservable();
  }

  addToCart(product: Product): void {
    const current  = this.cartItems$.getValue();
    const existing = current.find(i => i.product.id === product.id);
    if (existing) {
      this.cartItems$.next(
        current.map(i => i.product.id === product.id
          ? { ...i, quantity: i.quantity + 1 } : i)
      );
    } else {
      this.cartItems$.next([...current, { product, quantity: 1 }]);
    }
  }

  removeFromCart(productId: number): void {
    this.cartItems$.next(
      this.cartItems$.getValue().filter(i => i.product.id !== productId)
    );
  }

  updateQuantity(productId: number, quantity: number): void {
    if (quantity <= 0) { this.removeFromCart(productId); return; }
    this.cartItems$.next(
      this.cartItems$.getValue().map(i =>
        i.product.id === productId ? { ...i, quantity } : i)
    );
  }

  clearCart(): void {
    this.cartItems$.next([]);
  }

  getCartCount(): Observable<number> {
    return this.cartItems$.pipe(
      map(items => items.reduce((sum, i) => sum + i.quantity, 0))
    );
  }

  getCartTotal(): Observable<number> {
    return this.cartItems$.pipe(
      map(items => items.reduce((sum, i) => sum + i.product.price * i.quantity, 0))
    );
  }

  getCartItemQuantity(productId: number): number {
    return this.cartItems$.getValue().find(i => i.product.id === productId)?.quantity ?? 0;
  }

  // ── Wishlist Methods ──────────────────────────────────────────────────────

  getWishlist(): Observable<number[]> {
    return this.wishlist$.asObservable();
  }

  toggleWishlist(productId: number): void {
    const current = this.wishlist$.getValue();
    this.wishlist$.next(
      current.includes(productId)
        ? current.filter(id => id !== productId)
        : [...current, productId]
    );
  }

  isInWishlist(productId: number): boolean {
    return this.wishlist$.getValue().includes(productId);
  }
}
