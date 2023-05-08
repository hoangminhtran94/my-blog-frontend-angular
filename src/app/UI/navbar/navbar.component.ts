import { Component, inject } from '@angular/core';
import { AuthService } from 'src/app/pages/auth/auth.service';
import { User } from 'src/app/utils/models/User.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavBarComponent {
  authService = inject(AuthService);
  user = this.authService.userData;
  onLogout = () => {
    this.authService.logout();
  };
}
