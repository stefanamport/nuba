import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalComponent } from './journal.component';
import {SearchComponent} from './nubaSearch.component';
import {JournalListComponent} from './journalList.component';
import {FormsModule} from '@angular/forms';
import {FirebaseFoodService, FirebaseService} from '../firebase/firebase.service';
import {AngularFire} from 'angularfire2';
import {JournalEntriesService} from './journalEntries.service';
import {EventEmitter} from '@angular/core';
import {Output} from '@angular/core/src/metadata/directives';

class FirebaseServiceStub { }

class AngularFireStub {}

class JournalEntriesServiceStub implements JournalEntriesService {
  @Output() data = new EventEmitter();

  public getMutableData () {
    return {
      'entriesOfActiveDate': new Date(),
      'activeDate': new Date()
    };
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
        JournalListComponent
      ],
      imports: [
        FormsModule
      ],
      providers: [
        { provide: AngularFire, useClass: AngularFireStub }
      ]
    }).overrideComponent(JournalComponent, {
      set: {
        providers: [
          { provide: FirebaseService, useClass: FirebaseServiceStub },
          { provide: JournalEntriesService, useClass: JournalEntriesServiceStub }
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
