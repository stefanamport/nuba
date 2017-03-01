import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalComponent } from './journal.component';
import { SearchComponent } from './nubaSearch.component';
import { JournalListComponent } from './journalList.component';
import { FormsModule } from '@angular/forms';
import { FirebaseListObservable } from 'angularfire2';
import { JournalEntriesService } from './journalEntries.service';
import { FoodService } from '../food/food.service';
import { LoginService } from '../login/login.service';
import { User } from '../login/user';
import { JournalEntry } from './journalEntry';
import { Subject, Observable } from 'rxjs';

import { MomentPipe } from './pipes/momentjs.pipe';
import { SearchFilterPipe } from './pipes/searchFilter.pipe';
import { OrderByAlphabetPipe } from './pipes/orderByAlphabet.pipe';

import { Injectable, Output, EventEmitter } from '@angular/core';
import { AnalysisService } from '../analysis/service/analysis.service';
import { ConsumptionReport } from '../analysis/model/consumptionReport';
import {UserAccountService} from '../user-account/user-account.service';

class JournalEntriesServiceStub {
  private addJournalEntrySource = new Subject<JournalEntry>();
  addJournalEntryNotification$ = this.addJournalEntrySource.asObservable();
  public notifyAddJournalEntry(journalEntry: JournalEntry) { }
  public getJournalEntries(date: Date, userId: string): FirebaseListObservable<JournalEntry[]> {
    let journalEntry = new JournalEntry();
    return Observable.of(journalEntry);
  }
}

class AnalysisServiceStub {
  public initConsumptionAnalysis() { }
  public getConsumptionReport() {
    let report = new ConsumptionReport();
    return Observable.of(report);
  }
}

class FoodServiceStub {

  @Output() foodList = new EventEmitter();

  public getFoodList() {
    return [];
  }

}

class UserAccountServiceStub {

}

class LoginServiceStub {

  @Output() data = new EventEmitter();

  public getUser() {
    return new User();
  }

  public getFoodList() {
    let foodShortlist = [1, 2, 3, 4];
    return foodShortlist;
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
        SearchFilterPipe,
        OrderByAlphabetPipe,
        MomentPipe
      ],
      imports: [
        FormsModule
      ]
    }).overrideComponent(JournalComponent, {
      set: {
        providers: [
          { provide: FoodService, useClass: FoodServiceStub },
          { provide: JournalEntriesService, useClass: JournalEntriesServiceStub },
          { provide: LoginService, useClass: LoginServiceStub },
          { provide:  AnalysisService, useClass: AnalysisServiceStub },
          { provide: UserAccountService, useClass: UserAccountServiceStub }
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
