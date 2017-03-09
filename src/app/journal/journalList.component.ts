import {Component, OnInit, EventEmitter} from '@angular/core';

import { JournalEntry } from './journalEntry';
import { JournalEntriesService } from './journalEntries.service';

import { UserService } from '../login/user.service';
import { FirebaseListObservable } from 'angularfire2';
import { DateChooserService } from '../shared/date-chooser.service';
import { MomentPipe } from '../shared/momentjs.pipe';

@Component({
  selector: 'app-journal-list',
  templateUrl: './journalList.component.html',
  providers: [MomentPipe]
})

export class JournalListComponent implements OnInit {
  journalList: Array<JournalEntry> = [];

  selectedDate: Date;
  journalListObs: FirebaseListObservable<JournalEntry[]>;
  componentIsLoading = true;

  constructor(private journalEntriesService: JournalEntriesService,
              private userService: UserService,
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

  toTime(input) {
    return input;
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
    let user = this.userService.getUser();
    this.journalListObs = this.journalEntriesService.getJournalEntries(date, user.uid);
    this.journalListObs.subscribe((journalEntries: JournalEntry[]) => {
      this.journalList = journalEntries;
      this.componentIsLoading = false;
    });
  }
}
