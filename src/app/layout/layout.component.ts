import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services';
import { User, Role } from '../_models';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {

  constructor(public router: Router, private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  isCollapsed = false;
  currentUser: User;

  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.Admin;
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['login']);
  }
}
