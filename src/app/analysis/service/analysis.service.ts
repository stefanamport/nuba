import { Injectable } from '@angular/core';
import { UserService } from '../../login/user.service';
import { User } from '../../login/user';
import { FirebaseService } from '../../firebase/firebase.service';
import { ComponentAnalysis } from '../model/componentAnalysis';
import { JournalEntriesService } from '../../journal/journalEntries.service';
import { FoodDetails } from '../../food/foodDetails';
import { ConsumptionReport } from '../model/consumptionReport';

@Injectable()
export class AnalysisService {

  private user: User;
  private consumptionMap: Map<string, ComponentAnalysis> = new Map<string, ComponentAnalysis>();

  private consumptionReport: ConsumptionReport = new ConsumptionReport();

  constructor(private userService: UserService,
              private firebaseService: FirebaseService,
              private journalEntriesService: JournalEntriesService) {
    this.user = this.userService.getUser();

  }

  public createConsumptionReport(analysis: Map<string, ComponentAnalysis>): ConsumptionReport {
    let report = new ConsumptionReport();
    return report.createConsumptionReport(analysis);
  }

  public currConsumption(foodDetails: FoodDetails, consumedQuantity) {
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

  public getTargetConsumption(result, ageRange): Map<string, ComponentAnalysis>  {
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

  public resetCurrentConsumption(): Map<string, ComponentAnalysis> {
    this.consumptionMap.forEach((analysis: ComponentAnalysis, key: string) => {
      analysis.currentAmount = 0;
    });
    return this.consumptionMap;
  }
}
