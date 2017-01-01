import { Component } from '@angular/core';

import { user } from '../logIn/user';
import { UserService } from '../logIn/user.service';

import { FirebaseService } from './firebase.service';

@Component({
  templateUrl: "./app/nubaUserAccount/nubaUserAccount.component.html",
  providers: [ UserService, FirebaseService ]
})
export class UserAccountComponent  { 

	user: user;

    constructor (private UserService: UserService){
      
       this.user = this.UserService.getUser();

       this.UserService.data.subscribe((data: any) => {
          this.user = data;
       });

    }


    saveUser(){
    	this.UserService.updateUserInfo(this.user);
    }

}
