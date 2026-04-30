import { Routes } from '@angular/router';
import { Home } from './features/public/home/home';
import { Login } from './features/auth/login/login';
import { Register } from './features/auth/register/register';
import { Products } from './features/public/products/products';
import { ProductDetail } from './features/public/product-detail/product-detail';
import { Profile } from './features/user/profile/profile';
import { Dashboard } from './features/admin/dashboard/dashboard';
import { Cart } from './features/public/cart/cart';
import { authGuard } from './core/guards/authGuard';
import { roleGuard } from './core/guards/roleGuard';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },

    { path: 'home', component: Home },
    { path: 'products', component: Products },
    { path: 'product/:id', component: ProductDetail },
    { path: 'cart', component: Cart },

    { path: 'login', component: Login },
    { path: 'register', component: Register },

    { 
        path: 'profile', component: Profile, 
        canActivate: [authGuard] 
    },

    { 
        path: 'admin/dashboard', component: Dashboard, 
        canActivate: [authGuard,roleGuard] 
    },

    { path: '**', redirectTo: 'home' }
];
