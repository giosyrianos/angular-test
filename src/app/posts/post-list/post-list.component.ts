import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Post } from '../post.model';
import { PostService } from '../post.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from './../../components/modal/modal.component';

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

  postsPerPage = 5;

  pageSizeOptions = [5, 10, 20];
  constructor(
    private modalService: NgbModal,
    private postService: PostService,
    private router: Router
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

  createNewPost() {
    this.router.navigateByUrl('/create-post');
  }

  editPost(postId: string) {
    this.router.navigateByUrl('/edit/' + postId);
  }

  openModal(item: Post) {
    const modalRef = this.modalService.open(ModalComponent,
      {
        scrollable: true,
        windowClass: 'myCustomModalClass',
        centered: true
      });

    const data = {
      header: `Delete post: ${item.id} ?`,
      body: `${item.title}`,
      confirmTxt: 'Delete',
      dismissTxt: 'Cancel'
    };

    modalRef.componentInstance.fromParent = data;
    modalRef.result.then((result) => {
      if (result === 'confirm') {
        this.postService.deletePost(item.id).subscribe((res) => {
          this.postService.getPosts();
        });
        return;
      }
      return;
    }, (reason) => {
      console.log('modalRef.reason:', reason);
    });
  }

  ngOnDestroy()  {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
    this.postsSub.unsubscribe();
  }

}
