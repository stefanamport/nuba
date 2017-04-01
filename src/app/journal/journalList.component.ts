import {Component, OnInit } from '@angular/core';

import { JournalEntry } from './journalEntry';
import { JournalEntriesService } from './journalEntries.service';
import { DateChooserService } from '../shared/date-chooser.service';
import { MomentPipe } from '../shared/momentjs.pipe';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-journal-list',
  templateUrl: './journalList.component.html',
  providers: [MomentPipe]
})

export class JournalListComponent implements OnInit {
  journalList: Array<JournalEntry> = [];
  selectedDate: Date;
  componentIsLoading = true;

  constructor(private journalEntriesService: JournalEntriesService,
              private loginService: LoginService,
              private momentPipe: MomentPipe,
              private dateChooserService: DateChooserService

  ) { }

  ngOnInit() {
    this.dateChooserService.getChosenDateAsObservable().subscribe((selectedDate) => {
      this.selectedDate = selectedDate;
      this.getJournalEntries(selectedDate);
    });
  }

  makeEditable(entry: JournalEntry) {
    entry.timeProvH = this.momentPipe.transform(entry.date, 'HH');
    entry.timeProvM = this.momentPipe.transform(entry.date, 'mm');
    entry.editable = true;
  }

  updateEntry(entry: JournalEntry) {

    // change entry time
      let newDate = new Date(entry.date);

      newDate.setHours(
        Number(entry.timeProvH),
        Number(entry.timeProvM),
        0 );

      entry.date = newDate;

      entry.editable = false;
      this.journalEntriesService.updateEntry(entry);

  }

  deleteEntry(entry: JournalEntry) {
    this.journalEntriesService.deleteEntry(entry);
  }

  private getJournalEntries(date: Date) {
    this.journalList = [];
    let user = this.loginService.getUser();
    this.journalEntriesService.getJournalEntries(date, user.uid).subscribe((journalEntries: JournalEntry[]) => {
      this.journalList = journalEntries;
      this.componentIsLoading = false;
    });
  }
}
