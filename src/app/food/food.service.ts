import { Injectable, Output, EventEmitter } from '@angular/core';
import { Food } from './food';
import { FirebaseService } from '../firebase/firebase.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

@Injectable()
export class FoodService {

  private cachedFoodList: Array<Food> = [];

  @Output() foodList = new EventEmitter();

  constructor(private FirebaseService: FirebaseService) {

    this.FirebaseService.getList('food').subscribe(food => {
        this.cachedFoodList = food;
        this.foodListUpdated();
     });

  }

  foodListUpdated() {
    this.foodList.next(this.cachedFoodList);
  }

  getFoodList() {
    return this.cachedFoodList;
  }

  getFood(id: number): Observable<Food> {
    let food = this.filterFoodId(id);
    if (food === null) {
      return this.FirebaseService.getObject('food', id);
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
