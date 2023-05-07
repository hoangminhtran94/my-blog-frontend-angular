import { Component, OnInit, signal, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'register-component-page',
  templateUrl: './register.component.html',
})
export class RegisterPage {
  // password = signal('');
  // confirmPassword = signal('');
  file?: File;
  imageSrc?: string;
  authService = inject(AuthService);
  registerForm = new FormGroup({
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', Validators.required),
    profileImage: new FormControl(null),
  });

  onSelectFile(event: Event) {
    this.file = (event.target as HTMLInputElement).files![0];
    this.imageSrc = URL.createObjectURL(this.file);
  }

  onSubmit = async () => {
    const firstname = this.registerForm.get('firstname')!.value;
    const lastname = this.registerForm.get('lastname')!.value;
    const email = this.registerForm.get('email')!.value;
    const password = this.registerForm.get('password')!.value;
    const file = this.file ?? '';

    if (!firstname || !lastname || !email || !password) {
      return;
    }
    const formData = new FormData();
    formData.append('firstname', firstname);
    formData.append('lastname', lastname);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('profilePicture', file);

    this.authService.register(formData);
  };

  // onPasswordChanged(event: Event) {
  //   this.password.set((event.target as HTMLInputElement).value);
  // }
  // onConfirmedPasswordChanged(event: Event) {
  //   this.confirmPassword.set((event.target as HTMLInputElement).value);
  // }
}
