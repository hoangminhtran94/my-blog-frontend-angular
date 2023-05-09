import { Component, inject, OnInit } from '@angular/core';
import { BlogServices } from './pages/blog/service/blog.service';
import { AuthService } from './pages/auth/auth.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  blogServices = inject(BlogServices);
  authService = inject(AuthService);
  ngOnInit(): void {
    this.blogServices.setBlogs();
    this.authService.persistLogin();
  }
  title = environment.title;
  apiUrl = environment.apiURL;
}
