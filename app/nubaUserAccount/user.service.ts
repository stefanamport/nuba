import { Injectable } from '@angular/core';

import { user } from './user';

@Injectable()
export class UserService {

  userData: user;

  constructor (){


    // mock... von globalem user holen
    this.userData = {
        id: 1,
        name: "stefan",
        bodyweight: 59,
        bodyheight: 162,
        birthday: "1986-07-11"
     }

    this.doCalculations();

  }
  
  getUserData(){
    return this.userData;
  }

  setUserData(user:user){

    this.userData = user;
    this.doCalculations();

    // TODO Send to firebase
    console.log(this.userData);

  }

  private doCalculations(){
    this.setBMI();
    this.setAge();
  };

  private setBMI(){

    let bmi = 0;

    if (this.userData.bodyweight > 0 && this.userData.bodyheight > 0) {
        
      let bodyHeightMeter = this.userData.bodyheight/100;

      bmi = this.userData.bodyweight / (bodyHeightMeter * bodyHeightMeter);
      
      bmi = Math.round(bmi * 10) / 10 ;
    }

    this.userData.bmi = bmi;

  }

  private setAge(){
    let birthday = new Date(this.userData.birthday);
    let today = new Date();

    var age = today.getFullYear() - birthday.getFullYear();
    var monthDiff = today.getMonth() - birthday.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthday.getDate())) {
        age = age - 1;
    }

    this.userData.age = age;
  }
	
}
