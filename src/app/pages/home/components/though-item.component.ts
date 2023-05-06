import { Component, Input, OnInit } from '@angular/core';
import { Blog } from 'src/app/utils/models/Blog.model';

@Component({
  selector: 'though-item',
  templateUrl: './though-item.component.html',
})
export class ThoughItemComponent implements OnInit {
  @Input() blog!: Blog;
  route: string = '';

  ngOnInit(): void {
    this.route = '/blogs/' + this.blog.id;
  }
}
