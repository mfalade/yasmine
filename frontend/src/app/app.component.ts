import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public currentRoute;
  public profileAsideNav = false;

  constructor(
    private location: Location,
    private router: Router
  ) {
    router.events
    .subscribe(
      (val) => {
        this.currentRoute = location.path();
        this.profileAsideNav = this.currentRoute === '/requests' || this.currentRoute === '/requests/add';
      }
    );
  }
}
