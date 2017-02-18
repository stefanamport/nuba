import { Component } from '@angular/core';

import { User } from './user';
import { UserService } from './user.service';

import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LogInComponent {

  user: User;

  constructor( private UserService: UserService, private Router: Router) {

        this.user = this.UserService.getUser();

        this.UserService.data.subscribe((data: any) => {
            this.user = data;

            if (data.uid) {
              this.redirectToHome();
            }
        });
  }

  redirectToHome() {
  }

  login(method: string) {
  }
}
