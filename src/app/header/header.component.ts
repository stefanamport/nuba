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
    this.loginService.getUserAsObservable().subscribe((data: any) => {
      this.user = data;
    });
  }
}
