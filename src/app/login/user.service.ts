import { Injectable, Output } from '@angular/core';

import { AngularFire, AuthProviders, AngularFireAuth } from 'angularfire2';

import { Router } from '@angular/router';

import { EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import { user } from './user';
import { ActivityLevels } from '../login/user.specs';

@Injectable()
export class UserService {

  userAut: any;
  userInfo: any;
  user: user;

  @Output() data = new EventEmitter();

  constructor( public af: AngularFire, private auth: AngularFireAuth, private router: Router) {

    this.resetUser();

    this.af.auth.subscribe(user => {
      if(user) {
        this.userAut = user;

        this.af.database.object('/userData/' + this.userAut.uid).subscribe( userInfo => {
           this.userInfo = userInfo;
           this.userUpdated();
        });

      }
      else {
        this.userAut = {};
        this.userUpdated();
      }
    });

  }

  isLoggedIn(){
    return this.auth;
  }

  login(method:string) {
    this.af.auth.login({
      provider: AuthProviders[method]
    });
  }

  logout (){
    this.af.auth.logout();

    this.resetUser();
    this.userUpdated();

    this.router.navigate(['login']);
  }

  getUser(){
    
    if (this.userAut) {
      this.user.uid = this.userAut.uid;
    }

    if (this.userAut.google) {
      this.user.avatar = this.userAut.google.photoURL;
    }

    this.user = Object.assign(this.user, this.userInfo);

    return this.user;
  }

  updateUserInfo(userInfo: any) {
    this.userInfo = userInfo;
    this.doCalculations();
    this.saveUserToFirebase();
  }

  private resetUser(){
    this.user = {};
    this.userAut = false;
    this.userInfo = false;
  }

  private userUpdated (){
    if (this.userInfo || this.userAut) {
      this.data.next(this.getUser());
    } else {
      this.data.next(false);
    }
  }

  private saveUserToFirebase(){

    let userkey = this.userAut.uid;
    let userInfoIntern = this.userInfo;

    let userClean: user = {};

    // Cleanup Object
    // Verhindert dass $funktionen von firebase zurück auf den server gespielt werden
    // TODO: uid & avatar werden auch manuell gelöscht... evtl. noch anders lösen?
    var keys = Object.keys(userInfoIntern).filter(function(key){
      if (key.indexOf('$') && key.indexOf('uid') && key.indexOf('avatar')){
        return key;
      }
    });

    keys.map(function(key){ userClean[key] = userInfoIntern[key] }); 

    this.af.database.object('/userData/' + userkey).update(userClean);
    
  }

  private doCalculations(){
    this.setBMI();
    this.setAge();
    this.setMetabolicRate();
  };

  // Kaloreien Grundumsatz
  private setMetabolicRate(){

    let mr = 0;

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
    mr = calcVars[this.user.gender]['cv1'] +
         (calcVars[this.user.gender]['cv2'] * this.user.bodyweight) +
         (calcVars[this.user.gender]['cv3'] * this.user.bodyheight) -
         (calcVars[this.user.gender]['cv3'] * this.user.age);

    // Multiplikation mit Aktivitätslevel
    // Ausgehend von 8 Arbeitsstunden
    let workingHours = 8;
    let hourlyMetabolic = mr/24;
    let dailySportHours = this.userInfo.hoursOfSport/7;

    let workingMetabolic = (hourlyMetabolic * workingHours) * ActivityLevels[this.userInfo.activityLevel]['pal'];
    let sportMetabolic = (hourlyMetabolic * dailySportHours) * 2;
    let restMetabolic = hourlyMetabolic * (24 - workingHours - dailySportHours);

    mr = Math.round(workingMetabolic + sportMetabolic + restMetabolic);

    this.userInfo.metabolicRate = mr;
  }
  

  private setBMI(){

    let bmi = 0;

    if (this.userInfo.bodyweight > 0 && this.userInfo.bodyheight > 0) {
        
      let bodyHeightMeter = this.userInfo.bodyheight/100;

      bmi = this.userInfo.bodyweight / (bodyHeightMeter * bodyHeightMeter);
      
      bmi = Math.round(bmi * 10) / 10 ;
    }

    this.userInfo.bmi = bmi;

  }

  private setAge(){

    let age = 0;

    if (this.userInfo.birthday) {
      let birthday = new Date(this.userInfo.birthday);
      let today = new Date();

      age = today.getFullYear() - birthday.getFullYear();
      var monthDiff = today.getMonth() - birthday.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthday.getDate())) {
          age = age - 1;
      }

    }

    this.userInfo.age = age;
    
  }

}
