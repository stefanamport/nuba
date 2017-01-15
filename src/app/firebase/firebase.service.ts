import { Injectable } from '@angular/core';
import { FirebaseListObservable, AngularFire, FirebaseObjectObservable } from 'angularfire2';

@Injectable()
export class FirebaseService {

  constructor(private af: AngularFire) { }

  getList(resource: string): FirebaseListObservable<any[]> {
    return this.af.database.list(resource);
  }

  getObject(resource: string, id: number): FirebaseObjectObservable<any> {
    return this.af.database.object(resource + '/' + id);
  }

  updateObject(resource: string, id: number, object: any) {
    this.af.database.object(resource + '/' + id).update(object);
  }
}
