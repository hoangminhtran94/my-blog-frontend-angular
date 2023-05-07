import { Injectable, signal, inject, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Blog } from 'src/app/utils/models/Blog.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);

  register(formdata: FormData) {
    this.http
      .post('http://localhost:8000/api/auth/register', formdata)
      .subscribe((res) => console.log(res));
  }
}
