import { Component, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PostService } from '../post.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from './../../components/modal/modal.component';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {
  enteredTitle = '';
  enteredContent = '';
  isLoading = false;
  postForm: FormGroup;
  invalidTitle = false;
  invalidContent = false;
  post: Post;
  private mode = 'create';
  private postId: string;

  constructor(
    private postService: PostService,
    private modalService: NgbModal,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.postForm = new FormGroup({
      // Adding form controls here
        title: new FormControl(null, {
          validators: [Validators.required, Validators.minLength(3)]
        }),
        content: new FormControl(null, {
          validators: [Validators.required]
        })
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.isLoading = true;
        this.postService.getPost(this.postId).subscribe(postData => {
          this.isLoading = false;
          this.post = {
            userId: postData.userId,
            id: postData.id,
            title: postData.title,
            content: postData.body,
          };
          this.postForm.setValue({
            title: this.post.title,
            content: this.post.content,
          });
        });
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }

  onSavePost() {
    if (this.postForm.invalid) {
      // console.log(JSON.stringify(this.postForm));
      return;
    }
    // this.isLoading = true;
    if (this.mode === 'create') {
      this.postService.addPost(this.postForm.value.title, this.postForm.value.content);
      this.postForm.reset();
    } else {
      this.postService.updatePost(this.postId, this.postForm.value.title, this.postForm.value.content);
    }
  }

  dismiss() {
    const modalRef = this.modalService.open(ModalComponent,
      {
        scrollable: true,
        windowClass: 'myCustomModalClass',
        centered: true
      });

    const data = {
      header: `Do you want to Cancel?`,
      body: `Any unsaved changes will be lost`,
      confirmTxt: 'Delete changes',
      dismissTxt: 'Cancel'
    };

    modalRef.componentInstance.fromParent = data;
    modalRef.result.then((result) => {
      if (result === 'confirm') {

        return;
      }
      return;
    }, (reason) => {
      console.log('modalRef.reason:', reason);
    });
  }

}
