import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { runInThisContext } from 'vm';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLoggedIn: boolean;
  private authListenerSubs: Subscription;

  constructor(
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.isLoggedIn = this.auth.getIsAuth();
    this.authListenerSubs = this.auth
    .getAuthStatusListener()
    .subscribe(isAuthenticated => {
      this.isLoggedIn = isAuthenticated;
    });
  }

  onLogOut() {
    this.auth.logout()
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }

}
