import { TestBed, async, inject } from '@angular/core/testing';
import { FirebaseService } from './firebase.service';
import {AngularFire} from 'angularfire2';

class AngularFireFake { }

describe('FirebaseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FirebaseService,
        {provide: AngularFire, useClass: AngularFireFake}
      ]
    });
  });

  it('should ...', inject([FirebaseService], (service: FirebaseService) => {
    expect(service).toBeTruthy();
  }));
});
