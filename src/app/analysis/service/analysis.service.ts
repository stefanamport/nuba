import { Injectable } from '@angular/core';
import { UserService } from '../../login/user.service';
import { FirebaseService } from '../../firebase/firebase.service';
import { ComponentAnalysis } from '../model/componentAnalysis';
import { JournalEntriesService } from '../../journal/journalEntries.service';
import { FoodDetails } from '../../food/foodDetails';
import { ConsumptionReport } from '../model/consumptionReport';
import { AgeRange } from '../model/ageRange';
import { JournalEntry } from '../../journal/journalEntry';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AnalysisService {

  private consumptionMap: Map<string, ComponentAnalysis> = new Map<string, ComponentAnalysis>();

  private report: ConsumptionReport = new ConsumptionReport();
  private reportSubject = new BehaviorSubject(this.report);

  private static getAgeRange(age: number): AgeRange {
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

  constructor(private userService: UserService,
              private firebaseService: FirebaseService,
              private journalEntriesService: JournalEntriesService) {
  }

  public getConsumptionReport(): BehaviorSubject<ConsumptionReport> {
    return this.reportSubject;
  }

  public initConsumptionAnalysis(date: Date) {
    let user = this.userService.getUser();
    let url: string = user.gender === 'male' ? 'targetMale' : 'targetFemale';
    let ageRange = AnalysisService.getAgeRange(user.age);

    this.firebaseService.getList(url).subscribe((result) => {
      this.getTargetConsumption(result, ageRange);

      this.journalEntriesService.getJournalEntries(date, user.uid).subscribe((journalEntries: JournalEntry[]) => {
        this.resetCurrentConsumption();
        journalEntries.forEach((journalEntry, journalIndex) => {

          this.firebaseService.getObject('foodDetails', journalEntry.foodID).subscribe((foodDetails: FoodDetails) => {
            this.calculateCurrentConsumption(foodDetails, journalEntry.quantity);
            if (journalIndex === journalEntries.length - 1) {
              let report = new ConsumptionReport();
              this.report = report.createConsumptionReport(this.consumptionMap, this.userService.getUser());
              this.reportSubject.next(this.report);
            }
          });
        });
      });
    });
  }

  private calculateCurrentConsumption(foodDetails: FoodDetails, consumedQuantity) {
    foodDetails.components.forEach((component) => {
      let analysis: ComponentAnalysis = this.consumptionMap.get(component.name);
      if (analysis !== undefined) {
        let consumedUnits: number = component.amount / foodDetails.matrix_amount * consumedQuantity;
        analysis.currentAmount = analysis.currentAmount + consumedUnits;
        this.consumptionMap.set(component.name, analysis);
      }
    });
  }

  private getTargetConsumption(result, ageRange) {
    for (let targetConsumption of result) {
      if (targetConsumption.age === ageRange) {
        for (let comp of targetConsumption.components) {
          let component = new ComponentAnalysis();
          component.name = comp.name;
          component.targetAmount = +comp.amount;
          component.currentAmount = 0;
          component.unit = comp.unit;
          this.consumptionMap.set(comp.name, component);
        }
      }
    }
  }

  private resetCurrentConsumption() {
    this.consumptionMap.forEach((analysis: ComponentAnalysis) => {
      analysis.currentAmount = 0;
    });
  }
}
