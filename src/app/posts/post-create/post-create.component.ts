import { Component, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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

  constructor() { }

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
      console.log(this.postForm);
      return;
    }
    // this.isLoading = true;
    if (this.mode === 'create') {
      // this.postService.addPost(this.form.value.title, this.form.value.content, this.form.value.image);
      // this.form.reset();
      console.log(this.postForm);
    } else {
      // this.postService.updatePost(this.postId, this.form.value.title, this.form.value.content, this.form.value.image);
    }
  }

}
