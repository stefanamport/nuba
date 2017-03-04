import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnalysisComponent } from './analysis.component';
import { analysisRouting } from './analysis.routes';

import { RoundPipe } from './pipes/round.pipe';

@NgModule({
    declarations: [AnalysisComponent, RoundPipe],
    imports: [
      analysisRouting,
      CommonModule
    ]
})
export class AnalysisModule {

}
