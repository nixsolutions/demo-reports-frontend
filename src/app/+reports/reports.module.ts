import { NgModule }         from '@angular/core';
import { CommonModule }     from '@angular/common';
import { FormsModule }      from '@angular/forms';
import { ReportsComponent } from './reports.component';
import { ReportsService }   from './reports.service';
import { ReportComponent }  from './report';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [ ReportsComponent, ReportComponent ],
  exports: [ ReportsComponent ],
  providers: [ ReportsService ]
})
export class ReportsModule { }
