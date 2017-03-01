import { Component } from '@angular/core';

import { User } from '../login/user';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent  {

  user: User = [];

  constructor(public loginService: LoginService) {
    // Initial Load UserAccount
    this.user = this.loginService.getUser();

    this.loginService.data.subscribe((data: any) => {
      this.user = data;
    });
  }
}
