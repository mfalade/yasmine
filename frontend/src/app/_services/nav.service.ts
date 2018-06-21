import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class NavService {

  public currentView = 'Identity';

  public currentView$ = new BehaviorSubject<any>(this.currentView);

  constructor() {
    this.currentView$.next('Identity');
    this.currentView = 'Identity';
  }

  setCurrentView(value): void {
    this.currentView$.next(value);
    this.currentView = value;
  }
}
