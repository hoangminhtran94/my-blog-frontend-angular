import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from 'src/app/pages/auth/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard {
  router = inject(Router);
  authService = inject(AuthService);
  user = this.authService.userData;
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = this.user();
    if (user) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
