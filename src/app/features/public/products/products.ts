import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../../core/models/product.model';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.html',
  styleUrl: './products.scss'
})
export class Products implements OnInit {

  private productService = inject(ProductService);
  private cdr = inject(ChangeDetectorRef);

  products: Product[] = [];
  loading = true;

  ngOnInit(): void {
    this.productService.getAll().subscribe({
      next: data => {
        this.products = data;
        this.loading = false;
        //this.cdr.detectChanges();
      },
      error: err => {
        console.error(err);
        this.loading = false;
        //this.cdr.detectChanges();
      }
    });
  }
}