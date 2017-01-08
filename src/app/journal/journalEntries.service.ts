import { Injectable, Output } from '@angular/core';
import { JournalEntry } from './journalEntry';

import { EventEmitter } from '@angular/core';

@Injectable()
export class JournalEntriesService {

  //data: Observable<Array<number>>;
  observer: any;
  //tobserver: Observer;

  @Output() data = new EventEmitter();
  
  // ist mit firebase nicht mehr nötig, da nicht immer alle Einträge geladen sein müssen
  entries: Array<JournalEntry>;

  // TODO umstellen auf Object...
  activeListDate: any = new Date();

  constructor(){
    // ist mit firebase ebenfalls nicht mehr nötig
    this.entries = JSON.parse(localStorage.getItem("nubaJournalEntries"));

    if (this.entries === null) {
      this.entries = [];
    }
  }
  
  getOfActiveDate() {
    let activeListDateDay = this.activeListDate.setHours(0,0,0,0);
    let entries = this.entries.filter(function(entry) {
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

  addEntry(entry: JournalEntry){
    
    // Firebase Save Mock
      // function(){} >> push to firebase
      // rückmeldung mit ID
      entry.id = Math.floor(Math.random() * (9999999999 - 1)) + 1;

    // Rückmeldung von Firebase einlesen
    this.entries.push(entry);

    // Mock Save
    this.save();

    // Push to subscribers
    this.dataUpdated();
  }

  deleteEntry(id: any){
    for (let c = 0; c < this.entries.length; c++) {
      if (this.entries[c].id && this.entries[c].id === id) {
          this.entries.splice(c, 1);
          break;
      }
    }
    this.dataUpdated();
    this.save();
  }

  updateEntry(id: any){
    // Mock
    // würde dann den einzelnen Entry auf Firebase ändern...

    let newEntry = this.getSingle(id);
    //sendToFirebase(new Entry) :-)

    this.save();

  }

  
  getMutableData () {
    // Make Object for Subscribers

    let mutableData = {
      'entriesOfActiveDate' : this.getOfActiveDate(),
      'activeDate' : this.activeListDate
    }
    return mutableData;
  }

  
  dataUpdated (){
     // Send Changes to Subscribers
    this.data.next(this.getMutableData());
  }


  save() {
    // mock... wird dann in den einzelnen Funktionen durch Firebase ersetzt...
    localStorage.setItem("nubaJournalEntries", JSON.stringify(this.entries));
  }

}
