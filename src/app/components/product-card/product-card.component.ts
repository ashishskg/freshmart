import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit, OnDestroy {
  @Input() product!: Product;

  quantity       = 0;
  isWishlisted   = false;
  justAdded      = false;
  isHovered      = false;

  private sub!: Subscription;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.quantity    = this.productService.getCartItemQuantity(this.product.id);
    this.isWishlisted = this.productService.isInWishlist(this.product.id);

    this.sub = this.productService.getCart().subscribe(() => {
      this.quantity = this.productService.getCartItemQuantity(this.product.id);
    });
  }

  ngOnDestroy(): void { this.sub?.unsubscribe(); }

  addToCart(): void {
    if (!this.product.inStock) return;
    this.productService.addToCart(this.product);
    this.justAdded = true;
    setTimeout(() => this.justAdded = false, 700);
  }

  increment(): void { this.productService.updateQuantity(this.product.id, this.quantity + 1); }
  decrement(): void { this.productService.updateQuantity(this.product.id, this.quantity - 1); }

  toggleWishlist(): void {
    this.productService.toggleWishlist(this.product.id);
    this.isWishlisted = this.productService.isInWishlist(this.product.id);
  }

  get savings(): number { return this.product.mrp - this.product.price; }
  get stars(): number[] { return [1, 2, 3, 4, 5]; }
  isStarFilled(s: number): boolean { return s <= Math.floor(this.product.rating); }
}
