import { Component, OnInit } from '@angular/core';
import { DateChooserService } from './date-chooser.service';
import {MomentPipe} from './momentjs.pipe';

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
    this.selectedDate = new Date();
  }

  dateChange(step: number) {

    // updates view
    this.selectedDate.setDate(this.selectedDate.getDate() + step);
    this.selectedDate = new Date(this.selectedDate);
    // updates current chosen date in the shared service dateChooserService.
    // This is required so that other services/components can retrieve the current selected date.
    this.dateChooserService.setChosenDate(this.selectedDate);
  }
}
