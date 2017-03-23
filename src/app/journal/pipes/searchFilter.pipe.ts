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

      let filters = filter.split(' ');
      let filteredList: Array<Food> = foodList.filter(function (food) {
        let includesAllSearchItems = true;
        for (let key in filters) {
          if (food.name.toLowerCase().indexOf(filters[key].toLowerCase()) === -1) {
            includesAllSearchItems = false;
          }
        }
        return includesAllSearchItems;
      });

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
