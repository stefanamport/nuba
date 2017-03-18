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

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {

    this.loginService.getUserAsObservable().subscribe((user) => {

        this.user = user;

        if (this.user.birthday && this.user.bodyweight && this.user.bodyheight) {
          this.router.navigate(['journal']);
        }

    });

  }

  private validateReginfo() {

    this.formValidation.messages = [];

    if (this.reginfo.pass !== this.reginfo.pass2) {
      this.formValidation.messages.push('Die Passwörter stimmen nicht überein.');
    }

    if (this.reginfo.pass.length < 6) {
      this.formValidation.messages.push('Das Passwort muss mind. 6 Zeichen lang sein.');
    }

    if (this.formValidation.messages.length > 0) {
      return false;
    } else {
      return true;
    }

  }

  private setFirebaseValidateError(error) {
    this.formValidation.state = false;
    this.formValidation.messages.push(error.message);
  }

  login(method: string, event?: Event) {

    if (event) {
      event.preventDefault();
    }

    this.loginService.login(method, this.reginfo).then((authState: FirebaseAuthState) => {
      if (authState.uid) {
        this.user = authState;
      }
    }).catch((error) => {
       this.setFirebaseValidateError(error);
    });

  }
}
