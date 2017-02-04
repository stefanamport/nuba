import { Pipe, PipeTransform } from '@angular/core';
import { Food } from '../../food/food';

@Pipe({
    name: 'searchFilter',
    pure: false
})
export class SearchFilterPipe implements PipeTransform {
    transform(value: Array<Food>, exponent: string): Array<Food> {

    let filter = exponent;
    let foodList = value;

    if (filter.length > 2) {

      let filteredList: Array<Food> = foodList.filter(
      food => food.name.toLowerCase().indexOf(filter.toLowerCase()) > -1);

      return filteredList;

    } else {
      return [];
    }

  }
}
