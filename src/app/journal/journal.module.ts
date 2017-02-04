import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { JournalComponent } from './journal.component';
import { journalRouting } from './journal.routes';

import { JournalListComponent } from './journalList.component';
import { SearchComponent } from './nubaSearch.component';

import { SearchFilterPipe } from './pipes/searchFilter.pipe';

@NgModule({
    declarations: [
      JournalComponent,
      SearchComponent,
      JournalListComponent,
      SearchFilterPipe
    ],
    imports: [
      journalRouting,
      CommonModule,
      FormsModule
    ]
})
export class JournalModule { }