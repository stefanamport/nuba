import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
    name: 'momentjs'
})

export class MomentPipe implements PipeTransform {

    transform(value: any, dateformat: string): string {

        if (value) {

            let dateToTransform = new Date(value);

            moment.locale('de');
            return moment(dateToTransform).format(dateformat);
        }

    }
}
