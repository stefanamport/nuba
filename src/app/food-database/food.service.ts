import { Injectable } from '@angular/core';
import { Food } from './food';
import { FirebaseService } from '../food-database/firebase.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

@Injectable()
export class FoodDatabaseService {

  private cachedFoodList: Array<Food> = [];

  constructor(private FirebaseService: FirebaseService) {}

  searchFood(filter: string): Observable<Array<Food>> {
    if (this.cachedFoodList.length === 0) {
      return this.FirebaseService.getAllFood().map(food => {
        this.cachedFoodList = food;
        return this.filterFood(filter);
     });
    } else {
      return Observable.of(this.filterFood(filter));
    }
  }

  getFood(id: number): Observable<Food> {
    let food = this.filterFoodId(id);
    if (food === null) {
      return this.FirebaseService.getFood(id);
    } else {
      return Observable.of(food);
    }
  }

  private filterFood(filter: string): Array<Food> {
    let result: Array<Food> = this.cachedFoodList.filter(
      food => food.name.toLowerCase().indexOf(filter.toLowerCase()) > -1);
    return result;
  }

  private filterFoodId(id: number): Food {
    let result: Food[] = this.cachedFoodList.filter(food => food.$key === id);
    if (result.length > 0) {
      return result[0];
    } else {
      return null;
    }
  }
}
