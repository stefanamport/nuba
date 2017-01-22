import { Component, OnInit } from '@angular/core';

import { JournalEntriesService } from './journalEntries.service';
import {FoodService} from '../food/food.service';

@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.scss'],
  providers: [ JournalEntriesService, FoodService ]
})
export class JournalComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
