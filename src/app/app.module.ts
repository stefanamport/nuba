import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';

import { AppRoutingModule }     from './app-routing/app-routing.module';

import { AppComponent } from './app.component';
import {JournalList} from "./journal/journalList.component";
import {NubaSearch} from "./journal/nubaSearch.component";
import { UserAccountComponent } from './user-account/user-account.component';
import { AnalysisComponent } from './analysis/analysis.component';
import { FoodDatabaseComponent } from './food-database/food-database.component';
import { HeaderComponent } from './header/header.component';
import { JournalComponent } from './journal/journal.component';

export const firebaseConfig = {
  apiKey: 'AIzaSyBf7RiiafbN6IKzYoDdsZtOaQqFK-54oB0',
  authDomain: 'nuba-c3e84.firebaseapp.com',
  databaseURL: 'https://nuba-c3e84.firebaseio.com/',
  storageBucket: 'nuba-c3e84.appspot.com',
  messagingSenderId: '126418702718'
};

@NgModule({
  declarations: [
    AppComponent,
    NubaSearch,
    JournalList,
    UserAccountComponent,
    AnalysisComponent,
    FoodDatabaseComponent,
    HeaderComponent,
    JournalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
