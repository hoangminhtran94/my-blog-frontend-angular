import { Component, inject } from '@angular/core';
import { BlogServices } from '../blog/service/blog.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
})
export class HomePageComponent {
  blogService = inject(BlogServices);
  blogs = this.blogService.blogs;
  title = 'my-blog-with-django';
}
