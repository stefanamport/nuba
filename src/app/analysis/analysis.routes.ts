import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnalysisComponent } from './analysis.component';

const analysisRoutes: Routes = [
    { path: '', component: AnalysisComponent }
    ];

export const analysisRouting: ModuleWithProviders = RouterModule.forChild(analysisRoutes);