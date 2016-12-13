import { Component } from '@angular/core';

import { journalEntry } from './journalEntry';
import { JournalEntriesService } from './journalEntries.service';

import { FoodDatabaseService } from '../foodDatabase/food.service';

@Component({
  selector: "journal-list",
  templateUrl: "./app/nubaJournal/journalList.component.html",
  providers: [FoodDatabaseService]
})
export class JournalList  { 
  
  journalList: Array<journalEntry>;
  showEntriesOfDate: string;

  subscription: any;

  constructor(private JournalEntriesService: JournalEntriesService, private foodDatabase: FoodDatabaseService) {

    // Mock... shows everytime entries of today
  	this.showEntriesOfDate = new Date () ;

  	this.journalList = JournalEntriesService.getOfDate(this.showEntriesOfDate);

  }

  ngOnInit(){
    this.JournalEntriesService.data.subscribe(data => {
        this.journalList = data;
      });
  }

  testFunction(test:number) {
    alert();
    console.log(test);
  }

  addEntry(entry: journalEntry){
  	// TODO templateUrlJust for updating the view
  	if (entry.date === this.showEntriesOfDate) {
  		//this.journalList.push(entry);
  	}



  	console.log(this.journalList);

   }

}
