import { Component } from '@angular/core';
import { JournalEntriesService } from './journalEntries.service';
import { FirebaseService } from '../foodDatabase/firebase.service';

@Component({
  templateUrl: "./app/nubaJournal/nubaJournal.component.html",
  providers: [ JournalEntriesService, FirebaseService ]
})
export class JournalComponent  {

}
