import { Injectable } from '@angular/core';
import { Food } from './food';
import { FirebaseService } from '../firebase/firebase.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class FoodService {

  private cachedFoodList: Array<Food> = [];

  private foodSubject = new BehaviorSubject<Array<Food>>(this.cachedFoodList);

  constructor(private FirebaseService: FirebaseService) {

    this.FirebaseService.getList('food').subscribe(food => {
        this.cachedFoodList = food;
        this.foodListUpdated();
     });
  }

  foodListUpdated() {
    this.foodSubject.next(this.cachedFoodList);
  }

  getFoodListAsObservable() {
    return this.foodSubject.asObservable();
  }

  getFood(id: number): Observable<Food> {
    let food = this.filterFoodId(id);
    if (food === null) {
      return this.FirebaseService.getObject('food', id.toString());
    } else {
      return Observable.of(food);
    }
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
