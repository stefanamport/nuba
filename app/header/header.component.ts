import { Component } from '@angular/core';

import { user } from '../NubaUserAccount/user';
import { UserService } from '../logIn/user.service';

@Component({
  selector: 'AppHeader',
  templateUrl: "./app/header/header.html"
})
export class AppHeader  { 

	user: user = {};

	constructor(UserService: UserService) {

	    UserService.data.subscribe((data: any) => {
	       this.user = data;
	    });
	}

}
