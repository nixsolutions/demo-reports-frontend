import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { ReportsService }    from './reports.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  public upToDate: boolean = false;
  public upToTime: boolean = false;
  public reports: any = [];
  private stream: any;
  constructor( private _reportsService: ReportsService,
               private _router: Router ) { }

  ngOnInit() {
    this.getReports();
  }

  getReports() {
    this.stream = this._reportsService.getReports().subscribe( reports => {
      this._reportsService.reports = reports;
      this.reports = this._reportsService.reports;
    });
  }

  sortByDate() {
    if (!this.upToDate) {
      this.reports = this._reportsService.reports.sort( (a, b) => { return Date.parse(a.date) - Date.parse(b.date) });
      this.upToDate = true;
    } else {
      this.reports = this._reportsService.reports.sort( (a, b) => { return Date.parse(b.date) - Date.parse(a.date) });
      this.upToDate = false;
    }
  }

  sortByTime() {
    if (!this.upToTime) {
      this.reports = this._reportsService.reports.sort( (a, b) => { return (a.timeTaken) - (b.timeTaken) });
      this.upToTime = true;
    } else {
      this.reports = this._reportsService.reports.sort( (a, b) => { return (b.timeTaken) - (a.timeTaken) });
      this.upToTime = false;
    }
  }

  addReport() {
    this._reportsService.addReport({ date: new Date(), timeTaken: 0, description: 'Default note'})
      .subscribe( report => {
        this._reportsService.reports.push(report);
      })
}

  onLogOut() {
    window.localStorage.removeItem('NJTPUserToken');
    this._router.navigate(['signin']);
  }
}
