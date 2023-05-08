import { Component, inject } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { BlogServices } from '../service/blog.service';

@Component({
  selector: 'blog-index-page',
  templateUrl: './blog-index.component.html',
})
export class BlogIndexPage {
  blogServices = inject(BlogServices);
  authService = inject(AuthService);
  blogs = this.blogServices.blogs;
}
