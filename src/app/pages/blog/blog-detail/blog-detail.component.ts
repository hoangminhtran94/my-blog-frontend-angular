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
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'blog-detail-page',
  templateUrl: './blog-detail.component.html',
})
export class BlogDetailPageComponent implements OnInit {
  id: string = '';
  blogServices = inject(BlogServices);
  route = inject(ActivatedRoute);
  authService = inject(AuthService);
  blog = this.blogServices.currentBlog;
  user = this.authService.userData;
  commentForm = new FormGroup({
    comment: new FormControl(null, Validators.required),
  });

  onComment() {
    const formdata = new FormData();
    formdata.append('comment', this.commentForm.get('comment')!.value!);
    this.blogServices.addAComment(this.id, formdata);
  }
  ngOnInit(): void {
    const id = this.route.snapshot.params['blogId'];
    this.id = id;
    this.blogServices.getABlog(id);
  }
}
