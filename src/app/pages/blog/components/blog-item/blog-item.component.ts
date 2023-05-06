import { Component, Input, OnInit } from '@angular/core';
import { Blog } from 'src/app/utils/models/Blog.model';
@Component({
  selector: 'blog-item',
  templateUrl: './blog-item.component.html',
})
export class BlogItemComponent implements OnInit {
  @Input() blog!: Blog;

  ngOnInit(): void {}
}
