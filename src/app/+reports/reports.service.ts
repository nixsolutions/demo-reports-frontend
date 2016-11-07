import { Injectable }  from '@angular/core';
import { Http,
         Response,
         Headers,
         RequestOptions } from '@angular/http';
import { Observable }     from 'rxjs';
import { AuthService } from '../services';

@Injectable()
export class ReportsService  {
  private token: any = window.localStorage.getItem('NJTPUserToken');
  public reports: Array<any> = [];

  constructor( private _http: Http,
               private _authService: AuthService ) {}

  getReports() {
    let headers = new Headers({ 'Authorization': this.token });
    let options = new RequestOptions({ headers: headers });
    return this._http.get(`${this._authService.URL}/reports`, options)
                     .map(this.extractData)
                     .catch(this.handleError);
  }

  removeReport(id) {
    let headers = new Headers({ 'Authorization': this.token });
    let options = new RequestOptions({ headers: headers });
    return this._http.delete(`${this._authService.URL}/reports/${id}`, options)
                     .catch(this.handleError);
  }

  addReport(obj) {
    let headers = new Headers({ 'Authorization': this.token });
    let options = new RequestOptions({ headers: headers });
    return this._http.post(`${this._authService.URL}/reports`, obj, options)
                     .map(this.extractData)
                     .catch(this.handleError);
  }

  updateReport(obj) {
    let headers = new Headers({ 'Authorization': this.token });
    let options = new RequestOptions({ headers: headers });
    return this._http.put(`${this._authService.URL}/reports/${obj.id}`, { date: obj.date, timeTaken: obj.timeTaken,                            description: obj.description }, options)
                     .map(this.extractData)
                     .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body;
  }

  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    return Observable.throw(errMsg);
  }
}
