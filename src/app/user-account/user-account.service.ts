import { Injectable } from '@angular/core';

import { FirebaseService } from '../firebase/firebase.service';
import { LoginService } from '../login/login.service';
import { ActivityLevels } from './user-account.constants';
import { User } from '../login/user';

@Injectable()
export class UserAccountService {
  user: User;

  constructor(
    private firebaseService: FirebaseService,
    private loginService: LoginService
  ) {
    this.loginService.getUserAsObservable().subscribe((user: User) => {
      this.user = user;
    });
  }

  updateUserInfo(userInfo: any) {
    this.user = userInfo;
    this.doCalculations();
    this.saveUserToFirebase();
  }

  addMostUsedFoods(foodID: number) {
    let shortListMaxLength = 5;

    if (this.user.foodShortlist === undefined) {
      this.user.foodShortlist = [];
    }

    // Add Food if it's not already on list
    if (this.user.foodShortlist.indexOf(foodID) < 0) {
      this.user.foodShortlist.push(Number(foodID));

      // remove Food if List is to long
      if (this.user.foodShortlist.length > shortListMaxLength) {
        this.user.foodShortlist.shift();
      }

      this.saveUserToFirebase();
    }
  }

  private saveUserToFirebase() {
    let userkey = this.user.uid;
    let userInfoIntern = this.user;
    let userClean: User = {};

    // Cleanup Object
    // Verhindert dass $funktionen von firebase zurück auf den server gespielt werden
    // TODO: uid & avatar werden auch manuell gelöscht... evtl. noch anders lösen?
    let keys = Object.keys(userInfoIntern).filter(function (key) {
      return (key.indexOf('$') && key.indexOf('uid') && key.indexOf('avatar'));
    });

    keys.map(function (key) {
      userClean[key] = userInfoIntern[key];
    });
    this.firebaseService.updateItem('userData', userkey, userClean);
  }

  private doCalculations() {
    this.setBMI();
    this.setAge();
    this.setMetabolicRate();
  };

  // Kaloreien Grundumsatz
  private setMetabolicRate() {
    const calcVars = {
      male: {
        cv1: 66.47,
        cv2: 13.7,
        cv3: 5,
        cv4: 6.8
      },
      female: {
        cv1: 655.1,
        cv2: 9.6,
        cv3: 1.8,
        cv4: 4.7
      }
    };

    // Grundumsatz nach Harris-Benedict Formel
    // http://www.sportunterricht.ch/Theorie/Energie/energie.php
    let mr = calcVars[this.user.gender]['cv1'] +
      (calcVars[this.user.gender]['cv2'] * this.user.bodyweight) +
      (calcVars[this.user.gender]['cv3'] * this.user.bodyheight) -
      (calcVars[this.user.gender]['cv3'] * this.user.age);

    // Multiplikation mit Aktivitätslevel
    // Ausgehend von 8 Arbeitsstunden
    let workingHours = 8;
    let hourlyMetabolic = mr / 24;
    let dailySportHours = this.user.hoursOfSport / 7;

    let workingMetabolic = (hourlyMetabolic * workingHours) * ActivityLevels[this.user.activityLevel]['pal'];
    let sportMetabolic = (hourlyMetabolic * dailySportHours) * 2;
    let restMetabolic = hourlyMetabolic * (24 - workingHours - dailySportHours);

    mr = Math.round(workingMetabolic + sportMetabolic + restMetabolic);

    this.user.metabolicRate = mr;
  }

  private setBMI() {
    let bmi = 0;

    if (this.user.bodyweight > 0 && this.user.bodyheight > 0) {
      let bodyHeightMeter = this.user.bodyheight / 100;
      bmi = this.user.bodyweight / (bodyHeightMeter * bodyHeightMeter);
      bmi = Math.round(bmi * 10) / 10;
    }

    this.user.bmi = bmi;
  }

  private setAge() {
    this.user.age = this.calculateAge(this.user.birthday);
  }

  public calculateAge(birthday: string) {
    let age = 0;

    if (birthday) {
      let birthdayDate = new Date(birthday);
      let today = new Date();

      age = today.getFullYear() - birthdayDate.getFullYear();
      let monthDiff = today.getMonth() - birthdayDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthdayDate.getDate())) {
        age = age - 1;
      }
    }

    return age;
  }
}
