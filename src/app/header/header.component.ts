import { Component } from '@angular/core';

import { User } from '../login//User';
import { UserService } from '../login/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent  {

  user: User;

  constructor(private UserService: UserService) {
    // Initial Load User
    this.user = this.UserService.getUser();

    // subscribe User changes
    this.UserService.data.subscribe((data: any) => {
      this.user = data;
    });
  }
}
