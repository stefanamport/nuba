import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JournalComponent } from './journal.component';

const journalRoutes: Routes = [
    { path: '', component: JournalComponent }
    ];

export const journalRouting: ModuleWithProviders = RouterModule.forChild(journalRoutes);
