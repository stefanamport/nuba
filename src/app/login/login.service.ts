import { Injectable, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { User } from './user';
import { FirebaseService } from '../firebase/firebase.service';
import { AuthProviders } from 'angularfire2';

@Injectable()
export class LoginService {
  userAuth: any;
  userInfo: any;
  user: User;

  @Output() data = new EventEmitter();

  constructor(private firebaseService: FirebaseService,
              private router: Router) {
    this.resetUser();

    this.firebaseService.getAuth().subscribe(user => {
      if (user) {
        this.userAuth = user;

        this.firebaseService.getObject('userData', this.userAuth.uid).subscribe(userInfo => {
          this.userInfo = userInfo;
          this.userInfo.dataCompleted = true;
          this.userUpdated();
        });
      } else {
        this.userAuth = {};
        this.userUpdated();
      }
    });
  }

  public isLoggedIn() {
    return this.firebaseService.getAuth();
  }

  public login(method: string) {
    this.firebaseService.login({
      provider: AuthProviders[method]
    }).catch(() => {
      this.cleanUpAuth();
    });
  }

  public logout() {
    this.firebaseService.logout().then(() => {
      this.cleanUpAuth();
    });
  }

  private cleanUpAuth() {
    this.resetUser();
    this.userUpdated();
    this.router.navigate(['login']);
  }

  public getUser() {
    if (this.userAuth) {
      this.user.uid = this.userAuth.uid;
    }

    if (this.userAuth.google) {
      this.user.avatar = this.userAuth.google.photoURL;
    }

    this.user = Object.assign(this.user, this.userInfo);

    return this.user;
  }

  private resetUser() {
    this.user = {};
    this.userAuth = false;
    this.userInfo = false;
  }

  private userUpdated() {
    if (this.userInfo || this.userAuth) {
      this.data.next(this.getUser());
    } else {
      this.data.next(false);
    }
  }
}
