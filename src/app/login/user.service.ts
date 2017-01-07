import { Injectable, Output } from '@angular/core';

import { AngularFire, AuthProviders, AngularFireAuth } from 'angularfire2';

import { Router } from '@angular/router';

import { EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import { user } from './user';

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
  };

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
