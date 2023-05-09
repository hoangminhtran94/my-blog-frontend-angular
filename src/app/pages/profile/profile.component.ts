import { Component, inject } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'profile-page',
  templateUrl: './profile.component.html',
})
export class ProfilePage {
  authService = inject(AuthService);
  user = this.authService.userData;
}
