import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { AppHeader }   from './header/header.component';

import { JournalComponent }   from './nubaJournal/nubaJournal.component';
import { NubaSearch } from "./nubaJournal/nubaSearch.component";

import { AnalysisComponent }   from './nubaAnalysis/nubaAnalysis.component';
import { UserAccountComponent }  from './nubaUserAccount/nubaUserAccount.component';


import { AppRoutingModule }     from './routing/routing.module';

@NgModule({
  imports:      [ BrowserModule, AppRoutingModule],
  declarations: [ AppComponent, AppHeader, JournalComponent, NubaSearch, AnalysisComponent, UserAccountComponent ],
  bootstrap:    [ AppComponent ],
})
export class AppModule { }
