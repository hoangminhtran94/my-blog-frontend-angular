import { Component, signal, inject, effect, OnInit } from '@angular/core';
import type { Blog } from 'src/app/utils/models/Blog.model';
import { BlogServices } from './service/blog.service';

@Component({
  selector: 'blog-page',
  templateUrl: './blog.component.html',
})
export class BlogPageComponent implements OnInit {
  blogServices = inject(BlogServices);
  blogs = this.blogServices.blogs;

  ngOnInit(): void {}
}
