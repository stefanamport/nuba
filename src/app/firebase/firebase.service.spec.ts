import { FirebaseService } from './firebase.service';

class AngularFireStub { }

describe('Firebase service', () => {
  let service: any;
  let angularFire: any = new AngularFireStub();

  beforeEach(() => {
    service = new FirebaseService(angularFire);
  });

  it('should create firebase service', () => {
    expect(service).toBeTruthy();
  });
});
