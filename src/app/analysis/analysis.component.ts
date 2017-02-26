import { Component, OnInit } from '@angular/core';
import { AnalysisService } from './service/analysis.service';
import { JournalEntriesService } from '../journal/journalEntries.service';
import { ComponentAnalysis } from './model/componentAnalysis';
import { ConsumptionReport } from './model/consumptionReport';
import { UserService } from '../login/user.service';
import { AgeRange } from './model/ageRange';
import { FirebaseService } from '../firebase/firebase.service';
import { JournalEntry } from '../journal/journalEntry';
import { FoodDetails } from '../food/foodDetails';

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
    let user = this.userService.getUser();
    let url: string = user.gender === 'male' ? 'targetMale' : 'targetFemale';
    let ageRange = this.getAgeRange(user.age);

    this.firebaseService.getList(url).subscribe((result) => {
      let consumptionMap: Map<string, ComponentAnalysis> = this.analysisService.getTargetConsumption(result, ageRange);

      this.journalEntriesService.getJournalEntries(new Date(), user.uid).subscribe((journalEntries: JournalEntry[]) => {
        consumptionMap = this.analysisService.resetCurrentConsumption();
        journalEntries.forEach((journalEntry, journalIndex) => {
          this.firebaseService.getObject('foodDetails', journalEntry.foodID).subscribe((foodDetails: FoodDetails) => {
            this.analysisService.currConsumption(foodDetails, journalEntry.quantity);

            if (journalIndex === journalEntries.length - 1) {
              this.report = this.analysisService.createConsumptionReport(consumptionMap);
              console.log(this.report);
            }
          });
        });
      });
    });
  }

  private getAgeRange(age: number): AgeRange {
    if (age === 18) {
      return '18';
    } else if (age < 31) {
      return '19–30';
    } else if (age < 51) {
      return '31–50';
    } else if (age < 71) {
      return '51–70';
    } else {
      return '> 70';
    }
  }
}
