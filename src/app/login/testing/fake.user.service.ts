import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';


export class UserServiceStub {

  @Output() data = new EventEmitter();

  constructor () {
    this.data.next(this.getUser());
  }

  updateUserInfo() {
    return this.user;
  }

  getUser() {
    let testuser = {
        uid: 'xxx',
        name: 'Hans Ueli',

        birthday: '2017-01-15', // Format: yyyy-mm-dd
        age: 20,

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
}
