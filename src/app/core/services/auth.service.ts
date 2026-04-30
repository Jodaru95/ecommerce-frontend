import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

import { environment } from '../../../environments/environment';
import { AuthRequest } from '../models/auth-request.model';
import { AuthResponse } from '../models/auth-response.model';
import { signal, computed } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private http = inject(HttpClient);
    private apiUrl = environment.apiUrl;
    isAuthenticated = signal(!!localStorage.getItem('token'));
    role = signal(localStorage.getItem('role') || '');
    isAdmin = computed(() => this.role() === 'ADMIN');


    login(request: AuthRequest): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(
            `${this.apiUrl}/auth/login`,
            request
        ).pipe(
            tap(response => {
                localStorage.setItem('token', response.accessToken);
                localStorage.setItem('refreshToken', response.refreshToken);
                localStorage.setItem('role', response.role);

                this.isAuthenticated.set(true);
                this.role.set(response.role);
            })
        );
    }

    register(request: AuthRequest): Observable<any> {
        return this.http.post(
            `${this.apiUrl}/auth/register`,
            request
        );
    }

    logout(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('role');

        this.isAuthenticated.set(false);
        this.role.set('');
    }
}