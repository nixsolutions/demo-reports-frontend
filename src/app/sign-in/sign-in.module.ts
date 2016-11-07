import { NgModule }        from '@angular/core';
import { CommonModule }    from '@angular/common';
import { FormsModule }     from '@angular/forms';
import { RouterModule }    from '@angular/router';
import { SignInComponent } from './sign-in.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  declarations: [SignInComponent],
  exports: [ SignInComponent ]
})
export class SignInModule { }
