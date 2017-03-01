import { Injectable } from '@angular/core';
import {FirebaseListObservable, AngularFire, FirebaseObjectObservable, FirebaseAuthState} from 'angularfire2';
import Promise = firebase.Promise;

@Injectable()
export class FirebaseService {

  constructor(private af: AngularFire) { }

  getList(resource: string): FirebaseListObservable<any[]> {
    return this.af.database.list(resource);
  }

  getObject(resource: string, id: number): FirebaseObjectObservable<any> {
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
    const items = this.af.database.list(resource);
    items.remove(id);
  }

  getAuth() {
    return this.af.auth;
  }

  login(provider): Promise<FirebaseAuthState> {
    return this.af.auth.login(provider);
  }

  logout(): Promise<void> {
    return this.af.auth.logout();
  }
}
