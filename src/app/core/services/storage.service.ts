import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class StorageService {
    setToken(token: string): void {
        localStorage.setItem('token', token);
    }
    getToken(): string | null {
        return localStorage.getItem('token');
    }

    logout(): void {
        localStorage.clear();
    }
}