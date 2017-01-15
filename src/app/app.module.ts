import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AngularFireModule, AuthMethods, AuthProviders  } from 'angularfire2';

import { AppRoutingModule } from './app-routing/app-routing.module';

import { AppComponent } from './app.component';

import { LoginGuard } from './login/login.guard';
import { UserService } from './login/user.service';

import { JournalListComponent } from './journal/journalList.component';
import { SearchComponent } from './journal/nubaSearch.component';
import { LogInComponent } from './login/login.component';
import { UserAccountComponent } from './user-account/user-account.component';
import { AnalysisComponent } from './analysis/analysis.component';
import { HeaderComponent } from './header/header.component';
import { JournalComponent } from './journal/journal.component';
import { FirebaseService } from './firebase/firebase.service';

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
    SearchComponent,
    JournalListComponent,
    LogInComponent,
    UserAccountComponent,
    AnalysisComponent,
    HeaderComponent,
    JournalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig, {
        provider: AuthProviders.Google,
        method: AuthMethods.Popup
      })
  ],
  providers: [ UserService, FirebaseService, LoginGuard ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
