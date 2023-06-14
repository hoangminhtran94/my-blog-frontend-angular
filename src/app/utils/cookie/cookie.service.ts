import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CookieService {
  setCookie(
    name: string,
    value: string,
    path: string,
    sameSite: string,
    secure: boolean
  ): void {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 14); // Set expiration date to 2 weeks from now

    let cookieString = name + '=' + encodeURIComponent(value);

    cookieString += '; expires=' + expirationDate.toUTCString();

    if (path) {
      cookieString += '; path=' + path;
    }

    if (sameSite) {
      cookieString += '; SameSite=' + sameSite;
    }

    if (secure) {
      cookieString += '; Secure';
    }

    document.cookie = cookieString;
  }
}
