import { Component, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PostService } from '../post.service';

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
    private postService: PostService
  ) { }

  ngOnInit() {
    this.postForm = new FormGroup({
      // Adding form controls here
        title: new FormControl('', {
          validators: [Validators.required, Validators.minLength(3)]
        }),
        content: new FormControl(null, {
          validators: [Validators.required]
        })
    });
    this.mode = 'create';
    this.postId = null;
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
      // this.postService.updatePost(this.postId, this.form.value.title, this.form.value.content, this.form.value.image);
    }
  }

}
