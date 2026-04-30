import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';

import { CartService } from '../../../core/services/cart.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.scss'
})
export class Cart {

  private cartService = inject(CartService);
  private router = inject(Router);
  private authService = inject(AuthService);

  items = this.cartService.items;
  totalItems = this.cartService.totalItems;
  totalPrice = this.cartService.totalPrice;

  remove(id: number): void {
    this.cartService.remove(id);
  }

  clear(): void {
    this.cartService.clear();
  }

  increase(id: number): void {
    this.cartService.increase(id);
  }

  decrease(id: number): void {
    this.cartService.decrease(id);
  }

  checkout(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/checkout']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}