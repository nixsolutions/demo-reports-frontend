import { Injectable }     from '@angular/core';
import { Http,
         Response,
         Headers,
         RequestOptions } from '@angular/http';
import { Observable }     from 'rxjs';
import { AuthService }    from '../services';
import { Router }         from '@angular/router';

@Injectable()
export class ReportsService  {
  public reports: Array<any> = [];

  constructor( private _http: Http,
               private _authService: AuthService,
               private _router: Router ) {}

  getReports() {
    let token = window.localStorage.getItem('NJTPUserToken');
    let headers = new Headers({ 'Authorization': token });
    let options = new RequestOptions({ headers: headers });
    return this._http.get(`${this._authService.URL}/reports`, options)
                     .map(this.extractData)
                     .catch(this.handleError.bind(this));
  }

  removeReport(id) {
    let token = window.localStorage.getItem('NJTPUserToken');
    let headers = new Headers({ 'Authorization': token });
    let options = new RequestOptions({ headers: headers });
    return this._http.delete(`${this._authService.URL}/reports/${id}`, options)
                     .catch(this.handleError.bind(this));
  }

  addReport(obj) {
    let token = window.localStorage.getItem('NJTPUserToken');
    let headers = new Headers({ 'Authorization': token });
    let options = new RequestOptions({ headers: headers });
    return this._http.post(`${this._authService.URL}/reports`, obj, options)
                     .map(this.extractData)
                     .catch(this.handleError.bind(this));
  }

  updateReport(obj) {
    let token = window.localStorage.getItem('NJTPUserToken');
    let headers = new Headers({ 'Authorization': token });
    let options = new RequestOptions({ headers: headers });
    return this._http.put(`${this._authService.URL}/reports/${obj.id}`, { date: obj.date, timeTaken: obj.timeTaken,                            description: obj.description }, options)
                     .map(this.extractData)
                     .catch(this.handleError.bind(this));
  }

  private extractData(res: Response) {
    let body = res.json();
    return body;
  }

  private handleError (error: any) {
    let err = error.json();
    if (err.name === 'UnauthorizedError') {
      window.localStorage.removeItem('NJTPUserToken');
      this._router.navigate(['signin']);
    };
    let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    return Observable.throw(errMsg);
  }
}
