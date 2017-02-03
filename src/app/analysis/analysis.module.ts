import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnalysisComponent } from './analysis.component';
import { analysisRouting } from './analysis.routes';

@NgModule({
    declarations: [AnalysisComponent],
    imports: [
      analysisRouting,
      CommonModule
    ]
})
export class AnalysisModule {

}
