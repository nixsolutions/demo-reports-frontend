import { BrowserModule }          from '@angular/platform-browser';
import { NgModule }               from '@angular/core';
import { FormsModule }            from '@angular/forms';
import { HttpModule }             from '@angular/http';
import { RouterModule }           from '@angular/router';

import { AuthService }            from './services';
import { CanActivateUserService } from './services';
import { AppRouting }             from './app.routes';

import { AppComponent }           from './app.component';

import { SignInModule }           from './sign-in';
import { SignUpModule }           from './sign-up';
import { ReportsModule }          from './+reports';
import { NoContentComponent }     from './no-content/no-content.component';


@NgModule({
  declarations: [
    AppComponent,
    NoContentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule,
    SignInModule,
    SignUpModule,
    ReportsModule,
    AppRouting
  ],
  providers: [ AuthService, CanActivateUserService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
