import { Pipe, PipeTransform } from '@angular/core';
import { Food } from '../../food/food';

@Pipe({
    name: 'searchFilter',
    pure: false
})
export class SearchFilterPipe implements PipeTransform {
    transform(foodList: Array<Food>, filter: string, mostUsedFoods: Array<number>): Array<Food> {

    let foodShortlist = mostUsedFoods;

    if (filter.length > 2) {

      // show string filtered List
      let filteredList: Array<Food> = foodList.filter(
      food => food.name.toLowerCase().indexOf(filter.toLowerCase()) > -1);

      return filteredList;

    } else if (foodShortlist) {

      // show Shortlist
      let filteredList: Array<Food> = foodList.filter(
      food => foodShortlist.indexOf(Number(food.$key)) >= 0);

      return filteredList;

    } else {
      return [];
    }

  }
}
