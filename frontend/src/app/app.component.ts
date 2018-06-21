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


  constructor(
    private _nav: NavService,
    private _router: Router,
    private _location: Location
  ) {
    _router.events.subscribe(ev => {
      const currRoute = _location.path();
      this.showQuickLinks = currRoute.startsWith('/user');
    });
  }

  ngOnInit() {
    this._nav.currentView$.subscribe(view => this.currentView = view);
  }

  onNavItemClick(view: string) {
    this._nav.setCurrentView(view);
  }
}
