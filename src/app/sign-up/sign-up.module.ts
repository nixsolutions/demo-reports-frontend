import { NgModule }        from '@angular/core';
import { CommonModule }    from '@angular/common';
import { RouterModule }    from '@angular/router';
import { FormsModule }      from '@angular/forms';
import { SignUpComponent } from './sign-up.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  declarations: [ SignUpComponent ]
})
export class SignUpModule { }
