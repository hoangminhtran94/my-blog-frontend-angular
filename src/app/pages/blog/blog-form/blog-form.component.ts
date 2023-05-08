import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BlogServices } from '../service/blog.service';

@Component({
  selector: 'blog-form-page',
  templateUrl: './blog-form.component.html',
})
export class BlogFormPage {
  blogForm = new FormGroup({
    title: new FormControl('', Validators.required),
    excerpt: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required),
  });
  blogService = inject(BlogServices);
  tags = this.blogService.tags;
  imageSrc?: string;
  file?: File;
  toggle: boolean = false;
  selectedTags: string[] = [];
  onSubmit = () => {
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

    this.blogService.addABlog(formdata);
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
}
