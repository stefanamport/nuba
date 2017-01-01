import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { JournalComponent }   from '../nubaJournal/nubaJournal.component';
import { AnalysisComponent }   from '../nubaAnalysis/nubaAnalysis.component';
import { UserAccountComponent }  from '../nubaUserAccount/nubaUserAccount.component';
import { LogIn }  from '../logIn/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/journal', pathMatch: 'full' },
  { path: 'journal',  component: JournalComponent },
  { path: 'analysis', component: AnalysisComponent },
  { path: 'account',     component: UserAccountComponent },
  { path: 'login',     component: LogIn }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {



}