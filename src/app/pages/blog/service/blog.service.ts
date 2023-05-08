import { Injectable, signal, inject, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Blog } from 'src/app/utils/models/Blog.model';
import { map } from 'rxjs';
import { Comment } from 'src/app/utils/models/Comment.model';

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
  async getABlog(id: string) {
    if (this.blogs().length === 0) {
      return new Promise((resolve, reject) => {
        this.http
          .get<Blog>('http://localhost:8000/api/blogs/' + id)
          .subscribe((res) => {
            resolve(res);
            this.currentBlog.set({
              ...res,
              updated_at: new Date(res.updated_at).toLocaleDateString(),
            });
          });
      });
    } else {
      return new Promise((resolve, reject) => {
        this.currentBlog.set(
          this.blogs().find((blog) => blog.id.toString() === id)!
        );
        resolve(this.blogs().find((blog) => blog.id.toString() === id)!);
      });
    }
  }

  addAComment(id: string, formData: FormData) {
    this.http
      .post<Comment>(
        `http://localhost:8000/api/blogs/${id}/comment`,
        formData,
        {
          withCredentials: true,
        }
      )
      .subscribe((res) => {
        this.blogs.mutate((blogs) => {
          const index = blogs.findIndex((blog) => blog.id.toString() === id);
          const currentBlog = blogs[index];
          blogs[index] = {
            ...currentBlog,
            comments: [...currentBlog.comments, res],
          };
        });
        this.currentBlog.mutate((blog) => {
          blog?.comments.push(res);
        });
      });
  }
  addABlog(formData: FormData) {
    this.http
      .post<Blog>('http://localhost:8000/api/blogs/add-new', formData, {
        withCredentials: true,
      })
      .subscribe({
        next: (res) => {
          this.blogs.update((blogs) => [
            {
              ...res,
              updated_at: new Date(res.updated_at).toLocaleDateString(),
            },
            ...blogs,
          ]);
        },
        error: (e) => {
          console.log(e);
        },
      });
  }
  updateABlog(formData: FormData, id: string) {
    this.http
      .post<Blog>('http://localhost:8000/api/blogs/' + id, formData, {
        withCredentials: true,
      })
      .subscribe({
        next: (res) => {
          this.blogs.mutate((blogs) => {
            const index = blogs.findIndex((blog) => blog.id.toString() === id);
            console.log(index);
            blogs[index] = res;
          });
        },
        error: (e) => {
          console.log(e);
        },
      });
  }
}
