import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'orderByAlphabet',
    pure: false
})
export class OrderByAlphabetPipe implements PipeTransform {
    transform(array: Array<any>, index: string): Array<any> {

      array.sort(function(a, b){
          if ( a[index] < b[index] ) {
            return -1;
          };
          if ( a[index] > b[index] ) {
            return 1;
          };
          return 0;
      });

      return array;

  }
}
