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

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData = signal<User | null>(null);
  http = inject(HttpClient);
  router = inject(Router);

  persistLogin = () => {
    const user = localStorage.getItem('user');
    if (!user) {
      return;
    }
    if (user) {
      this.userData.set(JSON.parse(user));
    }
  };

  register(formdata: FormData) {
    this.http
      .post('http://localhost:8000/api/auth/register', formdata)
      .subscribe((res) => console.log(res));
  }

  login(formdata: FormData) {
    this.http
      .post('http://localhost:8000/api/auth/login', formdata, {
        withCredentials: true,
      })
      .pipe(
        catchError((e: HttpErrorResponse) => {
          return throwError('Something wrong happened');
        })
      )
      .subscribe({
        next: (res: any) => {
          this.userData.set(res.data);
          localStorage.setItem('user', JSON.stringify(res.data));
          this.router.navigateByUrl('/');
        },
        error: (e) => {
          console.log(e);
        },
      });
  }

  logout() {
    this.http
      .post('http://localhost:8000/api/auth/logout', null)
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
        },
      });
  }
}
