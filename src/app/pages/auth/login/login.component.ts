import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
@Component({ selector: 'login-page', templateUrl: './login.component.html' })
export class LoginPage {
  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  authService = inject(AuthService);
  error?: string;

  async onSubmit() {
    const email = this.loginForm.get('email')!.value;
    const password = this.loginForm.get('password')!.value;
    if (!email || !password) {
      return;
    }
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    try {
      await this.authService.login(formData);
    } catch (error: any) {
      this.error = error.message;
    }
  }
}
