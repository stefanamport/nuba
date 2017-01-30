import { TestBed, async, inject } from '@angular/core/testing';
import { FirebaseService } from '../firebase/firebase.service';
import { JournalEntriesService } from './journalEntries.service';
import { AngularFire } from 'angularfire2';
import any = jasmine.any;

class AngularFireFake { }

class FirebaseServiceSpy {
  getList = jasmine.createSpy('getList');
}

describe('JournalEntriesService', () => {
  let journalEntriesService: JournalEntriesService = null;
  // let firebaseServiceSpy: FirebaseServiceSpy = new FirebaseServiceSpy();

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        JournalEntriesService,
        { provide: FirebaseService, useClass: FirebaseServiceSpy },
        { provide: AngularFire, useClass: AngularFireFake }
      ]
    });
  });

  beforeEach(inject([JournalEntriesService], (service: JournalEntriesService) => {
        journalEntriesService = service;
  }));

  it('should ...', () => {
    expect(journalEntriesService).toBeTruthy();
  });

  it('should call getList', async(() => {
    let date: Date = new Date();
    let userId = 'user1';

    journalEntriesService.getJournalEntries(date, userId);
    // expect(firebaseServiceSpy.getList.calls.count()).toBe(1);
  }));
});
