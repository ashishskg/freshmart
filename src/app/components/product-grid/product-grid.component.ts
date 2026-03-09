import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-product-grid',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductCardComponent],
  templateUrl: './product-grid.component.html',
  styleUrls: ['./product-grid.component.scss']
})
export class ProductGridComponent implements OnChanges {
  @Input() category    = 'all';
  @Input() searchQuery = '';

  products: Product[]         = [];
  filteredProducts: Product[] = [];
  isLoading = true;
  sortBy      = 'default';
  activeFilter = 'all';

  readonly filters = [
    { id: 'all',        label: 'All' },
    { id: 'bestseller', label: '⭐ Best Sellers' },
    { id: 'organic',    label: '🌿 Organic' },
    { id: 'new',        label: '✨ New' },
    { id: 'offers',     label: '🔥 On Offer' },
    { id: 'instock',    label: '✅ In Stock' },
  ];

  readonly sortOptions = [
    { value: 'default',    label: 'Relevance' },
    { value: 'price-asc',  label: 'Price: Low → High' },
    { value: 'price-desc', label: 'Price: High → Low' },
    { value: 'rating',     label: 'Highest Rated' },
    { value: 'discount',   label: 'Max Discount' },
    { value: 'name',       label: 'Name A–Z' },
  ];

  constructor(private productService: ProductService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['category'] || changes['searchQuery']) this.load();
  }

  load(): void {
    this.isLoading = true;
    const obs$ = this.searchQuery.trim()
      ? this.productService.searchProducts(this.searchQuery)
      : this.productService.getProductsByCategory(this.category);

    obs$.subscribe(data => {
      this.products = data;
      this.applyFiltersAndSort();
      this.isLoading = false;
    });
  }

  applyFiltersAndSort(): void {
    let result = [...this.products];
    switch (this.activeFilter) {
      case 'bestseller': result = result.filter(p => p.isBestSeller); break;
      case 'organic':    result = result.filter(p => p.isOrganic);    break;
      case 'new':        result = result.filter(p => p.isNew);        break;
      case 'offers':     result = result.filter(p => p.discount >= 15); break;
      case 'instock':    result = result.filter(p => p.inStock);      break;
    }
    this.filteredProducts = this.productService.sortProducts(result, this.sortBy);
  }

  onFilterChange(id: string): void { this.activeFilter = id; this.applyFiltersAndSort(); }
  onSortChange(): void              { this.applyFiltersAndSort(); }

  get title(): string {
    if (this.searchQuery) return `Results for "${this.searchQuery}"`;
    if (this.category === 'all') return 'All Products';
    return this.category.charAt(0).toUpperCase() + this.category.slice(1);
  }

  trackById(_: number, p: Product): number { return p.id; }

  skeletonItems(): number[] { return Array.from({ length: 8 }, (_, i) => i); }
}
