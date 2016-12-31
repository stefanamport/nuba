import { Component } from '@angular/core';

import { UserService } from './user.service';

@Component({
  moduleId: module.id,
  selector: 'login',
  templateUrl: 'login.component.html'
})
export class LogIn {

  constructor(private UserService: UserService) {

  }

  login() {
	  this.UserService.login();
	}
	 
	logout() {
    this.UserService.logout();
	}

}