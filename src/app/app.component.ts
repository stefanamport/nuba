import { Component } from '@angular/core';

import { user } from './login/user';
import { UserService } from './login/user.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ UserService ]
})
export class AppComponent {
	user: user;

	constructor (private UserService: UserService){
		this.UserService.data.subscribe((data: any) => {
          this.user = data;
      });
	}
}
