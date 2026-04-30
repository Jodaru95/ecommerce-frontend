import { Injectable, computed, signal } from '@angular/core';
import { Product } from '../models/product.model';
import { CartItem } from '../models/cart-item.model';

@Injectable({
    providedIn: 'root'
})
export class CartService {

    items = signal<CartItem[]>(this.loadCart());

    totalItems = computed(() =>
        this.items().reduce((sum, item) => sum + item.quantity, 0)
    );

    totalPrice = computed(() =>
        this.items().reduce(
            (sum, item) => sum + item.product.price * item.quantity,
            0
        )
    );

    addToCart(product: Product, quantity: number = 1): void {

        const current = [...this.items()];
        const existing = current.find(i => i.product.id === product.id);

        if (existing) {
            existing.quantity += quantity;
        } else {
            current.push({ product, quantity });
        }

        this.items.set(current);
        this.saveCart();
    }

    remove(productId: number): void {
        this.items.set(
            this.items().filter(i => i.product.id !== productId)
        );

        this.saveCart();
    }

    clear(): void {
        this.items.set([]);
        localStorage.removeItem('cart');
    }

    private saveCart(): void {
        localStorage.setItem('cart', JSON.stringify(this.items()));
    }

    private loadCart(): CartItem[] {
        const data = localStorage.getItem('cart');
        return data ? JSON.parse(data) : [];
    }

    increase(productId: number): void {
        const updated = this.items().map(item =>
            item.product.id === productId
                ? { ...item, quantity: item.quantity + 1 }
                : item
        );

        this.items.set(updated);
        this.saveCart();
    }

    decrease(productId: number): void {
        const updated = this.items()
            .map(item =>
                item.product.id === productId
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
            .filter(item => item.quantity > 0);

        this.items.set(updated);
        this.saveCart();
    }
}