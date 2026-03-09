import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() searchQuery  = new EventEmitter<string>();
  @Output() cartToggle   = new EventEmitter<void>();

  cartCount   = 0;
  cartTotal   = 0;
  searchText  = '';
  isFocused   = false;
  location    = 'Bengaluru, Karnataka';

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getCartCount().subscribe(n => this.cartCount = n);
    this.productService.getCartTotal().subscribe(t => this.cartTotal = t);
  }

  onSearchInput(): void  { this.searchQuery.emit(this.searchText); }
  onSearchEnter(): void  { this.searchQuery.emit(this.searchText); }
  clearSearch(): void    { this.searchText = ''; this.searchQuery.emit(''); }
  onCartClick(): void    { this.cartToggle.emit(); }
}
