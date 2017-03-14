import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnalysisComponent } from './analysis.component';
import { analysisRouting } from './analysis.routes';

import { RoundPipe } from './pipes/round.pipe';

import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [AnalysisComponent, RoundPipe],
    imports: [
      analysisRouting,
      CommonModule,
      SharedModule
    ]
})
export class AnalysisModule {

}
