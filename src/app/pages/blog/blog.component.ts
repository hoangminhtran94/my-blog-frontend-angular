import { Component, signal, inject, effect, OnInit } from '@angular/core';
import type { Blog } from 'src/app/utils/models/Blog.model';
import { BlogServices } from './service/blog.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'blog-page',
  templateUrl: './blog.component.html',
})
export class BlogPage implements OnInit {
  blogServices = inject(BlogServices);
  authService = inject(AuthService);
  user = this.authService.userData;
  blogs = this.blogServices.blogs;

  ngOnInit(): void {}
}
