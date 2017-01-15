import { Component } from '@angular/core';

import { User } from './login/user';
import { UserService } from './login/user.service';

@Component({
  selector: 'app-component',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ UserService ]
})
export class AppComponent {
  user: User;

  constructor (private UserService: UserService) {
    this.UserService.data.subscribe((data: any) => {
          this.user = data;
    });
  }
}
