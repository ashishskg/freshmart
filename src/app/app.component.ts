import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent }      from './components/header/header.component';
import { HeroBannerComponent }  from './components/hero-banner/hero-banner.component';
import { CategoryBarComponent } from './components/category-bar/category-bar.component';
import { ProductGridComponent } from './components/product-grid/product-grid.component';
import { CartSidebarComponent } from './components/cart-sidebar/cart-sidebar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    HeroBannerComponent,
    CategoryBarComponent,
    ProductGridComponent,
    CartSidebarComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  activeCategory = 'all';
  searchQuery    = '';
  cartOpen       = false;

  onCategorySelected(id: string): void {
    this.activeCategory = id;
    this.searchQuery    = '';
  }

  onSearchQuery(q: string): void {
    this.searchQuery = q;
    if (q) this.activeCategory = 'all';
  }

  onCartToggle(): void { this.cartOpen = !this.cartOpen; }
  onCartClose():  void { this.cartOpen = false; }

  get showBanner(): boolean {
    return !this.searchQuery && this.activeCategory === 'all';
  }
}
