import { Component, OnInit } from '@angular/core';
import { AnalysisService } from './service/analysis.service';
import { JournalEntriesService } from '../journal/journalEntries.service';
import { ComponentAnalysis } from './model/componentAnalysis';
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

  ngOnInit() {
    this.analysisService.initConsumptionTracking();
    this.analysisService.getConsumptionReport().subscribe((report) => {
      console.log(report);
    });
  }
}
