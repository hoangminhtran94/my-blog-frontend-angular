import { Injectable, signal, inject, computed } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Blog } from 'src/app/utils/models/Blog.model';
import { catchError, map, tap, throwError } from 'rxjs';
import { User } from 'src/app/utils/models/User.model';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CookieService } from 'src/app/utils/cookie/cookie.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData = signal<User | null>(null);
  http = inject(HttpClient);
  router = inject(Router);
  cookieService = inject(CookieService);

  persistLogin = () => {
    const user = localStorage.getItem('user');
    if (!user) {
      return;
    }
    if (user) {
      this.userData.set(JSON.parse(user));
    }
  };

  async register(formdata: FormData) {
    const promise = new Promise((resolve, reject) => {
      this.http
        .post(environment.apiURL + '/api/auth/register', formdata)
        .subscribe({
          next: (res) => resolve(res),
          error: (e) => {
            resolve(null);
          },
        });
    });

    const res = await promise;

    if (res) {
      setTimeout(() => {
        this.router.navigateByUrl('/login');
      }, 3000);
    } else {
      throw new Error('Could not register right now, please try again');
    }
  }

  async login(formdata: FormData) {
    const promise = new Promise((resolve, reject) => {
      this.http
        .post(environment.apiURL + '/api/auth/login', formdata, {
          withCredentials: true,
        })
        .pipe(
          catchError((e: HttpErrorResponse) => {
            return throwError('Something wrong happened');
          })
        )
        .subscribe({
          next: (res: any) => {
            this.cookieService.setCookie(
              'sessionid',
              res.sessionid,
              '/',
              'None',
              true
            );
            this.userData.set(res.data);
            resolve(res);
          },
          error: (e) => {
            resolve(null);
          },
        });
    });
    const res = await promise;

    if (res) {
      localStorage.setItem('user', JSON.stringify((res as any).data));
      this.router.navigateByUrl('/');
    } else {
      throw new Error('Authentication failed, please try again');
    }
  }

  logout() {
    this.http
      .post(environment.apiURL + '/api/auth/logout', null)
      .pipe(
        catchError((e: HttpErrorResponse) => {
          return throwError(() => {
            new Error('Something wrong happened');
          });
        })
      )
      .subscribe({
        next: (res) => {
          this.userData.set(null);
          localStorage.removeItem('user');
          this.router.navigateByUrl('/login');
        },
      });
  }
}
