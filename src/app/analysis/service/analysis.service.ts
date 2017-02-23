import {Injectable} from '@angular/core';
import {UserService} from '../../login/user.service';
import {User} from '../../login/user';
import {FirebaseService} from '../../firebase/firebase.service';
import {ComponentAnalysis} from '../model/componentAnalysis';
import {AgeRange} from '../model/ageRange';
import {Observable, Subject} from 'rxjs';
import {JournalEntriesService} from '../../journal/journalEntries.service';
import {JournalEntry} from '../../journal/journalEntry';
import {FoodDetails} from '../../food/foodDetails';
import {ConsumptionReport} from '../model/consumptionReport';

@Injectable()
export class AnalysisService {

  private user: User;
  private consumptionMap: Map<string, ComponentAnalysis> = new Map<string, ComponentAnalysis>();

  constructor(private userService: UserService,
              private firebaseService: FirebaseService,
              private journalEntriesService: JournalEntriesService) {
    this.user = this.userService.getUser();

  }

  /*
   * Compares the current consumption of a given day with the optimal target consumption.
   * Returns a consumption report with a recommendation.
   */
  public analyzeConsumption(): Observable<Map<string, ComponentAnalysis>> {
    return this.calculateTargetConsumption()
    .concatMap(() => {
      return this.calculateCurrentConsumption();
    });
    /* Two concatMaps in a row do not work.
    .concatMap(() => {
        return this.createConsumptionReport();
    });*/
  }

  public createConsumptionReport(analysis: Map<string, ComponentAnalysis>): Observable<ConsumptionReport> {
    let report: ConsumptionReport = new ConsumptionReport();
    console.log(analysis);
    let res: ConsumptionReport = report.createConsumptionReport(analysis);
    return Observable.of(res);
  }

  private calculateCurrentConsumption(): Observable<Map<string, ComponentAnalysis>> {
    return this.journalEntriesService.getJournalEntries(new Date(), this.user.uid).flatMap((journalEntries: JournalEntry[]) => {
      this.resetCurrentConsumption();
      for (let journalEntry of journalEntries) {
        this.firebaseService.getObject('foodDetails', journalEntry.foodID).subscribe((foodDetails: FoodDetails) => {
          for (let component of foodDetails.components) {
            if (component !== undefined && component.name !== '' && component.name !== undefined) {
              let analysis: ComponentAnalysis = this.consumptionMap.get(component.name);
              if (analysis !== undefined) {
                let consumedUnits: number = component.amount / foodDetails.matrix_amount * journalEntry.quantity;
                analysis.currentAmount = analysis.currentAmount + consumedUnits;
                this.consumptionMap.set(component.name, analysis);
              }
            }
          }
        });

      }
      return Observable.of(this.consumptionMap);
    }
    );
  }

  private resetCurrentConsumption() {
    this.consumptionMap.forEach((analysis: ComponentAnalysis, key: string) => {
      analysis.currentAmount = 0;
    });
  }

  private calculateTargetConsumption(): Observable<Map<string, ComponentAnalysis>> {
    let url: string = this.user.gender === 'male' ? 'targetMale' : 'targetFemale';
    let ageRange = this.getAgeRange(this.user.age);

    return this.firebaseService.getList(url).map((result) => {
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
