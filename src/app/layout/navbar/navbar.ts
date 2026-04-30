import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './navbar.html',
    styleUrl: './navbar.scss'
})
export class Navbar {
    private authService = inject(AuthService);
    private cartService = inject(CartService);
    private router = inject(Router);

    isAuthenticated = this.authService.isAuthenticated;
    isAdmin = this.authService.isAdmin;

    cartCount = this.cartService.totalItems;

    logout(): void {
        this.authService.logout();
        this.router.navigate(['/home']);
    }
}