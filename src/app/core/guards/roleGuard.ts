import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = (route) => {

    const auth = inject(AuthService);
    const router = inject(Router);

    const expectedRole = route.data?.['role'];

    if (auth.role() === expectedRole) {
        return true;
    }

    router.navigate(['/home']);
    return false;
};