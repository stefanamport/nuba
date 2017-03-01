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
import { LoginService } from './login/login.service';

import { MomentPipe } from './journal/pipes/momentjs.pipe';
import { OrderByAlphabetPipe } from './journal/pipes/orderByAlphabet.pipe';
import { SearchFilterPipe } from './journal/pipes/searchFilter.pipe';

describe('AppComponent', () => {
  class AngularFireStub {}

  class LoginServiceStub {
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
        SearchFilterPipe,
        MomentPipe
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
          { provide: LoginService, useClass: LoginServiceStub }
        ]
      }
    }).compileComponents();
  });

  it('should create AppComponent', async(() => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;
      expect(app).toBeTruthy();
  }));
});
