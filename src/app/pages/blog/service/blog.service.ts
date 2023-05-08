import { Injectable, signal, inject, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Blog } from 'src/app/utils/models/Blog.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BlogServices {
  http = inject(HttpClient);
  public blogs = signal<Blog[]>([]);
  public tags = signal<{ id: number; caption: string }[]>([]);
  public currentBlog = signal<Blog | null>(null);

  setBlogs() {
    this.http
      .get<{ blogs: Blog[]; tags: { id: number; caption: string }[] }>(
        'http://localhost:8000/api/blogs/'
      )
      .pipe(
        map((res, index) => {
          console.log(res);
          return {
            ...res,
            blogs: res.blogs.map((blog) => ({
              ...blog,
              updated_at: new Date(blog.updated_at).toLocaleDateString(),
            })),
          };
        })
      )
      .subscribe((res) => {
        this.tags.set(res.tags);
        this.blogs.set(res.blogs);
      });
  }

  //   addBlog() {
  //     this.blogs.update((blogs) => [
  //       ...blogs,
  //       { id: '3', name: 'Testting', content: 'Lorem', image: '' },
  //     ]);
  //     return this.blogs();
  //   }
  getABlog(id: string) {
    if (this.blogs().length === 0) {
      this.http
        .get<Blog>('http://localhost:8000/api/blogs/' + id)
        .subscribe((res) => {
          this.currentBlog.set(res);
        });
    } else {
      this.currentBlog.set(
        this.blogs().find((blog) => blog.id.toString() === id)!
      );
    }
  }

  addAComment(id: string, comment: string) {
    this.http
      .post(
        `http://localhost:8000/api/blogs/${id}/comment`,
        JSON.stringify({ comment: comment }),
        { headers: { 'Content-type': 'application/json' } }
      )
      .subscribe((res) => {
        console.log(res);
      });
  }
  addABlog(formData: FormData) {
    this.http
      .post('http://localhost:8000/api/blogs/add-new', formData, {
        withCredentials: true,
      })
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (e) => {
          console.log(e);
        },
      });
  }
}
