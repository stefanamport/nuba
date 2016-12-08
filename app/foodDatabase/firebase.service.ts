import { Injectable } from '@angular/core';
import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Injectable()
export class FirebaseService  {
  constructor(private af: AngularFire) {}

  getAllFood() {
    this.af.database.list('food').subscribe(food => console.log(food));
  }

  getFood(id: number) {
    this.af.database.object('food/'+id).subscribe(food => console.log(food));
  }
}
