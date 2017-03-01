import { Component } from '@angular/core';

import { User } from './user';
import { LoginService } from './login.service';

import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LogInComponent {

  user: User;

  constructor( private loginService: LoginService, private Router: Router) {
      this.user = this.loginService.getUser();

      this.loginService.data.subscribe((data: any) => {
          this.user = data;

          if (data.uid) {
            this.redirectToHome();
          }
      });
  }

  redirectToHome() {
    this.Router.navigate(['journal']);
  }

  login(method: string) {
    this.loginService.login(method);
  }
}
