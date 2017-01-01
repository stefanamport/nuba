/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { JournalComponent } from './journal.component';
import {NubaSearch} from "./nubaSearch.component";
import {JournalList} from "./journalList.component";
import {FormsModule} from "@angular/forms";
import {FIREBASE_PROVIDERS, defaultFirebase, AngularFire} from 'angularfire2';

describe('JournalComponent', () => {
  let component: JournalComponent;
  let fixture: ComponentFixture<JournalComponent>;
  
  const firebaseConfig = {
    apiKey: 'AIzaSyBf7RiiafbN6IKzYoDdsZtOaQqFK-54oB0',
    authDomain: 'nuba-c3e84.firebaseapp.com',
    databaseURL: 'https://nuba-c3e84.firebaseio.com/',
    storageBucket: 'nuba-c3e84.appspot.com',
    messagingSenderId: '126418702718'
  }
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        JournalComponent,
        NubaSearch,
        JournalList
      ],
      imports: [
        FormsModule
      ],
      providers: [
        FIREBASE_PROVIDERS, defaultFirebase(firebaseConfig)
      ]
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
