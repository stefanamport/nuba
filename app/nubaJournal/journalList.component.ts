import { Component } from '@angular/core';

import { journalEntry } from './journalEntry';
import { JournalEntriesService } from './journalEntries.service';

@Component({
  selector: "journal-list",
  templateUrl: "./app/nubaJournal/journalList.component.html",
  providers: [JournalEntriesService]
})
export class JournalList  { 
  
  journalList: Array<journalEntry>;
  showEntriesOfDate: "mock-Date :-)";

  constructor(private JournalEntriesService: JournalEntriesService) {

  	this.showEntriesOfDate = "mock-Date :-)";

  	this.journalList = JournalEntriesService.getOfDate(this.showEntriesOfDate);
  }

  addEntry(entry: journalEntry){
  	// TODO templateUrlJust for updating the view
  	if (entry.date === this.showEntriesOfDate) {
  		//this.journalList.push(entry);
  	}

  	console.log(this.journalList);

  }

}
