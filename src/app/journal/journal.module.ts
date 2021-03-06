import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { JournalComponent } from './journal.component';
import { journalRouting } from './journal.routes';

import { JournalListComponent } from './journalList.component';
import { SearchComponent } from './nubaSearch.component';

import { SearchFilterPipe } from './pipes/searchFilter.pipe';
import { OrderByAlphabetPipe } from './pipes/orderByAlphabet.pipe';
import { OrderByDatePipe } from './pipes/orderByDate.pipe';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [
      JournalComponent,
      SearchComponent,
      JournalListComponent,
      SearchFilterPipe,
      OrderByAlphabetPipe,
      OrderByDatePipe
    ],
    imports: [
      journalRouting,
      CommonModule,
      FormsModule,
      SharedModule
    ]
})
export class JournalModule { }
