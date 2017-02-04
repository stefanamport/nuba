import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalComponent } from './journal.component';
import { SearchComponent } from './nubaSearch.component';
import { JournalListComponent } from './journalList.component';
import { FormsModule } from '@angular/forms';
import { FirebaseListObservable } from 'angularfire2';
import { JournalEntriesService } from './journalEntries.service';
import { FoodService } from '../food/food.service';
import { UserService } from '../login/user.service';
import { User } from '../login/user';
import { JournalEntry } from './journalEntry';
import { Subject, Observable } from 'rxjs';

import { SearchFilterPipe } from './pipes/searchFilter.pipe';
import { Injectable, Output, EventEmitter } from '@angular/core';


class JournalEntriesServiceStub {
  private addJournalEntrySource = new Subject<JournalEntry>();
  addJournalEntryNotification$ = this.addJournalEntrySource.asObservable();
  public notifyAddJournalEntry(journalEntry: JournalEntry) { }
  public getJournalEntries(date: Date, userId: string): FirebaseListObservable<JournalEntry[]> {
    let journalEntry = new JournalEntry();
    return Observable.of(journalEntry);
  }
}

class FoodServiceStub {

  @Output() foodList = new EventEmitter();

  public getFoodList() {
    return [];
  }

}

class UserServiceStub {
  public getUser() {
    return new User();
  }
}

describe('JournalComponent', () => {
  let component: JournalComponent;
  let fixture: ComponentFixture<JournalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        JournalComponent,
        SearchComponent,
        JournalListComponent,
        SearchFilterPipe
      ],
      imports: [
        FormsModule
      ]
    }).overrideComponent(JournalComponent, {
      set: {
        providers: [
          { provide: FoodService, useClass: FoodServiceStub },
          { provide: JournalEntriesService, useClass: JournalEntriesServiceStub },
          { provide: UserService, useClass: UserServiceStub }
        ]
      }
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JournalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
