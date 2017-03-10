import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable()
export class DateChooserService {

  private dateSubject = new BehaviorSubject<Date>(new Date());

  constructor() { }

  setChosenDate(date: Date) {
    this.dateSubject.next(date);
  }

  getChosenDateAsObservable(): Observable<Date> {
    return this.dateSubject.asObservable();
  }

  getChosenDate() {
    return this.dateSubject.getValue();
  }
}
