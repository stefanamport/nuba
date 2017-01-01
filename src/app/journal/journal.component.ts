import { Component, OnInit } from '@angular/core';
import { JournalEntriesService } from './journalEntries.service';
import { FirebaseService } from '../food-database/firebase.service';

@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.scss'],
  providers: [ JournalEntriesService, FirebaseService ]
})
export class JournalComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
