import { Injectable } from '@angular/core';
import { FirebaseService } from '../../firebase/firebase.service';
import { ComponentAnalysis } from '../model/componentAnalysis';
import { JournalEntriesService } from '../../journal/journalEntries.service';
import { FoodDetails } from '../../food/foodDetails';
import { ConsumptionReport } from '../model/consumptionReport';
import { JournalEntry } from '../../journal/journalEntry';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../login/user';
import { AgeRange } from '../model/constants';
import { LoginService } from '../../login/login.service';

@Injectable()
export class AnalysisService {

  // Holds component analyses (key is the component name)
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

  constructor(private loginService: LoginService,
              private firebaseService: FirebaseService,
              private journalEntriesService: JournalEntriesService) {
  }

  public getConsumptionReport(): Observable<ConsumptionReport> {
    return this.reportSubject.asObservable();
  }

  public initConsumptionAnalysis(date: Date) {
    let user = this.loginService.getUser();
    let url: string = user.gender === 'male' ? 'targetMale' : 'targetFemale';
    let ageRange = AnalysisService.getAgeRange(user.age);

    // get target consumption
    this.firebaseService.getList(url).subscribe((result) => {
      // add calories manually as there is no general target
      result.push('Energie kcal');
      this.getTargetConsumption(result, ageRange, user);

      // get current consumption
      this.journalEntriesService.getJournalEntries(date, user.uid).subscribe((journalEntries: JournalEntry[]) => {
        this.resetCurrentConsumption();

        if (journalEntries.length === 0) {
          let emptyReport = new ConsumptionReport();
          emptyReport.analysisComplete = true;
          this.reportSubject.next(emptyReport);
        }

        // get the food details for each journalEntry
        journalEntries.forEach((journalEntry, journalIndex) => {
          this.firebaseService.getObject('foodDetails', journalEntry.foodID.toString()).subscribe((foodDetails: FoodDetails) => {
            this.calculateCurrentConsumption(foodDetails, journalEntry.quantity);
            if (journalIndex === journalEntries.length - 1) {

              // create consumption report based on the current and target consumption
              let report = new ConsumptionReport();
              report = report.createConsumptionReport(this.consumptionMap, user);
              report.analysisComplete = true;
              this.reportSubject.next(report);
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

  private getTargetConsumption(result, ageRange, user) {
    for (let targetConsumption of result) {
      if (targetConsumption.age === ageRange) {
        for (let comp of targetConsumption.components) {
          let component = new ComponentAnalysis();
          component.name = comp.name;
          component.targetAmount = +comp.amount;
          component.currentAmount = 0;
          component.unit = comp.unit;
          component.category = targetConsumption.category;

          this.consumptionMap.set(comp.name, component);
        }
      }
    }

    // Target calories need to be added separately as there is no general target amount
    // per gender / age. The target amount for calories depends on the specific user.
    this.addTargetCalories(user);
  }

  private addTargetCalories(user: User) {
    let component = new ComponentAnalysis();
    component.name = 'Energie kcal';
    component.targetAmount = + user.metabolicRate;
    component.currentAmount = 0;
    component.unit = 'kcal';
    component.category = 'Makronährstoffe';
    this.consumptionMap.set(component.name, component);
  }

  private resetCurrentConsumption() {
    this.consumptionMap.forEach((analysis: ComponentAnalysis) => {
      analysis.currentAmount = 0;
    });
  }
}
