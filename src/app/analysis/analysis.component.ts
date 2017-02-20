import { Component, OnInit } from '@angular/core';
import {AnalysisService} from './service/analysis.service';
import {JournalEntriesService} from '../journal/journalEntries.service';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.scss'],
  providers: [ AnalysisService, JournalEntriesService ]
})
export class AnalysisComponent implements OnInit {

  constructor(private analysisService: AnalysisService) { }

  ngOnInit() {
    this.analysisService.analyzeConsumption();
  }

}
