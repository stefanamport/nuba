import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { AppHeader }   from './header/header.component';
import { JournalComponent }   from './nubaJournal/nubaJournal.component';
import { AnalysisComponent }   from './nubaAnalysis/nubaAnalysis.component';
import { UserAccountComponent }  from './nubaUserAccount/nubaUserAccount.component';
import { AngularFireModule } from 'angularfire2';


import { AppRoutingModule }     from './routing/routing.module';

export const firebaseConfig = {
  apiKey: 'AIzaSyBf7RiiafbN6IKzYoDdsZtOaQqFK-54oB0',
  authDomain: "nuba-c3e84.firebaseapp.com",
  databaseURL: 'https://nuba-c3e84.firebaseio.com/',
  storageBucket: 'nuba-c3e84.appspot.com',
  messagingSenderId: "126418702718"
}

@NgModule({
  imports:      [ BrowserModule, AppRoutingModule, AngularFireModule.initializeApp(firebaseConfig)],
  declarations: [ AppComponent, AppHeader, JournalComponent, AnalysisComponent, UserAccountComponent ],
  bootstrap:    [ AppComponent ],
})
export class AppModule { }
