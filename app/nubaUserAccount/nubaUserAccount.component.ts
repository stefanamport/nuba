import { Component } from '@angular/core';

import { user } from './user';
import { UserService } from '../logIn/user.service';
//import { UserService } from './user.service';

import { FirebaseService } from './firebase.service';

@Component({
  templateUrl: "./app/nubaUserAccount/nubaUserAccount.component.html",
  providers: [ UserService, FirebaseService ]
})
export class UserAccountComponent  { 

	user: user = {};

  	constructor( private UserService: UserService) {

      UserService.data.subscribe((data: any) => {
         this.user = data;
      });

  	}

    saveUser(){
    	this.UserService.changeUserInfo(this.user);
    }


}
