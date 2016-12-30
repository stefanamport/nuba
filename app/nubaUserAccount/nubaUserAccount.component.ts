import { Component } from '@angular/core';

import { user } from './user';
import { UserService } from './user.service';
import { FirebaseService } from './firebase.service';



@Component({
  templateUrl: "./app/nubaUserAccount/nubaUserAccount.component.html",
  providers: [UserService, FirebaseService]
})
export class UserAccountComponent  { 

	user: user;

  	constructor( private UserService: UserService) {
  		this.user = {};
  	}

  	ngOnInit(){
  		
  	  this.UserService.getUserData().subscribe((data: user) => {
        
        this.user = data;
        console.log(this.user);
      });

    }

    saveUser(){
    	this.UserService.setUserData(this.user);
    }
	
	

}
