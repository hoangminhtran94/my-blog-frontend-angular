import { Component, inject } from '@angular/core';
import { BlogServices } from '../blog/service/blog.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
})
export class HomePage {
  blogService = inject(BlogServices);
  authService = inject(AuthService);
  blogs = this.blogService.blogs;
  title = 'my-blog-with-django';
}
