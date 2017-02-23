import { Component, OnInit } from '@angular/core';
import {AnalysisService} from './service/analysis.service';
import {JournalEntriesService} from '../journal/journalEntries.service';
import {ComponentAnalysis} from './model/componentAnalysis';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.scss'],
  providers: [ AnalysisService, JournalEntriesService ]
})
export class AnalysisComponent implements OnInit {

  constructor(private analysisService: AnalysisService) { }

  ngOnInit() {
    console.log('init Analysis');
    this.analysisService.analyzeConsumption().subscribe((analysis: Map<string, ComponentAnalysis>) => {
       this.analysisService.createConsumptionReport(analysis).subscribe((report) => {
        console.log(report);
      });
    });
  }
}
