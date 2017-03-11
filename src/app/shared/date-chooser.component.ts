import { Component, OnInit } from '@angular/core';
import { DateChooserService } from './date-chooser.service';
import { MomentPipe } from './momentjs.pipe';

@Component({
  selector: 'app-date-chooser',
  templateUrl: './date-chooser.component.html',
  styleUrls: ['./date-chooser.component.scss'],
  providers: [ MomentPipe ]
})
export class DateChooserComponent implements OnInit {

  selectedDate: Date;
  constructor(private dateChooserService: DateChooserService) { }

  ngOnInit() {

    this.dateChooserService.getChosenDateAsObservable().subscribe((date) => {
      this.selectedDate = date;
    });

  }

  dateChange(step: number) {

    // Change Date
    let newDate = this.selectedDate;
    newDate.setDate(newDate.getDate() + step);
    newDate = new Date(newDate);

    // updates current chosen date in the shared service dateChooserService.
    // This is required so that other services/components can retrieve the current selected date.
    this.dateChooserService.setChosenDate(newDate);
  }
}
