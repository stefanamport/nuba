import { Component, OnInit } from '@angular/core';

import { JournalEntriesService } from './journalEntries.service';
import { AnalysisService } from '../analysis/service/analysis.service';
import { UserAccountService } from '../user-account/user-account.service';

@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.scss'],
  providers: [ JournalEntriesService, AnalysisService, UserAccountService ]
})
export class JournalComponent implements OnInit {

  mobCoachVisible = false;
  newHintAvailable = false;
  coachTip: any;

  constructor(private analysisService: AnalysisService) {

  }

  ngOnInit() {
    this.analysisService.initConsumptionAnalysis(new Date());
    this.analysisService.getConsumptionReport().subscribe((report) => {
      this.coachTip = report.recommendation;
      this.showNewHint();
    });
  }

  public mobCoachVisibility() {
     this.mobCoachVisible = !this.mobCoachVisible;
  }

  public showNewHint() {

  	// shakes Coach Box by CSS Animation :-)
    this.switchShowNewHint();

    let scope = this;

    setTimeout(function(){
       scope.switchShowNewHint();
    }, 1000);

  }

  private switchShowNewHint() {
    this.newHintAvailable = !this.newHintAvailable;
  }
}
