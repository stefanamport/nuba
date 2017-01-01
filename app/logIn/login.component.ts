import { Component } from '@angular/core';

import { user } from '../NubaUserAccount/user';
import { UserService } from './user.service';

@Component({
  moduleId: module.id,
  selector: 'login',
  templateUrl: 'login.component.html'
})
export class LogIn {

  user: user = {};

  constructor(private UserService: UserService) {
    // Initial Load User
      this.user = this.UserService.getUser();

       //subscribe User changes
       this.UserService.data.subscribe((data: any) => {
          this.user = data;
       });
  }

  ngOnInit(){
    
  }

  login() {
	  this.UserService.login();
	}
	 
	logout() {
    this.UserService.logout();
	}

}