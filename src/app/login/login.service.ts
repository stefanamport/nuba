import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { User } from './user';
import { Reginfo } from './reginfo';
import { FirebaseService } from '../firebase/firebase.service';
import { AuthProviders, AuthMethods, FirebaseAuthState } from 'angularfire2';
import { BehaviorSubject, Observable } from 'rxjs';
import Promise = firebase.Promise;

@Injectable()
export class LoginService {
  userAuth: FirebaseAuthState;
  user: User = new User();

  private userSubject = new BehaviorSubject<User>(this.user);

  constructor(private firebaseService: FirebaseService,
              private router: Router) {
    this.resetUser();

    this.firebaseService.getAuth().subscribe(user => {
      if (user) {
        this.userAuth = user;
        this.updateUser();

        this.firebaseService.getObject('userData', this.userAuth.uid).subscribe(userInfo => {
          this.user = userInfo;
          this.user.loadingComplete = true;
          this.updateUser();
        });
      } else {
        this.userAuth = null;
        this.updateUser();
      }
    });
  }

  public isLoggedIn() {
    return this.firebaseService.getAuth();
  }

  public newUser(reginfo?: Reginfo): Promise<FirebaseAuthState> {
    return this.firebaseService.newUser(reginfo);
  }

  public login(method: string, reginfo?: Reginfo): Promise<FirebaseAuthState> {

    if (method === 'Password') {

      return this.firebaseService.login({
        email: reginfo.email,
        password: reginfo.pass
      });

    } /* else if (method === 'Google') {
       // not used anymore
       // support for google Accounts dropped

       return this.firebaseService.login({
        provider: AuthProviders.Google
      }).catch(() => {
        this.cleanUpAuth();
      });
    }*/

  }

  public logout() {
    this.firebaseService.logout().then(() => {
      this.cleanUpAuth();
    });
  }

  public getUserAsObservable(): Observable<User> {
    return this.userSubject.asObservable();
  }

  public getUser(): User {
    return this.userSubject.getValue();
  }

  private resetUser() {
    this.user = new User();
    this.userAuth = null;
  }

  private updateUser() {
    if (this.userAuth) {
      this.user.uid = this.userAuth.uid;

      if (this.userAuth.google) {
        this.user.avatar = this.userAuth.google.photoURL;
      }
    }

    this.userSubject.next(this.user);
  }

  private cleanUpAuth() {
    this.resetUser();
    this.updateUser();
    this.router.navigate(['login']);
  }
}
