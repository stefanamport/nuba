import {Component, OnInit} from '@angular/core';

import { User } from './user';
import { LoginService } from './login.service';

import { Reginfo } from './reginfo';

import {Router} from '@angular/router';
import {FirebaseAuthState} from 'angularfire2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LogInComponent implements OnInit {

  user: User;
  reginfo: Reginfo = {};
  formValidation: any = {messages: [] };

  loginmode = 'newaccount';

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
    this.loginService.getUserAsObservable().subscribe((user) => {

        this.user = user;

        if (
          this.user.birthday &&
          this.user.bodyweight &&
          this.user.bodyheight &&
          this.router.url === '/login'
          ) {
          this.router.navigate(['journal']);
        }
    });
  }

  private setFirebaseValidateError(errorMessages) {

    this.formValidation.messages = [];

    this.formValidation.state = false;
    this.formValidation.messages.push(errorMessages);
  }

  login(method: string, event?: Event) {
    if (event) {
      event.preventDefault();
    }

    // make new user
    if (this.loginmode === 'newaccount' && method === 'Password') {
      this.createNewUser();
    } else {
      this.loginService.login(method, this.reginfo).then((authState: FirebaseAuthState) => {
        if (authState.uid) {
          this.user = authState;
        }
      }).catch((error) => {
         this.setFirebaseValidateError(error.message);
      });
    }
  }

  private createNewUser() {
    let validationMsgs = this.loginService.validatePassword(this.reginfo.pass, this.reginfo.pass2);
    if (validationMsgs.length === 0) {
      this.loginService.newUser(this.reginfo).then((authState: FirebaseAuthState) => {
        if (authState.uid) {
          this.user = authState;
        }
      }).catch((error) => {
        this.setFirebaseValidateError(error);
      });
    } else {
      for (let msg of validationMsgs) {
        this.setFirebaseValidateError(msg);
      }
    }
  }

  switchLoginMode(mode: any) {
    this.loginmode = mode;
    this.formValidation.messages = [];
  }
}
