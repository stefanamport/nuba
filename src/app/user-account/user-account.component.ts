import { Component } from '@angular/core';

import { User } from '../login/user';
import { UserService } from '../login/user.service';
import { FirebaseService } from '../firebase/firebase.service';
import { Genders, ActivityLevels } from '../login/user.specs';

@Component({
  templateUrl: './user-account.component.html',
  providers: [ UserService, FirebaseService ]
})
export class UserAccountComponent  {

  user: User;
  genders: any;
  activityLevels: any;
  formValidation: any = {};

  constructor (private userService: UserService) {
    this.formValidation.valid = true;

    this.genders = Genders;
    this.activityLevels = ActivityLevels;
    this.user = this.userService.getUser();

    this.userService.data.subscribe((data: any) => {
      this.user = data;
    });
  }

  // helper that *ngFoor can loop over object keys
  objKeys(object): Array<string> {
    return Object.keys(object);
  }

  validateForm(): boolean {

    this.formValidation.valid = true;

     // check age
     let age = this.userService.calcAge(this.user.birthday);

     if (age < 18) {
       this.formValidation.message = 'Zu jung... Leider können wir für unter 18-jährige keine zuverlässigen Berechnungen anbieten.';
       this.formValidation.valid = false;
     }

     return this.formValidation.valid;
  }

  saveUser() {
    if (this.validateForm()) {
      this.userService.updateUserInfo(this.user);
    }
  }
}
