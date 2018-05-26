import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import config from '../_shared/config';
import Utils from '../_shared/utils';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


const handleError = (error: any) => {
  let err: any;
  if (error._body) {
    err = JSON.parse(error._body);
  }

  const customError = error.error;
  if (customError && customError.isCustom) {
    err = customError;
  }
  return Observable.throw(err);
};


@Injectable()
export class RequestService {
  readonly apiHost = config.API_HOST;
  private _requestOption: RequestOptions;

  constructor(
    private http: Http
  ) {
    this.setRequestHeaders();
  }

  get(url: string, callback?: any): Observable<any> {
    return this.http
      .get(`${this.apiHost}/${url}`, this._requestOption)
      .do(callback)
      .map(this.extractData)
      .catch(handleError);
  }
  post(url: string, data?: Object, callback?: any): Observable<any> {
    return this.http
      .post(`${this.apiHost}/${url}`, data, this._requestOption)
      .do(callback)
      .map(this.extractData)
      .catch(handleError);
  }
  patch(url: string, data: Object, callback?: any): Observable<any> {
    return this.http
      .patch(`${this.apiHost}/${url}`, data, this._requestOption)
      .do(callback)
      .map(this.extractData)
      .catch(handleError);
  }
  put(url: string, data: Object, callback?: any): Observable<any> {
    return this.http
      .put(`${this.apiHost}/${url}`, data, this._requestOption)
      .do(callback)
      .map(this.extractData)
      .catch(handleError);
  }
  delete(url: string, callback?: any): Observable<any> {
    return this.http
      .delete(`${this.apiHost}/${url}`, this._requestOption)
      .do(callback)
      .map(this.extractData)
      .catch(handleError);
  }
  extractData(res) {
    const resText = res.text();
    return resText ? JSON.parse(resText) : {};
  }
  clearRequestHeaders() {
    this._requestOption = new RequestOptions({ headers: new Headers() });
  }
  setRequestHeaders() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    this._requestOption = new RequestOptions({ headers });
  }
}

