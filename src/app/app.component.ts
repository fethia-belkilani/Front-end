import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { AuthenticationService } from './_services';
import { User, Role } from './_models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isCollapsed = false;
  constructor(public router: Router, private authenticationService: AuthenticationService) {
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);

  }
  currentUser: User;



  get isAdmin() {
      return this.currentUser && this.currentUser.role === Role.Admin;
  }

  logout() {
      this.authenticationService.logout();
      this.router.navigate(['login']);
  }

}
