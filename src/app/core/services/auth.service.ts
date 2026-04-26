import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { AuthRequest } from '../models/auth-request.model';
import { AuthResponse } from '../models/auth-response.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private http = inject(HttpClient);
    private apiUrl = environment.apiUrl;

    login(request: AuthRequest): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(
            `${this.apiUrl}/auth/login`,
            request
        );
    }

    register(request: AuthRequest): Observable<any> {
        return this.http.post(
            `${this.apiUrl}/auth/register`,
            request
        );
    }
}