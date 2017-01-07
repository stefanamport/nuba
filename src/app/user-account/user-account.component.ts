import { Component } from '@angular/core';

import { user } from '../login/user';
import { UserService } from '../login/user.service';

import { FirebaseService } from './firebase.service';

@Component({
  templateUrl: './user-account.component.html',
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
