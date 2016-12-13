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

  constructor(){
    
    // ist mit firebase ebenfalls nicht mehr nötig
    this.entries = JSON.parse(localStorage.getItem("nubaJournalEntries"));

    if (this.entries === null) {
      this.entries = [];
    }

     //this.data = new EventEmitter();

     this.data.emit(333);
     
       console.log('timeout start');
       this.testTrigger();

     //this.data = new Observable(observer => this.dataObserver = observer);
    
  }

  testTrigger(){
      
    this.data.emit('sending a message');
    console.log('33 sent');
      
  }

  getOfDate(date:string){

    let date = new Date(date);

    let entries = this.entries.filter(function(entry){ 
       return new Date(entry.date).setHours(0,0,0,0) === date.setHours(0,0,0,0);
    });

    return entries;
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

    this.data.next(this.entries);
  }

  removeEntry(id: number){

  }

  save() {
    // muss durch firebase ersetzt werden
    localStorage.setItem("nubaJournalEntries", JSON.stringify(this.entries));
  }

}
