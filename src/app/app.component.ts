import { Component, inject, OnInit } from '@angular/core';
import { BlogServices } from './pages/blog/service/blog.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    this.blogServices.setBlogs();
  }
  title = 'my-blog-with-django';
  blogServices = inject(BlogServices);
}
