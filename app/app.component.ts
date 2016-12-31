import {Component} from '@angular/core';
import {AngularFire, FirebaseListObservable} from 'angularfire2';

import { UserService } from './logIn/user.service';
import { user } from './nubaUserAccount/user';

@Component({
  //moduleID: module.id,
  selector: 'my-app',
  templateUrl: './app/app.component.html',
  providers: [ UserService ]
})

export class AppComponent {
  name = 'Angular';
  items: FirebaseListObservable<any>;

  user: user;
  
  constructor(af: AngularFire, UserService: UserService) {
    this.items = af.database.list('food');

    // Subscribe to User Service
    this.user = {};

    UserService.data.subscribe((data: any) => {
       this.user = data;
    });

    //UserService.userUpdated();

  }
}
