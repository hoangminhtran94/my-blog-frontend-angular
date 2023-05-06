import {
  Component,
  OnInit,
  inject,
  signal,
  computed,
  effect,
} from '@angular/core';
import { Blog } from 'src/app/utils/models/Blog.model';
import { BlogServices } from '../service/blog.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'blog-detail-page',
  templateUrl: './blog-detail.component.html',
})
export class BlogDetailPageComponent implements OnInit {
  blogServices = inject(BlogServices);
  router = inject(ActivatedRoute);
  blog = this.blogServices.currentBlog;

  ngOnInit(): void {
    const id = this.router.snapshot.params['blogId'];
    this.blogServices.getABlog(id);
  }
}
