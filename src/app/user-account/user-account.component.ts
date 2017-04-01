import {Component, OnInit} from '@angular/core';

import { User } from '../login/user';
import { FirebaseService } from '../firebase/firebase.service';
import { Genders, ActivityLevels } from './user-account.constants';
import { LoginService } from '../login/login.service';
import { UserAccountService } from './user-account.service';
import { FormValidation } from './form-validation';

@Component({
  templateUrl: './user-account.component.html',
  providers: [ FirebaseService ]
})
export class UserAccountComponent implements OnInit {

  user: User;
  genders = Genders;
  activityLevels = ActivityLevels;
  formValidation = new FormValidation();
  passwordValidation = new FormValidation();
  savedMessage = '';
  changedPassword = '';
  componentIsLoading = true;
  oldPassword = '';
  newPassword = '';
  newPasswordConfirmed = '';

  constructor (private loginService: LoginService, private userAccountService: UserAccountService) { }

  ngOnInit() {
    this.loginService.getUserAsObservable().subscribe((data: User) => {
      this.user = data;
      if (this.user.uid) {
        this.componentIsLoading = false;
      }
    });
  }

  // helper that *ngFoor can loop over object keys
  objKeys(object): Array<string> {
    return Object.keys(object);
  }

  validateForm(): boolean {
    this.formValidation.clearFormValidation();

    // check age
    this.validateAge();
    this.validateBodyweight();
    this.validateBodyheight();
    this.validateHoursOfSport();

    return this.formValidation.valid;
  }

  saveUser() {

    this.isUserInfoComplete();

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

  isUserInfoComplete() {

    if (
       this.user.bodyweight &&
       this.user.birthday &&
       this.user.bodyweight &&
       this.user.bodyheight &&
       this.user.gender &&
       this.user.activityLevel ) {

       this.user.isUserInfoComplete = true;

    } else {

       this.user.isUserInfoComplete = false;

    }

  }

  changePassword() {
    let passwordOk = this.validatePasswords(this.newPassword, this.newPasswordConfirmed);

    if (passwordOk) {
      let self = this;

      this.loginService.reauthenticateUser('email', this.oldPassword).then(function() {
        self.loginService.changePassword(self.newPassword).then(function() {
          self.resetPasswordForm();
        }).catch((error) => {
          self.setPasswordValidationMessage(error.message);
        });
      }).catch((error) => {
        let errorMsg = error.message;
        if (error['code'] !== undefined && error['code'] === 'auth/wrong-password') {
          errorMsg = 'Das alte Passwort ist falsch.';
        }
        this.setPasswordValidationMessage(errorMsg);
      });
    }
  }

  private setPasswordValidationMessage(errorMsg: string) {
    this.passwordValidation.messages.push(errorMsg);
    this.passwordValidation.valid = false;
  }

  private resetPasswordForm() {
    this.changedPassword = 'Passwort wurde geändert';
    this.oldPassword = '';
    this.newPassword = '';
    this.newPasswordConfirmed = '';

    let self = this;
    setTimeout(function() {
      self.changedPassword = '';
    }, 3000);
  }

  private validatePasswords(newPassword, passwordConfirmed): boolean {
    this.passwordValidation.clearFormValidation();
    let validationMessages = this.loginService.validatePassword(newPassword, passwordConfirmed);

    if (validationMessages.length > 0) {
      this.passwordValidation.messages = validationMessages;
      this.passwordValidation.valid = false;

      return false;
    }

    return true;
  }

  private validateBodyweight() {
    let weight = this.user.bodyweight;
    if (weight) {
      if (weight < 30 || weight > 200) {
        this.formValidation.messages.push( 'Bitte trage dein korrektes Gewicht ein' );
        this.formValidation.valid = false;
      }
    }
  }

  private validateBodyheight() {
    let height = this.user.bodyheight;

    if (height) {
      if (height < 60 || height > 200 ) {
        this.formValidation.messages.push( 'Bitte trage deine korrekte Körpergrösse ein' );
        this.formValidation.valid = false;
      }
    }

  }

  private validateHoursOfSport() {
    if (this.user.hoursOfSport > 50) {
      this.formValidation.messages.push(this.user.hoursOfSport + ' Stunden Sport pro Woche? ;-) Wirklich?' );
      this.formValidation.valid = false;
    }
  }

  private validateAge() {

    if (this.user.birthday) {

       let age = this.userAccountService.calculateAge(this.user.birthday);

       if (age > 120) {
          this.formValidation.messages.push( 'Bitte gültiges Geburtsdatum angeben.' );
          this.formValidation.valid = false;
       } else if (age < 18) {
         this.formValidation.messages.push(
            'Zu jung... Leider können wir für unter 18-jährige keine zuverlässigen Berechnungen anbieten.' );
         this.formValidation.valid = false;
       }
    }

  }

}
