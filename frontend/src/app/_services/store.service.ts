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
    const requestData = this.studentRequests.filter(x => x._id !== request._id);
    this.studentRequests$.next(requestData);
    this.studentRequests = requestData;
    this.saveStudentRequests();
  }

  updateRequest(data): void {
    const idx = this.studentRequests.findIndex(x => x._id === data._id);
    const requestData = Object.assign([...this.studentRequests], { [idx]: data });

    this.studentRequests$.next(requestData);
    this.studentRequests = requestData;

    this.saveStudentRequests();
  }

  saveStudentRequests(): void {
    this.clearStudentsFromLocalStorage();
    localStorage.setItem('studentRequests', JSON.stringify(this.studentRequests));
  }

  getItem(itemId): any {
    return this.studentRequests.find(x => x._id === itemId);
  }

  clearStudentsFromLocalStorage() {
    localStorage.removeItem('studentRequests');
  }
  
  clearAll(): void {
    localStorage.removeItem('studentRequests');
    this.studentRequests$.next([]);
    this.studentRequests = [];
  }
}
