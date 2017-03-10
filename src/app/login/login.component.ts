import {Component, OnInit} from '@angular/core';

import { User } from './user';
import { LoginService } from './login.service';

import {Router} from '@angular/router';
import {FirebaseAuthState} from 'angularfire2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LogInComponent implements OnInit {

  user: User;

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
    this.user = this.loginService.getUser();
    if (this.user.uid) {
      this.redirectToHome();
    }
  }

  redirectToHome() {
    this.router.navigate(['journal']);
  }

  login(method: string) {
    this.loginService.login(method).then((authState: FirebaseAuthState) => {
      if (authState.uid) {
        this.redirectToHome();
      }
    });
  }
}
