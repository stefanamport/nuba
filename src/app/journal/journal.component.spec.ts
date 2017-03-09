import { JournalComponent } from './journal.component';
import { AnalysisService } from '../analysis/service/analysis.service';
import {DateChooserService} from '../shared/date-chooser.service';

describe('JournalComponent', () => {
  let component: JournalComponent;
  let analysisService: AnalysisService;
  let dateChooserService: DateChooserService;

  beforeEach(() => {
    component = new JournalComponent(analysisService, dateChooserService);
  });

  it('should create JournalComponent', () => {
   expect(component).toBeTruthy();
  });
});
