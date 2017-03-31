import { Injectable } from '@angular/core';
import {
  FirebaseListObservable, AngularFire, FirebaseObjectObservable, FirebaseAuthState,
  AngularFireAuth
} from 'angularfire2';
import Promise = firebase.Promise;

import { Reginfo } from '../login/reginfo';

@Injectable()
export class FirebaseService {

  constructor(public af: AngularFire) { }

  getList(resource: string): FirebaseListObservable<any[]> {
    return this.af.database.list(resource);
  }

  getObject(resource: string, id: string): FirebaseObjectObservable<any> {
    return this.af.database.object(resource + '/' + id);
  }

  // adds a new object to a list
  addItem(resource: string, item: any) {
    return this.af.database.list(resource).push(item);
  }

  // updates an existing item in a list
  updateItem(resource: string, id: string, item: any) {
    return this.af.database.list(resource).update(id, item);
  }

  // removes an item from a list
  deleteItem(resource: string, id: string) {
    return this.af.database.list(resource).remove(id);
  }

  getAuth(): AngularFireAuth {
    return this.af.auth;
  }

  login(provider): Promise<FirebaseAuthState> {
    return this.af.auth.login(provider);
  }

  newUser(reginfo: Reginfo): Promise<any> {
    return this.af.auth.createUser({
      email: reginfo.email,
      password: reginfo.pass
    });
  }

  updatePassword(auth, newPassword: string): Promise<any> {
      return auth.updatePassword(newPassword);
  }

  logout(): Promise<void> {
    return this.af.auth.logout();
  }
}
