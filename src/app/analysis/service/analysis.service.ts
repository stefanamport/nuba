import { Injectable } from '@angular/core';
import { UserService } from '../../login/user.service';
import { User} from '../../login/user';
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

  private user: User;
  private consumptionMap: Map<string, ComponentAnalysis> = new Map<string, ComponentAnalysis>();

  private report: ConsumptionReport = new ConsumptionReport();
  private reportSubject = new BehaviorSubject(this.report);

  constructor(private userService: UserService,
              private firebaseService: FirebaseService,
              private journalEntriesService: JournalEntriesService) {
    this.user = this.userService.getUser();

  }

  public getConsumptionReport(): BehaviorSubject<ConsumptionReport> {
    return this.reportSubject;
  }

  public initConsumptionTracking() {
    let user = this.userService.getUser();
    let url: string = user.gender === 'male' ? 'targetMale' : 'targetFemale';
    let ageRange = this.getAgeRange(user.age);

    this.firebaseService.getList(url).subscribe((result) => {
      let consumptionMap: Map<string, ComponentAnalysis> = this.getTargetConsumption(result, ageRange);

      this.journalEntriesService.getJournalEntries(new Date(), user.uid).subscribe((journalEntries: JournalEntry[]) => {
        consumptionMap = this.resetCurrentConsumption();
        journalEntries.forEach((journalEntry, journalIndex) => {
          this.firebaseService.getObject('foodDetails', journalEntry.foodID).subscribe((foodDetails: FoodDetails) => {
            this.currConsumption(foodDetails, journalEntry.quantity);

            if (journalIndex === journalEntries.length - 1) {
              this.report = this.createConsumptionReport(consumptionMap);
              this.reportSubject.next(this.report);
            }
          });
        });
      });
    });
  }

  private createConsumptionReport(analysis: Map<string, ComponentAnalysis>): ConsumptionReport {
    let report = new ConsumptionReport();
    return report.createConsumptionReport(analysis);
  }

  private currConsumption(foodDetails: FoodDetails, consumedQuantity) {
    foodDetails.components.forEach((component, componentIndex) => {
      if (component !== undefined && component.name !== '' && component.name !== undefined) {
        let analysis: ComponentAnalysis = this.consumptionMap.get(component.name);
        if (analysis !== undefined) {
          let consumedUnits: number = component.amount / foodDetails.matrix_amount * consumedQuantity;
          analysis.currentAmount = analysis.currentAmount + consumedUnits;
          this.consumptionMap.set(component.name, analysis);
        }
      }
    });

    return this.consumptionMap;
  }

  private getTargetConsumption(result, ageRange): Map<string, ComponentAnalysis> {
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
    return this.consumptionMap;
  }

  private resetCurrentConsumption(): Map<string, ComponentAnalysis> {
    this.consumptionMap.forEach((analysis: ComponentAnalysis, key: string) => {
      analysis.currentAmount = 0;
    });
    return this.consumptionMap;
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
