import { Component, OnInit } from '@angular/core';

import { JournalEntriesService } from './journalEntries.service';
import { AnalysisService } from '../analysis/service/analysis.service';

@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.scss'],
  providers: [ JournalEntriesService, AnalysisService ]
})
export class JournalComponent implements OnInit {

  mobCoachVisible = false;
  newHintAvailable = false;
  coachTip: any;

  constructor(private analysisService: AnalysisService) {

  }

  ngOnInit() {

  	// MOCK for showing functionalti
  	// Shakes the Coach Box ;-)
       this.coachTip = 'Du hast zu wenig Vitamine und Kohlenhydrate zu dir genommen. - Iss doch eine Banane.';
       this.showNewHint();
    // end mock

    this.analysisService.initConsumptionTracking();
    this.analysisService.getConsumptionReport().subscribe((report) => {
      this.coachTip = report.recommendation;
      console.log(report);
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
