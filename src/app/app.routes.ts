import { ModuleWithProviders }    from '@angular/core';
import { Routes, RouterModule }   from '@angular/router';

import { SignInComponent }        from './sign-in';
import { SignUpComponent }        from './sign-up';
import { ReportsComponent }       from './+reports';
import { NoContentComponent }     from './no-content';

import { CanActivateUserService } from './services';

const Routes: Routes = [
  { path: '', redirectTo: 'signin', pathMatch: 'full' },
  { path: 'signin', component: SignInComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'reports', component: ReportsComponent, canActivate: [ CanActivateUserService ] },
  { path: '**',    component: NoContentComponent }
];

export const AppRouting: ModuleWithProviders = RouterModule.forRoot(Routes, {useHash: true});
