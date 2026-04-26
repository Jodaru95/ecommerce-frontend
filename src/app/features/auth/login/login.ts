import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../../core/services/auth.service';
import { StorageService } from '../../../core/services/storage.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private storage = inject(StorageService);
  private router = inject(Router);

  loading = false;
  errorMessage = '';

  form = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  onSubmit(): void {

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.authService.login(this.form.value as any).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.accessToken);
        localStorage.setItem('refreshToken', response.refreshToken);
        this.router.navigate(['/home']);
      },
      error: () => {
        this.errorMessage = 'Usuario o contraseña incorrectos';
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }
}