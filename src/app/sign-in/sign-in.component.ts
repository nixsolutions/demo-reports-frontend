import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { AuthService }       from '../services';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html'
})
export class SignInComponent implements OnInit {
  private user: any = {
    email: '',
    password: ''
  }
  constructor( private _authService: AuthService,
               private _router: Router ) { }

  ngOnInit() {
    if (!!window.localStorage.getItem('NJTPUserToken')) this._router.navigate(['reports']);
  }

  onSubmit() {
    this._authService.onSignIn(this.user).subscribe( user => {
      window.localStorage.setItem('NJTPUserToken', `Bearer ${user.token}`);
      this._router.navigate(['reports']);
    })
  }
}
