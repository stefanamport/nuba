import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { user } from './user';
import { UserService } from './user.service';

@Injectable()
export class LoginGuard implements CanActivate {
  
  user: user = {};

  constructor(private UserService: UserService) {

      this.user = this.UserService.getUser();

      this.UserService.data.subscribe((data: any) => {
          this.user = data;
       });

  }

  canActivate() {
    
    if (this.user.uid) {
    	return true;
    } else {
    	return false;
    }

  }
}