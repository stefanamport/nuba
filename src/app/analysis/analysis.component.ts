import { Component, OnInit } from '@angular/core';
import { AnalysisService } from './service/analysis.service';
import { JournalEntriesService } from '../journal/journalEntries.service';
import { ConsumptionReport } from './model/consumptionReport';
import { DateChooserService } from '../shared/date-chooser.service';

import { ComponentCategory } from './model/constants';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.scss'],
  providers: [ AnalysisService, JournalEntriesService ]
})
export class AnalysisComponent implements OnInit {

  public report: ConsumptionReport;
  public reportArray: Array<any>;

  constructor(private analysisService: AnalysisService,
              private userService: UserService,
              private firebaseService: FirebaseService,
              private journalEntriesService: JournalEntriesService
  ) {

  }

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

  public dropoutGroup(category) {
    if (category.open) {
      category.open = false;
    } else {
      category.open = true;
    }
  }

  private initialDropoutStates() {

    // open first Entry afert 1 Second
    // To show of dropout functionality
    let localReportArray = this.reportArray;

    setTimeout( function(){
      localReportArray[0].open = true;
    }, 1000);

  }

  private setReportVars(report) {

      let rArr = [];

      report.analysis.forEach((val, key) => {
            rArr.push({
                title: key,
                vals: val
            });
      });

      this.report = report;
      this.reportArray = rArr;

      if (this.reportArray.length > 0) {
        this.initialDropoutStates();
      }
  }

  ngOnInit() {
    let selectedDate = this.dateChooserService.getChosenDate();
    this.analysisService.initConsumptionAnalysis(selectedDate);
    this.analysisService.getConsumptionReport().subscribe((report) => {

      this.setReportVars(report);

    });
  }
}
