import { Component } from '@angular/core';

import { user } from './user';
import { UserService } from './user.service';

@Component({
  templateUrl: "./app/nubaUserAccount/nubaUserAccount.component.html",
  providers: [UserService]
})
export class UserAccountComponent  { 

	user: user;

  	constructor( private UserService: UserService) {
  		this.user = UserService.getUserData();
  	}

  	ngOnInit(){
  		/*
      this.user = {
      	vorname: "stefan",
      	gewicht: 30
      }
      */
    }

    saveUser(){
    	this.UserService.setUserData(this.user);
    }
	
	

}
