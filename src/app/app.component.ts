import { Component } from '@angular/core';

import { UserService } from './login/user.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ UserService ]
})
export class AppComponent {
  title = 'app works!';
}
