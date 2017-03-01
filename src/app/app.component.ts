import { Component } from '@angular/core';

import { User } from './login/user';
import { LoginService } from './login/login.service';

@Component({
  selector: 'app-component',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ LoginService ]
})
export class AppComponent {
  user: User;

  constructor (private loginService: LoginService) {
    this.loginService.data.subscribe((data: any) => {
          this.user = data;
    });
  }
}
