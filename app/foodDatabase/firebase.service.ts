import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';
import { Food } from './food';

@Injectable()
export class FirebaseService  {
  constructor(private af: AngularFire) {}

  getAllFood(): FirebaseListObservable<Food[]>  {
    return this.af.database.list('food');
  }

  getFood(id: number): FirebaseObjectObservable<Food>  {
    return this.af.database.object('food' + id);
  }
}
