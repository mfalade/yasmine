import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class NavService {
  public currentView  = 'Identity';
  public userType     = 'first-user';
  public currentView$ = new BehaviorSubject<any>(this.currentView);
  public userType$    = new BehaviorSubject<any>(this.userType);

  constructor() {
    this.currentView$.next('Identity');
    this.currentView = 'Identity';
  }

  setCurrentView(value): void {
    this.currentView$.next(value);
    this.currentView = value;
  }

  setUserType(userType): void {
    this.userType$.next(userType);
    this.userType = userType;
  }

  resetState() {
    this.userType$.next('first-user');
    this.userType = 'first-user';

    this.currentView$.next('Identity');
    this.currentView = 'Identity';
  }
}
