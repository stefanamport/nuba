import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LogIn }   from '../login/login.component';
import { JournalComponent }   from '../journal/journal.component';
import { AnalysisComponent }   from '../analysis/analysis.component';
import { UserAccountComponent }  from '../user-account/user-account.component';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  { path: '', redirectTo: '/journal', pathMatch: 'full' },
  { path: 'journal',  component: JournalComponent },
  { path: 'analysis', component: AnalysisComponent },
  { path: 'account',     component: UserAccountComponent },
  { path: 'login',     component: LogIn }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ],
  declarations: []
})

export class AppRoutingModule { }
