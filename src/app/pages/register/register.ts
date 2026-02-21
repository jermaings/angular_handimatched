import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  private readonly auth = inject(Auth);
  private readonly router = inject(Router);

  name = '';
  email = '';
  password = '';
  confirmPassword = '';
  agreed = false;
  error = '';
  loading = false;

  onSubmit(): void {
    this.error = '';
    if (!this.name || !this.email || !this.password || !this.confirmPassword) {
      this.error = 'Please fill in all fields.';
      return;
    }
    if (this.password !== this.confirmPassword) {
      this.error = 'Passwords do not match.';
      return;
    }
    if (this.password.length < 6) {
      this.error = 'Password must be at least 6 characters.';
      return;
    }
    if (!this.agreed) {
      this.error = 'Please agree to the terms and conditions.';
      return;
    }
    this.loading = true;
    const success = this.auth.register(this.name, this.email, this.password);
    this.loading = false;
    if (success) {
      this.router.navigate(['/profile']);
    } else {
      this.error = 'Registration failed. Please try again.';
    }
  }
}
