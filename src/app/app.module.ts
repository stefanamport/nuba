import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AngularFireModule, AuthMethods, AuthProviders  } from 'angularfire2';

import { AppRoutingModule } from './app-routing/app-routing.module';

import { AppComponent } from './app.component';

import { LoginGuard } from './login/login.guard';

import { LogInComponent } from './login/login.component';
import { LoginService } from './login/login.service';
import { HeaderComponent } from './header/header.component';
import { ImpressumComponent } from './impressum/impressum.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { FirebaseService } from './firebase/firebase.service';

import { FoodService } from './food/food.service';
import { DateChooserService } from './shared/date-chooser.service';
import { UserAccountService } from './user-account/user-account.service';

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
    LogInComponent,
    HeaderComponent,
    ImpressumComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig, {
        provider: AuthProviders.Password,
        method: AuthMethods.Password
      })
  ],
  providers: [ LoginService, FirebaseService, LoginGuard, FoodService, DateChooserService, UserAccountService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
