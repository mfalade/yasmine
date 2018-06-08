import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class StoreService {

  public studentRequests = [];

  public studentRequests$ = new BehaviorSubject<any>(this.studentRequests);

  constructor() {
    const requests = JSON.parse(localStorage.getItem('studentRequests')) || [];
    this.studentRequests$.next(requests);
    this.studentRequests = requests;
  }

  addStudentRequest(value): void {
    const requestData = [...this.studentRequests, value];
    this.studentRequests$.next(requestData);
    this.studentRequests = requestData;
    this.saveStudentRequests();
  }

  deleteRequest(request): void {
    const requestData = this.studentRequests.filter(x => x.requestId !== request.requestId);
    this.studentRequests$.next(requestData);
    this.studentRequests = requestData;
    this.saveStudentRequests();
  }

  updateRequest(data): void {
    const idx = this.studentRequests.findIndex(x => x.requestId === data.requestId);
    const requestData = Object.assign([...this.studentRequests], { [idx]: data });

    this.studentRequests$.next(requestData);
    this.studentRequests = requestData;

    this.saveStudentRequests();
  }

  saveStudentRequests(): void {
    this.clearAll();
    localStorage.setItem('studentRequests', JSON.stringify(this.studentRequests));
  }

  getItem(itemId): any {
    return this.studentRequests.find(x => x.requestId === itemId);
  }

  clearAll(): void {
    localStorage.removeItem('studentRequests');
  }
}
