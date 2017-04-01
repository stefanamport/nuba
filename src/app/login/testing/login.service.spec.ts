import { LoginService } from '../login.service';
import { Observable } from 'rxjs';
import { User } from '../user';
import { Reginfo } from '../reginfo';
import * as firebase from 'firebase';
import Promise = firebase.Promise;
import { FirebaseAuthState, AuthProviders } from 'angularfire2';

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

  updatePassword() { }

  reauthenticateUser() { }

  logout() {
    return new Promise(function (resolve, reject) {
      resolve(1);
    });
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

  it('should logout', () => {
    let user = new User();
    user.uid = '12345';
    service.user = user;

    spyOn(router, 'navigate');
    spyOn(firebaseService, 'logout').and.returnValue(Promise.resolve()).and.callThrough();

    service.logout();

    expect(firebaseService.logout).toHaveBeenCalled();
  });

  it('should get user', () => {
    let user = service.getUser();

    expect(user.uid).toEqual('abc123');
  });

  it('should get user as observable', () => {
    service.getUserAsObservable().subscribe((user) => {
      expect(user.uid).toEqual('abc123');
    });
  });

  it('should validate password - ok', () => {
    let validationMsgs = service.validatePassword('1234567', '1234567');

    expect(validationMsgs).toEqual([]);
  });

  it('should validate password - nok - password too short', () => {
    let validationMsgs = service.validatePassword('12345', '12345');

    expect(validationMsgs.length).toBe(1);
    expect(validationMsgs[0]).toEqual('Das Passwort muss mind. 6 Zeichen lang sein.');
  });

  it('should validate password - nok - passwords not equal', () => {
    let validationMsgs = service.validatePassword('123456', '1234567');

    expect(validationMsgs.length).toBe(1);
    expect(validationMsgs[0]).toEqual('Die Passwörter stimmen nicht überein.');
  });

  it('should change password', () => {
    let authData = {
      uid: '12345',
      provider: AuthProviders.Github,
      auth: {
        displayName: 'John Doe',
        providerId: 'github.com'
      }
    } as FirebaseAuthState;

    service.userAuth = authData;
    spyOn(firebaseService, 'updatePassword');

    let password = '123456';
    service.changePassword(password);

    expect(firebaseService.updatePassword).toHaveBeenCalledWith(authData.auth, password);
  });

  it('should reauthenticateUser', () => {
    let authData = {
      uid: '12345',
      provider: AuthProviders.Github,
      auth: {
        displayName: 'John Doe',
        providerId: 'github.com'
      }
    } as FirebaseAuthState;

    service.userAuth = authData;
    spyOn(firebaseService, 'reauthenticateUser');

    let password = '123456';
    service.reauthenticateUser(password);

    expect(firebaseService.reauthenticateUser).toHaveBeenCalledWith(authData.auth, authData.auth.email, password);
  });
});
