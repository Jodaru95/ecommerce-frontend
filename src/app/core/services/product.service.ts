import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Product } from '../models/product.model';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    private http = inject(HttpClient);

    private apiUrl = `${environment.apiUrl}/products`;

    getAll(): Observable<Product[]> {
        return this.http.get<Product[]>(this.apiUrl);
    }
}