import { Component } from '@angular/core';

import { user } from '../login/user';
import { UserService } from '../login/user.service';

import { FirebaseService } from './firebase.service';

import { Genders, ActivityLevels } from '../login/user.specs';

@Component({
  templateUrl: './user-account.component.html',
  providers: [ UserService, FirebaseService ]
})
export class UserAccountComponent  { 

	user: user;
  genders: any;
  activityLevels: any;

    constructor (private UserService: UserService){

      this.genders = Genders;
      this.activityLevels = ActivityLevels;

       this.user = this.UserService.getUser();

       this.UserService.data.subscribe((data: any) => {
          this.user = data;
       });

    }

    // helper that *ngFoor can loop over object keys
    objKeys(object) : Array<string> {
      return Object.keys(object);
    }

    saveUser(){
    	this.UserService.updateUserInfo(this.user);
    }

}
