import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { FoodInitialData } from './foodInitialData';

@Injectable()
export class FirebaseImportService  {
  constructor(private af: AngularFire) {
    console.log(af);
  }

  /*
   * Imports the data in foodInitialData.ts to the firebase:
   * - food: contains basic food information
   * - foodDetails: contains detail information about food
   */
  importToFirebase() {
    for (let food of FoodInitialData) {
      createFood(food, this.af);
      createFoodDetails(food, this.af);
    }
  }
}

/*
 * Save food to the node 'food' in the firebase database
 */
function createFood(food: any, af: AngularFire) {
  const toSaveFood = af.database.object('food/' + food.id);
  toSaveFood.set({
    'name': food.name,
    'synonyms': food.synonyms,
    'category': food.category,
    'matrix_unit': food.matrix_unit,
    'matrix_amount': food.matrix_amount
  });
}

/*
 * Save food details to the node 'foodDetails' in the firebase database
 */
function createFoodDetails(food: any, af: AngularFire) {
  const toSaveFoodDetails = af.database.object('foodDetails/' + food.id);
  delete food.id;
  toSaveFoodDetails.set(food);
}


