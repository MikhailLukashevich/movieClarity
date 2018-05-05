import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  userEmail: string;
  userIcon: boolean;
  user_subscription: Subscription;

  constructor(
    private user: UserService,
    private router: Router) { }

  ngOnInit() {
    this.userEmail = this.user.email;
    this.userIcon = this.user.isAuthenticated();

    this.user_subscription = this.user.authenticated.subscribe(() => {
      this.userEmail = this.user.email;
      this.userIcon = this.user.isAuthenticated();
    });
  }

  ngOnDestroy() {
    this.user_subscription.unsubscribe();
  }

  onLogout() {
    this.user.logout().subscribe(res => {
      if (res) {
        this.router.navigate(['login']);
      }
    });
  }

}
