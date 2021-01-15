import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Post } from '../post.model';

import { PostService } from '../post.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {
  public posts: Post[] = [];
  private postsSub: Subscription;

  pageOfPosts: Array<Post>;
  isLoading = false;

  totalPosts = 0;

  currentPage = 1;

  postsPerPage = 2;

  pageSizeOptions = [1, 3, 4, 10];
  constructor(
    public postService: PostService
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.postService.getPosts();
    // this.postService.getPosts(this.postsPerPage, this.currentPage);
    this.postsSub = this.postService.updatePostsListener()
      .subscribe((postData: {posts: Post[]}) => {
        this.isLoading = false;
        this.posts = postData.posts;
        // this will take posts count from back end in order to paginate data
        this.totalPosts = this.posts.length;
        console.log(this.posts);
      });
  }

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfPosts = pageOfItems;
  }


  ngOnDestroy()  {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
    this.postsSub.unsubscribe();
  }

}
