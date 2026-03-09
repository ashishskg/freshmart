import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { CartItem } from '../../models/product.model';

@Component({
  selector: 'app-cart-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-sidebar.component.html',
  styleUrls: ['./cart-sidebar.component.scss']
})
export class CartSidebarComponent implements OnInit {
  @Input()  isOpen = false;
  @Output() closed = new EventEmitter<void>();

  cartItems: CartItem[] = [];
  subtotal   = 0;
  savings    = 0;
  deliveryFee = 0;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getCart().subscribe(items => {
      this.cartItems   = items;
      this.subtotal    = items.reduce((s, i) => s + i.product.price * i.quantity, 0);
      this.savings     = items.reduce((s, i) => s + (i.product.mrp - i.product.price) * i.quantity, 0);
      this.deliveryFee = this.subtotal >= 499 ? 0 : (items.length > 0 ? 49 : 0);
    });
  }

  increment(id: number): void {
    const item = this.cartItems.find(i => i.product.id === id);
    if (item) this.productService.updateQuantity(id, item.quantity + 1);
  }

  decrement(id: number): void {
    const item = this.cartItems.find(i => i.product.id === id);
    if (item) this.productService.updateQuantity(id, item.quantity - 1);
  }

  remove(id: number): void   { this.productService.removeFromCart(id); }
  clear(): void              { this.productService.clearCart(); }
  close(): void              { this.closed.emit(); }

  get grandTotal(): number          { return this.subtotal + this.deliveryFee; }
  get freeDeliveryLeft(): number    { return Math.max(0, 499 - this.subtotal); }
  get deliveryProgress(): number    { return Math.min((this.subtotal / 499) * 100, 100); }
}
