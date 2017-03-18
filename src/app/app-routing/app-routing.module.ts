import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginGuard } from '../login/login.guard';

import { WelcomeComponent } from '../welcome/welcome.component';
import { LogInComponent } from '../login/login.component';
import { ImpressumComponent } from '../impressum/impressum.component';

import { CommonModule } from '@angular/common';

const routes: Routes = [
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  { path: 'analysis',
    loadChildren: 'app/analysis/analysis.module#AnalysisModule',
    canActivate: [LoginGuard]
  },
  { path: 'journal',
    loadChildren: 'app/journal/journal.module#JournalModule',
    canActivate: [LoginGuard]
  },
  { path: 'account',
    loadChildren: 'app/user-account/user-account.module#UserAccountModule',
    canActivate: [LoginGuard]
  },
  { path: 'impressum', component: ImpressumComponent },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'login', component: LogInComponent }
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
