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
  public categories: Array<any>;

  constructor(private analysisService: AnalysisService,
              private userService: UserService,
              private firebaseService: FirebaseService,
              private journalEntriesService: JournalEntriesService
  ) {

    this.categories = [
      {title: 'Makronährstoffe', catTitle: 'macronutrient'}
      ];

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

  private openFirstDropoutGroup() {
    this.dropoutGroup(this.categories[0]);
  }

  ngOnInit() {
    let selectedDate = this.dateChooserService.getChosenDate();
    this.analysisService.initConsumptionAnalysis(selectedDate);
    this.analysisService.getConsumptionReport().subscribe((report) => {
      console.log(report);
      this.report = report;

      if (this.report.analysis.size > 0) {
        this.openFirstDropoutGroup();
      }

    });
  }
}
