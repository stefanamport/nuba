import { Injectable } from '@angular/core';
import { FoodDatabase } from './food.mock';

@Injectable()
export class FoodDatabaseService {
  
  getFoodDB(filter: string) {

  	let filteredFoodDatabase = FoodDatabase.filter(function(item){ 
	   return item.name.toLowerCase().indexOf(filter.toLowerCase()) > -1;
	});

    return filteredFoodDatabase;
  }

  getFood(id: number) {
    
    let food = FoodDatabase.filter(function(item){ 
	   return item.id === id;
	});

	return food[0];

  }
}
