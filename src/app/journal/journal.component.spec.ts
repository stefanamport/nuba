import { JournalComponent } from './journal.component';
import { Observable } from 'rxjs';
import { ConsumptionReport } from '../analysis/model/consumptionReport';

class DateChooserServiceStub {
  getChosenDateAsObservable(): Observable<Date> {
    return Observable.of(new Date());
  }
}

class AnalysisServiceStub {
  initConsumptionAnalysis() { }

  getConsumptionReport() {
    return Observable.of(new ConsumptionReport());
  }
}

describe('JournalComponent', () => {
  let component: JournalComponent;
  let analysisService: any = new AnalysisServiceStub();
  let dateChooserService: any = new DateChooserServiceStub();

  beforeEach(() => {
    component = new JournalComponent(analysisService, dateChooserService);
    component.ngOnInit();
  });

  it('should create JournalComponent', () => {
   expect(component).toBeTruthy();
  });

  it('should switch new hint available', () => {
    expect(component.newHintAvailable).toBeTruthy();

    component.showNewHint();

    expect(component.newHintAvailable).toBeFalsy();
  });

  it('should change coach visibility', () => {
    expect(component.mobCoachVisible).toBeFalsy();

    component.mobCoachVisibility();

    expect(component.mobCoachVisible).toBeTruthy();
  });
});
