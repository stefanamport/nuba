import { Component } from '@angular/core';

import { User } from '../login/user';
import { FirebaseService } from '../firebase/firebase.service';
import { UserAccountService } from './user-account.service';
import { LoginService } from '../login/login.service';
import { Genders, ActivityLevels } from './user-account.constants';

@Component({
  templateUrl: './user-account.component.html',
  providers: [ LoginService, FirebaseService, UserAccountService ]
})
export class UserAccountComponent  {

  user: User;
  genders: any;
  activityLevels: any;
  formValidation: any = {};
  savedMessage = '';

  constructor ( private loginService: LoginService,
                private userAccountService: UserAccountService) {
    this.genders = Genders;
    this.activityLevels = ActivityLevels;
    this.user = this.loginService.getUser();

    this.loginService.data.subscribe((data: any) => {
      this.user = data;
    });
  }

  // helper that *ngFoor can loop over object keys
  objKeys(object): Array<string> {
    return Object.keys(object);
  }

  validateForm(): boolean {
    this.formValidation.valid = true;
    this.formValidation.messages = [];

     // check age
     this.validateAge();
     this.validateBodyweight();
     this.validateBodyheight();
     this.validateHoursOfSport();

     return this.formValidation.valid;
  }

  private validateBodyweight() {
    let weight = this.user.bodyweight;

    if (!weight || weight < 30 || weight > 200) {
      this.formValidation.messages.push( 'Bitte trage dein korrektes Gewicht ein' );
      this.formValidation.valid = false;
    }
  }

  private validateBodyheight() {

    let height = this.user.bodyheight;

    if (!height || height < 60 || height > 200 ) {
      this.formValidation.messages.push( 'Bitte trage deine korrekte Körpergrösse ein' );
      this.formValidation.valid = false;
    }

  }

  private validateHoursOfSport() {
    if (this.user.hoursOfSport > 50) {
      this.formValidation.messages.push(this.user.hoursOfSport + ' Stunden Sport pro Woche? ;-) Wirklich?' );
      this.formValidation.valid = false;
    }
  }

  private validateAge() {
     let age = this.userAccountService.calculateAge(this.user.birthday);

     if (this.user.birthday.length <= 0 || age > 120) {
        this.formValidation.messages.push( 'Bitte gültiges Geburtsdatum angeben.' );
        this.formValidation.valid = false;
     } else if (age < 18) {
       this.formValidation.messages.push( 'Zu jung... Leider können wir für unter 18-jährige keine zuverlässigen Berechnungen anbieten.' );
       this.formValidation.valid = false;
     }
  }

  saveUser() {
    if (this.validateForm()) {
      this.userAccountService.updateUserInfo(this.user);
      this.savedMessage = 'Angaben wurden gespeichert';
    } else {
      this.savedMessage = 'Nicht gespeichert, bitte Angaben prüfen.';
    }

    let that = this;
    setTimeout(function(){
        that.savedMessage = '';
     }, 3000);

  }

}
