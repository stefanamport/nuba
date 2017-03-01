import { TestBed, inject } from '@angular/core/testing';
import { AnalysisService } from './analysis.service';
import { FirebaseService } from '../../firebase/firebase.service';
import { LoginService } from '../../login/login.service';
import {JournalEntriesService} from '../../journal/journalEntries.service';
import {User} from '../../login/user';

class FirebaseServiceStub { }
class UserServiceStub {
  public getUser(): User {
    return null;
  }
}
class JournalEntriesServiceStub { }

describe('AnalysisService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AnalysisService,
        { provide: LoginService, useClass: UserServiceStub },
        { provide: FirebaseService, useClass: FirebaseServiceStub },
        { provide: JournalEntriesService, useClass: JournalEntriesServiceStub }
      ]
    });
  });

  it('should ...', inject([AnalysisService], (service: AnalysisService) => {
    expect(service).toBeTruthy();
  }));
});
