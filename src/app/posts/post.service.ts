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
  private postsListUpdated = new Subject<{posts: Post[]}>();
  // private postsListUpdated = new Subject<{posts: Post[], postCount: number}>();

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

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
              body: post.content,
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
}
