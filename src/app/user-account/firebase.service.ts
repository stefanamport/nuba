import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';
import { user } from '../logIn/user';

@Injectable()
export class FirebaseService  {
  constructor(private af: AngularFire) {}

  getUser(userUid: any): FirebaseObjectObservable<user> {
  	return this.af.database.object('/userData/' + userUid);
  }

  saveUser(user:user, userUid: any){

    let userkey = userUid;
    let userClean: user = {};

    // Remove $ Values
    // Verhindert dass $funktionen von firebase zurück auf den server gespielt werden
    // nur Values werden gesendet, keine Funktionen
    var keys = Object.keys(user).filter(function(key){
      return typeof user[key] !== 'function' && key.indexOf('$') !== 0;
    });

    keys.map(function(key){ userClean[key] = user[key] }); 

    this.af.database.object('/userData/' + userkey).update(userClean);
    
  }

}
