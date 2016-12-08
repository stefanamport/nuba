import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  //moduleID: module.id,
  selector: 'my-app',
  templateUrl: './app/app.component.html'
})

export class AppComponent  {
  name = 'Angular';
  items: FirebaseListObservable<any>;
  constructor(af: AngularFire) {
     this.items = af.database.list('food');
  }
}
