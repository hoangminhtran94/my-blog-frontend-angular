import {
  Component,
  OnInit,
  inject,
  signal,
  computed,
  effect,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Blog } from 'src/app/utils/models/Blog.model';
import { BlogServices } from '../service/blog.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'blog-detail-page',
  templateUrl: './blog-detail.component.html',
})
export class BlogDetailPageComponent implements OnInit {
  id: string = '';
  blogServices = inject(BlogServices);
  router = inject(ActivatedRoute);
  blog = this.blogServices.currentBlog;

  commentForm = new FormGroup({
    comment: new FormControl(null, Validators.required),
  });

  onComment() {
    this.blogServices.addAComment(this.id, this.commentForm.value.comment!);
  }
  ngOnInit(): void {
    const id = this.router.snapshot.params['blogId'];
    this.id = id;
    this.blogServices.getABlog(id);
  }
}
