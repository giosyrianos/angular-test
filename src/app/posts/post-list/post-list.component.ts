import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Post } from '../post.model';

import { PostService } from '../post.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
