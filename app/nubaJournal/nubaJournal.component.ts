import { Component } from '@angular/core';

import { NubaSearch } from "./nubaSearch.component";
import { JournalEntriesService } from './journalEntries.service';

@Component({
  templateUrl: "./app/nubaJournal/nubaJournal.component.html",
  providers: [ JournalEntriesService ]
})
export class JournalComponent  { 

}
