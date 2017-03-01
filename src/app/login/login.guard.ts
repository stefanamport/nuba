import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { LoginService } from './login.service';

@Injectable()
export class LoginGuard implements CanActivate {

  constructor(private loginService: LoginService, private Router: Router) {
  }

  canActivate() {
    return this.loginService.isLoggedIn().map((auth) => {
      if (auth) {
        return true;
      } else {
        this.Router.navigate(['login']).then(() => {
          return false;
        });
      }
    });
  }
}
