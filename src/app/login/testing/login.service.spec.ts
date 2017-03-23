import { LoginService } from '../login.service';
import { Observable } from 'rxjs';
import { User } from '../user';
import { Reginfo } from '../reginfo';

class FirebaseServiceStub {
  getAuth() {
    return Observable.of(new AngularFireAuthStub());
  }

  getObject() {
    let user = new User();
    return Observable.of(user);
  }

  newUser() { }

  login(provider) { }

  logout() {
    /*return new Promise((resolve, reject) => {
      resolve(42);
    });*/
  }
}

class RouterStub {
  navigate(route) { }
}

class AngularFireAuthStub {
  uid = 'abc123';
}

describe('LoginService', () => {
  let service: LoginService;
  let firebaseService: any = new FirebaseServiceStub();
  let router: any = new RouterStub();

  beforeEach(() => {
    service = new LoginService(firebaseService, router);
  });

  it('should create LoginService', () => {
    expect(service).toBeTruthy();
  });

  it('should return auth', () => {
    spyOn(firebaseService, 'getAuth');

    let auth = service.isLoggedIn();

    expect(firebaseService.getAuth).toHaveBeenCalled();
  });

  it('should create new user', () => {
    spyOn(firebaseService, 'newUser');

    service.newUser();

    expect(firebaseService.newUser).toHaveBeenCalled();
  });

  it('should login', () => {
    spyOn(firebaseService, 'login');

    let reginfo = new Reginfo();
    reginfo.email = 'test@test.ch';
    reginfo.pass = '123';

    service.login('Password', reginfo);

    expect(firebaseService.login).toHaveBeenCalledWith({email: reginfo.email, password: reginfo.pass});
  });

  /*it('should logout', () => {
    spyOn(firebaseService, 'logout');

    service.logout();

    expect(firebaseService.logout).toHaveBeenCalled();
  });*/

  it('should get user', () => {
    let user = service.getUser();

    expect(user.uid).toEqual('abc123');
  });

  it('should get user as observable', () => {
    service.getUserAsObservable().subscribe((user) => {
      expect(user.uid).toEqual('abc123');
    });
  });
});
