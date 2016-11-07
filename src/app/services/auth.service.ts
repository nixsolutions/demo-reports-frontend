import { Injectable }     from '@angular/core';
import { Http,
         Response,
         Headers,
         RequestOptions } from '@angular/http';
import { Observable }     from 'rxjs';

@Injectable()
export class AuthService {
  public URL = 'https://koa-reports-api.herokuapp.com';
  constructor(private _http: Http) {}

  isSignIn() {
      return !!window.localStorage.getItem('NJTPUserToken');
  }

  onSignUp(newUser) {
    return this._http.post(`${this.URL}/auth/sign-up`, newUser)
                     .map(this.extractData)
                     .catch(this.handleError);
  }

  onSignIn(user) {
    return this._http.post(`${this.URL}/auth/sign-in`, user)
                     .map(this.extractData)
                     .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }
  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    return Observable.throw(errMsg);
  }
}
