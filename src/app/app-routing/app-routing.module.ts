import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginGuard } from '../login/login.guard';

import { LogInComponent } from '../login/login.component';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
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
