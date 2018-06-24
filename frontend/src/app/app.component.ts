import { Component, OnInit } from '@angular/core';
import { NavService } from './_services/nav.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public showQuickLinks = false;
  public currentView: string;
  public userType = 'first-user';
  public currRoute = '';


  constructor(
    private _sideNavService: NavService,
    private _router: Router,
    private _location: Location
  ) {
    _router.events.subscribe(ev => {
      this.currRoute = _location.path();
      this.showQuickLinks = this.shouldShowQuickLinks();
    });
  }

  ngOnInit() {
    this._sideNavService.currentView$.subscribe(view => this.currentView = view);
    this._sideNavService.userType$.subscribe(userType => {
      this.userType = userType;
      this.showQuickLinks = this.shouldShowQuickLinks();
    });
  }

  onNavItemClick(view: string) {
    this._sideNavService.setCurrentView(view);
  }

  shouldShowQuickLinks() {
    const x = this.currRoute.startsWith('/user') && this.userType === 'new-user';
    return this.currRoute.startsWith('/user') && this.userType === 'new-user';
  }
}
