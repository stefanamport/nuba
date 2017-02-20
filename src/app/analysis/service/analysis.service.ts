import {Injectable} from '@angular/core';
import {UserService} from '../../login/user.service';
import {User} from '../../login/user';
import {FirebaseService} from '../../firebase/firebase.service';
import {ComponentAnalysis} from '../model/componentAnalysis';
import {AgeRange} from '../model/ageRange';
import {Observable} from 'rxjs';
import {JournalEntriesService} from '../../journal/journalEntries.service';
import {JournalEntry} from '../../journal/journalEntry';
import {FoodDetails} from '../../food/foodDetails';

@Injectable()
export class AnalysisService {

  private user: User;
  private consumptionMap: Map<string, ComponentAnalysis> = new Map<string, ComponentAnalysis>();

  constructor(private userService: UserService,
              private firebaseService: FirebaseService,
              private journalEntriesService: JournalEntriesService) {
    this.user = this.userService.getUser();

  }

  public analyzeConsumption() {
    let first: Observable<Map<string, ComponentAnalysis>> = this.calculateTargetConsumption();
    first.flatMap(() => {
      return this.calculateCurrentConsumption();
    }).subscribe(() => {
        this.createAnalysis();
      }
    );
  }

  private calculateCurrentConsumption(): Observable<Map<string, ComponentAnalysis>> {
    return this.journalEntriesService.getJournalEntries(new Date(), this.user.uid).map((journalEntries: JournalEntry[]) => {
      for (let journalEntry of journalEntries) {
        let second: Observable<FoodDetails> = this.firebaseService.getObject('foodDetails', journalEntry.foodID);
        second.map((foodDetails: FoodDetails) => {
          for (let component of foodDetails.components) {
            let analysis: ComponentAnalysis = this.consumptionMap.get(component.name);
            if (analysis !== undefined && component.name !== '' && component.name !== undefined) {
              let consumedUnits: number = component.amount / foodDetails.matrix_amount * journalEntry.quantity;
              analysis.currentAmount += consumedUnits;
              this.consumptionMap.set(component.name, analysis);
            }
          }
          return this.consumptionMap;
        });
      }
      return this.consumptionMap;
    }
    );
  }

  private calculateTargetConsumption(): Observable<Map<string, ComponentAnalysis>> {
    let url: string = this.user.gender === 'male' ? 'targetMale' : 'targetFemale';
    let ageRange = this.getAgeRange(this.user.age);

    return this.firebaseService.getList(url).map((result) => {
      for (let targetConsumption of result) {
        if (targetConsumption.age === ageRange) {
          for (let comp of targetConsumption.components) {
            let component = new ComponentAnalysis();
            component.componentName = comp.name;
            component.targetAmount = comp.amount;
            component.currentAmount = 0;
            component.unit = comp.unit;
            this.consumptionMap.set(comp.name, component);
          }
        }
      }
      return this.consumptionMap;
    });

  }

  private createAnalysis() {
    this.consumptionMap.forEach((value: ComponentAnalysis, key: string) => {
      console.log(key, value);
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
