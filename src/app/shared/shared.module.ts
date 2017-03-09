import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateChooserComponent } from './date-chooser.component';
import {MomentPipe} from './momentjs.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ DateChooserComponent, MomentPipe],
  exports: [ DateChooserComponent, MomentPipe ]
})

export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule
    };
  }
}
