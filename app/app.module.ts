import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';

import { AppComponent }  from './app.component';

import { LogIn }   from './logIn/login.component';

import { AppHeader }   from './header/header.component';

import { JournalComponent }   from './nubaJournal/nubaJournal.component';
import { NubaSearch } from './nubaJournal/nubaSearch.component';
import { JournalList } from "./nubaJournal/journalList.component";

import { JournalEntriesService } from './nubaJournal/journalEntries.service';


import { AnalysisComponent }   from './nubaAnalysis/nubaAnalysis.component';
import { UserAccountComponent }  from './nubaUserAccount/nubaUserAccount.component';
import { AngularFireModule, AuthMethods, AuthProviders  } from 'angularfire2';


import { AppRoutingModule }     from './routing/routing.module';

export const firebaseConfig = {
  apiKey: 'AIzaSyBf7RiiafbN6IKzYoDdsZtOaQqFK-54oB0',
  authDomain: 'nuba-c3e84.firebaseapp.com',
  databaseURL: 'https://nuba-c3e84.firebaseio.com/',
  storageBucket: 'nuba-c3e84.appspot.com',
  messagingSenderId: '126418702718'

}

@NgModule({
  imports:      [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig,{
        provider: AuthProviders.Google,
        method: AuthMethods.Popup
      })
    ],
  declarations: [
    AppComponent,
    AppHeader,
    LogIn,

  	JournalComponent,
  	NubaSearch,
  	JournalList,

  	AnalysisComponent,
  	UserAccountComponent
  	],
  bootstrap:    [ AppComponent ],
})
export class AppModule { }
