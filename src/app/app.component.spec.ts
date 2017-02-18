import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { Output} from '@angular/core/src/metadata/directives';
import { EventEmitter } from '@angular/core';

import { AngularFire } from 'angularfire2';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SearchComponent } from './journal/nubaSearch.component';
import { JournalComponent } from './journal/journal.component';
import { JournalListComponent } from './journal/journalList.component';
import { UserService } from './login/user.service';

import { OrderByAlphabetPipe } from './journal/pipes/orderByAlphabet.pipe';
import { SearchFilterPipe } from './journal/pipes/searchFilter.pipe';

describe('AppComponent', () => {
  class AngularFireStub {}

  class UserServiceStub implements UserService {
    @Output() data = new EventEmitter();

    public getUser() {}
  }

  beforeEach(() => {

    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HeaderComponent,
        SearchComponent,
        JournalComponent,
        JournalListComponent,
        OrderByAlphabetPipe,
        SearchFilterPipe
      ],
      imports: [
        RouterTestingModule,
        FormsModule
      ],
      providers: [
        { provide: AngularFire, useClass: AngularFireStub },
      ]
    }).overrideComponent(AppComponent, {
      set: {
        providers: [
          { provide: UserService, useClass: UserServiceStub }
        ]
      }
    }).compileComponents();
  });

  it('should create AppComponent', async(() => {
      let fixture = TestBed.createComponent(AppComponent);
      let app = fixture.debugElement.componentInstance;
      expect(app).toBeTruthy();
  }));
});
