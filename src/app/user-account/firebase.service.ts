import { Injectable } from '@angular/core';
import { AngularFire, FirebaseObjectObservable} from 'angularfire2';
import { User } from '../login/user';

@Injectable()
export class FirebaseService  {
  constructor(private af: AngularFire) {}

  getUser(userUid: any): FirebaseObjectObservable<User> {
    return this.af.database.object('/userData/' + userUid);
  }

  saveUser(user: User, userUid: any) {
    let userkey = userUid;
    let userClean: User = {};

    // Remove $ Values
    // Verhindert dass $funktionen von firebase zurück auf den server gespielt werden
    // nur Values werden gesendet, keine Funktionen
    let keys = Object.keys(user).filter(function(key){
      return typeof user[key] !== 'function' && key.indexOf('$') !== 0;
    });

    keys.map(function(key) {
      userClean[key] = user[key];
    });

    this.af.database.object('/userData/' + userkey).update(userClean);
  }
}
