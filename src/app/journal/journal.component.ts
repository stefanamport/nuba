import { Component, OnInit } from '@angular/core';

import { JournalEntriesService } from './journalEntries.service';
import { AnalysisService } from '../analysis/service/analysis.service';
import { DateChooserService } from '../shared/date-chooser.service';

import { User } from '../login/user';
import { LoginService } from '../login/login.service';

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

  user: User;

  constructor(
    private analysisService: AnalysisService,
    private dateChooserService: DateChooserService,
    private loginService: LoginService) {}

  ngOnInit() {
    this.dateChooserService.getChosenDateAsObservable().subscribe((date) => {
      this.analysisService.initConsumptionAnalysis(date);
      this.analysisService.getConsumptionReport().subscribe((report) => {
        this.coachTip = report.recommendation;
        this.showNewHint();
      });
    });

    this.loginService.getUserAsObservable().subscribe((user) => {
        this.user = user;
    });

  }

  public mobCoachVisibility() {
     this.mobCoachVisible = !this.mobCoachVisible;
  }

  public showNewHint() {

  	// shakes Coach Box by CSS Animation
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
