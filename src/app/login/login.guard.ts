import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { AngularFireAuth } from 'angularfire2/angularfire2';

//import { user } from './user';
import { UserService } from './user.service';

@Injectable()
export class LoginGuard implements CanActivate {

  constructor(private UserService: UserService, private Router: Router) {

  }

  canActivate(){
  	return this.UserService.isLoggedIn().map((auth) => {
	    if (auth) {
	        return true;
	    }
        this.Router.navigate(['login']);
        return false;  
    });

   }
  

}