import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http/';
import { Config } from './../config/config';
import { Post } from './post.model';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private posts: Post[] = [];
  private postsListUpdated = new Subject<{ posts: Post[] }>();
  // private postsListUpdated = new Subject<{posts: Post[], postCount: number}>();

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  updatePostsListener() {
    return this.postsListUpdated.asObservable();
  }

  getPosts() {
    // getPosts(postsPerPage: number, currentPage: number) {}
    // Possible query params for serverside pagination
    // const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
    this.http
      .get<any>(`${Config.apiEndpoint}`)
      .pipe(
        map((postData) => {
          return {
            posts: postData.map(post => {
              // In case property names from server response are not compatible with the Post Model
              return {
                userId: post.userId,
                title: post.title,
                content: post.body,
                id: post.id
              };
            }),
            // totalPosts: postData.length
          };
        })
      )
      .subscribe((regularPostData) => {
        this.posts = regularPostData.posts;
        this.postsListUpdated.next({
          posts: [...this.posts]
          // postCount: regularPostData.totalPosts
        });
      });
    return [...this.posts];
  }


  addPost(title: string, content: string) {
    const postData: Post = {
      userId: 1, // change later
      id: null,
      title,
      content
    };
    this.http
      .post<any>(
        `${Config.apiEndpoint}`,
        postData
      )
      .subscribe(responseData => {
        // console.log({ responseData });
        const newPost: Post = {
          userId: responseData.userId,
          id: responseData.id,
          title: responseData.title,
          content: responseData.content
        };
        this.posts.push(newPost);
        this.postsListUpdated.next({
          posts: [...this.posts]
          // Updated post-list will be overwritten on redirect
          //  since fake bakcend does not save new data
        });
        this.router.navigate(['/']);
      });
  }

  getPost(id: string) {
    return this.http.get<{
      userId: number
      id: number;
      title: string;
      body: string;
    }>(`${Config.apiEndpoint}/${+id}`);
  }

  updatePost(id: string, title: string, content: string) {
    // const post: Post = { id, title, content, imgPath: null };
    const postData = {
      id: +id,
      title,
      content
    };
    this.http
      .put(`${Config.apiEndpoint}/${id}`, postData)
      .subscribe(res => {
        console.log(res);
        // const updatedPosts = [...this.posts];
        // const oldPostIndex = updatedPosts.findIndex(p => p.id === id);
        // const post: Post = {
        //   id,
        //   title,
        //   content,
        //   imgPath: ''
        // };
        // updatedPosts[oldPostIndex] = post;
        // this.posts = updatedPosts;
        // this.postsListUpdated.next([...this.posts]);
        this.router.navigate(['/']);
      });
  }

  deletePost(postId: number) {
    return this.http.delete(`${Config.apiEndpoint}/${postId}`);
      // .subscribe((msg) => {
      //   console.log(msg);
      //   const newPostList = this.posts.filter(post => post.id !== postId);
      //   this.posts = newPostList;
      //   this.postsListUpdated.next([...this.posts]);
      // });
  }

}
