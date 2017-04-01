import { Injectable } from '@angular/core';
import {JournalEntry, JournalEntryFirebase} from './journalEntry';

import { FirebaseService } from '../firebase/firebase.service';
import { FirebaseListObservable } from 'angularfire2';

@Injectable()
export class JournalEntriesService {

  constructor(private firebaseService: FirebaseService) { }

  getJournalEntries(date: Date, userId: string): FirebaseListObservable<JournalEntry[]> {
    let url: string = this.getUrl(userId, date);
    return this.firebaseService.getList(url);
  }

  addEntry(journalEntry: JournalEntry) {
    let firebaseEntry: JournalEntryFirebase = this.convertToJournalEntryFirebase(journalEntry);
    let url: string = this.getUrl(journalEntry.userId, journalEntry.date);
    this.firebaseService.addItem(url, firebaseEntry);
  }

  deleteEntry(journalEntry: JournalEntry) {
    let url: string = this.getUrl(journalEntry.userId, journalEntry.date);
    this.firebaseService.deleteItem(url, journalEntry.$key);
  }

  updateEntry(journalEntry: JournalEntry) {
    let firebaseEntry: JournalEntryFirebase = this.convertToJournalEntryFirebase(journalEntry);
    let url: string = this.getUrl(journalEntry.userId, journalEntry.date);
    this.firebaseService.updateItem(url, journalEntry.$key, firebaseEntry);
  }

  private getUrl(userId: string, date: Date): string {
    let dateKey: string = this.getDateAsKey(date);

    return 'journalEntries/' + userId + '/' + dateKey;
  }

  private getDateAsKey(date: Date): string {
    let realDate = new Date(date);
    let year: string = realDate.getUTCFullYear().toString();
    let month: string = (realDate.getUTCMonth() + 1).toString();
    let day: string = realDate.getUTCDate().toString();

    return year + month + day;
  }

  private convertToJournalEntryFirebase(journalEntry: JournalEntry): JournalEntryFirebase {
    let entry = new JournalEntryFirebase();
    entry.date = journalEntry.date.toString();
    entry.editable = journalEntry.editable;
    entry.foodID = journalEntry.foodID;
    entry.name = journalEntry.name;
    entry.quantity = journalEntry.quantity;
    entry.unit = journalEntry.unit;
    entry.userId = journalEntry.userId;

    return entry;
  }
}
