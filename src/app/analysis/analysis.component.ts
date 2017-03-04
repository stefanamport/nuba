import { Component, OnInit } from '@angular/core';
import { AnalysisService } from './service/analysis.service';
import { JournalEntriesService } from '../journal/journalEntries.service';
import { ConsumptionReport } from './model/consumptionReport';
import { UserService } from '../login/user.service';
import { FirebaseService } from '../firebase/firebase.service';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.scss'],
  providers: [ AnalysisService, JournalEntriesService ]
})
export class AnalysisComponent implements OnInit {

  public report: ConsumptionReport;

  constructor(private analysisService: AnalysisService,
              private userService: UserService,
              private firebaseService: FirebaseService,
              private journalEntriesService: JournalEntriesService
  ) { }

  public cartBarLength(input: number) {

    if (input > 100) {
      input = 100;
    }

    let percent = input + '%';
    return percent;
  }

  public chartCurrentPos (input: number) {

    let pos = 100 - input;

    // maximale Ausrichtung rechts
    if (pos < 0) {
      pos = 0;
    }

    // minimale Ausrichtung links
    if (pos > 99.5) {
      pos = 99.5;
    }

    let percent = pos + '%';
    return percent;
  }

  ngOnInit() {
    this.analysisService.initConsumptionAnalysis(new Date());
    this.analysisService.getConsumptionReport().subscribe((report) => {
      console.log(report);
      this.report = report;
    });
  }
}
