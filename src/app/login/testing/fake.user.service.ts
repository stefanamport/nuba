import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../user';

export class LoginServiceStub {

  @Output() data = new EventEmitter();
  user = new User();
  private age = 20;

  constructor () {
    this.data.next(this.getUser());
  }

  setAge(age) {
    this.age = age;
  }

  updateUserInfo() {
    return this.user;
  }

  getUser() {
    let testuser = {
        // uid of test user in firebase database
        uid: 'BRIu6Iu3ZpSEGqbbfEMTUODihM53',
        name: 'Hans Ueli',

        birthday: '1997-01-15', // Format: yyyy-mm-dd
        age: this.age,

        avatar: 'http://www.nuba.ch/fakeUser.jpg',

        bodyweight: 50,
        bodyheight: 170,

        gender: 'male',
        activityLevel: 3,
        hoursOfSport: 5,
        metabolicRate: 2200,

        bmi: 30
    };

    return testuser;
  }

  getUserAsObservable() {
    return Observable.of(this.getUser());
  }
}
