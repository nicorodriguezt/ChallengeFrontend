import { Component } from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSidenavModule} from "@angular/material/sidenav";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {Router, RouterOutlet} from "@angular/router";
import {AuthService} from "../../Services/authService/auth.service";
import {MatRippleModule} from "@angular/material/core";

@Component({
  selector: 'app-side-nav',
  templateUrl: './main-toolbar.component.html',
  styleUrls: ['./main-toolbar.component.scss'],
  imports: [
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    NgClass,
    RouterOutlet,
    NgForOf,
    MatRippleModule,
    NgIf
  ],
  standalone: true
})
export class MainToolbarComponent {

  loggedUserName: string = '';


  color: string = 'black';

  constructor(public router: Router, private authService: AuthService) {
    if (authService.session) {
      this.loggedUserName = authService.session.firstName + ' ' + authService.session.lastName;
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('login')
  }

}
