import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Config } from './../config/config';

import { AuthData } from './auth-data.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;

  private token: string;
  private tokenTimer: any;
  private authStatusListener = new Subject<boolean>();

/* A real project propably would need a token used in an auth-interceptor.ts
    something like this:

      intercept(req: HttpRequest<any>, next: HttpHandler) {
        const authToken = this.authService.getToken();
        const authRequest = req.clone({
          headers: req.headers.set("Authorization", "Bearer " + authToken)
        });
        return next.handle(authRequest);
      }
*/


  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  getIsAuth() {
    return this.isAuthenticated;
  }

  login(email: string, password: string) {
    const authData: AuthData = { email, password };
    this.http
      .post<{ token: string; expiresIn: number }>(
        `${Config.apiEndpoint}/login`,
        authData
      )
      .subscribe(response => {
        console.log(response);
        // token implementation is commented out
        // const token = response.token;
        // this.token = token;
      //   if (token) {
      //     const expiresInDuration = response.expiresIn;
        this.isAuthenticated = true;
        this.authStatusListener.next(true);
      //     const now = new Date();
      //     const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
      //     console.log(expirationDate);
      //     this.saveAuthData(token, expirationDate);
        this.router.navigate(['/']);
      //   }
      });
  }
}
