import { Component, OnInit, Input } from '@angular/core';
import { ReportsService }           from '../reports.service';

@Component({
  selector: '.app-report',
  templateUrl: 'report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  @Input() report: any;
  private isEditTimeTaken: boolean = false;
  private isEditDescription: boolean = false;
  private isEditDate: boolean = false;
  private isIncorrectFormat: boolean = false;
  private currentTimeTaken: any;
  constructor( private _reportsService: ReportsService ) { }

  ngOnInit() {
    this.currentTimeTaken = this.report.timeTaken;
    this.decorateTimeTaken();
  }

  onEditTimeTaken() {
    this.isIncorrectFormat = true;
    this.decorateTimeTaken();
    this.isEditTimeTaken = true;
  }

  decorateTimeTaken() {
    let seconds: any = Math.floor((this.currentTimeTaken/1000)%60);
    let minutes: any = Math.floor((this.currentTimeTaken/(1000*60))%60);
    let hours: any = Math.floor((this.currentTimeTaken/(1000*60*60))%24);
    if (minutes < 10) minutes = `0${minutes}`;
    if (hours < 10) hours = `0${hours}`;
    this.report.timeTaken = `${hours}.${minutes}`;
  }

  onEditDescription() {
    this.isEditDescription = true;
  }

  onEditDate() {
    this.isEditDate = true;
  }

  changeDescription(value) {
    if (!value) return;
    this.updateReport('description');
    this.isEditDescription = false;
  }

  changeTimeTaken(value) {
    if (+value) {
      value = value.split('.');
      if ( value.length > 2 || value[0] > 24 || value[1] > 60) {
          this.isIncorrectFormat = true;
          return false;
      } else {
        value = (value[0]*60*60*1000) + (value[1]*60*1000);
      }
    } else {
      value = value.match(/([0-9]+[0-9]*|[0-9]+)([0-9]+)?/g)
      if (value.length > 2 || value[0] > 24 || value[1] > 60 ) {
         this.isIncorrectFormat = true;
         return false;
      }
      value = ((value[0]*60*60*1000) + (value[1]*60*1000));
    }
    this.report.timeTaken = value;
    this.currentTimeTaken = value;
    this.updateReport('timeTaken');
    this.isIncorrectFormat = true;
    this.isEditTimeTaken = false;
  }

  changeDate() {
    this.updateReport('date');
    this.isEditDate = false;
  }

  updateReport(value) {
    let report = this.report;
    if (value === 'description' || value === 'date') {
      report.timeTaken = this.currentTimeTaken;
    }
    this._reportsService.updateReport(report)
      .subscribe( report => { this.decorateTimeTaken() })
  }

  onRemove(id) {
    this._reportsService.removeReport(id)
      .subscribe( () => {
        const findItem = this._reportsService.reports.filter( value => value.id === id)[0];
        findItem && this._reportsService.reports.splice(this._reportsService.reports.indexOf(findItem), 1);
      })
  }
}
