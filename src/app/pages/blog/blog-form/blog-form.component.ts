import { Component, inject, OnInit, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BlogServices } from '../service/blog.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'blog-form-page',
  templateUrl: './blog-form.component.html',
})
export class BlogFormPage implements OnInit {
  blogForm = new FormGroup({
    title: new FormControl('', Validators.required),
    excerpt: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required),
  });
  blogService = inject(BlogServices);
  route = inject(ActivatedRoute);
  router = inject(Router);
  id?: string;
  tags = this.blogService.tags;
  currentBlog = this.blogService.currentBlog;
  imageSrc?: string;
  file?: File;
  toggle: boolean = false;
  selectedTags: string[] = [];

  onSubmit = async () => {
    const title = this.blogForm.get('title')!.value;
    const content = this.blogForm.get('content')!.value;
    const excerpt = this.blogForm.get('excerpt')!.value;
    if (!title || !content || !excerpt) {
      return;
    }
    const formdata = new FormData();
    formdata.append('title', title);
    formdata.append('content', content);
    formdata.append('excerpt', excerpt);
    formdata.append('image', this.file ?? '');
    this.selectedTags.forEach((tag) => {
      formdata.append('tags', tag);
    });
    if (this.id) {
      await this.blogService.updateABlog(formdata, this.id);
    } else {
      await this.blogService.addABlog(formdata);
    }
    this.router.navigateByUrl('/blogs');
  };

  onSelectFile(event: Event) {
    this.file = (event.target as HTMLInputElement).files![0];
    this.imageSrc = URL.createObjectURL(this.file);
  }
  onDropdown() {
    this.toggle = !this.toggle;
  }
  onSelectOption = (option: string) => {
    this.selectedTags = [...this.selectedTags, option];
  };
  ngOnInit() {
    const currentRouteId = this.route.snapshot.params['blogId'];
    this.id = currentRouteId;
    if (currentRouteId) {
      this.imageSrc = this.currentBlog()?.image;
      this.selectedTags = this.currentBlog()?.tags!;
      this.blogForm
        .get('title')
        ?.setValue(this.currentBlog() ? this.currentBlog()!.title : '');
      this.blogForm
        .get('content')
        ?.setValue(this.currentBlog() ? this.currentBlog()!.content : '');
      this.blogForm
        .get('excerpt')
        ?.setValue(this.currentBlog() ? this.currentBlog()!.excerpt : '');
    }
  }
}
