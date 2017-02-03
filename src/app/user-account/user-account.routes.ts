import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserAccountComponent } from './user-account.component';

const userAccountRoutes: Routes = [
    { path: '', component: UserAccountComponent }
    ];

export const userAccountRouting: ModuleWithProviders = RouterModule.forChild(userAccountRoutes);
