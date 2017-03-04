import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'round'
})

export class RoundPipe implements PipeTransform {
  transform ( input: number) {

  	// round to 1 decimal
    return Math.round(input * 10) / 10;
  }
}
