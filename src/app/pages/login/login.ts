import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  private readonly auth = inject(Auth);
  private readonly router = inject(Router);

  email = '';
  password = '';
  error = '';
  loading = false;

  onSubmit(): void {
    this.error = '';
    if (!this.email || !this.password) {
      this.error = 'Please fill in all fields.';
      return;
    }
    this.loading = true;
    const success = this.auth.login(this.email, this.password);
    this.loading = false;
    if (success) {
      this.router.navigate(['/browse']);
    } else {
      this.error = 'Invalid credentials. Please try again.';
    }
  }
}
