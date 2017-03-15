import { JournalEntriesService } from './journalEntries.service';
import {JournalEntry, JournalEntryFirebase} from './journalEntry';
import {Observable} from 'rxjs';

class FirebaseServiceStub {
  getList(url) {
    let journalEntries = [];
    journalEntries.push(new JournalEntry());
    journalEntries.push(new JournalEntry());

    return Observable.of(journalEntries);
  }

  addItem(url, journalEntry) { }

  deleteItem(url, id) { }

  updateItem(url, id, journalEntry) { }
}

describe('JournalEntriesService', () => {
  let service: JournalEntriesService;
  let firebaseService: any = new FirebaseServiceStub();

  let journalEntry = new JournalEntry();
  journalEntry.$key = 'j1';
  journalEntry.date = new Date('2017-03-15');
  journalEntry.editable = false;
  journalEntry.foodID = 1;
  journalEntry.quantity = 100;
  journalEntry.unit = 'mg';
  journalEntry.userId = 'user1';

  let firebaseJournalEntry = new JournalEntryFirebase();
  firebaseJournalEntry.date = journalEntry.date.toString();
  firebaseJournalEntry.editable = journalEntry.editable;
  firebaseJournalEntry.foodID = journalEntry.foodID;
  firebaseJournalEntry.name = journalEntry.name;
  firebaseJournalEntry.quantity = journalEntry.quantity;
  firebaseJournalEntry.unit = journalEntry.unit;
  firebaseJournalEntry.userId = journalEntry.userId;

  let url = 'journalEntries/user1/2017315';

  beforeEach(() => {
    service = new JournalEntriesService(firebaseService);
  });

  it('should create JournalEntriesService', () => {
    expect(service).toBeTruthy();
  });

  it('should get journal entries', () => {
    let userId = 'user1';
    let date = new Date('2017-03-15');
    spyOn(firebaseService, 'getList');

    service.getJournalEntries(date, userId);

    expect(firebaseService.getList).toHaveBeenCalledWith(url);
  });

  it('should add journal entry', () => {
    spyOn(firebaseService, 'addItem');

    service.addEntry(journalEntry);

    expect(firebaseService.addItem).toHaveBeenCalledWith(url, firebaseJournalEntry);
  });

  it('should delete journal entry', () => {
    spyOn(firebaseService, 'deleteItem');

    service.deleteEntry(journalEntry);

    expect(firebaseService.deleteItem).toHaveBeenCalledWith(url, journalEntry.$key);
  });

  it('should update journal entry', () => {
    spyOn(firebaseService, 'updateItem');

    service.updateEntry(journalEntry);

    expect(firebaseService.updateItem).toHaveBeenCalledWith(url, journalEntry.$key, firebaseJournalEntry);
  });
});
