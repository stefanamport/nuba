import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { JournalComponent }   from './nubaJournal/nubaJournal.component';
import { AnalysisComponent }   from './nubaAnalysis/nubaAnalysis.component';
import { UserAccountComponent }  from './nubaUserAccount/nubaUserAccount.component';


import { AppRoutingModule }     from './routing/routing.module';

@NgModule({
  imports:      [ BrowserModule, AppRoutingModule],
  declarations: [ AppComponent, JournalComponent, AnalysisComponent, UserAccountComponent ],
  bootstrap:    [ AppComponent ],
})
export class AppModule { }
