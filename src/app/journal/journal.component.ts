import { Component, OnInit } from '@angular/core';

import { JournalEntriesService } from './journalEntries.service';

@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.scss'],
  providers: [ JournalEntriesService ]
})
export class JournalComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
