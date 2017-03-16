import { DateChooserComponent } from './date-chooser.component';
import {Observable} from 'rxjs';

class DateChooserServiceStub {
  setChosenDate() { }

  getChosenDateAsObservable() {
    return Observable.of(new Date());
  }
}

describe('DateChooserComponent', () => {
  let component: DateChooserComponent;
  let dateChooserService: any = new DateChooserServiceStub();

  beforeEach(() => {
    component = new DateChooserComponent(dateChooserService);
    component.ngOnInit();
  });

  it('should create DateChooserComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should init selected date service', () => {
    expect(component.selectedDate).toBeDefined();
  });

  it('should be today', () => {
    spyOn(component, 'getDateToday').and.returnValue(new Date(2017, 2, 15));
    let isToday = component.isToday(new Date(2017, 2, 15));
    expect(isToday).toBe(true);
  });

  it('should not be today', () => {
    spyOn(component, 'getDateToday').and.returnValue(new Date(2017, 2, 16));
    let isToday = component.isToday(new Date(2017, 2, 15));
    expect(isToday).toBe(false);
  });

  it('should change date - add one step', () => {
    component.selectedDate = new Date(2017, 2, 15);
    spyOn(dateChooserService, 'setChosenDate');
    component.dateChange(1);

    expect(dateChooserService.setChosenDate).toHaveBeenCalledWith(new Date(2017, 2, 16));
  });

  it('should change date - subtract one step', () => {
    component.selectedDate = new Date(2017, 2, 15);
    spyOn(dateChooserService, 'setChosenDate');
    component.dateChange(-1);

    expect(dateChooserService.setChosenDate).toHaveBeenCalledWith(new Date(2017, 2, 14));
  });
});
