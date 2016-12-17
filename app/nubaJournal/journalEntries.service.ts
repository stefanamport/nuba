import { Injectable, Output } from '@angular/core';
import { journalEntry } from './journalEntry';

import { EventEmitter } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';


@Injectable()
export class JournalEntriesService {

  //data: Observable<Array<number>>;
  observer: any;
  //tobserver: Observer;

  @Output() data = new EventEmitter();


  // ist mit firebase nicht mehr nötig, da nicht immer alle Einträge geladen sein müssen
  entries: Array<journalEntry>;

  // TODO umstellen auf Object...
  activeListDate: any = new Date();

  constructor(){
    
    // ist mit firebase ebenfalls nicht mehr nötig
    this.entries = JSON.parse(localStorage.getItem("nubaJournalEntries"));

    if (this.entries === null) {
      this.entries = [];
    }
    
  }


  getOfActiveDate(){

    let activeListDateDay = this.activeListDate.setHours(0,0,0,0);

    let entries = this.entries.filter(function(entry){
       
       let compareDate = new Date(entry.date.toString()).setHours(0,0,0,0);

       return compareDate === activeListDateDay;
    });

    return entries;
  }

  changeDateInSteps(step: number){ 

    let baseDate = this.activeListDate;

    this.activeListDate = new Date(baseDate.setDate(baseDate.getDate() + step));

    this.dataUpdated();
  }

  getSingle(id: number){
    let entry = this.entries.filter(function(entry){ 
       return entry.id === id;
    });

    return entry[0];
  }

  addEntry(entry: journalEntry){
    this.entries.push(entry);
    this.save();

    this.dataUpdated();
  }

  // Make Object for Subscribers
  getMutableData () {
    let mutableData = {
      'entriesOfActiveDate' : this.getOfActiveDate(),
      'activeDate' : this.activeListDate
    }
    return mutableData;
  }

  // Send Changes to Subscribers
  dataUpdated (){
    this.data.next(this.getMutableData());
  }

  removeEntry(id: number){

  }

  save() {
    // muss durch firebase ersetzt werden
    localStorage.setItem("nubaJournalEntries", JSON.stringify(this.entries));
  }

}
