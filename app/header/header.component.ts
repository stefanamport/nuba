import { Component } from '@angular/core';

import { user } from '../NubaUserAccount/user';
import { UserService } from '../logIn/user.service';

@Component({
  selector: 'AppHeader',
  templateUrl: "./app/header/header.html"
})
export class AppHeader  { 

	user: user = {};

	constructor(private UserService: UserService) {

		// Initial Load User
      this.user = this.UserService.getUser();

       //subscribe User changes
       this.UserService.data.subscribe((data: any) => {
          this.user = data;
       });
	   
	}

	ngOnInit(){

	}

}
