import { Component } from '@angular/core';

import { User } from '../login/user';
import { UserService } from '../login/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent  {

  user: User = [];

  constructor(public userService: UserService) {
    // Initial Load User
    this.user = this.userService.getUser();

    this.userService.data.subscribe((data: any) => {
      this.user = data;
    });
  }
}
