import { Component, OnInit } from '@angular/core';
import { AnalysisService } from './service/analysis.service';
import { JournalEntriesService } from '../journal/journalEntries.service';
import { ConsumptionReport } from './model/consumptionReport';
import { DateChooserService } from '../shared/date-chooser.service';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.scss'],
  providers: [ AnalysisService, JournalEntriesService ]
})
export class AnalysisComponent implements OnInit {

  public report: ConsumptionReport;
  public reportArray = [];

  public aniListState = 'loaded';
  public componentIsLoading = true;

  public selectedDate: Date;

  constructor(private analysisService: AnalysisService,
              private dateChooserService: DateChooserService
  ) {
  }

  ngOnInit() {

    this.dateChooserService.getChosenDateAsObservable().subscribe((newdate) => {
      this.selectedDate = newdate;
      this.setSelectedDate(newdate);
    });

    this.analysisService.getConsumptionReport().subscribe((report) => {
      // start symphony on new report
      this.transitionSymphony(report);

    });
  }

  private setReportVars(report) {

      let rArr = [];

      report.analysis.forEach((val, key) => {
            rArr.push({
                title: key,
                vals: val
            });
      });

      // load reports in class variables
      let prevReportArray = this.reportArray;

      this.report = report;
      this.reportArray = rArr;
  }

  private setSelectedDate(selectedDate) {
    this.analysisService.initConsumptionAnalysis(selectedDate);
  }

  // Methods for displaying charts

  // length of chart bar
  public cartBarLength(input: number) {

    if (input > 100) {
      input = 100;
    }
    if (input < 3) {
      input = 3;
    }

    let percent = input + '%';
    return percent;
  }

  // Position of current value
  public chartCurrentPos (input: number) {

    let pos = 100 - input;

    // maximale Ausrichtung rechts
    if (pos < 0.5) {
      pos = 0.5;
    }

    // minimale Ausrichtung links
    if (pos > 97) {
      pos = 97;
    }

    let percent = pos + '%';
    return percent;
  }

  // dropout functionality
  public dropoutGroup(category) {
    if (category) {
      if (category.open) {
        category.open = false;
      } else {
        category.open = true;
      }
    }
  }

  // method for visual loading indication
  // a little symphony ;-)
  private transitionSymphony (report) {

    let timeout = 300;
    let that = this;

    // fast forward on first load
    if (report.analysisComplete && this.componentIsLoading) {

      this.setReportVars(report);

      // component isnt loading anymore
      this.componentIsLoading = false;

      // slide out first category
      this.initialDropoutStates();

      this.aniListState = 'loaded';

     // symphony after first load
     } else if (report.analysisComplete) {

      this.aniListState = 'changing';

      setTimeout( function(){
          that.setReportVars(report);
      }, timeout);

      setTimeout( function(){
          that.aniListState = 'loaded';
      }, timeout * 2);

    }

  }

  // open first Entry after 1 Second
  // To show off dropout functionality
  private initialDropoutStates() {

    if (this.reportArray.length > 0) {
      let that = this;

      setTimeout( function(){
        that.reportArray[0].open = true;
      }, 1000);

    }

  }
}
