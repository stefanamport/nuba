import {Component, OnInit, EventEmitter} from '@angular/core';

import { JournalEntry } from './journalEntry';
import { JournalEntriesService } from './journalEntries.service';

import {UserService} from '../login/user.service';
import {User} from '../login/user';
import {FirebaseListObservable} from 'angularfire2';
import {Output, Input} from '@angular/core/src/metadata/directives';

@Component({
  selector: 'app-journal-list',
  templateUrl: './journalList.component.html',
})

export class JournalListComponent implements OnInit {
  journalList: Array<JournalEntry> = [];

  @Input()
  selectedDate: Date;

  @Output()
  dateChangeEmitter: EventEmitter<Date> = new EventEmitter<Date>();

  private user: User;
  journalListObs: FirebaseListObservable<JournalEntry[]>;
  componentIsLoading: boolean = true;

  constructor(private journalEntriesService: JournalEntriesService,
              private userService: UserService
  ) { }

  ngOnInit() {
    this.selectedDate = new Date();
    this.user = this.userService.getUser();
    this.getJournalEntries(this.selectedDate);
    this.journalEntriesService.addJournalEntryNotification$.subscribe(
      journalEntry => {
        journalEntry.date = this.selectedDate;
        journalEntry.userId = this.user.uid;
        this.journalEntriesService.addEntry(journalEntry);
    });
  }

  makeEditable(entry: JournalEntry) {
    entry.editable = true;
  }

  updateEntry(entry: JournalEntry) {
     entry.editable = false;
     this.journalEntriesService.updateEntry(entry);
  }

  deleteEntry(entry: JournalEntry) {
    this.journalEntriesService.deleteEntry(entry);
  }

  dateChange(step: number) {
    this.selectedDate.setDate(this.selectedDate.getDate() + step);
    this.selectedDate = new Date(this.selectedDate);
    this.dateChangeEmitter.emit(this.selectedDate);
    this.getJournalEntries(this.selectedDate);
  }

  private getJournalEntries(date: Date) {
    this.journalList = [];
    this.journalListObs = this.journalEntriesService.getJournalEntries(date, this.user.uid);
    this.journalListObs.subscribe((journalEntries: JournalEntry[]) => {
      this.journalList = journalEntries;
      this.componentIsLoading = false;
    });
  }
}
