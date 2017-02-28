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

  constructor(private analysisService: AnalysisService,
              private dateChooserService: DateChooserService
  ) { }

  public numberToPercent(input: number) {

    if (input > 100) {
      input = 100;
    }

    let percent = input + '%';
    return percent;
  }

  ngOnInit() {
    let selectedDate = this.dateChooserService.getChosenDate();
    this.analysisService.initConsumptionAnalysis(selectedDate);
    this.analysisService.getConsumptionReport().subscribe((report) => {
      console.log(report);
      this.report = report;
    });
  }
}
