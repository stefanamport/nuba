import { Injectable } from '@angular/core';
import { journalEntry } from './journalEntry';

@Injectable()
export class JournalEntriesService {

  // ist mit firebase nicht mehr nötig, da nicht immer alle Einträge geladen sein müssen
  entries: Array<journalEntry>;

  constructor(){
    
    // ist mit firebase ebenfalls nicht mehr nötig
    this.entries = JSON.parse(localStorage.getItem("nubaJournalEntries"));

    if (this.entries === null) {
      this.entries = [];
    }
    
  }

  getOfDate(date:string){
    let entries = this.entries.filter(function(entry){ 
       return entry.date === date;
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
  }

  removeEntry(id: number){

  }

  save() {
    // muss durch firebase ersetzt werden
    localStorage.setItem("nubaJournalEntries", JSON.stringify(this.entries));
  }

}
