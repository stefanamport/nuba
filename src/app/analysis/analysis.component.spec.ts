import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisComponent } from './analysis.component';
import {LoginService} from '../login/login.service';
import {User} from '../login/user';
import {AnalysisService} from './service/analysis.service';
import {JournalEntriesService} from '../journal/journalEntries.service';

import {RoundPipe} from './pipes/round.pipe';

import {MomentPipe} from '../shared/momentjs.pipe';
import {DateChooserComponent} from '../shared/date-chooser.component';

class LoginServiceStub {
  public getUser(): User {
    let user = new User();
    return user;
  }
}

class AnalysisServiceStub {
  public analyzeConsumption() { }
}

class JournalEntriesServiceStub {

}

describe('AnalysisComponent', () => {
  let component: AnalysisComponent;
  let fixture: ComponentFixture<AnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalysisComponent, RoundPipe, MomentPipe, DateChooserComponent],
      providers: [
        { provide: LoginService, useClass: LoginServiceStub },
      ]
    }).overrideComponent(AnalysisComponent, {
      set: {
        providers: [
          { provide: AnalysisService, useClass: AnalysisServiceStub },
          { provide: JournalEntriesService, useClass: JournalEntriesServiceStub},
        ]
      }
    }).compileComponents();
  }));

  beforeEach(() => {
    /* fixture = TestBed.createComponent(AnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();*/
  });

  it('should create', () => {
    // expect(component).toBeTruthy();
  });
});
