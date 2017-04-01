import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
    name: 'orderByDate',
    pure: false
})
export class OrderByDatePipe implements PipeTransform {
    transform(array: Array<any>, index: string): Array<any> {

      array.sort(function(a, b){

          let dateFormat = 'YYYYMMDDHHmmss';

          let dateA = moment(new Date(a[index])).format(dateFormat);
          let dateB = moment(new Date(b[index])).format(dateFormat);

          // sort dates ascending
          if ( dateA < dateB ) {
            return 1;

          } else if ( dateA > dateB ) {
            return -1;

          } else {
            return 0;

          }
      });

      return array;

  }
}
